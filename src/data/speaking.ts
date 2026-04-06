export interface SpeakingScenario {
  id: string;
  title: { es: string; fr: string };
  prompt: string;
  tips: { fr: string; es: string }[];
  level: "clb5" | "clb7";
}

// ─── Task A: Pedir Información ─────────────────────────────────────────────

export const taskAScenarios: SpeakingScenario[] = [
  // CLB5
  {
    id: "a1",
    title: {
      es: "Inscripción al gimnasio",
      fr: "Inscription à la salle de sport",
    },
    prompt:
      "Vous téléphonez à une salle de sport pour obtenir des renseignements. Vous voulez connaître les tarifs des abonnements mensuels et annuels, les horaires d'ouverture, les cours collectifs disponibles et savoir s'il y a une piscine. Posez toutes les questions nécessaires pour prendre votre décision.",
    tips: [
      {
        fr: "Quels sont vos tarifs pour un abonnement mensuel ?",
        es: "¿Cuáles son sus tarifas para una suscripción mensual?",
      },
      {
        fr: "Quels sont vos horaires d'ouverture la semaine ?",
        es: "¿Cuáles son sus horarios de apertura entre semana?",
      },
      {
        fr: "Est-ce que vous proposez des cours collectifs ?",
        es: "¿Ofrecen clases grupales?",
      },
      {
        fr: "Y a-t-il une piscine dans votre établissement ?",
        es: "¿Hay una piscina en su establecimiento?",
      },
    ],
    level: "clb5",
  },
  {
    id: "a2",
    title: {
      es: "Reservación de hotel",
      fr: "Réservation d'hôtel",
    },
    prompt:
      "Vous appelez un hôtel pour réserver une chambre. Vous souhaitez connaître les prix pour différentes catégories de chambres, les dates disponibles, les services inclus comme le petit-déjeuner et le Wi-Fi, ainsi que la politique d'annulation. Obtenez toutes les informations avant de réserver.",
    tips: [
      {
        fr: "Quel est le prix d'une chambre double pour trois nuits ?",
        es: "¿Cuál es el precio de una habitación doble por tres noches?",
      },
      {
        fr: "Le petit-déjeuner est-il inclus dans le prix ?",
        es: "¿El desayuno está incluido en el precio?",
      },
      {
        fr: "Quels services proposez-vous aux clients ?",
        es: "¿Qué servicios ofrecen a los clientes?",
      },
      {
        fr: "Quelle est votre politique d'annulation ?",
        es: "¿Cuál es su política de cancelación?",
      },
    ],
    level: "clb5",
  },
  {
    id: "a3",
    title: {
      es: "Cita médica",
      fr: "Rendez-vous médical",
    },
    prompt:
      "Vous téléphonez à une clinique médicale pour prendre un rendez-vous avec un médecin généraliste. Vous voulez savoir quelles sont les disponibilités cette semaine, quels documents vous devez apporter et si la clinique accepte les nouveaux patients. Demandez également les informations sur le stationnement.",
    tips: [
      {
        fr: "Avez-vous des disponibilités cette semaine ?",
        es: "¿Tienen disponibilidad esta semana?",
      },
      {
        fr: "Quels documents dois-je apporter ?",
        es: "¿Qué documentos debo llevar?",
      },
      {
        fr: "Acceptez-vous les nouveaux patients ?",
        es: "¿Aceptan nuevos pacientes?",
      },
      {
        fr: "Y a-t-il un stationnement à proximité ?",
        es: "¿Hay estacionamiento cerca?",
      },
    ],
    level: "clb5",
  },
  {
    id: "a4",
    title: {
      es: "Alquiler de departamento",
      fr: "Location d'appartement",
    },
    prompt:
      "Vous appelez un propriétaire pour vous renseigner sur un appartement à louer. Vous voulez connaître le montant du loyer mensuel, la superficie de l'appartement, la qualité du quartier et savoir si les animaux de compagnie sont acceptés. Posez toutes les questions importantes avant de planifier une visite.",
    tips: [
      {
        fr: "Quel est le montant du loyer mensuel, charges comprises ?",
        es: "¿Cuál es el monto del alquiler mensual, con cargos incluidos?",
      },
      {
        fr: "Quelle est la superficie de l'appartement ?",
        es: "¿Cuál es la superficie del departamento?",
      },
      {
        fr: "Comment est le quartier ? Est-il bien desservi ?",
        es: "¿Cómo es el barrio? ¿Tiene buenas conexiones de transporte?",
      },
      {
        fr: "Les animaux de compagnie sont-ils acceptés ?",
        es: "¿Se aceptan mascotas?",
      },
    ],
    level: "clb5",
  },
  // CLB7
  {
    id: "a5",
    title: {
      es: "Inscripción a un curso de francés",
      fr: "Inscription à un cours de français",
    },
    prompt:
      "Vous appelez un centre de langues pour vous inscrire à un cours de français. Vous souhaitez obtenir des informations sur les différents niveaux offerts, la procédure d'inscription, le calendrier des sessions et la possibilité d'obtenir un certificat reconnu à la fin de la formation. Renseignez-vous aussi sur les modalités de paiement.",
    tips: [
      {
        fr: "Quels niveaux de français proposez-vous actuellement ?",
        es: "¿Qué niveles de francés ofrecen actualmente?",
      },
      {
        fr: "Comment se déroule la procédure d'inscription ?",
        es: "¿Cómo funciona el proceso de inscripción?",
      },
      {
        fr: "Délivrez-vous un certificat à la fin de la formation ?",
        es: "¿Entregan un certificado al final de la formación?",
      },
      {
        fr: "Quelles sont les modalités de paiement acceptées ?",
        es: "¿Cuáles son las modalidades de pago aceptadas?",
      },
    ],
    level: "clb7",
  },
  {
    id: "a6",
    title: {
      es: "Servicio de autobús a Toronto",
      fr: "Service d'autobus vers Toronto",
    },
    prompt:
      "Vous téléphonez à une compagnie d'autobus pour organiser un voyage à Toronto. Vous souhaitez connaître les horaires de départ et d'arrivée, le prix des billets aller-retour, la possibilité de réserver en ligne et les conditions de remboursement en cas d'annulation. Demandez aussi s'il y a des réductions pour les étudiants.",
    tips: [
      {
        fr: "Quels sont les horaires de départ pour Toronto ?",
        es: "¿Cuáles son los horarios de salida hacia Toronto?",
      },
      {
        fr: "Combien coûte un billet aller-retour ?",
        es: "¿Cuánto cuesta un boleto de ida y vuelta?",
      },
      {
        fr: "Est-il possible de réserver en ligne ?",
        es: "¿Es posible reservar en línea?",
      },
      {
        fr: "Proposez-vous des réductions pour les étudiants ?",
        es: "¿Ofrecen descuentos para estudiantes?",
      },
    ],
    level: "clb7",
  },
  {
    id: "a7",
    title: {
      es: "Preparación para entrevista de trabajo",
      fr: "Préparation à un entretien d'embauche",
    },
    prompt:
      "Vous appelez une entreprise pour obtenir des précisions sur un poste affiché en ligne. Vous souhaitez en savoir plus sur les responsabilités du poste, les compétences recherchées, la fourchette salariale et les avantages sociaux offerts. Demandez également des détails sur le processus d'entrevue et la date limite de candidature.",
    tips: [
      {
        fr: "Pourriez-vous me préciser les responsabilités du poste ?",
        es: "¿Podría precisarme las responsabilidades del puesto?",
      },
      {
        fr: "Quelles compétences recherchez-vous chez le candidat idéal ?",
        es: "¿Qué competencias buscan en el candidato ideal?",
      },
      {
        fr: "Serait-il possible de connaître la fourchette salariale ?",
        es: "¿Sería posible conocer el rango salarial?",
      },
      {
        fr: "Quels avantages sociaux offrez-vous à vos employés ?",
        es: "¿Qué beneficios laborales ofrecen a sus empleados?",
      },
    ],
    level: "clb7",
  },
  {
    id: "a8",
    title: {
      es: "Apertura de cuenta bancaria",
      fr: "Ouverture d'un compte bancaire",
    },
    prompt:
      "Vous téléphonez à une banque pour ouvrir un compte. Vous souhaitez savoir quels documents sont nécessaires pour l'ouverture du compte, quels sont les frais mensuels de gestion, si les services bancaires en ligne sont disponibles et quelles cartes de crédit sont offertes. Demandez également s'il est possible de prendre rendez-vous en succursale.",
    tips: [
      {
        fr: "Quels documents sont nécessaires pour ouvrir un compte ?",
        es: "¿Qué documentos se necesitan para abrir una cuenta?",
      },
      {
        fr: "Quels sont les frais mensuels associés au compte ?",
        es: "¿Cuáles son los cargos mensuales asociados a la cuenta?",
      },
      {
        fr: "Offrez-vous des services bancaires en ligne ?",
        es: "¿Ofrecen servicios bancarios en línea?",
      },
      {
        fr: "Puis-je prendre rendez-vous en succursale ?",
        es: "¿Puedo hacer una cita en la sucursal?",
      },
    ],
    level: "clb7",
  },
];

