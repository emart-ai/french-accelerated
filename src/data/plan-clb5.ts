export interface DayPlan {
  dayIndex: number;
  title: { es: string; fr: string };
  week: number;
  am: TaskDef;
  pm: TaskDef;
}

export interface TaskDef {
  type:
    | "flashcards"
    | "quiz"
    | "quiz-total"
    | "listening"
    | "speaking-a"
    | "speaking-b"
    | "write-email"
    | "write-opinion"
    | "free-practice"
    | "review";
  label: { es: string; fr: string };
  vocabDay?: number; // 0-6, which vocab day's words to use
  description?: { es: string; fr: string };
}

function vocabDayTitle(day: number): { es: string; fr: string } {
  const titles: { es: string; fr: string }[] = [
    { es: "Supervivencia", fr: "Survie" },
    { es: "Comida y Casa", fr: "Nourriture et Maison" },
    { es: "Cuerpo y Ropa", fr: "Corps et Vêtements" },
    { es: "Mundo y Viajes", fr: "Monde et Voyages" },
    { es: "Trabajo y Estudio", fr: "Travail et Études" },
    { es: "Gente y Sociedad", fr: "Gens et Société" },
    { es: "Verbos y Adjetivos", fr: "Verbes et Adjectifs" },
  ];
  return titles[day];
}

// Week 1: Sprint de Vocabulario (Days 0-6)
const week1: DayPlan[] = Array.from({ length: 7 }, (_, i) => {
  const t = vocabDayTitle(i);
  return {
    dayIndex: i,
    title: { es: `${t.es}`, fr: `${t.fr}` },
    week: 1,
    am: {
      type: "flashcards" as const,
      label: {
        es: `📚 Aprender: ${t.es}`,
        fr: `Apprendre : ${t.fr}`,
      },
      vocabDay: i,
    },
    pm:
      i < 6
        ? {
            type: "quiz" as const,
            label: {
              es: `🧠 Quiz Día ${i + 1} — meta 70%+`,
              fr: `Quiz Jour ${i + 1} — objectif 70%+`,
            },
            vocabDay: i,
          }
        : {
            type: "quiz-total" as const,
            label: {
              es: "🧠 Quiz Total — meta 80%+",
              fr: "Quiz Total — objectif 80%+",
            },
          },
  };
});

// Week 2: Comprensión (Days 7-13)
const week2: DayPlan[] = Array.from({ length: 7 }, (_, i) => {
  const dayIndex = 7 + i;
  const vocabDay = i % 7;
  const t = vocabDayTitle(vocabDay);
  return {
    dayIndex,
    title: {
      es: `Comprensión: ${t.es}`,
      fr: `Compréhension : ${t.fr}`,
    },
    week: 2,
    am: {
      type: "listening" as const,
      label: {
        es: "👂 Escucha Guiada",
        fr: "Écoute Guidée",
      },
      description: {
        es: "Practica escucha con los recursos recomendados",
        fr: "Pratiquez l'écoute avec les ressources recommandées",
      },
    },
    pm:
      i < 6
        ? {
            type: "quiz" as const,
            label: {
              es: `🧠 Quiz Repaso: ${t.es}`,
              fr: `Quiz Révision : ${t.fr}`,
            },
            vocabDay,
          }
        : {
            type: "quiz-total" as const,
            label: {
              es: "🧠 Quiz Total — meta 85%+",
              fr: "Quiz Total — objectif 85%+",
            },
          },
  };
});

// Week 3: Expresión (Days 14-20)
const week3: DayPlan[] = [
  {
    dayIndex: 14,
    title: { es: "Email Formal", fr: "Courriel Formel" },
    week: 3,
    am: {
      type: "write-email",
      label: { es: "✍️ Plantilla de Email", fr: "Modèle de Courriel" },
    },
    pm: {
      type: "listening",
      label: { es: "👂 Escucha Guiada", fr: "Écoute Guidée" },
    },
  },
  {
    dayIndex: 15,
    title: { es: "Ensayo de Opinión", fr: "Essai d'Opinion" },
    week: 3,
    am: {
      type: "write-opinion",
      label: {
        es: "📝 Plantilla de Opinión",
        fr: "Modèle d'Opinion",
      },
    },
    pm: {
      type: "quiz",
      label: { es: "🧠 Quiz Repaso", fr: "Quiz Révision" },
      vocabDay: 0,
    },
  },
  {
    dayIndex: 16,
    title: { es: "Oral A: Pedir Info", fr: "Oral A : Demander des Infos" },
    week: 3,
    am: {
      type: "speaking-a",
      label: {
        es: "🗣️ Oral A: Pedir Información",
        fr: "Oral A : Demander des Informations",
      },
    },
    pm: {
      type: "write-email",
      label: { es: "✍️ Práctica Email", fr: "Pratique Courriel" },
    },
  },
  {
    dayIndex: 17,
    title: { es: "Oral B: Persuasión", fr: "Oral B : Persuasion" },
    week: 3,
    am: {
      type: "speaking-b",
      label: {
        es: "💬 Oral B: Persuasión",
        fr: "Oral B : Persuasion",
      },
    },
    pm: {
      type: "write-opinion",
      label: { es: "📝 Práctica Opinión", fr: "Pratique Opinion" },
    },
  },
  {
    dayIndex: 18,
    title: {
      es: "Oral A+B: Nuevos Escenarios",
      fr: "Oral A+B : Nouveaux Scénarios",
    },
    week: 3,
    am: {
      type: "speaking-a",
      label: { es: "🗣️ Oral A: Nuevo Escenario", fr: "Oral A : Nouveau Scénario" },
    },
    pm: {
      type: "speaking-b",
      label: { es: "💬 Oral B: Nuevo Escenario", fr: "Oral B : Nouveau Scénario" },
    },
  },
  {
    dayIndex: 19,
    title: { es: "Quiz + Habla Libre", fr: "Quiz + Parole Libre" },
    week: 3,
    am: {
      type: "quiz-total",
      label: {
        es: "🧠 Quiz Total — busca debilidades",
        fr: "Quiz Total — trouvez vos faiblesses",
      },
    },
    pm: {
      type: "free-practice",
      label: {
        es: "🗣️ Habla libre 3 min en francés",
        fr: "Parole libre 3 min en français",
      },
    },
  },
  {
    dayIndex: 20,
    title: { es: "Ensayo + Simulacro Oral", fr: "Essai + Simulation Orale" },
    week: 3,
    am: {
      type: "write-opinion",
      label: {
        es: "📝 Ensayo cronometrado (sin diccionario)",
        fr: "Essai chronométré (sans dictionnaire)",
      },
    },
    pm: {
      type: "speaking-a",
      label: {
        es: "🗣️ Simulacro Oral A + B",
        fr: "Simulation Orale A + B",
      },
    },
  },
];

