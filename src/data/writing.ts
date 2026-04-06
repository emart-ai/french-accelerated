export interface WritingTemplate {
  title: { es: string; fr: string };
  template: string;
}

export interface Connector {
  fr: string;
  es: string;
  level: "clb5" | "clb7";
}

export interface ExampleEssay {
  title: { es: string; fr: string };
  content: string;
  level: "clb7";
}

// ─── Email Template ─────────────────────────────────────────────────────────

export const emailTemplate: WritingTemplate = {
  title: {
    es: "Plantilla de correo formal",
    fr: "Modèle de courriel formel",
  },
  template: `Madame, Monsieur,

Je vous écris pour [RAZÓN / RAISON].
(Le escribo para...)

[Paragraph 1: Contexte / Contexto]

Pourriez-vous me dire... ? (¿Podría decirme?)
Je souhaiterais savoir si... (Me gustaría saber si...)
Serait-il possible de... ? (¿Sería posible?)

Dans l'attente de votre réponse, je vous prie d'agréer,
Madame, Monsieur, l'expression de mes salutations distinguées.
(En espera de su respuesta, reciba un cordial saludo.)

[Nombre / Nom]`,
};

// ─── Opinion Template ───────────────────────────────────────────────────────

export const opinionTemplate: WritingTemplate = {
  title: {
    es: "Plantilla de ensayo de opinión",
    fr: "Modèle de texte d'opinion",
  },
  template: `De nos jours, [TEMA] est au cœur du débat.
(Hoy en día, [TEMA] está en el centro del debate.)
À mon avis, [POSICIÓN].

D'une part, [ARG 1]. En effet, [EJEMPLO].
(Por un lado... En efecto...)

D'autre part, [ARG 2]. Par exemple, [EJEMPLO].
(Por otro lado... Por ejemplo...)

Certes, on pourrait objecter que [CONTRA].
Cependant, [RESPUESTA].
(Ciertamente... Sin embargo...)

En conclusion, [RESUMEN].`,
};

// ─── Connectors ─────────────────────────────────────────────────────────────

export const connectors: Connector[] = [
  // CLB5
  { fr: "d'une part... d'autre part", es: "por un lado... por otro lado", level: "clb5" },
  { fr: "en effet", es: "en efecto / de hecho", level: "clb5" },
  { fr: "par exemple", es: "por ejemplo", level: "clb5" },
  { fr: "cependant", es: "sin embargo", level: "clb5" },
  { fr: "par conséquent", es: "por consiguiente", level: "clb5" },
  { fr: "en revanche", es: "en cambio", level: "clb5" },
  { fr: "de plus", es: "además", level: "clb5" },
  { fr: "certes... mais", es: "ciertamente... pero", level: "clb5" },
  { fr: "en conclusion", es: "en conclusión", level: "clb5" },
  { fr: "à mon avis", es: "en mi opinión", level: "clb5" },
  { fr: "tout d'abord", es: "en primer lugar", level: "clb5" },
  { fr: "ensuite", es: "luego / después", level: "clb5" },
  { fr: "enfin", es: "por último / finalmente", level: "clb5" },
  { fr: "bien que", es: "aunque", level: "clb5" },
  { fr: "il est essentiel", es: "es esencial", level: "clb5" },
  // CLB7
  { fr: "toutefois", es: "no obstante", level: "clb7" },
  { fr: "en outre", es: "además / aparte de eso", level: "clb7" },
  { fr: "par ailleurs", es: "por otra parte", level: "clb7" },
  { fr: "quant à", es: "en cuanto a", level: "clb7" },
  { fr: "force est de constater que", es: "hay que reconocer que", level: "clb7" },
];

// ─── Example Emails (CLB7) ─────────────────────────────────────────────────

export const exampleEmails: ExampleEssay[] = [
  {
    title: {
      es: "Queja por vecinos ruidosos",
      fr: "Plainte concernant des voisins bruyants",
    },
    content: `Madame, Monsieur,

Je vous écris pour vous signaler un problème de bruit récurrent dans mon immeuble situé au 45, rue Sainte-Catherine, appartement 302.

Depuis plusieurs semaines, mes voisins du dessus organisent des fêtes très bruyantes en semaine, souvent jusqu'à deux heures du matin. Cette situation perturbe considérablement mon sommeil et affecte ma qualité de vie. J'ai tenté de leur parler à plusieurs reprises, mais malheureusement, la situation n'a pas changé.

Je souhaiterais savoir quelles mesures vous pourriez prendre pour résoudre ce problème. Serait-il possible d'envoyer un avis formel aux locataires concernés ? Par ailleurs, pourriez-vous me rappeler les règles de l'immeuble concernant le bruit après 22 heures ?

Dans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

Carlos Méndez`,
    level: "clb7",
  },
  {
    title: {
      es: "Solicitud de información sobre un curso de francés",
      fr: "Demande d'information sur un cours de français",
    },
    content: `Madame, Monsieur,

Je vous écris pour obtenir des renseignements sur vos cours de français langue seconde offerts à la session d'automne.

Je suis un nouvel arrivant au Canada et je souhaite améliorer mon niveau de français pour des raisons professionnelles. Actuellement, je possède un niveau intermédiaire et j'aimerais atteindre un niveau avancé afin de passer le TEF Canada.

Pourriez-vous me dire quels sont les horaires des cours du soir ? Je souhaiterais également savoir si vous offrez des cours intensifs le week-end. Enfin, serait-il possible de connaître les tarifs et les modalités d'inscription ?

Dans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

Ana García`,
    level: "clb7",
  },
  {
    title: {
      es: "Solicitud de empleo en informática",
      fr: "Candidature pour un poste en informatique",
    },
    content: `Madame, Monsieur,

Je vous écris pour poser ma candidature au poste de développeur web publié sur votre site internet le 15 mars dernier.

Titulaire d'un diplôme en génie informatique et fort de cinq années d'expérience dans le développement d'applications web, je suis convaincu que mon profil correspond aux exigences du poste. J'ai travaillé avec les technologies React, Node.js et Python dans des environnements agiles. De plus, je maîtrise le français et l'espagnol, ce qui constitue un atout pour la communication au sein d'équipes multiculturelles.

Je serais très heureux de pouvoir discuter de ma candidature lors d'un entretien. Pourriez-vous me indiquer les prochaines étapes du processus de recrutement ? Je reste disponible à votre convenance.

Dans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

Roberto Fernández`,
    level: "clb7",
  },
];

