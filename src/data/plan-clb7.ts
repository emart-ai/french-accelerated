import type { DayPlan, TaskDef } from "./plan-clb5";

const vocabTitles: { es: string; fr: string }[] = [
  { es: "Supervivencia", fr: "Survie" },
  { es: "Comida y Casa", fr: "Nourriture et Maison" },
  { es: "Cuerpo y Ropa", fr: "Corps et Vêtements" },
  { es: "Mundo y Viajes", fr: "Monde et Voyages" },
  { es: "Trabajo y Estudio", fr: "Travail et Études" },
  { es: "Gente y Sociedad", fr: "Gens et Société" },
  { es: "Verbos y Adjetivos", fr: "Verbes et Adjectifs" },
];

function vt(d: number) {
  return vocabTitles[d % 7];
}

function buildMonth1(): DayPlan[] {
  const days: DayPlan[] = [];

  // Days 0-6: Learn all words (clb5+clb7) by vocab day
  for (let i = 0; i < 7; i++) {
    const t = vt(i);
    days.push({
      dayIndex: i,
      title: t,
      week: 1,
      am: {
        type: "flashcards",
        label: { es: `📚 Aprender: ${t.es}`, fr: `Apprendre : ${t.fr}` },
        vocabDay: i,
      },
      pm: {
        type: "quiz",
        label: { es: `🧠 Quiz Día ${i + 1}`, fr: `Quiz Jour ${i + 1}` },
        vocabDay: i,
      },
    });
  }

  // Days 7-13: Review cycle
  for (let i = 0; i < 7; i++) {
    const t = vt(i);
    days.push({
      dayIndex: 7 + i,
      title: { es: `Repaso: ${t.es}`, fr: `Révision : ${t.fr}` },
      week: 1,
      am: {
        type: "flashcards",
        label: { es: `📚 Repasar: ${t.es}`, fr: `Réviser : ${t.fr}` },
        vocabDay: i,
      },
      pm: {
        type: "quiz",
        label: { es: `🧠 Quiz: ${t.es}`, fr: `Quiz : ${t.fr}` },
        vocabDay: i,
      },
    });
  }

  // Days 14-20: Mixed review — 2 combined vocab days quiz AM, listening PM
  for (let i = 0; i < 7; i++) {
    const d1 = i % 7;
    const d2 = (i + 1) % 7;
    days.push({
      dayIndex: 14 + i,
      title: {
        es: `Mixto: ${vt(d1).es} + ${vt(d2).es}`,
        fr: `Mixte : ${vt(d1).fr} + ${vt(d2).fr}`,
      },
      week: 1,
      am: {
        type: "quiz",
        label: {
          es: `🧠 Quiz Mixto: ${vt(d1).es} + ${vt(d2).es}`,
          fr: `Quiz Mixte : ${vt(d1).fr} + ${vt(d2).fr}`,
        },
        vocabDay: d1,
      },
      pm: {
        type: "listening",
        label: { es: "👂 Escucha Guiada", fr: "Écoute Guidée" },
      },
    });
  }

  // Days 21-27: Intensive review — random mix AM, speaking PM
  for (let i = 0; i < 7; i++) {
    days.push({
      dayIndex: 21 + i,
      title: {
        es: "Repaso Intensivo",
        fr: "Révision Intensive",
      },
      week: 1,
      am: {
        type: "quiz-total",
        label: {
          es: "🧠 Quiz Aleatorio (30 palabras)",
          fr: "Quiz Aléatoire (30 mots)",
        },
      },
      pm: {
        type: "free-practice",
        label: {
          es: "🗣️ Describe cosas con palabras aprendidas",
          fr: "Décrivez des choses avec les mots appris",
        },
      },
    });
  }

  // Days 28-29: Assessment
  days.push({
    dayIndex: 28,
    title: { es: "Evaluación Mes 1 (A)", fr: "Évaluation Mois 1 (A)" },
    week: 1,
    am: {
      type: "quiz-total",
      label: { es: "🧠 Quiz Total — meta 85%+", fr: "Quiz Total — objectif 85%+" },
    },
    pm: {
      type: "review",
      label: {
        es: "📚 Identifica categorías débiles",
        fr: "Identifiez les catégories faibles",
      },
    },
  });
  days.push({
    dayIndex: 29,
    title: { es: "Evaluación Mes 1 (B)", fr: "Évaluation Mois 1 (B)" },
    week: 1,
    am: {
      type: "quiz-total",
      label: { es: "🧠 Quiz Total — confirma 85%+", fr: "Quiz Total — confirmez 85%+" },
    },
    pm: {
      type: "listening",
      label: {
        es: "👂 Escucha activa con shadowing",
        fr: "Écoute active avec shadowing",
      },
    },
  });

  return days;
}