// Week 4: Simulación (Days 21-27)
const week4: DayPlan[] = [
  {
    dayIndex: 21,
    title: { es: "Simulacro Lectura", fr: "Simulation Lecture" },
    week: 4,
    am: {
      type: "quiz-total",
      label: {
        es: "🧠 Quiz Extendido (simulacro lectura)",
        fr: "Quiz Étendu (simulation lecture)",
      },
    },
    pm: {
      type: "review",
      label: {
        es: "📚 Repaso: palabras más difíciles",
        fr: "Révision : mots les plus difficiles",
      },
    },
  },
  {
    dayIndex: 22,
    title: { es: "Simulacro Escucha", fr: "Simulation Écoute" },
    week: 4,
    am: {
      type: "listening",
      label: {
        es: "👂 Simulacro de Escucha",
        fr: "Simulation d'Écoute",
      },
    },
    pm: {
      type: "quiz",
      label: {
        es: "🧠 Quiz: palabras falladas",
        fr: "Quiz : mots échoués",
      },
      vocabDay: 6,
    },
  },
  {
    dayIndex: 23,
    title: { es: "Simulacro Escritura", fr: "Simulation Écriture" },
    week: 4,
    am: {
      type: "write-email",
      label: {
        es: "✍️ Email cronometrado (20 min)",
        fr: "Courriel chronométré (20 min)",
      },
    },
    pm: {
      type: "write-opinion",
      label: {
        es: "📝 Opinión cronometrada (25 min)",
        fr: "Opinion chronométrée (25 min)",
      },
    },
  },
  {
    dayIndex: 24,
    title: { es: "Simulacro Oral", fr: "Simulation Orale" },
    week: 4,
    am: {
      type: "speaking-a",
      label: {
        es: "🗣️ Simulacro Oral A",
        fr: "Simulation Orale A",
      },
    },
    pm: {
      type: "speaking-b",
      label: {
        es: "💬 Simulacro Oral B",
        fr: "Simulation Orale B",
      },
    },
  },
  {
    dayIndex: 25,
    title: { es: "Quiz + Shadowing", fr: "Quiz + Shadowing" },
    week: 4,
    am: {
      type: "quiz-total",
      label: {
        es: "🧠 Quiz Total Extendido",
        fr: "Quiz Total Étendu",
      },
    },
    pm: {
      type: "listening",
      label: {
        es: "👂 Escucha + Shadowing",
        fr: "Écoute + Shadowing",
      },
    },
  },
  {
    dayIndex: 26,
    title: { es: "Refuerzo de Debilidades", fr: "Renforcement des Faiblesses" },
    week: 4,
    am: {
      type: "review",
      label: {
        es: "📚 Repaso sección más débil",
        fr: "Révision de la section la plus faible",
      },
    },
    pm: {
      type: "free-practice",
      label: {
        es: "🗣️ Habla de algo que ames en francés",
        fr: "Parlez de quelque chose que vous aimez en français",
      },
    },
  },
  {
    dayIndex: 27,
    title: { es: "¡Final! 🎉", fr: "Finale ! 🎉" },
    week: 4,
    am: {
      type: "quiz-total",
      label: {
        es: "🧠 Quiz Final — meta 90%+",
        fr: "Quiz Final — objectif 90%+",
      },
    },
    pm: {
      type: "free-practice",
      label: {
        es: "🍿 Ve una película francesa para celebrar",
        fr: "Regardez un film français pour célébrer",
      },
    },
  },
];

export const clb5Plan: DayPlan[] = [...week1, ...week2, ...week3, ...week4];

export const weekTitles = [
  { es: "S1: Vocabulario", fr: "S1 : Vocabulaire" },
  { es: "S2: Comprensión", fr: "S2 : Compréhension" },
  { es: "S3: Expresión", fr: "S3 : Expression" },
  { es: "S4: Simulación", fr: "S4 : Simulation" },
];