// ─── Example Essays (CLB7) ─────────────────────────────────────────────────

export const exampleEssays: ExampleEssay[] = [
  {
    title: {
      es: "El teletrabajo",
      fr: "Le télétravail",
    },
    content: `De nos jours, le télétravail est au cœur du débat dans le monde professionnel. À mon avis, cette modalité de travail présente plus d'avantages que d'inconvénients et devrait être encouragée par les entreprises.

D'une part, le télétravail permet aux employés de mieux concilier leur vie professionnelle et personnelle. En effet, en éliminant le temps de transport quotidien, les travailleurs disposent de plus de temps pour leur famille et leurs loisirs. Par exemple, un employé qui passait deux heures par jour dans les transports en commun peut désormais utiliser ce temps pour faire du sport ou s'occuper de ses enfants.

D'autre part, le télétravail favorise la productivité. Par exemple, de nombreuses études ont démontré que les employés travaillant de chez eux sont souvent plus concentrés et accomplissent davantage de tâches, car ils sont moins dérangés par les interruptions fréquentes du bureau.

Certes, on pourrait objecter que le télétravail engendre un certain isolement social et rend la collaboration plus difficile. Cependant, les outils numériques actuels, tels que les visioconférences et les plateformes collaboratives, permettent de maintenir des liens solides entre collègues et de travailler efficacement en équipe.

En conclusion, le télétravail représente une évolution positive du monde du travail. Il offre flexibilité et productivité tout en nécessitant un encadrement adapté pour préserver le lien social.`,
    level: "clb7",
  },
  {
    title: {
      es: "La influencia de las redes sociales",
      fr: "L'influence des réseaux sociaux",
    },
    content: `De nos jours, les réseaux sociaux occupent une place considérable dans notre quotidien. À mon avis, bien qu'ils offrent des avantages indéniables, leur utilisation excessive comporte des risques qu'il convient de prendre au sérieux.

D'une part, les réseaux sociaux facilitent la communication et le maintien des liens entre les personnes. En effet, grâce à des plateformes comme Facebook ou WhatsApp, il est possible de rester en contact avec sa famille et ses amis, même à des milliers de kilomètres de distance. Pour les immigrants, c'est un outil précieux qui réduit le sentiment d'éloignement.

D'autre part, ces plateformes constituent un formidable outil d'information et d'apprentissage. Par exemple, de nombreuses personnes utilisent YouTube pour apprendre le français ou suivent des pages éducatives sur Instagram pour enrichir leurs connaissances dans divers domaines.

Certes, on pourrait objecter que les réseaux sociaux sont une source de désinformation et qu'ils peuvent nuire à la santé mentale, notamment chez les jeunes. Cependant, une utilisation responsable et encadrée permet de profiter de leurs avantages tout en limitant leurs effets négatifs. Il est essentiel d'éduquer les utilisateurs à vérifier les sources d'information.

En conclusion, les réseaux sociaux sont un outil à double tranchant. Utilisés avec discernement, ils enrichissent notre vie sociale et intellectuelle ; utilisés sans modération, ils peuvent devenir nuisibles.`,
    level: "clb7",
  },
  {
    title: {
      es: "La protección del medio ambiente",
      fr: "La protection de l'environnement",
    },
    content: `De nos jours, la protection de l'environnement est au cœur des préoccupations mondiales. À mon avis, chaque individu a la responsabilité d'agir pour préserver notre planète, et il est urgent de modifier nos habitudes de consommation.

D'une part, les gestes quotidiens des citoyens peuvent avoir un impact significatif sur l'environnement. En effet, le recyclage, la réduction de la consommation d'eau et l'utilisation des transports en commun sont des actions simples qui, multipliées par des millions de personnes, produisent des résultats considérables. Au Canada, par exemple, les programmes municipaux de tri sélectif ont permis de réduire considérablement la quantité de déchets envoyés aux sites d'enfouissement.

D'autre part, les gouvernements et les entreprises doivent assumer leur part de responsabilité. Par exemple, investir dans les énergies renouvelables et imposer des réglementations plus strictes aux industries polluantes sont des mesures indispensables pour lutter contre le réchauffement climatique. Le Canada s'est engagé à atteindre la carboneutralité d'ici 2050, ce qui nécessite des actions concrètes à tous les niveaux.

Certes, on pourrait objecter que les mesures environnementales ont un coût économique élevé et peuvent freiner la croissance. Cependant, force est de constater que le coût de l'inaction serait bien plus élevé à long terme. Les catastrophes naturelles liées au changement climatique entraînent déjà des pertes économiques considérables.

En conclusion, la protection de l'environnement est un devoir collectif qui exige la mobilisation de tous : citoyens, entreprises et gouvernements. Il en va de l'avenir des générations futures.`,
    level: "clb7",
  },
];