function buildMonth2(): DayPlan[] {
  const days: DayPlan[] = [];

  // Days 30-36: Listening slow → normal
  for (let i = 0; i < 7; i++) {
    days.push({
      dayIndex: 30 + i,
      title: { es: "Escucha Progresiva", fr: "Écoute Progressive" },
      week: 2,
      am: {
        type: "listening",
        label: { es: "👂 Escucha (velocidad creciente)", fr: "Écoute (vitesse croissante)" },
      },
      pm: {
        type: "quiz",
        label: { es: `🧠 Quiz Repaso: ${vt(i).es}`, fr: `Quiz Révision : ${vt(i).fr}` },
        vocabDay: i,
      },
    });
  }

  // Days 37-43: Reading practice
  for (let i = 0; i < 7; i++) {
    days.push({
      dayIndex: 37 + i,
      title: { es: "Lectura TEF", fr: "Lecture TEF" },
      week: 2,
      am: {
        type: "review",
        label: { es: "📖 Lectura: consejos + ejercicios", fr: "Lecture : conseils + exercices" },
      },
      pm: {
        type: "quiz",
        label: { es: `🧠 Quiz: ${vt(i).es}`, fr: `Quiz : ${vt(i).fr}` },
        vocabDay: i,
      },
    });
  }

  // Days 44-50: Listening natural speed + shadowing
  for (let i = 0; i < 7; i++) {
    days.push({
      dayIndex: 44 + i,
      title: { es: "Escucha + Shadowing", fr: "Écoute + Shadowing" },
      week: 2,
      am: {
        type: "listening",
        label: { es: "👂 Escucha + Shadowing", fr: "Écoute + Shadowing" },
      },
      pm: {
        type: "quiz",
        label: { es: `🧠 Quiz: ${vt(i).es}`, fr: `Quiz : ${vt(i).fr}` },
        vocabDay: i,
      },
    });
  }

  // Days 51-57: Mixed comprehension
  for (let i = 0; i < 7; i++) {
    const isListening = i % 2 === 0;
    days.push({
      dayIndex: 51 + i,
      title: {
        es: isListening ? "Comprensión Auditiva" : "Comprensión Lectora",
        fr: isListening ? "Compréhension Orale" : "Compréhension Écrite",
      },
      week: 2,
      am: {
        type: isListening ? "listening" : "review",
        label: isListening
          ? { es: "👂 Escucha Mixta", fr: "Écoute Mixte" }
          : { es: "📖 Lectura Mixta", fr: "Lecture Mixte" },
      },
      pm: {
        type: "quiz-total",
        label: { es: "🧠 Quiz Total", fr: "Quiz Total" },
      },
    });
  }

  // Days 58-59: Assessment
  days.push({
    dayIndex: 58,
    title: { es: "Evaluación Comprensión (A)", fr: "Évaluation Compréhension (A)" },
    week: 2,
    am: {
      type: "listening",
      label: { es: "👂 Simulacro Escucha", fr: "Simulation Écoute" },
    },
    pm: {
      type: "quiz-total",
      label: { es: "🧠 Quiz Total — meta 90%+", fr: "Quiz Total — objectif 90%+" },
    },
  });
  days.push({
    dayIndex: 59,
    title: { es: "Evaluación Comprensión (B)", fr: "Évaluation Compréhension (B)" },
    week: 2,
    am: {
      type: "review",
      label: { es: "📖 Simulacro Lectura", fr: "Simulation Lecture" },
    },
    pm: {
      type: "quiz-total",
      label: { es: "🧠 Quiz Total — confirma 90%+", fr: "Quiz Total — confirmez 90%+" },
    },
  });

  return days;
}

