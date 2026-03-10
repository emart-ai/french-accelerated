import { useState, useEffect, useRef } from "react";
import {
  SUBJECTS,
  CONJUGATIONS_FR,
  CONJUGATIONS_ES,
  PREDICATES,
  VERB_META,
  PAIRS,
  TIPS,
  DAY_NAMES,
  DAY_EMOJIS,
  DAY_COLORS,
} from "./data/frenchDrill.js";

// ---------------------------------------------------------------------------
// Repeated style constants
// ---------------------------------------------------------------------------

// Card background and border used throughout the conjugation table rows
const DARK_CELL_BG = "#ffffff";
const DARK_CELL_BORDER = "#d0d0ea";

// Spanish translation label color (warm gold) used across the app
const ES_LABEL_COLOR = "#9a6e00";

// Predicate accent color (dark teal for readability on white)
const PRED_COLOR = "#0a9e7e";

// ---------------------------------------------------------------------------
// Predicate form helpers
// ---------------------------------------------------------------------------

/**
 * Return the correct French predicate form for the given subject index.
 *
 * Subject indices:
 *   0 Je  1 Tu  2 Il  3 Elle  4 On  5 Nous  6 Vous  7 Ils  8 Elles
 *
 * Gender/number rules:
 *   - Index 8 (Elles) → feminine plural (frFP)
 *   - Index 3 (Elle)  → feminine singular (frF)
 *   - Indices 5,6,7 (Nous/Vous/Ils) → masculine plural (frP)
 *   - All others → masculine singular base (fr)
 */
function frForm(predicate, subjectIndex) {
  if (!predicate.frF) {
    // No gendered forms — base form applies to everyone
    return predicate.fr;
  }
  if (subjectIndex === 8) return predicate.frFP; // Elles
  if (subjectIndex === 3) return predicate.frF;  // Elle
  if (subjectIndex === 5 || subjectIndex === 6 || subjectIndex === 7) {
    return predicate.frP; // Nous / Vous / Ils
  }
  return predicate.fr; // Je / Tu / Il / On
}

/**
 * Return the correct Spanish predicate form for the given subject index.
 * Mirrors the same gender/number logic as frForm.
 */
function esForm(predicate, subjectIndex) {
  if (!predicate.esF) {
    return predicate.es;
  }
  if (subjectIndex === 8) return predicate.esFP; // Ellas
  if (subjectIndex === 3) return predicate.esF;  // Ella
  if (subjectIndex === 5 || subjectIndex === 6 || subjectIndex === 7) {
    return predicate.esP; // Nosotros / Ud./Uds. / Ellos
  }
  return predicate.es;
}

// ---------------------------------------------------------------------------
// Slot builder
// ---------------------------------------------------------------------------

/**
 * Build the ordered list of practice slots for a given day.
 * Each day uses two verbs (verbA, verbB). We interleave them across
 * all 10 predicates, producing 20 slots total.
 *
 * Slot shape:
 *   { inf, conj, conjEs, preds, predIdx }
 */
function buildSlots(verbA, verbB) {
  const slots = [];
  for (let i = 0; i < 10; i++) {
    slots.push({
      inf:     verbA,
      conj:    CONJUGATIONS_FR[verbA],
      conjEs:  CONJUGATIONS_ES[verbA],
      preds:   PREDICATES[verbA],
      predIdx: i,
    });
    slots.push({
      inf:     verbB,
      conj:    CONJUGATIONS_FR[verbB],
      conjEs:  CONJUGATIONS_ES[verbB],
      preds:   PREDICATES[verbB],
      predIdx: i,
    });
  }
  return slots;
}

// ---------------------------------------------------------------------------
// Day object factory
// ---------------------------------------------------------------------------

/**
 * Build the full day descriptor for day index i (0-based).
 * Returns an object with display metadata and all practice slots.
 */
