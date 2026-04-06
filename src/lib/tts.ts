let cachedVoice: SpeechSynthesisVoice | null = null;

function getFrenchVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  // Prefer premium/enhanced French voices
  const preferred = [
    "Thomas",    // macOS/iOS premium
    "Audrey",    // macOS/iOS premium
    "Amelie",    // macOS/iOS
    "Google français", // Chrome
    "Microsoft Paul", // Windows
    "Microsoft Julie", // Windows
  ];
  for (const name of preferred) {
    const v = voices.find((v) => v.name.includes(name) && v.lang.startsWith("fr"));
    if (v) {
      cachedVoice = v;
      return v;
    }
  }
  // Fallback: any French voice
  const frVoice = voices.find((v) => v.lang.startsWith("fr"));
  if (frVoice) cachedVoice = frVoice;
  return frVoice ?? null;
}

export function speak(text: string, rate = 0.85) {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = rate;
  utterance.pitch = 1.05;
  const voice = getFrenchVoice();
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

// Pre-load voices (some browsers load them async)
if (typeof window !== "undefined") {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
  };
}