function buildMonth3(): DayPlan[] {
  const days: DayPlan[] = [];
  const taskTypes: [TaskDef["type"], { es: string; fr: string }][] = [
    ["write-email", { es: "✍️ Email", fr: "Courriel" }],
    ["write-opinion", { es: "📝 Opinión", fr: "Opinion" }],
    ["speaking-a", { es: "🗣️ Oral A", fr: "Oral A" }],
    ["speaking-b", { es: "💬 Oral B", fr: "Oral B" }],
  ];

  // Days 60-64: Email writing
  for (let i = 0; i < 5; i++) {
    days.push({
      dayIndex: 60 + i,
      title: { es: `Email Formal ${i + 1}`, fr: `Courriel Formel ${i + 1}` },
      week: 3,
      am: {
        type: "write-email",
        label: { es: `✍️ Email: Escenario ${i + 1}`, fr: `Courriel : Scénario ${i + 1}` },
      },
      pm: {
        type: "quiz",
        label: { es: `🧠 Quiz: ${vt(i % 7).es}`, fr: `Quiz : ${vt(i % 7).fr}` },
        vocabDay: i % 7,
      },
    });
  }

  // Days 65-69: Opinion essay
  for (let i = 0; i < 5; i++) {
    days.push({
      dayIndex: 65 + i,
      title: { es: `Ensayo de Opinión ${i + 1}`, fr: `Essai d'Opinion ${i + 1}` },
      week: 3,
      am: {
        type: "write-opinion",
        label: { es: `📝 Opinión: Tema ${i + 1}`, fr: `Opinion : Thème ${i + 1}` },
      },
      pm: {
        type: "quiz",
        label: { es: `🧠 Quiz: ${vt((i + 5) % 7).es}`, fr: `Quiz : ${vt((i + 5) % 7).fr}` },
        vocabDay: (i + 5) % 7,
      },
    });
  }

  // Days 70-74: Speaking Task A
  for (let i = 0; i < 5; i++) {
    days.push({
      dayIndex: 70 + i,
      title: { es: `Oral A: Escenario ${i + 1}`, fr: `Oral A : Scénario ${i + 1}` },
      week: 3,
      am: {
        type: "speaking-a",
        label: { es: `🗣️ Oral A: Escenario ${i + 1}`, fr: `Oral A : Scénario ${i + 1}` },
      },
      pm: {
        type: "listening",
        label: { es: "👂 Escucha + Shadowing", fr: "Écoute + Shadowing" },
      },
    });
  }

  // Days 75-79: Speaking Task B
  for (let i = 0; i < 5; i++) {
    days.push({
      dayIndex: 75 + i,
      title: { es: `Oral B: Escenario ${i + 1}`, fr: `Oral B : Scénario ${i + 1}` },
      week: 3,
      am: {
        type: "speaking-b",
        label: { es: `💬 Oral B: Escenario ${i + 1}`, fr: `Oral B : Scénario ${i + 1}` },
      },
      pm: {
        type: "listening",
        label: { es: "👂 Escucha + Shadowing", fr: "Écoute + Shadowing" },
      },
    });
  }

  // Days 80-84: Mixed expression
  for (let i = 0; i < 5; i++) {
    const isWriting = i % 2 === 0;
    days.push({
      dayIndex: 80 + i,
      title: {
        es: isWriting ? "Escritura Mixta" : "Oral Mixto",
        fr: isWriting ? "Écriture Mixte" : "Oral Mixte",
      },
      week: 3,
      am: {
        type: isWriting ? "write-email" : "speaking-a",
        label: isWriting
          ? { es: "✍️ Escritura Mixta", fr: "Écriture Mixte" }
          : { es: "🗣️ Oral Mixto", fr: "Oral Mixte" },
      },
      pm: {
        type: isWriting ? "write-opinion" : "speaking-b",
        label: isWriting
          ? { es: "📝 Opinión Mixta", fr: "Opinion Mixte" }
          : { es: "💬 Oral B Mixto", fr: "Oral B Mixte" },
      },
    });
  }

  // Days 85-87: Timed expression
  for (let i = 0; i < 3; i++) {
    const tasks: [string, TaskDef["type"], TaskDef["type"]][] = [
      ["Email + Opinión", "write-email", "write-opinion"],
      ["Oral A + B", "speaking-a", "speaking-b"],
      ["Mixto Completo", "write-email", "speaking-a"],
    ];
    const [title, amType, pmType] = tasks[i];
    days.push({
      dayIndex: 85 + i,
      title: { es: `Cronometrado: ${title}`, fr: `Chronométré : ${title}` },
      week: 3,
      am: {
        type: amType,
        label: {
          es: `⏱️ ${title} cronometrado (AM)`,
          fr: `${title} chronométré (AM)`,
        },
      },
      pm: {
        type: pmType,
        label: {
          es: `⏱️ ${title} cronometrado (PM)`,
          fr: `${title} chronométré (PM)`,
        },
      },
    });
  }

  // Days 88-89: Assessment
  days.push({
    dayIndex: 88,
    title: { es: "Evaluación Expresión (A)", fr: "Évaluation Expression (A)" },
    week: 3,
    am: {
      type: "write-email",
      label: { es: "✍️ Simulacro Escritura", fr: "Simulation Écriture" },
    },
    pm: {
      type: "write-opinion",
      label: { es: "📝 Simulacro Opinión", fr: "Simulation Opinion" },
    },
  });
  days.push({
    dayIndex: 89,
    title: { es: "Evaluación Expresión (B)", fr: "Évaluation Expression (B)" },
    week: 3,
    am: {
      type: "speaking-a",
      label: { es: "🗣️ Simulacro Oral A", fr: "Simulation Orale A" },
    },
    pm: {
      type: "speaking-b",
      label: { es: "💬 Simulacro Oral B", fr: "Simulation Orale B" },
    },
  });

  return days;
}