function makeDay(i) {
  const [verbA, verbB] = PAIRS[i];
  const dayOfWeek = i % 7;
  const week = Math.floor(i / 7) + 1;

  const metaA = VERB_META[verbA] || { es: verbA, emoji: "📝" };
  const metaB = VERB_META[verbB] || { es: verbB, emoji: "📝" };

  return {
    day:        i + 1,
    label:      `S${week} ${DAY_NAMES[dayOfWeek]}`,
    shortLabel: DAY_NAMES[dayOfWeek],
    week,
    color:      DAY_COLORS[dayOfWeek],
    emoji:      DAY_EMOJIS[dayOfWeek],
    theme:      `${verbA} + ${verbB}`,
    themeEs:    `${metaA.es} + ${metaB.es}`,
    tip:        TIPS[i],
    slots:      buildSlots(verbA, verbB),
    verbA,
    verbB,
  };
}

// Pre-build the full 35-day month once at module load time
const MONTH = Array.from({ length: 35 }, (_, i) => makeDay(i));

// ---------------------------------------------------------------------------
// Audio utilities
// ---------------------------------------------------------------------------

/**
 * Speak `text` in the given language using the Web Speech API.
 * Resolves when speech ends (or immediately if unavailable).
 */
function speakPromise(text, lang, rate = 0.82) {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) return resolve();

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang  = lang;
    utterance.rate  = rate;
    utterance.pitch = 1.05;
    utterance.onend   = resolve;
    utterance.onerror = resolve;

    const voices = window.speechSynthesis.getVoices();
    if (lang === "fr-FR") {
      const voice =
        voices.find((v) => v.lang.startsWith("fr") && v.localService) ||
        voices.find((v) => v.lang.startsWith("fr"));
      if (voice) utterance.voice = voice;
    } else {
      const voice =
        voices.find((v) => v.lang.startsWith("es") && v.localService) ||
        voices.find((v) => v.lang.startsWith("es"));
      if (voice) utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  });
}

