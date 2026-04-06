/** Tiny success celebration: short chime + confetti burst. No external deps. */

let audioCtx: AudioContext | null = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

/** Play a short, pleasant "ding" chime */
export function playSuccessSound() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.setValueAtTime(1108.73, ctx.currentTime + 0.08); // C#6
    osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.16); // E6

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // Silently fail if audio is not available
  }
}

const COLORS = ["#10b981", "#6366f1", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

/** Spawn a quick confetti burst at the given element or center of viewport */
export function spawnConfetti(originEl?: HTMLElement | null) {
  const rect = originEl?.getBoundingClientRect();
  const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

  const count = 24;
  const container = document.createElement("div");
  container.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden";
  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    const size = 6 + Math.random() * 6;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const velocity = 120 + Math.random() * 180;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 100; // bias upward

    dot.style.cssText = `
      position:absolute;
      left:${cx}px;top:${cy}px;
      width:${size}px;height:${size}px;
      background:${color};
      border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      pointer-events:none;
    `;
    container.appendChild(dot);

    const start = performance.now();
    const duration = 600 + Math.random() * 400;

    const animate = (now: number) => {
      const t = (now - start) / duration;
      if (t >= 1) {
        dot.remove();
        return;
      }
      const x = cx + vx * t;
      const y = cy + vy * t + 400 * t * t; // gravity
      const opacity = 1 - t;
      const rotation = t * 360 * (Math.random() > 0.5 ? 1 : -1);
      dot.style.transform = `translate(${x - cx}px, ${y - cy}px) rotate(${rotation}deg)`;
      dot.style.opacity = String(opacity);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  setTimeout(() => container.remove(), 1500);
}

/** Combined: play sound + show confetti */
export function celebrate(originEl?: HTMLElement | null) {
  playSuccessSound();
  spawnConfetti(originEl);
}