function buildMonth4(): DayPlan[] {
  const days: DayPlan[] = [];

  // Days 90-96: Reading mocks
  for (let i = 0; i < 7; i++) {
    days.push({
      dayIndex: 90 + i,
      title: { es: `Simulacro Lectura ${i + 1}`, fr: `Simulation Lecture ${i + 1}` },
      week: 4,
      am: {
        type: "quiz-total",
        label: { es: `📖 Simulacro Lectura ${i + 1}`, fr: `Simulation Lecture ${i + 1}` },
      },
      pm: {
        type: "review",
        label: {
          es: "📚 Revisa respuestas incorrectas",
          fr: "Révisez les réponses incorrectes",
        },
      },
    });
  }

  // Days 97-103: Listening mocks
  for (let i = 0; i < 7; i++) {
    days.push({
      dayIndex: 97 + i,
      title: { es: `Simulacro Escucha ${i + 1}`, fr: `Simulation Écoute ${i + 1}` },
      week: 4,
      am: {
        type: "listening",
        label: { es: `👂 Simulacro Escucha ${i + 1}`, fr: `Simulation Écoute ${i + 1}` },
      },
      pm: {
        type: "quiz",
        label: { es: "🧠 Quiz: analiza errores", fr: "Quiz : analysez les erreurs" },
        vocabDay: i % 7,
      },
    });
  }

  // Days 104-110: Writing mocks
  for (let i = 0; i < 7; i++) {
    days.push({
      dayIndex: 104 + i,
      title: { es: `Simulacro Escritura ${i + 1}`, fr: `Simulation Écriture ${i + 1}` },
      week: 4,
      am: {
        type: "write-email",
        label: { es: `✍️ Email Simulacro ${i + 1}`, fr: `Courriel Simulation ${i + 1}` },
      },
      pm: {
        type: "write-opinion",
        label: { es: `📝 Opinión Simulacro ${i + 1}`, fr: `Opinion Simulation ${i + 1}` },
      },
    });
  }

  // Days 111-117: Speaking mocks
  for (let i = 0; i < 7; i++) {
    days.push({
      dayIndex: 111 + i,
      title: { es: `Simulacro Oral ${i + 1}`, fr: `Simulation Orale ${i + 1}` },
      week: 4,
      am: {
        type: "speaking-a",
        label: { es: `🗣️ Oral A Simulacro ${i + 1}`, fr: `Oral A Simulation ${i + 1}` },
      },
      pm: {
        type: "speaking-b",
        label: { es: `💬 Oral B Simulacro ${i + 1}`, fr: `Oral B Simulation ${i + 1}` },
      },
    });
  }

  // Days 118-119: Full mock TEF
  days.push({
    dayIndex: 118,
    title: { es: "TEF Simulacro Completo (A)", fr: "TEF Simulation Complète (A)" },
    week: 4,
    am: {
      type: "quiz-total",
      label: { es: "📖 TEF Lectura + Escucha", fr: "TEF Lecture + Écoute" },
    },
    pm: {
      type: "write-email",
      label: { es: "✍️ TEF Escritura", fr: "TEF Écriture" },
    },
  });
  days.push({
    dayIndex: 119,
    title: { es: "TEF Simulacro Completo (B)", fr: "TEF Simulation Complète (B)" },
    week: 4,
    am: {
      type: "speaking-a",
      label: { es: "🗣️ TEF Oral A + B", fr: "TEF Oral A + B" },
    },
    pm: {
      type: "quiz-total",
      label: { es: "🧠 Autoevaluación Total", fr: "Auto-évaluation Totale" },
    },
  });

  return days;
}