/** Simple promise-based delay. */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function FrenchDrill({ onTabChange }) {
  const [mainTab,       setMainTab]       = useState(0);
  const [activeCard,    setActiveCard]    = useState(null);
  const [manualSpk,     setManualSpk]     = useState(null);
  const [activeDayIdx,  setActiveDayIdx]  = useState(new Date().getDay());
  const [activeSlot,    setActiveSlot]    = useState(0);
  const [activeWeek,    setActiveWeek]    = useState(0);
  const [isPlaying,     setIsPlaying]     = useState(false);
  const [isPaused,      setIsPaused]      = useState(false);
  const [playRow,       setPlayRow]       = useState(null);
  const [playPhase,     setPlayPhase]     = useState("");
  const stopRef = useRef(false);

  // Warm up voice list on mount
  useEffect(() => { window.speechSynthesis.getVoices(); }, []);

  // Derived state
  const day    = MONTH[activeDayIdx];
  const slot   = day.slots[activeSlot];
  const pred   = slot.preds[slot.predIdx % slot.preds.length];
  const slotVM = VERB_META[slot.inf] || { es: slot.inf, emoji: "📝" };

  // Stop playback whenever the user navigates to a different day or slot
  useEffect(() => { stopPlayback(); }, [activeDayIdx, activeSlot]);

  // ── Playback controls ────────────────────────────────────────────────────

  function stopPlayback() {
    stopRef.current = true;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setPlayRow(null);
    setPlayPhase("");
  }

  function togglePause() {
    if (isPaused) {
      stopRef.current = false;
      setIsPaused(false);
      window.speechSynthesis.resume();
    } else {
      setIsPaused(true);
      window.speechSynthesis.pause();
    }
  }

  // ── Sentence builders ────────────────────────────────────────────────────

  function buildFR(subjectIndex) {
    return `${SUBJECTS[subjectIndex].french} ${slot.conj[subjectIndex]} ${frForm(pred, subjectIndex)}`;
  }

  function buildES(subjectIndex) {
    return `${SUBJECTS[subjectIndex].spanish} ${slot.conjEs[subjectIndex]} ${esForm(pred, subjectIndex)}`;
  }

  // ── Autoplay loop ────────────────────────────────────────────────────────

  async function startAutoplay() {
    stopRef.current = false;
    setIsPlaying(true);
    setIsPaused(false);

    for (let i = 0; i < SUBJECTS.length; i++) {
      if (stopRef.current) break;
      setPlayRow(i);

      setPlayPhase("🇫🇷 Français");
      await speakPromise(buildFR(i), "fr-FR", 0.78);
      if (stopRef.current) break;
      await delay(550);

      setPlayPhase("🇪🇸 Español");
      await speakPromise(buildES(i), "es-ES", 0.82);
      if (stopRef.current) break;
      await delay(550);

      setPlayPhase("🇫🇷 ¡Repite!");
      await speakPromise(buildFR(i), "fr-FR", 0.78);
      if (stopRef.current) break;
      await delay(900);
    }

    if (!stopRef.current) {
      setPlayPhase("✅ ¡Terminado!");
      await delay(1400);
    }

    setIsPlaying(false);
    setIsPaused(false);
    setPlayRow(null);
    setPlayPhase("");
  }

  // ── Manual tap-to-speak ──────────────────────────────────────────────────

  function tapRow(subjectIndex) {
    if (isPlaying) return;
    window.speechSynthesis.cancel();
    setManualSpk(subjectIndex);
    speakPromise(buildFR(subjectIndex), "fr-FR").then(() => setManualSpk(null));
  }

  // The highlighted row: whichever is currently speaking (auto or manual)
  const highlightedRow = isPlaying ? playRow : manualSpk;

  // Days that belong to the currently selected week tab
  const daysInWeek = MONTH.filter((d) => d.week === activeWeek + 1);

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{
      position: "fixed", inset: 0, overflowY: "auto",
      background: "#fff",
      fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
      padding: "20px 24px 60px", boxSizing: "border-box",
    }}>
      {/* ── App-level tab bar ── */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
        {[["📝 Letras", "letters"], ["🔢 Números", "numbers"], ["🧑 Verbos", "verbos"]].map(([label, key]) => (
          <button
            key={key}
            onClick={() => onTabChange && onTabChange(key)}
            style={{
              padding: "8px 20px", borderRadius: 20,
              border: `2px solid ${key === "verbos" ? "#667eea" : "#ccc"}`,
              background: key === "verbos" ? "#667eea" : "transparent",
              color: key === "verbos" ? "#fff" : "#666",
              fontSize: 17, fontWeight: 700, cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Title block ── */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 15, letterSpacing: 4, color: "#999", textTransform: "uppercase", marginBottom: 2 }}>
          🇫🇷 → 🇪🇸 · Plan de 1 Mes
        </div>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#222", letterSpacing: -0.5 }}>
          French Drill
        </h1>
        <div style={{ fontSize: 15, color: "#888", marginTop: 1 }}>
          Día {day.day}/35 · Semana {day.week}/5
        </div>
      </div>

      {/* ── Cards / Table toggle ── */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
        {["🃏 Cards", "📊 Tabla"].map((label, i) => (
          <button
            key={i}
            onClick={() => { stopPlayback(); setMainTab(i); }}
            style={{
              padding: "8px 20px", borderRadius: 20,
              border: `2px solid ${mainTab === i ? "#667eea" : "#ccc"}`,
              background: mainTab === i ? "#667eea" : "transparent",
              color: mainTab === i ? "#fff" : "#666",
              fontSize: 17, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          Tab 0 — Subject cards
      ══════════════════════════════════════════════════════════════════ */}
      {mainTab === 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, maxWidth: "100%" }}>
          {SUBJECTS.map((subject, idx) => {
            const isActive   = activeCard === idx;
            const isSpeaking = manualSpk  === idx;
            return (
              <div
                key={idx}
                onClick={() => {
                  setActiveCard(idx);
                  setManualSpk(idx);
                  speakPromise(subject.french, "fr-FR").then(() => setManualSpk(null));
                }}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg,${subject.color}22,${subject.color}08)`
                    : DARK_CELL_BG,
                  border: `1.5px solid ${isActive ? subject.color : DARK_CELL_BORDER}`,
                  borderRadius: 12, padding: "9px 10px", cursor: "pointer",
                  position: "relative", overflow: "hidden",
                  transition: "all 0.2s",
                  transform: isActive ? "scale(0.97)" : "scale(1)",
                  userSelect: "none", WebkitTapHighlightColor: "transparent",
                }}
              >
                {/* Speaking pulse overlay */}
                {isSpeaking && (
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: 12,
                    background: `radial-gradient(circle,${subject.color}33,transparent 70%)`,
                    animation: "pulse 0.8s ease-in-out infinite alternate",
                    pointerEvents: "none",
                  }} />
                )}
                {/* Color bar at top */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: subject.color, borderRadius: "12px 12px 0 0",
                  opacity: isActive ? 1 : 0.3,
                }} />
                <div style={{ fontSize: 28, marginBottom: 2 }}>{subject.emoji}</div>
                <div style={{ fontSize: 15, color: subject.color, opacity: 0.8, fontStyle: "italic", marginBottom: 2 }}>
                  /{subject.phonetic}/
                </div>
                <div style={{
                  fontSize: 34, fontWeight: 800,
                  color: isActive ? subject.color : "#222",
                  lineHeight: 1, marginBottom: 2, letterSpacing: -0.5,
                }}>
                  {subject.french}
                </div>
                <div style={{ fontSize: 18, color: ES_LABEL_COLOR, fontWeight: 600 }}>
                  🇪🇸 {subject.spanish}
                </div>
                <div style={{
                  position: "absolute", bottom: 6, right: 8, fontSize: 18,
                  opacity: isSpeaking ? 1 : 0.2,
                  animation: isSpeaking ? "bounce 0.5s infinite alternate" : "none",
                }}>
                  🔊
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          Tab 1 — Conjugation table
      ══════════════════════════════════════════════════════════════════ */}
      {mainTab === 1 && (
        <div style={{ maxWidth: "100%" }}>

          {/* ── Autoplay control bar ── */}
          <div style={{
            background: "#ebebff",
            border: `2px solid ${isPlaying ? day.color : "#d0d0ea"}`,
            borderRadius: 14, padding: "9px 12px", marginBottom: 10,
            display: "flex", alignItems: "center", gap: 10,
            boxShadow: isPlaying ? `0 0 18px ${day.color}44` : "none",
            transition: "all 0.3s",
          }}>
            {/* Play / pause / stop buttons */}
            <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
              {!isPlaying ? (
                <button
                  onClick={startAutoplay}
                  style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: `linear-gradient(135deg,${day.color},${day.color}99)`,
                    border: "none", fontSize: 30, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 4px 14px ${day.color}66`,
                  }}
                >
                  ▶️
                </button>
              ) : (
                <>
                  <button
                    onClick={togglePause}
                    style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: isPaused ? "#FECA57" : "#FF9F43",
                      border: "none", fontSize: 23, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {isPaused ? "▶" : "⏸"}
                  </button>
                  <button
                    onClick={stopPlayback}
                    style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "#FF6B6B", border: "none", fontSize: 23,
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    ⏹
                  </button>
                </>
              )}
            </div>

            {/* Status text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {!isPlaying ? (
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#222", marginBottom: 1 }}>▶ Autoplay</div>
                  <div style={{ fontSize: 15, color: "#888" }}>🇫🇷 → 🇪🇸 → 🇫🇷 por cada sujeto</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: day.color, marginBottom: 1 }}>
                    {isPaused ? "⏸ Pausado" : playPhase}
                  </div>
                  {playRow !== null && (
                    <div style={{ fontSize: 18, color: "#222", fontWeight: 600 }}>
                      <span style={{ color: SUBJECTS[playRow].color }}>
                        {SUBJECTS[playRow].emoji} {SUBJECTS[playRow].french}
                      </span>
                      <span style={{ color: "#888", fontSize: 15, marginLeft: 5 }}>
                        {SUBJECTS[playRow].spanish}
                      </span>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 3, marginTop: 3 }}>
                    {SUBJECTS.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: 5, height: 5, borderRadius: "50%",
                          background: i < (playRow ?? 0) ? day.color : i === playRow ? "#fff" : "#d0d0ea",
                          transition: "background 0.3s",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Row counter */}
            {isPlaying && playRow !== null && (
              <div style={{ fontSize: 15, color: "#888", flexShrink: 0 }}>
                <span style={{ fontSize: 25, fontWeight: 800, color: day.color }}>{playRow + 1}</span>
                <span style={{ color: "#333" }}>/9</span>
              </div>
            )}
          </div>

          {/* ── Week tabs ── */}
          <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 6 }}>
            {[0, 1, 2, 3, 4].map((w) => (
              <button
                key={w}
                onClick={() => setActiveWeek(w)}
                style={{
                  padding: "4px 10px", borderRadius: 20,
                  border: `1.5px solid ${activeWeek === w ? "#667eea" : "#d0d0ea"}`,
                  background: activeWeek === w ? "#667eea" : "transparent",
                  color: activeWeek === w ? "#fff" : "#888",
                  fontSize: 15, fontWeight: 700, cursor: "pointer",
                }}
              >
                S{w + 1}
              </button>
            ))}
          </div>

          {/* ── Day pills ── */}
          <div style={{ display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 }}>
            {daysInWeek.map((d) => (
              <button
                key={d.day}
                onClick={() => { setActiveDayIdx(d.day - 1); setActiveSlot(0); }}
                style={{
                  padding: "4px 8px", borderRadius: 20,
                  border: `1.5px solid ${activeDayIdx === d.day - 1 ? d.color : "#d0d0ea"}`,
                  background: activeDayIdx === d.day - 1 ? `${d.color}22` : "transparent",
                  color: activeDayIdx === d.day - 1 ? d.color : "#888",
                  fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
                }}
              >
                {d.emoji} {d.shortLabel}
              </button>
            ))}
          </div>

          {/* ── Day info card ── */}
          <div style={{
            background: "#f4f4ff",
            border: `1px solid ${day.color}44`,
            borderRadius: 10, padding: "6px 12px", marginBottom: 8,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: day.color }}>
                Día {day.day} · {day.label}
              </span>
              <span style={{ fontSize: 13, color: "#888" }}>🇪🇸 {day.themeEs}</span>
            </div>
            <div style={{ fontSize: 15, color: "#666", fontStyle: "italic" }}>💡 {day.tip}</div>
          </div>

          {/* ── Slot navigator ── */}
          <div style={{ marginBottom: 8 }}>
            <div style={{
              fontSize: 13, color: "#888", letterSpacing: 1,
              textTransform: "uppercase", marginBottom: 4, textAlign: "center",
            }}>
              Práctica {activeSlot + 1} / {day.slots.length}
            </div>
            <div style={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
              {day.slots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlot(i)}
                  style={{
                    width: 21, height: 21, borderRadius: "50%",
                    border: `1.5px solid ${activeSlot === i ? day.color : DARK_CELL_BORDER}`,
                    background: activeSlot === i ? day.color : DARK_CELL_BG,
                    color: activeSlot === i ? "#fff" : "#888",
                    fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.12s",
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* ── Verb + predicate display ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 5, alignItems: "center", marginBottom: 8 }}>
            {/* Verb cell */}
            <div style={{
              background: `${day.color}18`,
              border: `1.5px solid ${day.color}55`,
              borderRadius: 10, padding: "7px 8px", textAlign: "center",
            }}>
              <div style={{ fontSize: 13, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 1 }}>
                🔵 Verbe
              </div>
              <div style={{ fontSize: 13, marginBottom: 1 }}>{slotVM.emoji}</div>
              <div style={{ fontSize: 25, fontWeight: 800, color: day.color, lineHeight: 1 }}>{slot.inf}</div>
              <div style={{ fontSize: 13, color: ES_LABEL_COLOR, marginTop: 1 }}>🇪🇸 {slotVM.es}</div>
            </div>

            <div style={{ fontSize: 23, color: "#333", textAlign: "center" }}>+</div>

            {/* Predicate cell */}
            <div style={{
              background: `${PRED_COLOR}22`,
              border: `1.5px solid ${PRED_COLOR}55`,
              borderRadius: 10, padding: "7px 8px", textAlign: "center",
            }}>
              <div style={{ fontSize: 13, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 1 }}>
                📝 Predicado
              </div>
              <div style={{ fontSize: 13, marginBottom: 1 }}>{pred.emoji}</div>
              <div style={{ fontSize: 25, fontWeight: 800, color: PRED_COLOR, lineHeight: 1 }}>{pred.fr}</div>
              <div style={{ fontSize: 13, color: ES_LABEL_COLOR, marginTop: 1 }}>🇪🇸 {pred.es}</div>
            </div>
          </div>

          {/* ── Column headers ── */}
          <div style={{ display: "grid", gridTemplateColumns: "20px 1fr 1fr 1fr", gap: 4, marginBottom: 3 }}>
            {["", "🧑 Sujeto", "🔵 Verbo", "📝 Predicado"].map((h, i) => (
              <div key={i} style={{
                fontSize: 11, color: "#888", letterSpacing: 1,
                textTransform: "uppercase", fontWeight: 700, padding: "0 3px",
              }}>
                {h}
              </div>
            ))}
          </div>

          {/* ── Conjugation rows ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {SUBJECTS.map((subject, idx) => {
              const isActive = highlightedRow === idx;
              const isNow    = isPlaying && playRow === idx;
              const predFR   = frForm(pred, idx);
              const predES   = esForm(pred, idx);

              return (
                <div
                  key={idx}
                  onClick={() => tapRow(idx)}
                  style={{
                    display: "grid", gridTemplateColumns: "20px 1fr 1fr 1fr",
                    gap: 3, alignItems: "stretch",
                    cursor: isPlaying ? "default" : "pointer",
                    userSelect: "none", WebkitTapHighlightColor: "transparent",
                    opacity: isPlaying && !isActive ? 0.4 : 1,
                    transition: "opacity 0.3s",
                  }}
                >
                  {/* Emoji column */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                    {isNow
                      ? <span style={{ animation: "bounce 0.4s infinite alternate" }}>{subject.emoji}</span>
                      : subject.emoji
                    }
                  </div>

                  {/* Subject cell */}
                  <div style={{
                    background: isActive ? `${subject.color}28` : DARK_CELL_BG,
                    border: `1.5px solid ${isActive ? subject.color : DARK_CELL_BORDER}`,
                    borderRadius: 6, padding: "5px 6px", transition: "all 0.2s",
                    boxShadow: isActive ? `0 0 10px ${subject.color}44` : "none",
                  }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: subject.color, lineHeight: 1 }}>
                      {subject.french}
                    </div>
                    <div style={{ fontSize: 11, color: ES_LABEL_COLOR, marginTop: 1, fontWeight: 600 }}>
                      🇪🇸 {subject.spanish}
                    </div>
                  </div>

                  {/* Verb conjugation cell */}
                  <div style={{
                    background: isActive ? `${day.color}28` : DARK_CELL_BG,
                    border: `1.5px solid ${isActive ? day.color : DARK_CELL_BORDER}`,
                    borderRadius: 6, padding: "5px 6px", transition: "all 0.2s",
                    boxShadow: isActive ? `0 0 10px ${day.color}44` : "none",
                  }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: day.color, lineHeight: 1 }}>
                      {slot.conj[idx]}
                    </div>
                    <div style={{ fontSize: 11, color: ES_LABEL_COLOR, marginTop: 1, fontWeight: 600 }}>
                      🇪🇸 {slot.conjEs[idx]}
                    </div>
                    {isNow && <div style={{ fontSize: 11, marginTop: 1 }}>🔊</div>}
                  </div>

                  {/* Predicate cell */}
                  <div style={{
                    background: isActive ? `${PRED_COLOR}28` : DARK_CELL_BG,
                    border: `1.5px solid ${isActive ? PRED_COLOR : DARK_CELL_BORDER}`,
                    borderRadius: 6, padding: "5px 6px", transition: "all 0.2s",
                    boxShadow: isActive ? `0 0 10px ${PRED_COLOR}44` : "none",
                  }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: PRED_COLOR, lineHeight: 1 }}>
                      {predFR}
                    </div>
                    <div style={{ fontSize: 11, color: ES_LABEL_COLOR, marginTop: 1, fontWeight: 600 }}>
                      🇪🇸 {predES}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Playing status card ── */}
          {isPlaying && (
            <div style={{
              marginTop: 10, textAlign: "center", padding: "7px 12px",
              background: "#ebebff", borderRadius: 10, border: "1px solid #d0d0ea",
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: day.color, marginBottom: 3 }}>
                {playPhase}
              </div>
              {playRow !== null && (
                <>
                  <div style={{ fontSize: 22, color: "#222", fontWeight: 700, marginBottom: 2 }}>
                    🇫🇷 {buildFR(playRow)}
                  </div>
                  <div style={{ fontSize: 20, color: ES_LABEL_COLOR }}>
                    🇪🇸 {buildES(playRow)}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── Full sentence list ── */}
          <div style={{
            marginTop: 8, background: "#f4f4ff",
            border: "1px solid #d0d0ea", borderRadius: 10, padding: "7px 11px",
          }}>
            <div style={{
              fontSize: 11, color: "#888", letterSpacing: 1,
              textTransform: "uppercase", marginBottom: 4,
            }}>
              📖 Oraciones completas
            </div>
            {SUBJECTS.map((subject, idx) => {
              const predFR = frForm(pred, idx);
              const predES = esForm(pred, idx);
              const isHl   = highlightedRow === idx;
              return (
                <div
                  key={idx}
                  onClick={() => tapRow(idx)}
                  style={{
                    fontSize: 17, marginBottom: 3, lineHeight: 1.5,
                    cursor: isPlaying ? "default" : "pointer",
                    display: "flex", gap: 5, alignItems: "baseline",
                    opacity: isPlaying && !isHl ? 0.3 : 1,
                    transition: "opacity 0.3s",
                  }}
                >
                  <span style={{ color: subject.color, fontWeight: 700, minWidth: 30 }}>
                    {subject.french}
                  </span>
                  <span style={{ color: day.color, fontWeight: 700 }}>
                    {slot.conj[idx]}
                  </span>
                  <span style={{ color: PRED_COLOR, fontWeight: 700 }}>
                    {predFR}
                  </span>
                  <span style={{ color: "#999", fontSize: 11, marginLeft: 2 }}>
                    🇪🇸 {subject.spanish} {slot.conjEs[idx]} {predES}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Footer hint ── */}
      <div style={{ textAlign: "center", marginTop: 16, fontSize: 15, color: "#aaa" }}>
        {isPlaying ? `🔊 ${playPhase}` : "toca para escuchar · ▶ para autoplay"}
      </div>

      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes pulse  { from { opacity: .4 } to { opacity: 1 } }
        @keyframes bounce { from { transform: translateY(0) } to { transform: translateY(-4px) } }
      `}</style>
    </div>
  );
}
