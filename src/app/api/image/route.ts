import { NextRequest, NextResponse } from "next/server";

const PEXELS_KEY = process.env.PEXELS_API_KEY;

const cache = new Map<string, { url: string; ts: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

// Map abstract/hard-to-image words to visual search terms
const visualMap: Record<string, string> = {
  please: "person saying thank you",
  thanks: "grateful person smiling",
  "thank you": "grateful person smiling",
  yes: "thumbs up",
  no: "person shaking head",
  hello: "people greeting",
  goodbye: "person waving goodbye",
  sorry: "person apologizing",
  help: "person helping someone",
  maybe: "person thinking",
  always: "clock infinite",
  never: "empty road",
  often: "calendar schedule",
  sometimes: "dice chance",
  today: "sunrise morning",
  tomorrow: "calendar tomorrow",
  yesterday: "old clock",
  now: "stopwatch",
  here: "map pin location",
  there: "pointing distance",
  very: "thermometer hot",
  well: "thumbs up approval",
  also: "plus sign",
  but: "crossroads",
  because: "lightbulb idea",
  with: "people together",
  without: "empty hands",
  before: "clock earlier",
  after: "clock later",
  during: "hourglass sand",
  between: "bridge",
  under: "umbrella rain",
  over: "airplane flying",
  near: "binoculars close",
  far: "horizon distance",
  early: "sunrise dawn",
  late: "night moon clock",
  fast: "cheetah running",
  slow: "turtle walking",
  big: "elephant large",
  small: "tiny ladybug",
  good: "thumbs up happy",
  bad: "thumbs down",
  new: "gift box wrapped",
  old: "antique vintage",
  young: "child playing",
  happy: "happy person smiling",
  sad: "sad person rain",
  tired: "person yawning tired",
  sick: "person sick bed",
  hungry: "empty plate food",
  thirsty: "glass water desert",
  hot: "sun summer heat",
  cold: "snow winter ice",
  expensive: "luxury jewelry gold",
  cheap: "coins money bargain",
  free: "bird flying freedom",
  easy: "piece of cake",
  difficult: "mountain climbing",
  important: "trophy award",
  possible: "open door light",
  necessary: "key lock essential",
  ready: "starting line race",
  busy: "office working desk",
  open: "open door welcome",
  closed: "closed door lock",
  right: "checkmark correct",
  wrong: "red cross error",
  true: "truth balance scale",
  false: "mask theater",
  same: "twins identical",
  different: "contrast colors",
  each: "row of items lined up",
  every: "crowd people many",
  all: "group together team",
  many: "stars sky many",
  few: "three pebbles stones",
  more: "pile growing stack",
  less: "minimalist simple",
  enough: "full cup",
  too: "overflowing cup",
  already: "finish line done",
  still: "calm lake reflection",
  again: "replay arrows circle",
  together: "hands holding together",
  alone: "person solitude nature",
  almost: "finish line close",
  quite: "measuring cup half",
  really: "exclamation surprise",
  just: "simple clean minimal",
  only: "single flower field",
  even: "balance scale equal",
  soon: "clock approaching time",
  suddenly: "lightning bolt surprise",
  finally: "celebration finish",
  probably: "dice probability",
  however: "fork road choice",
  although: "contrast umbrella sun",
  therefore: "arrow direction forward",
  moreover: "plus addition stack",
  nevertheless: "person persevering storm",
  indeed: "nodding agreement",
  thus: "domino chain reaction",
  meanwhile: "split screen dual",
  otherwise: "two doors choice",
  instead: "swap exchange arrows",
  according: "newspaper report",
  despite: "flower concrete crack",
  toward: "walking path direction",
  against: "shield defense wall",
  among: "forest trees between",
  within: "inside box contained",
  across: "bridge crossing river",
  along: "path trail walking",
  through: "tunnel light end",
  around: "carousel spinning",
  about: "question mark curious",
  like: "heart love thumbs up",
  want: "wish star desire",
  need: "water desert thirst",
  know: "brain knowledge books",
  think: "person thinking pose",
  believe: "faith hands prayer",
  understand: "lightbulb moment",
  remember: "photo album memories",
  forget: "eraser removing",
  learn: "student studying books",
  teach: "teacher classroom board",
  speak: "microphone speaking",
  listen: "headphones music ears",
  read: "book reading library",
  write: "pen paper writing",
  ask: "question mark hand raised",
  answer: "speech bubble reply",
  try: "rock climbing attempt",
  work: "office desk computer",
  live: "house home family",
  die: "autumn leaves falling",
  begin: "starting blocks race",
  finish: "checkered flag finish",
  continue: "road continuing horizon",
  stop: "stop sign red",
  change: "butterfly metamorphosis",
  move: "running person motion",
  stay: "anchor stability",
  come: "welcome door open",
  go: "arrow forward direction",
  bring: "gift delivery carrying",
  take: "hand grabbing reaching",
  give: "hands giving gift",
  send: "paper airplane flying",
  receive: "mailbox letter",
  buy: "shopping bag store",
  sell: "market stand vendor",
  pay: "credit card payment",
  cost: "price tag money",
  keep: "treasure chest safe",
  lose: "lost map compass",
  find: "magnifying glass search",
  show: "spotlight stage presentation",
  hide: "hide seek child",
  wait: "hourglass patience",
  hope: "sunrise new day hope",
  love: "heart love couple",
  hate: "angry storm thunder",
  feel: "hands touching texture",
  seem: "mirror reflection illusion",
  become: "caterpillar butterfly growth",
  happen: "fireworks event",
  appear: "magic reveal curtain",
  include: "circle encompassing",
  allow: "green light permission",
  mean: "dictionary definition",
  should: "compass direction guide",
  must: "exclamation important sign",
  can: "flexing muscles strength",
  may: "open gate permission",
  will: "crystal ball future",
  would: "thought bubble dream",
  could: "key unlocking door",
  shall: "scroll decree formal",
};

function getSearchTerm(q: string): string {
  const lower = q.toLowerCase().replace(/^to\s+/, "").replace(/\s*\(.*\)/, "").trim();
  return visualMap[lower] ?? lower;
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q || !PEXELS_KEY) {
    return NextResponse.json({ url: null });
  }

  const searchTerm = getSearchTerm(q);

  // Check cache
  const cached = cache.get(q);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json({ url: cached.url });
  }

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchTerm)}&per_page=1&orientation=square`,
      { headers: { Authorization: PEXELS_KEY } }
    );

    if (!res.ok) {
      return NextResponse.json({ url: null });
    }

    const data = await res.json();
    const photo = data.photos?.[0];
    const url = photo?.src?.medium ?? null;

    if (url) {
      cache.set(q, { url, ts: Date.now() });
    }

    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ url: null });
  }
}