function buildMonth5(): DayPlan[] {
  const days: DayPlan[] = [];
  const sectionTypes: [TaskDef["type"], { es: string; fr: string }][] = [
    ["quiz-total", { es: "Lectura", fr: "Lecture" }],
    ["listening", { es: "Escucha", fr: "Écoute" }],
    ["write-email", { es: "Escritura", fr: "Écriture" }],
    ["speaking-a", { es: "Oral", fr: "Oral" }],
  ];

  // Days 120-129: Weak spot intensive
  for (let i = 0; i < 10; i++) {
    const [type, name] = sectionTypes[i % 4];
    days.push({
      dayIndex: 120 + i,
      title: { es: `Refuerzo: ${name.es}`, fr: `Renforcement : ${name.fr}` },
      week: 5,
      am: {
        type,
        label: {
          es: `🔧 Refuerzo: ${name.es}`,
          fr: `Renforcement : ${name.fr}`,
        },
      },
      pm: {
        type: "quiz-total",
        label: { es: "🧠 Quiz Total", fr: "Quiz Total" },
      },
    });
  }

  // Days 130-139: Full simulation mode
  for (let i = 0; i < 10; i++) {
    const isMock = i % 3 !== 2; // 2 mocks per 3 days
    if (isMock) {
      const isA = i % 2 === 0;
      days.push({
        dayIndex: 130 + i,
        title: {
          es: `TEF Simulacro ${Math.floor(i / 2) + 1}${isA ? "A" : "B"}`,
          fr: `TEF Simulation ${Math.floor(i / 2) + 1}${isA ? "A" : "B"}`,
        },
        week: 5,
        am: {
          type: isA ? "quiz-total" : "speaking-a",
          label: isA
            ? { es: "📖 Simulacro Comprensión", fr: "Simulation Compréhension" }
            : { es: "🗣️ Simulacro Oral", fr: "Simulation Orale" },
        },
        pm: {
          type: isA ? "write-email" : "speaking-b",
          label: isA
            ? { es: "✍️ Simulacro Escritura", fr: "Simulation Écriture" }
            : { es: "💬 Simulacro Oral B", fr: "Simulation Orale B" },
        },
      });
    } else {
      days.push({
        dayIndex: 130 + i,
        title: { es: "Revisión de Simulacros", fr: "Révision des Simulations" },
        week: 5,
        am: {
          type: "review",
          label: { es: "📚 Analiza errores", fr: "Analysez les erreurs" },
        },
        pm: {
          type: "quiz-total",
          label: { es: "🧠 Quiz: palabras difíciles", fr: "Quiz : mots difficiles" },
        },
      });
    }
  }

  // Days 140-147: Final push
  for (let i = 0; i < 8; i++) {
    const [type, name] = sectionTypes[i % 4];
    days.push({
      dayIndex: 140 + i,
      title: { es: `Sprint Final: ${name.es}`, fr: `Sprint Final : ${name.fr}` },
      week: 5,
      am: {
        type: i < 4 ? "flashcards" : type,
        label: i < 4
          ? { es: `📚 Repaso: ${vt(i).es}`, fr: `Révision : ${vt(i).fr}` }
          : { es: `🔧 Pulir: ${name.es}`, fr: `Polir : ${name.fr}` },
        vocabDay: i < 4 ? i : undefined,
      },
      pm: {
        type: i < 4 ? type : "quiz-total",
        label: i < 4
          ? { es: `🔧 Pulir: ${name.es}`, fr: `Polir : ${name.fr}` }
          : { es: "🧠 Quiz Total", fr: "Quiz Total" },
      },
    });
  }

  // Day 148: Dress rehearsal
  days.push({
    dayIndex: 148,
    title: { es: "Ensayo General", fr: "Répétition Générale" },
    week: 5,
    am: {
      type: "quiz-total",
      label: {
        es: "📖 TEF Completo: Lectura + Escucha",
        fr: "TEF Complet : Lecture + Écoute",
      },
    },
    pm: {
      type: "speaking-a",
      label: {
        es: "🗣️ TEF Completo: Escritura + Oral",
        fr: "TEF Complet : Écriture + Oral",
      },
    },
  });

  // Day 149: Celebration
  days.push({
    dayIndex: 149,
    title: { es: "¡Repos Actif! 🎉", fr: "Repos Actif ! 🎉" },
    week: 5,
    am: {
      type: "review",
      label: {
        es: "📚 Repaso ligero de favoritos",
        fr: "Révision légère des favoris",
      },
    },
    pm: {
      type: "free-practice",
      label: {
        es: "🍿 Película francesa — ¡Estás listo para NCLC 7!",
        fr: "Film français — Vous êtes prêt pour le NCLC 7 !",
      },
    },
  });

  return days;
}

export const clb7Plan: DayPlan[] = [
  ...buildMonth1(),
  ...buildMonth2(),
  ...buildMonth3(),
  ...buildMonth4(),
  ...buildMonth5(),
];

export const monthTitles = [
  { es: "M1: Vocabulario Completo", fr: "M1 : Vocabulaire Complet" },
  { es: "M2: Comprensión Avanzada", fr: "M2 : Compréhension Avancée" },
  { es: "M3: Expresión", fr: "M3 : Expression" },
  { es: "M4: Práctica TEF", fr: "M4 : Pratique TEF" },
  { es: "M5: Refinamiento Final", fr: "M5 : Raffinement Final" },
];
