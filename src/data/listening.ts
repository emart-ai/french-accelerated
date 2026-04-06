export interface ListeningResource {
  name: string;
  description: { es: string; fr: string };
  url?: string;
  level: "easy" | "medium" | "hard";
}

export interface ListeningTechnique {
  step: number;
  title: { es: string; fr: string };
  description: { es: string; fr: string };
}

export const resources: ListeningResource[] = [
  {
    name: "InnerFrench",
    description: {
      es: "Podcast en francés lento y claro. Perfecto para empezar.",
      fr: "Podcast en français lent et clair. Parfait pour commencer.",
    },
    url: "https://www.youtube.com/c/innerFrench",
    level: "easy",
  },
  {
    name: "Français Authentique",
    description: {
      es: "Aprende francés de forma natural con explicaciones claras.",
      fr: "Apprenez le français naturellement avec des explications claires.",
    },
    url: "https://www.youtube.com/c/FrancaisAuthentique",
    level: "easy",
  },
  {
    name: "Français avec Pierre",
    description: {
      es: "Lecciones estructuradas con buen ritmo para principiantes.",
      fr: "Leçons structurées à bon rythme pour débutants.",
    },
    url: "https://www.youtube.com/c/FrancaisavecPierre",
    level: "easy",
  },
  {
    name: "RFI Journal en français facile",
    description: {
      es: "Noticias reales en francés simplificado. Ideal para nivel intermedio.",
      fr: "Actualités réelles en français simplifié. Idéal pour le niveau intermédiaire.",
    },
    url: "https://savoirs.rfi.fr/fr/apprendre-enseigner/langue-francaise/journal-en-francais-facile",
    level: "medium",
  },
  {
    name: "Coffee Break French",
    description: {
      es: "Lecciones de 15-20 min con explicaciones en inglés. Buena estructura.",
      fr: "Leçons de 15-20 min avec explications en anglais. Bonne structure.",
    },
    url: "https://coffeebreaklanguages.com/coffeebreakfrench/",
    level: "medium",
  },
  {
    name: "TV5 Monde — 7 jours sur la planète",
    description: {
      es: "Videos de actualidad con ejercicios y transcripciones.",
      fr: "Vidéos d'actualité avec exercices et transcriptions.",
    },
    url: "https://apprendre.tv5monde.com/fr/exercices/7-jours-sur-la-planete",
    level: "medium",
  },
  {
    name: "France Inter",
    description: {
      es: "Radio francesa real. Velocidad nativa, vocabulario avanzado.",
      fr: "Radio française réelle. Vitesse native, vocabulaire avancé.",
    },
    url: "https://www.radiofrance.fr/franceinter",
    level: "hard",
  },
  {
    name: "France Culture",
    description: {
      es: "Debates y cultura. Excelente para comprensión avanzada.",
      fr: "Débats et culture. Excellent pour la compréhension avancée.",
    },
    url: "https://www.radiofrance.fr/franceculture",
    level: "hard",
  },
  {
    name: "Arte — Karambolage",
    description: {
      es: "Diferencias culturales franco-alemanas. Divertido y educativo.",
      fr: "Différences culturelles franco-allemandes. Amusant et éducatif.",
    },
    url: "https://www.youtube.com/playlist?list=PLAhODKFKPiFBkwb0w1s2USEqbJbmHNu_L",
    level: "hard",
  },
];

export const clb7Resources: ListeningResource[] = [
  {
    name: "YouTube — Easy French",
    description: {
      es: "Entrevistas en la calle con subtítulos en francés y español.",
      fr: "Interviews dans la rue avec sous-titres en français et espagnol.",
    },
    url: "https://www.youtube.com/c/EasyFrench",
    level: "medium",
  },
  {
    name: "YouTube — Cyprien",
    description: {
      es: "Humor francés. Vocabulario coloquial y cultura pop.",
      fr: "Humour français. Vocabulaire familier et culture pop.",
    },
    url: "https://www.youtube.com/c/CyprienGaming",
    level: "hard",
  },
  {
    name: "Netflix — Lupin",
    description: {
      es: "Serie de suspenso. Diálogos rápidos pero claros.",
      fr: "Série de suspense. Dialogues rapides mais clairs.",
    },
    url: "https://www.netflix.com/title/80994082",
    level: "hard",
  },
  {
    name: "Netflix — Dix pour cent (Call My Agent)",
    description: {
      es: "Comedia sobre agentes de actores. Francés cotidiano y profesional.",
      fr: "Comédie sur des agents d'acteurs. Français quotidien et professionnel.",
    },
    url: "https://www.netflix.com/title/80133335",
    level: "hard",
  },
];

export const techniques: ListeningTechnique[] = [
  {
    step: 1,
    title: {
      es: "Escucha sin pausar",
      fr: "Écoute sans pause",
    },
    description: {
      es: "Escucha todo el audio sin parar. Intenta captar la idea general: ¿de qué hablan? ¿Cuál es el tema?",
      fr: "Écoutez tout l'audio sans arrêter. Essayez de comprendre l'idée générale : de quoi parlent-ils ? Quel est le sujet ?",
    },
  },
  {
    step: 2,
    title: {
      es: "Escucha de nuevo buscando detalles",
      fr: "Réécoute pour les détails",
    },
    description: {
      es: "Escucha otra vez. Esta vez busca detalles: nombres, números, fechas, opiniones específicas.",
      fr: "Réécoutez. Cette fois, cherchez les détails : noms, chiffres, dates, opinions spécifiques.",
    },
  },
  {
    step: 3,
    title: {
      es: "Lee la transcripción",
      fr: "Lisez la transcription",
    },
    description: {
      es: "Si existe transcripción, léela. Subraya las palabras que no entendiste al escuchar.",
      fr: "Si une transcription existe, lisez-la. Soulignez les mots que vous n'avez pas compris à l'écoute.",
    },
  },
  {
    step: 4,
    title: {
      es: "Shadowing — Repite oraciones",
      fr: "Shadowing — Répétez les phrases",
    },
    description: {
      es: "Repite en voz alta justo después del audio. Imita el ritmo, la entonación y la pronunciación. Esta técnica mejora tu comprensión Y tu expresión oral.",
      fr: "Répétez à voix haute juste après l'audio. Imitez le rythme, l'intonation et la prononciation. Cette technique améliore votre compréhension ET votre expression orale.",
    },
  },
];

export const shadowingGuide = {
  title: {
    es: "Guía de Shadowing (CLB 7)",
    fr: "Guide de Shadowing (NCLC 7)",
  },
  steps: [
    {
      es: "Elige un audio de 1-2 minutos con transcripción.",
      fr: "Choisissez un audio de 1-2 minutes avec transcription.",
    },
    {
      es: "Escúchalo 2 veces sin pausar.",
      fr: "Écoutez-le 2 fois sans pause.",
    },
    {
      es: "Escúchalo frase por frase y repite inmediatamente después.",
      fr: "Écoutez phrase par phrase et répétez immédiatement après.",
    },
    {
      es: "Grábate y compara con el audio original.",
      fr: "Enregistrez-vous et comparez avec l'audio original.",
    },
    {
      es: "Repite hasta que tu ritmo sea natural.",
      fr: "Répétez jusqu'à ce que votre rythme soit naturel.",
    },
  ],
};