export const taskAPhrases: { fr: string; es: string }[] = [
  {
    fr: "Bonjour, je voudrais des renseignements sur...",
    es: "Hola, quisiera información sobre...",
  },
  {
    fr: "Pourriez-vous me dire... ?",
    es: "¿Podría decirme...?",
  },
  {
    fr: "Je souhaiterais savoir si...",
    es: "Me gustaría saber si...",
  },
  {
    fr: "Serait-il possible de... ?",
    es: "¿Sería posible...?",
  },
  {
    fr: "Quels sont les tarifs / horaires ?",
    es: "¿Cuáles son las tarifas / horarios?",
  },
  {
    fr: "Est-ce que ce service est disponible ?",
    es: "¿Está disponible ese servicio?",
  },
  {
    fr: "Merci beaucoup pour ces informations.",
    es: "Muchas gracias por esta información.",
  },
];

// ─── Task B: Persuasión ────────────────────────────────────────────────────

export const taskBScenarios: SpeakingScenario[] = [
  // CLB5
  {
    id: "b1",
    title: {
      es: "Convencer a un amigo de hacer ejercicio",
      fr: "Convaincre un ami de faire de l'exercice",
    },
    prompt:
      "Votre ami ne fait jamais de sport et se plaint souvent d'être fatigué. Vous voulez le convaincre de commencer à faire de l'exercice régulièrement. Parlez-lui des bienfaits pour la santé, de la réduction du stress et proposez-lui de faire du sport ensemble pour que ce soit plus motivant.",
    tips: [
      {
        fr: "Le sport est excellent pour la santé physique et mentale.",
        es: "El deporte es excelente para la salud física y mental.",
      },
      {
        fr: "Ça aide vraiment à réduire le stress du travail.",
        es: "Realmente ayuda a reducir el estrés del trabajo.",
      },
      {
        fr: "On pourrait s'inscrire ensemble à la salle de sport !",
        es: "¡Podríamos inscribirnos juntos en el gimnasio!",
      },
      {
        fr: "Tu te sentiras beaucoup plus énergique après quelques semaines.",
        es: "Te sentirás mucho más lleno de energía después de unas semanas.",
      },
    ],
    level: "clb5",
  },
  {
    id: "b2",
    title: {
      es: "Recomendar un restaurante",
      fr: "Recommander un restaurant",
    },
    prompt:
      "Vous avez découvert un excellent restaurant et vous voulez convaincre votre ami d'y aller avec vous ce week-end. Décrivez la qualité de la nourriture, l'ambiance agréable du lieu et le bon rapport qualité-prix. Essayez de le persuader d'essayer ce nouveau restaurant.",
    tips: [
      {
        fr: "La nourriture est absolument délicieuse, surtout les plats principaux.",
        es: "La comida es absolutamente deliciosa, sobre todo los platos principales.",
      },
      {
        fr: "L'ambiance est vraiment chaleureuse et accueillante.",
        es: "El ambiente es realmente cálido y acogedor.",
      },
      {
        fr: "Les prix sont très raisonnables pour la qualité offerte.",
        es: "Los precios son muy razonables para la calidad ofrecida.",
      },
      {
        fr: "Je suis sûr(e) que tu vas adorer cet endroit !",
        es: "¡Estoy seguro(a) de que te va a encantar ese lugar!",
      },
    ],
    level: "clb5",
  },
  {
    id: "b3",
    title: {
      es: "Convencer a un colega de aprender francés",
      fr: "Convaincre un collègue d'apprendre le français",
    },
    prompt:
      "Votre collègue hésite à commencer des cours de français. Vous voulez le convaincre que c'est un excellent investissement pour sa carrière, que cela lui donnera des points supplémentaires pour les CRS en immigration et que c'est essentiel pour vivre au Québec. Donnez-lui des arguments solides.",
    tips: [
      {
        fr: "Le français est un atout majeur pour ta carrière au Canada.",
        es: "El francés es una gran ventaja para tu carrera en Canadá.",
      },
      {
        fr: "Tu peux gagner des points CRS importants pour la résidence permanente.",
        es: "Puedes ganar puntos CRS importantes para la residencia permanente.",
      },
      {
        fr: "Au Québec, parler français ouvre beaucoup de portes.",
        es: "En Quebec, hablar francés abre muchas puertas.",
      },
      {
        fr: "Il existe des cours gratuits offerts par le gouvernement.",
        es: "Existen cursos gratuitos ofrecidos por el gobierno.",
      },
    ],
    level: "clb5",
  },
  {
    id: "b4",
    title: {
      es: "Convencer a un amigo de visitar Quebec",
      fr: "Convaincre un ami de visiter le Québec",
    },
    prompt:
      "Votre ami planifie ses vacances et hésite entre plusieurs destinations. Vous voulez le convaincre de visiter le Québec. Parlez-lui de la richesse culturelle, de la beauté de la nature, de la gastronomie locale et de l'accueil chaleureux des Québécois. Faites-lui envie !",
    tips: [
      {
        fr: "Le Québec a une culture unique, mélange d'Europe et d'Amérique.",
        es: "Quebec tiene una cultura única, mezcla de Europa y América.",
      },
      {
        fr: "Les paysages naturels sont absolument magnifiques en toute saison.",
        es: "Los paisajes naturales son absolutamente magníficos en toda estación.",
      },
      {
        fr: "La gastronomie québécoise est délicieuse : poutine, sirop d'érable...",
        es: "La gastronomía quebequense es deliciosa: poutine, jarabe de arce...",
      },
      {
        fr: "Les Québécois sont très accueillants et chaleureux.",
        es: "Los quebequenses son muy acogedores y cálidos.",
      },
    ],
    level: "clb5",
  },
  // CLB7
  {
    id: "b5",
    title: {
      es: "Convencer de usar transporte público",
      fr: "Convaincre d'utiliser les transports en commun",
    },
    prompt:
      "Votre ami utilise toujours sa voiture pour aller au travail et se plaint des embouteillages. Vous voulez le convaincre de prendre les transports en commun. Présentez les avantages pour l'environnement, les économies réalisées sur l'essence et le stationnement, et la réduction du stress lié à la conduite quotidienne.",
    tips: [
      {
        fr: "C'est un geste concret pour protéger l'environnement.",
        es: "Es un gesto concreto para proteger el medio ambiente.",
      },
      {
        fr: "Tu économiserais beaucoup sur l'essence et le stationnement.",
        es: "Ahorrarías mucho en gasolina y estacionamiento.",
      },
      {
        fr: "Tu pourrais lire ou te détendre au lieu de conduire.",
        es: "Podrías leer o relajarte en lugar de manejar.",
      },
      {
        fr: "Le réseau de transport est très bien desservi dans notre quartier.",
        es: "La red de transporte tiene muy buena cobertura en nuestro barrio.",
      },
    ],
    level: "clb7",
  },
  {
    id: "b6",
    title: {
      es: "Convencer de adoptar un perro",
      fr: "Convaincre d'adopter un chien",
    },
    prompt:
      "Votre ami vit seul et s'ennuie souvent le week-end. Vous voulez le convaincre d'adopter un chien dans un refuge. Expliquez-lui les bienfaits de la compagnie d'un animal, l'impact positif sur la santé physique et mentale, et le sens de la responsabilité que cela apporte. Montrez-lui que c'est une décision enrichissante.",
    tips: [
      {
        fr: "Un chien est un compagnon fidèle qui rend la vie moins solitaire.",
        es: "Un perro es un compañero fiel que hace la vida menos solitaria.",
      },
      {
        fr: "Les promenades quotidiennes sont excellentes pour la santé.",
        es: "Los paseos diarios son excelentes para la salud.",
      },
      {
        fr: "Adopter dans un refuge, c'est donner une seconde chance à un animal.",
        es: "Adoptar en un refugio es darle una segunda oportunidad a un animal.",
      },
      {
        fr: "Cela t'apportera un sens des responsabilités très gratifiant.",
        es: "Eso te dará un sentido de responsabilidad muy gratificante.",
      },
    ],
    level: "clb7",
  },
  {
    id: "b7",
    title: {
      es: "Convencer de leer más",
      fr: "Convaincre de lire davantage",
    },
    prompt:
      "Votre ami passe tout son temps libre devant les écrans et ne lit jamais. Vous souhaitez le convaincre de se mettre à la lecture. Parlez-lui de l'enrichissement des connaissances, de l'amélioration du vocabulaire en français et de la lecture comme moyen de détente. Suggérez-lui des genres littéraires qui pourraient lui plaire.",
    tips: [
      {
        fr: "La lecture enrichit énormément les connaissances générales.",
        es: "La lectura enriquece enormemente los conocimientos generales.",
      },
      {
        fr: "C'est le meilleur moyen d'améliorer ton vocabulaire en français.",
        es: "Es la mejor manera de mejorar tu vocabulario en francés.",
      },
      {
        fr: "Lire avant de dormir est un excellent moyen de se détendre.",
        es: "Leer antes de dormir es una excelente manera de relajarse.",
      },
      {
        fr: "Il existe des romans policiers passionnants si tu aimes le suspense.",
        es: "Hay novelas policiacas apasionantes si te gusta el suspenso.",
      },
    ],
    level: "clb7",
  },
  {
    id: "b8",
    title: {
      es: "Convencer de hacer voluntariado",
      fr: "Convaincre de faire du bénévolat",
    },
    prompt:
      "Votre ami a du temps libre mais ne sait pas comment l'occuper. Vous voulez le convaincre de faire du bénévolat dans la communauté. Expliquez-lui les avantages : contribuer à la communauté, acquérir de l'expérience professionnelle canadienne et ressentir une grande satisfaction personnelle. Proposez-lui des organismes où il pourrait s'impliquer.",
    tips: [
      {
        fr: "Le bénévolat est une excellente façon de contribuer à la communauté.",
        es: "El voluntariado es una excelente manera de contribuir a la comunidad.",
      },
      {
        fr: "Tu acquerras de l'expérience professionnelle canadienne précieuse.",
        es: "Adquirirás experiencia profesional canadiense valiosa.",
      },
      {
        fr: "C'est très valorisé sur un CV au Canada.",
        es: "Es muy valorado en un CV en Canadá.",
      },
      {
        fr: "La satisfaction d'aider les autres est incomparable.",
        es: "La satisfacción de ayudar a otros es incomparable.",
      },
    ],
    level: "clb7",
  },
];

export const taskBPhrases: { fr: string; es: string }[] = [
  {
    fr: "Tu devrais vraiment essayer !",
    es: "¡Deberías intentarlo de verdad!",
  },
  {
    fr: "C'est important pour / parce que...",
    es: "Es importante para / porque...",
  },
  {
    fr: "Je suis convaincu(e) que...",
    es: "Estoy convencido(a) de que...",
  },
  {
    fr: "Il faut absolument...",
    es: "Es absolutamente necesario...",
  },
  {
    fr: "On pourrait y aller ensemble !",
    es: "¡Podríamos ir juntos!",
  },
  {
    fr: "Les avantages sont nombreux.",
    es: "Las ventajas son numerosas.",
  },
  {
    fr: "Tu ne le regretteras pas !",
    es: "¡No te arrepentirás!",
  },
];
