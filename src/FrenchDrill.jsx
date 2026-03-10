import { useState, useEffect, useRef } from "react";

const SUBJECTS = [
  { french:"Je",    spanish:"Yo",        phonetic:"Zhuh", color:"#FF6B6B", emoji:"🙋" },
  { french:"Tu",    spanish:"Tú",        phonetic:"Too",  color:"#FF9F43", emoji:"👉" },
  { french:"Il",    spanish:"Él",        phonetic:"Eel",  color:"#54A0FF", emoji:"👦" },
  { french:"Elle",  spanish:"Ella",      phonetic:"El",   color:"#FF6EB4", emoji:"👧" },
  { french:"On",    spanish:"Uno/Nos.",  phonetic:"Ohn",  color:"#A29BFE", emoji:"🤝" },
  { french:"Nous",  spanish:"Nosotros",  phonetic:"Noo",  color:"#00D2D3", emoji:"👫" },
  { french:"Vous",  spanish:"Ud./Uds.",  phonetic:"Voo",  color:"#1DD1A1", emoji:"🎩" },
  { french:"Ils",   spanish:"Ellos",     phonetic:"Eel",  color:"#F368E0", emoji:"👬" },
  { french:"Elles", spanish:"Ellas",     phonetic:"El",   color:"#FF9FF3", emoji:"👭" },
];

function frForm(p,i){if(!p.frF)return p.fr;if(i===8)return p.frFP;if(i===3)return p.frF;if(i===5||i===6||i===7)return p.frP;return p.fr;}
function esForm(p,i){if(!p.esF)return p.es;if(i===8)return p.esFP;if(i===3)return p.esF;if(i===5||i===6||i===7)return p.esP;return p.es;}

const C={
  etre:   ["suis","es","est","est","est","sommes","êtes","sont","sont"],
  avoir:  ["ai","as","a","a","a","avons","avez","ont","ont"],
  aller:  ["vais","vas","va","va","va","allons","allez","vont","vont"],
  faire:  ["fais","fais","fait","fait","fait","faisons","faites","font","font"],
  pouvoir:["peux","peux","peut","peut","peut","pouvons","pouvez","peuvent","peuvent"],
  vouloir:["veux","veux","veut","veut","veut","voulons","voulez","veulent","veulent"],
  savoir: ["sais","sais","sait","sait","sait","savons","savez","savent","savent"],
  devoir: ["dois","dois","doit","doit","doit","devons","devez","doivent","doivent"],
  dire:   ["dis","dis","dit","dit","dit","disons","dites","disent","disent"],
  voir:   ["vois","vois","voit","voit","voit","voyons","voyez","voient","voient"],
  prendre:["prends","prends","prend","prend","prend","prenons","prenez","prennent","prennent"],
  venir:  ["viens","viens","vient","vient","vient","venons","venez","viennent","viennent"],
  mettre: ["mets","mets","met","met","met","mettons","mettez","mettent","mettent"],
  partir: ["pars","pars","part","part","part","partons","partez","partent","partent"],
  finir:  ["finis","finis","finit","finit","finit","finissons","finissez","finissent","finissent"],
  sortir: ["sors","sors","sort","sort","sort","sortons","sortez","sortent","sortent"],
  parler: ["parle","parles","parle","parle","parle","parlons","parlez","parlent","parlent"],
  manger: ["mange","manges","mange","mange","mange","mangeons","mangez","mangent","mangent"],
  aimer:  ["aime","aimes","aime","aime","aime","aimons","aimez","aiment","aiment"],
  penser: ["pense","penses","pense","pense","pense","pensons","pensez","pensent","pensent"],
  trouver:["trouve","trouves","trouve","trouve","trouve","trouvons","trouvez","trouvent","trouvent"],
  donner: ["donne","donnes","donne","donne","donne","donnons","donnez","donnent","donnent"],
  laisser:["laisse","laisses","laisse","laisse","laisse","laissons","laissez","laissent","laissent"],
  croire: ["crois","crois","croit","croit","croit","croyons","croyez","croient","croient"],
  comprendre:["comprends","comprends","comprend","comprend","comprend","comprenons","comprenez","comprennent","comprennent"],
  entendre:["entends","entends","entend","entend","entend","entendons","entendez","entendent","entendent"],
  attendre:["attends","attends","attend","attend","attend","attendons","attendez","attendent","attendent"],
  rester: ["reste","restes","reste","reste","reste","restons","restez","restent","restent"],
  passer: ["passe","passes","passe","passe","passe","passons","passez","passent","passent"],
  tenir:  ["tiens","tiens","tient","tient","tient","tenons","tenez","tiennent","tiennent"],
  porter: ["porte","portes","porte","porte","porte","portons","portez","portent","portent"],
  arriver:["arrive","arrives","arrive","arrive","arrive","arrivons","arrivez","arrivent","arrivent"],
  chercher:["cherche","cherches","cherche","cherche","cherche","cherchons","cherchez","cherchent","cherchent"],
  appeler:["appelle","appelles","appelle","appelle","appelle","appelons","appelez","appellent","appellent"],
  demander:["demande","demandes","demande","demande","demande","demandons","demandez","demandent","demandent"],
  repondre:["réponds","réponds","répond","répond","répond","répondons","répondez","répondent","répondent"],
  montrer:["montre","montres","montre","montre","montre","montrons","montrez","montrent","montrent"],
  ecrire: ["écris","écris","écrit","écrit","écrit","écrivons","écrivez","écrivent","écrivent"],
  lire:   ["lis","lis","lit","lit","lit","lisons","lisez","lisent","lisent"],
  ouvrir: ["ouvre","ouvres","ouvre","ouvre","ouvre","ouvrons","ouvrez","ouvrent","ouvrent"],
  fermer: ["ferme","fermes","ferme","ferme","ferme","fermons","fermez","ferment","ferment"],
  jouer:  ["joue","joues","joue","joue","joue","jouons","jouez","jouent","jouent"],
  gagner: ["gagne","gagnes","gagne","gagne","gagne","gagnons","gagnez","gagnent","gagnent"],
  travailler:["travaille","travailles","travaille","travaille","travaille","travaillons","travaillez","travaillent","travaillent"],
  habiter:["habite","habites","habite","habite","habite","habitons","habitez","habitent","habitent"],
  rencontrer:["rencontre","rencontres","rencontre","rencontre","rencontre","rencontrons","rencontrez","rencontrent","rencontrent"],
  inviter:["invite","invites","invite","invite","invite","invitons","invitez","invitent","invitent"],
  choisir:["choisis","choisis","choisit","choisit","choisit","choisissons","choisissez","choisissent","choisissent"],
  decider:["décide","décides","décide","décide","décide","décidons","décidez","décident","décident"],
  rire:   ["ris","ris","rit","rit","rit","rions","riez","rient","rient"],
  pleurer:["pleure","pleures","pleure","pleure","pleure","pleurons","pleurez","pleurent","pleurent"],
  chanter:["chante","chantes","chante","chante","chante","chantons","chantez","chantent","chantent"],
  danser: ["danse","danses","danse","danse","danse","dansons","dansez","dansent","dansent"],
  conduire:["conduis","conduis","conduit","conduit","conduit","conduisons","conduisez","conduisent","conduisent"],
  voyager:["voyage","voyages","voyage","voyage","voyage","voyageons","voyagez","voyagent","voyagent"],
  acheter:["achète","achètes","achète","achète","achète","achetons","achetez","achètent","achètent"],
  vendre: ["vends","vends","vend","vend","vend","vendons","vendez","vendent","vendent"],
  grandir:["grandis","grandis","grandit","grandit","grandit","grandissons","grandissez","grandissent","grandissent"],
  changer:["change","changes","change","change","change","changeons","changez","changent","changent"],
  dormir: ["dors","dors","dort","dort","dort","dormons","dormez","dorment","dorment"],
  reveiller:["réveille","réveilles","réveille","réveille","réveille","réveillons","réveillez","réveillent","réveillent"],
  preparer:["prépare","prépares","prépare","prépare","prépare","préparons","préparez","préparent","préparent"],
  cuisiner:["cuisine","cuisines","cuisine","cuisine","cuisine","cuisinons","cuisinez","cuisinent","cuisinent"],
  marcher:["marche","marches","marche","marche","marche","marchons","marchez","marchent","marchent"],
  courir: ["cours","cours","court","court","court","courons","courez","courent","courent"],
  tomber: ["tombe","tombes","tombe","tombe","tombe","tombons","tombez","tombent","tombent"],
  monter: ["monte","montes","monte","monte","monte","montons","montez","montent","montent"],
};

const E={
  etre:   ["estoy","estás","está","está","está","estamos","están","están","están"],
  avoir:  ["tengo","tienes","tiene","tiene","tiene","tenemos","tienen","tienen","tienen"],
  aller:  ["voy","vas","va","va","va","vamos","van","van","van"],
  faire:  ["hago","haces","hace","hace","hace","hacemos","hacen","hacen","hacen"],
  pouvoir:["puedo","puedes","puede","puede","puede","podemos","pueden","pueden","pueden"],
  vouloir:["quiero","quieres","quiere","quiere","quiere","queremos","quieren","quieren","quieren"],
  savoir: ["sé","sabes","sabe","sabe","sabe","sabemos","saben","saben","saben"],
  devoir: ["debo","debes","debe","debe","debe","debemos","deben","deben","deben"],
  dire:   ["digo","dices","dice","dice","dice","decimos","dicen","dicen","dicen"],
  voir:   ["veo","ves","ve","ve","ve","vemos","ven","ven","ven"],
  prendre:["tomo","tomas","toma","toma","toma","tomamos","toman","toman","toman"],
  venir:  ["vengo","vienes","viene","viene","viene","venimos","vienen","vienen","vienen"],
  mettre: ["pongo","pones","pone","pone","pone","ponemos","ponen","ponen","ponen"],
  partir: ["salgo","sales","sale","sale","sale","salimos","salen","salen","salen"],
  finir:  ["termino","terminas","termina","termina","termina","terminamos","terminan","terminan","terminan"],
  sortir: ["salgo","sales","sale","sale","sale","salimos","salen","salen","salen"],
  parler: ["hablo","hablas","habla","habla","habla","hablamos","hablan","hablan","hablan"],
  manger: ["como","comes","come","come","come","comemos","comen","comen","comen"],
  aimer:  ["amo","amas","ama","ama","ama","amamos","aman","aman","aman"],
  penser: ["pienso","piensas","piensa","piensa","piensa","pensamos","piensan","piensan","piensan"],
  trouver:["encuentro","encuentras","encuentra","encuentra","encuentra","encontramos","encuentran","encuentran","encuentran"],
  donner: ["doy","das","da","da","da","damos","dan","dan","dan"],
  laisser:["dejo","dejas","deja","deja","deja","dejamos","dejan","dejan","dejan"],
  croire: ["creo","crees","cree","cree","cree","creemos","creen","creen","creen"],
  comprendre:["entiendo","entiendes","entiende","entiende","entiende","entendemos","entienden","entienden","entienden"],
  entendre:["oigo","oyes","oye","oye","oye","oímos","oyen","oyen","oyen"],
  attendre:["espero","esperas","espera","espera","espera","esperamos","esperan","esperan","esperan"],
  rester: ["me quedo","te quedas","se queda","se queda","se queda","nos quedamos","se quedan","se quedan","se quedan"],
  passer: ["paso","pasas","pasa","pasa","pasa","pasamos","pasan","pasan","pasan"],
  tenir:  ["sostengo","sostienes","sostiene","sostiene","sostiene","sostenemos","sostienen","sostienen","sostienen"],
  porter: ["llevo","llevas","lleva","lleva","lleva","llevamos","llevan","llevan","llevan"],
  arriver:["llego","llegas","llega","llega","llega","llegamos","llegan","llegan","llegan"],
  chercher:["busco","buscas","busca","busca","busca","buscamos","buscan","buscan","buscan"],
  appeler:["llamo","llamas","llama","llama","llama","llamamos","llaman","llaman","llaman"],
  demander:["pido","pides","pide","pide","pide","pedimos","piden","piden","piden"],
  repondre:["respondo","respondes","responde","responde","responde","respondemos","responden","responden","responden"],
  montrer:["muestro","muestras","muestra","muestra","muestra","mostramos","muestran","muestran","muestran"],
  ecrire: ["escribo","escribes","escribe","escribe","escribe","escribimos","escriben","escriben","escriben"],
  lire:   ["leo","lees","lee","lee","lee","leemos","leen","leen","leen"],
  ouvrir: ["abro","abres","abre","abre","abre","abrimos","abren","abren","abren"],
  fermer: ["cierro","cierras","cierra","cierra","cierra","cerramos","cierran","cierran","cierran"],
  jouer:  ["juego","juegas","juega","juega","juega","jugamos","juegan","juegan","juegan"],
  gagner: ["gano","ganas","gana","gana","gana","ganamos","ganan","ganan","ganan"],
  travailler:["trabajo","trabajas","trabaja","trabaja","trabaja","trabajamos","trabajan","trabajan","trabajan"],
  habiter:["vivo","vives","vive","vive","vive","vivimos","viven","viven","viven"],
  rencontrer:["encuentro","encuentras","encuentra","encuentra","encuentra","encontramos","encuentran","encuentran","encuentran"],
  inviter:["invito","invitas","invita","invita","invita","invitamos","invitan","invitan","invitan"],
  choisir:["elijo","eliges","elige","elige","elige","elegimos","eligen","eligen","eligen"],
  decider:["decido","decides","decide","decide","decide","decidimos","deciden","deciden","deciden"],
  rire:   ["me río","te ríes","se ríe","se ríe","se ríe","nos reímos","se ríen","se ríen","se ríen"],
  pleurer:["lloro","lloras","llora","llora","llora","lloramos","lloran","lloran","lloran"],
  chanter:["canto","cantas","canta","canta","canta","cantamos","cantan","cantan","cantan"],
  danser: ["bailo","bailas","baila","baila","baila","bailamos","bailan","bailan","bailan"],
  conduire:["conduzco","conduces","conduce","conduce","conduce","conducimos","conducen","conducen","conducen"],
  voyager:["viajo","viajas","viaja","viaja","viaja","viajamos","viajan","viajan","viajan"],
  acheter:["compro","compras","compra","compra","compra","compramos","compran","compran","compran"],
  vendre: ["vendo","vendes","vende","vende","vende","vendemos","venden","venden","venden"],
  grandir:["crezco","creces","crece","crece","crece","crecemos","crecen","crecen","crecen"],
  changer:["cambio","cambias","cambia","cambia","cambia","cambiamos","cambian","cambian","cambian"],
  dormir: ["duermo","duermes","duerme","duerme","duerme","dormimos","duermen","duermen","duermen"],
  reveiller:["me despierto","te despiertas","se despierta","se despierta","se despierta","nos despertamos","se despiertan","se despiertan","se despiertan"],
  preparer:["preparo","preparas","prepara","prepara","prepara","preparamos","preparan","preparan","preparan"],
  cuisiner:["cocino","cocinas","cocina","cocina","cocina","cocinamos","cocinan","cocinan","cocinan"],
  marcher:["camino","caminas","camina","camina","camina","caminamos","caminan","caminan","caminan"],
  courir: ["corro","corres","corre","corre","corre","corremos","corren","corren","corren"],
  tomber: ["caigo","caes","cae","cae","cae","caemos","caen","caen","caen"],
  monter: ["subo","subes","sube","sube","sube","subimos","suben","suben","suben"],
};

const P={
  etre:[
    {fr:"content",frF:"contente",frP:"contents",frFP:"contentes",es:"contento",esF:"contenta",esP:"contentos",esFP:"contentas",emoji:"😊"},
    {fr:"heureux",frF:"heureuse",frP:"heureux",frFP:"heureuses",es:"feliz",esF:"feliz",esP:"felices",esFP:"felices",emoji:"😄"},
    {fr:"fatigué",frF:"fatiguée",frP:"fatigués",frFP:"fatiguées",es:"cansado",esF:"cansada",esP:"cansados",esFP:"cansadas",emoji:"😴"},
    {fr:"prêt",frF:"prête",frP:"prêts",frFP:"prêtes",es:"listo",esF:"lista",esP:"listos",esFP:"listas",emoji:"✅"},
    {fr:"libre",frF:"libre",frP:"libres",frFP:"libres",es:"libre",esF:"libre",esP:"libres",esFP:"libres",emoji:"🕊️"},
    {fr:"occupé",frF:"occupée",frP:"occupés",frFP:"occupées",es:"ocupado",esF:"ocupada",esP:"ocupados",esFP:"ocupadas",emoji:"💼"},
    {fr:"malade",frF:"malade",frP:"malades",frFP:"malades",es:"enfermo",esF:"enferma",esP:"enfermos",esFP:"enfermas",emoji:"🤒"},
    {fr:"seul",frF:"seule",frP:"seuls",frFP:"seules",es:"solo",esF:"sola",esP:"solos",esFP:"solas",emoji:"🧍"},
    {fr:"bien",es:"bien",emoji:"👍"},
    {fr:"ici",es:"aquí",emoji:"📍"},
  ],
  avoir:[
    {fr:"faim",es:"hambre",emoji:"🍔"},{fr:"soif",es:"sed",emoji:"💧"},
    {fr:"sommeil",es:"sueño",emoji:"😴"},{fr:"peur",es:"miedo",emoji:"😨"},
    {fr:"chaud",es:"calor",emoji:"🌡️"},{fr:"froid",es:"frío",emoji:"🥶"},
    {fr:"raison",es:"razón",emoji:"✅"},{fr:"tort",es:"la razón no",emoji:"❌"},
    {fr:"chance",es:"suerte",emoji:"🍀"},{fr:"besoin",es:"necesidad",emoji:"🙏"},
  ],
  aller:[
    {fr:"bien",es:"bien",emoji:"👍"},{fr:"mieux",es:"mejor",emoji:"📈"},
    {fr:"mal",es:"mal",emoji:"👎"},{fr:"au parc",es:"al parque",emoji:"🌳"},
    {fr:"au travail",es:"al trabajo",emoji:"💼"},{fr:"à l'école",es:"a la escuela",emoji:"🏫"},
    {fr:"chez toi",es:"a tu casa",emoji:"🏠"},{fr:"en France",es:"a Francia",emoji:"🇫🇷"},
    {fr:"dehors",es:"afuera",emoji:"🚪"},{fr:"vite",es:"rápido",emoji:"⚡"},
  ],
  faire:[
    {fr:"du sport",es:"deporte",emoji:"⚽"},{fr:"la cuisine",es:"cocinar",emoji:"👨‍🍳"},
    {fr:"du vélo",es:"ciclismo",emoji:"🚴"},{fr:"du yoga",es:"yoga",emoji:"🧘"},
    {fr:"les courses",es:"las compras",emoji:"🛒"},{fr:"du bruit",es:"ruido",emoji:"🔊"},
    {fr:"un voyage",es:"un viaje",emoji:"✈️"},{fr:"du café",es:"café",emoji:"☕"},
    {fr:"du bien",es:"bien",emoji:"💚"},{fr:"attention",es:"atención",emoji:"⚠️"},
  ],
  pouvoir:[
    {fr:"venir",es:"venir",emoji:"🚶"},{fr:"parler",es:"hablar",emoji:"🗣️"},
    {fr:"aider",es:"ayudar",emoji:"🤝"},{fr:"essayer",es:"intentar",emoji:"💪"},
    {fr:"partir",es:"irme",emoji:"✈️"},{fr:"rester",es:"quedarme",emoji:"🪑"},
    {fr:"comprendre",es:"entender",emoji:"🧠"},{fr:"changer",es:"cambiar",emoji:"🔄"},
    {fr:"réussir",es:"lograrlo",emoji:"🏆"},{fr:"dormir",es:"dormir",emoji:"😴"},
  ],
  vouloir:[
    {fr:"manger",es:"comer",emoji:"🍽️"},{fr:"partir",es:"irme",emoji:"✈️"},
    {fr:"rester",es:"quedarme",emoji:"🪑"},{fr:"apprendre",es:"aprender",emoji:"📚"},
    {fr:"voyager",es:"viajar",emoji:"🌍"},{fr:"du café",es:"café",emoji:"☕"},
    {fr:"réussir",es:"tener éxito",emoji:"🏆"},{fr:"aider",es:"ayudar",emoji:"🤝"},
    {fr:"dormir",es:"dormir",emoji:"😴"},{fr:"changer",es:"cambiar",emoji:"🔄"},
  ],
  savoir:[
    {fr:"cuisiner",es:"cocinar",emoji:"👨‍🍳"},{fr:"parler",es:"hablar",emoji:"🗣️"},
    {fr:"chanter",es:"cantar",emoji:"🎵"},{fr:"nager",es:"nadar",emoji:"🏊"},
    {fr:"conduire",es:"conducir",emoji:"🚗"},{fr:"danser",es:"bailar",emoji:"💃"},
    {fr:"lire",es:"leer",emoji:"📖"},{fr:"écrire",es:"escribir",emoji:"✍️"},
    {fr:"compter",es:"contar",emoji:"🔢"},{fr:"tout",es:"todo",emoji:"🌍"},
  ],
  devoir:[
    {fr:"partir",es:"irme",emoji:"✈️"},{fr:"travailler",es:"trabajar",emoji:"💼"},
    {fr:"étudier",es:"estudiar",emoji:"📚"},{fr:"manger",es:"comer",emoji:"🍽️"},
    {fr:"dormir",es:"dormir",emoji:"😴"},{fr:"appeler",es:"llamar",emoji:"📞"},
    {fr:"finir",es:"terminar",emoji:"✅"},{fr:"rester",es:"quedarme",emoji:"🪑"},
    {fr:"payer",es:"pagar",emoji:"💳"},{fr:"répondre",es:"responder",emoji:"💬"},
  ],
  dire:[
    {fr:"la vérité",es:"la verdad",emoji:"✅"},{fr:"merci",es:"gracias",emoji:"🙏"},
    {fr:"oui",es:"sí",emoji:"👍"},{fr:"non",es:"no",emoji:"❌"},
    {fr:"bonjour",es:"hola",emoji:"👋"},{fr:"bonsoir",es:"buenas noches",emoji:"🌙"},
    {fr:"au revoir",es:"adiós",emoji:"👋"},{fr:"pardon",es:"perdón",emoji:"😔"},
    {fr:"s'il vous plaît",es:"por favor",emoji:"🙏"},{fr:"quelque chose",es:"algo",emoji:"💭"},
  ],
  voir:[
    {fr:"bien",es:"bien",emoji:"👍"},{fr:"loin",es:"lejos",emoji:"🔭"},
    {fr:"clair",es:"claro",emoji:"💡"},{fr:"un film",es:"una película",emoji:"🎬"},
    {fr:"des amis",es:"amigos",emoji:"👥"},{fr:"la mer",es:"el mar",emoji:"🌊"},
    {fr:"la ville",es:"la ciudad",emoji:"🏙️"},{fr:"la différence",es:"la diferencia",emoji:"🔍"},
    {fr:"ça",es:"eso",emoji:"👁️"},{fr:"tout",es:"todo",emoji:"✨"},
  ],
  prendre:[
    {fr:"le bus",es:"el autobús",emoji:"🚌"},{fr:"le métro",es:"el metro",emoji:"🚇"},
    {fr:"un café",es:"un café",emoji:"☕"},{fr:"le temps",es:"el tiempo",emoji:"⏰"},
    {fr:"une pause",es:"una pausa",emoji:"⏸️"},{fr:"soin",es:"cuidado",emoji:"💚"},
    {fr:"un taxi",es:"un taxi",emoji:"🚕"},{fr:"l'avion",es:"el avión",emoji:"✈️"},
    {fr:"le train",es:"el tren",emoji:"🚆"},{fr:"des photos",es:"fotos",emoji:"📸"},
  ],
  venir:[
    {fr:"ici",es:"aquí",emoji:"📍"},{fr:"avec moi",es:"conmigo",emoji:"🤝"},
    {fr:"demain",es:"mañana",emoji:"📅"},{fr:"ce soir",es:"esta noche",emoji:"🌙"},
    {fr:"plus tard",es:"más tarde",emoji:"⏰"},{fr:"maintenant",es:"ahora",emoji:"⚡"},
    {fr:"ensemble",es:"juntos",emoji:"👫"},{fr:"souvent",es:"seguido",emoji:"🔄"},
    {fr:"vite",es:"rápido",emoji:"🏃"},{fr:"à Paris",es:"a París",emoji:"🗼"},
  ],
  mettre:[
    {fr:"la table",es:"la mesa",emoji:"🍽️"},{fr:"un manteau",es:"un abrigo",emoji:"🧥"},
    {fr:"de la musique",es:"música",emoji:"🎵"},{fr:"du temps",es:"tiempo",emoji:"⏰"},
    {fr:"de côté",es:"a un lado",emoji:"📦"},{fr:"fin",es:"fin",emoji:"🏁"},
    {fr:"en ordre",es:"en orden",emoji:"📋"},{fr:"la ceinture",es:"el cinturón",emoji:"🪢"},
    {fr:"les chaussures",es:"los zapatos",emoji:"👟"},{fr:"à jour",es:"al día",emoji:"📅"},
  ],
  partir:[
    {fr:"tôt",es:"temprano",emoji:"🌅"},{fr:"tard",es:"tarde",emoji:"🌙"},
    {fr:"demain",es:"mañana",emoji:"📅"},{fr:"maintenant",es:"ahora",emoji:"⚡"},
    {fr:"vite",es:"rápido",emoji:"🏃"},{fr:"ensemble",es:"juntos",emoji:"👫"},
    {fr:"en vacances",es:"de vacaciones",emoji:"🏖️"},{fr:"au travail",es:"al trabajo",emoji:"💼"},
    {fr:"seul",frF:"seule",frP:"seuls",frFP:"seules",es:"solo",esF:"sola",esP:"solos",esFP:"solas",emoji:"🧍"},
    {fr:"à Paris",es:"a París",emoji:"🗼"},
  ],
  finir:[
    {fr:"tôt",es:"temprano",emoji:"✅"},{fr:"tard",es:"tarde",emoji:"🌙"},
    {fr:"le travail",es:"el trabajo",emoji:"💼"},{fr:"le repas",es:"la comida",emoji:"🍽️"},
    {fr:"le livre",es:"el libro",emoji:"📖"},{fr:"le cours",es:"la clase",emoji:"🏫"},
    {fr:"bien",es:"bien",emoji:"👍"},{fr:"vite",es:"rápido",emoji:"⚡"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"toujours",es:"siempre",emoji:"♾️"},
  ],
  sortir:[
    {fr:"ce soir",es:"esta noche",emoji:"🌙"},{fr:"ensemble",es:"juntos",emoji:"👫"},
    {fr:"dehors",es:"afuera",emoji:"🚪"},{fr:"souvent",es:"seguido",emoji:"🔄"},
    {fr:"maintenant",es:"ahora",emoji:"⚡"},{fr:"vite",es:"rápido",emoji:"🏃"},
    {fr:"demain",es:"mañana",emoji:"📅"},{fr:"avec toi",es:"contigo",emoji:"🤝"},
    {fr:"en ville",es:"a la ciudad",emoji:"🏙️"},{fr:"tard",es:"tarde",emoji:"🌛"},
  ],
  parler:[
    {fr:"français",es:"francés",emoji:"🇫🇷"},{fr:"espagnol",es:"español",emoji:"🇪🇸"},
    {fr:"anglais",es:"inglés",emoji:"🇬🇧"},{fr:"vite",es:"rápido",emoji:"⚡"},
    {fr:"bien",es:"bien",emoji:"👍"},{fr:"fort",es:"fuerte",emoji:"📣"},
    {fr:"doucement",es:"suave",emoji:"🤫"},{fr:"beaucoup",es:"mucho",emoji:"💬"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"seul",es:"solo",emoji:"🧍"},
  ],
  manger:[
    {fr:"bien",es:"bien",emoji:"👍"},{fr:"beaucoup",es:"mucho",emoji:"😋"},
    {fr:"peu",es:"poco",emoji:"🤏"},{fr:"vite",es:"rápido",emoji:"⚡"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"dehors",es:"afuera",emoji:"🌞"},
    {fr:"sainement",es:"sano",emoji:"🥗"},{fr:"du pain",es:"pan",emoji:"🍞"},
    {fr:"des fruits",es:"frutas",emoji:"🍎"},{fr:"tard",es:"tarde",emoji:"🌙"},
  ],
  aimer:[
    {fr:"la musique",es:"la música",emoji:"🎵"},{fr:"voyager",es:"viajar",emoji:"✈️"},
    {fr:"lire",es:"leer",emoji:"📖"},{fr:"danser",es:"bailar",emoji:"💃"},
    {fr:"cuisiner",es:"cocinar",emoji:"👨‍🍳"},{fr:"le cinéma",es:"el cine",emoji:"🎬"},
    {fr:"les animaux",es:"los animales",emoji:"🐾"},{fr:"le sport",es:"el deporte",emoji:"⚽"},
    {fr:"la nature",es:"la naturaleza",emoji:"🌿"},{fr:"ça",es:"eso",emoji:"❤️"},
  ],
  penser:[
    {fr:"à toi",es:"en ti",emoji:"💭"},{fr:"à ça",es:"en eso",emoji:"🤔"},
    {fr:"souvent",es:"seguido",emoji:"🔄"},{fr:"toujours",es:"siempre",emoji:"♾️"},
    {fr:"bien",es:"bien",emoji:"👍"},{fr:"différemment",es:"diferente",emoji:"🔀"},
    {fr:"trop",es:"demasiado",emoji:"💭"},{fr:"comme toi",es:"como tú",emoji:"🪞"},
    {fr:"à l'avenir",es:"al futuro",emoji:"🔮"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
  ],
  trouver:[
    {fr:"ça bien",es:"eso bien",emoji:"👍"},{fr:"la solution",es:"la solución",emoji:"💡"},
    {fr:"du travail",es:"trabajo",emoji:"💼"},{fr:"un appartement",es:"un apartamento",emoji:"🏠"},
    {fr:"les clés",es:"las llaves",emoji:"🗝️"},{fr:"le chemin",es:"el camino",emoji:"🗺️"},
    {fr:"ça drôle",es:"eso gracioso",emoji:"😄"},{fr:"ça difficile",es:"eso difícil",emoji:"😰"},
    {fr:"ça normal",es:"eso normal",emoji:"🤷"},{fr:"quelqu'un",es:"a alguien",emoji:"👤"},
  ],
  donner:[
    {fr:"un cadeau",es:"un regalo",emoji:"🎁"},{fr:"une chance",es:"una oportunidad",emoji:"🍀"},
    {fr:"de l'argent",es:"dinero",emoji:"💰"},{fr:"du temps",es:"tiempo",emoji:"⏰"},
    {fr:"un conseil",es:"un consejo",emoji:"💡"},{fr:"rendez-vous",es:"una cita",emoji:"📅"},
    {fr:"une réponse",es:"una respuesta",emoji:"💬"},{fr:"un coup de main",es:"una mano",emoji:"🤝"},
    {fr:"de l'amour",es:"amor",emoji:"❤️"},{fr:"envie",es:"ganas",emoji:"🔥"},
  ],
  laisser:[
    {fr:"passer",es:"pasar",emoji:"🚶"},{fr:"un message",es:"un mensaje",emoji:"💬"},
    {fr:"la porte",es:"la puerta",emoji:"🚪"},{fr:"tomber",es:"caer",emoji:"⬇️"},
    {fr:"tranquille",es:"tranquilo",emoji:"😌"},{fr:"entrer",es:"entrar",emoji:"🚪"},
    {fr:"sortir",es:"salir",emoji:"🚪"},{fr:"faire",es:"hacer",emoji:"🔨"},
    {fr:"un pourboire",es:"una propina",emoji:"💰"},{fr:"derrière",es:"atrás",emoji:"🔙"},
  ],
  croire:[
    {fr:"en toi",es:"en ti",emoji:"💪"},{fr:"en Dieu",es:"en Dios",emoji:"🙏"},
    {fr:"ça",es:"eso",emoji:"👁️"},{fr:"toujours",es:"siempre",emoji:"♾️"},
    {fr:"vraiment",es:"de verdad",emoji:"✅"},{fr:"encore",es:"todavía",emoji:"🔁"},
    {fr:"facilement",es:"fácilmente",emoji:"😌"},{fr:"au miracle",es:"en milagros",emoji:"✨"},
    {fr:"en moi",es:"en mí",emoji:"🪞"},{fr:"les autres",es:"a los demás",emoji:"👥"},
  ],
  comprendre:[
    {fr:"bien",es:"bien",emoji:"✅"},{fr:"vite",es:"rápido",emoji:"⚡"},
    {fr:"tout",es:"todo",emoji:"🧠"},{fr:"enfin",es:"por fin",emoji:"💡"},
    {fr:"les autres",es:"a los demás",emoji:"👥"},{fr:"le français",es:"el francés",emoji:"🇫🇷"},
    {fr:"la question",es:"la pregunta",emoji:"❓"},{fr:"maintenant",es:"ahora",emoji:"⚡"},
    {fr:"peu à peu",es:"poco a poco",emoji:"📈"},{fr:"mieux",es:"mejor",emoji:"📈"},
  ],
  entendre:[
    {fr:"bien",es:"bien",emoji:"👂"},{fr:"mal",es:"mal",emoji:"😔"},
    {fr:"la musique",es:"la música",emoji:"🎵"},{fr:"du bruit",es:"ruido",emoji:"🔊"},
    {fr:"la pluie",es:"la lluvia",emoji:"🌧️"},{fr:"clairement",es:"claramente",emoji:"💡"},
    {fr:"quelque chose",es:"algo",emoji:"👂"},{fr:"les oiseaux",es:"los pájaros",emoji:"🐦"},
    {fr:"un son",es:"un sonido",emoji:"🎶"},{fr:"rien",es:"nada",emoji:"🔇"},
  ],
  attendre:[
    {fr:"ici",es:"aquí",emoji:"📍"},{fr:"longtemps",es:"mucho tiempo",emoji:"⏳"},
    {fr:"patiemment",es:"con paciencia",emoji:"🧘"},{fr:"le bus",es:"el autobús",emoji:"🚌"},
    {fr:"le métro",es:"el metro",emoji:"🚇"},{fr:"encore",es:"todavía",emoji:"🔁"},
    {fr:"dehors",es:"afuera",emoji:"🚪"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"la réponse",es:"la respuesta",emoji:"💬"},{fr:"le bon moment",es:"el momento",emoji:"⏰"},
  ],
  rester:[
    {fr:"ici",es:"aquí",emoji:"📍"},
    {fr:"calme",frF:"calme",frP:"calmes",frFP:"calmes",es:"tranquilo",esF:"tranquila",esP:"tranquilos",esFP:"tranquilas",emoji:"😌"},
    {fr:"à la maison",es:"en casa",emoji:"🏠"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"seul",frF:"seule",frP:"seuls",frFP:"seules",es:"solo",esF:"sola",esP:"solos",esFP:"solas",emoji:"🧍"},
    {fr:"debout",es:"de pie",emoji:"🧍"},
    {fr:"assis",frF:"assise",frP:"assis",frFP:"assises",es:"sentado",esF:"sentada",esP:"sentados",esFP:"sentadas",emoji:"🪑"},
    {fr:"longtemps",es:"mucho tiempo",emoji:"⏳"},{fr:"là",es:"ahí",emoji:"📍"},
    {fr:"encore",es:"todavía",emoji:"🔁"},
  ],
  passer:[
    {fr:"du bon temps",es:"buen rato",emoji:"😄"},{fr:"vite",es:"rápido",emoji:"⚡"},
    {fr:"devant",es:"adelante",emoji:"🚶"},{fr:"par ici",es:"por aquí",emoji:"📍"},
    {fr:"la soirée",es:"la tarde",emoji:"🌆"},{fr:"la nuit",es:"la noche",emoji:"🌙"},
    {fr:"l'examen",es:"el examen",emoji:"📝"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"la journée",es:"el día",emoji:"☀️"},{fr:"au bureau",es:"en la oficina",emoji:"🏢"},
  ],
  tenir:[
    {fr:"la main",es:"la mano",emoji:"🤝"},{fr:"bon",es:"firme",emoji:"💪"},
    {fr:"la porte",es:"la puerta",emoji:"🚪"},{fr:"sa promesse",es:"su promesa",emoji:"🤝"},
    {fr:"debout",es:"de pie",emoji:"🧍"},{fr:"compagnie",es:"compañía",emoji:"👫"},
    {fr:"à toi",es:"de ti",emoji:"❤️"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"le coup",es:"aguantar",emoji:"💪"},{fr:"au courant",es:"informado",emoji:"📰"},
  ],
  porter:[
    {fr:"un manteau",es:"un abrigo",emoji:"🧥"},{fr:"un sac",es:"una bolsa",emoji:"👜"},
    {fr:"des lunettes",es:"lentes",emoji:"👓"},{fr:"bien",es:"bien",emoji:"👍"},
    {fr:"des fleurs",es:"flores",emoji:"🌸"},{fr:"du rouge",es:"rojo",emoji:"🔴"},
    {fr:"le chapeau",es:"el sombrero",emoji:"🎩"},{fr:"quelque chose",es:"algo",emoji:"📦"},
    {fr:"bonheur",es:"felicidad",emoji:"😊"},{fr:"assistance",es:"asistencia",emoji:"🤝"},
  ],
  arriver:[
    {fr:"tôt",es:"temprano",emoji:"🌅"},{fr:"tard",es:"tarde",emoji:"🌙"},
    {fr:"vite",es:"rápido",emoji:"⚡"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"bientôt",es:"pronto",emoji:"🔜"},{fr:"en retard",es:"tarde",emoji:"⏰"},
    {fr:"à l'heure",es:"a tiempo",emoji:"✅"},{fr:"demain",es:"mañana",emoji:"📅"},
    {fr:"enfin",es:"por fin",emoji:"🎉"},{fr:"à Paris",es:"a París",emoji:"🗼"},
  ],
  chercher:[
    {fr:"du travail",es:"trabajo",emoji:"💼"},{fr:"un appartement",es:"apartamento",emoji:"🏠"},
    {fr:"les clés",es:"las llaves",emoji:"🗝️"},{fr:"quelqu'un",es:"a alguien",emoji:"👤"},
    {fr:"une solution",es:"una solución",emoji:"💡"},{fr:"partout",es:"por todas partes",emoji:"🔍"},
    {fr:"encore",es:"todavía",emoji:"🔁"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"le chemin",es:"el camino",emoji:"🗺️"},{fr:"à comprendre",es:"entender",emoji:"🧠"},
  ],
  appeler:[
    {fr:"demain",es:"mañana",emoji:"📅"},{fr:"maintenant",es:"ahora",emoji:"⚡"},
    {fr:"souvent",es:"seguido",emoji:"🔄"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"plus tard",es:"más tarde",emoji:"⏰"},{fr:"ce soir",es:"esta noche",emoji:"🌙"},
    {fr:"au secours",es:"para pedir ayuda",emoji:"🆘"},{fr:"toujours",es:"siempre",emoji:"♾️"},
    {fr:"un taxi",es:"un taxi",emoji:"🚕"},{fr:"un médecin",es:"un médico",emoji:"👨‍⚕️"},
  ],
  demander:[
    {fr:"pardon",es:"perdón",emoji:"😔"},{fr:"de l'aide",es:"ayuda",emoji:"🆘"},
    {fr:"l'addition",es:"la cuenta",emoji:"🧾"},{fr:"un conseil",es:"un consejo",emoji:"💡"},
    {fr:"le chemin",es:"el camino",emoji:"🗺️"},{fr:"poliment",es:"con educación",emoji:"🎩"},
    {fr:"une faveur",es:"un favor",emoji:"🙏"},{fr:"la permission",es:"permiso",emoji:"🔑"},
    {fr:"pourquoi",es:"por qué",emoji:"❓"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
  ],
  repondre:[
    {fr:"vite",es:"rápido",emoji:"⚡"},{fr:"bien",es:"bien",emoji:"👍"},
    {fr:"honnêtement",es:"honestamente",emoji:"✅"},{fr:"toujours",es:"siempre",emoji:"♾️"},
    {fr:"enfin",es:"por fin",emoji:"🎉"},{fr:"plus tard",es:"más tarde",emoji:"⏰"},
    {fr:"par écrit",es:"por escrito",emoji:"✍️"},{fr:"au téléphone",es:"por teléfono",emoji:"📞"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"clairement",es:"claramente",emoji:"💡"},
  ],
  montrer:[
    {fr:"le chemin",es:"el camino",emoji:"🗺️"},{fr:"la photo",es:"la foto",emoji:"📸"},
    {fr:"comment",es:"cómo",emoji:"👆"},{fr:"clairement",es:"claramente",emoji:"💡"},
    {fr:"tout",es:"todo",emoji:"✨"},{fr:"l'exemple",es:"el ejemplo",emoji:"📋"},
    {fr:"du respect",es:"respeto",emoji:"🙏"},{fr:"la vérité",es:"la verdad",emoji:"✅"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"sa force",es:"su fuerza",emoji:"💪"},
  ],
  ecrire:[
    {fr:"une lettre",es:"una carta",emoji:"✉️"},{fr:"un message",es:"un mensaje",emoji:"💬"},
    {fr:"bien",es:"bien",emoji:"👍"},{fr:"vite",es:"rápido",emoji:"⚡"},
    {fr:"en français",es:"en francés",emoji:"🇫🇷"},{fr:"un livre",es:"un libro",emoji:"📖"},
    {fr:"un email",es:"un email",emoji:"📧"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"beaucoup",es:"mucho",emoji:"✍️"},{fr:"clairement",es:"claramente",emoji:"💡"},
  ],
  lire:[
    {fr:"bien",es:"bien",emoji:"👍"},{fr:"vite",es:"rápido",emoji:"⚡"},
    {fr:"beaucoup",es:"mucho",emoji:"📚"},{fr:"en français",es:"en francés",emoji:"🇫🇷"},
    {fr:"le journal",es:"el periódico",emoji:"📰"},{fr:"un roman",es:"una novela",emoji:"📖"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"souvent",es:"seguido",emoji:"🔄"},
    {fr:"le soir",es:"en la noche",emoji:"🌙"},{fr:"avec plaisir",es:"con placer",emoji:"😊"},
  ],
  ouvrir:[
    {fr:"la porte",es:"la puerta",emoji:"🚪"},{fr:"la fenêtre",es:"la ventana",emoji:"🪟"},
    {fr:"les yeux",es:"los ojos",emoji:"👀"},{fr:"le livre",es:"el libro",emoji:"📖"},
    {fr:"la bouche",es:"la boca",emoji:"👄"},{fr:"le parapluie",es:"el paraguas",emoji:"☂️"},
    {fr:"un compte",es:"una cuenta",emoji:"🏦"},{fr:"doucement",es:"suave",emoji:"🤫"},
    {fr:"vite",es:"rápido",emoji:"⚡"},{fr:"enfin",es:"por fin",emoji:"🎉"},
  ],
  fermer:[
    {fr:"la porte",es:"la puerta",emoji:"🚪"},{fr:"les yeux",es:"los ojos",emoji:"😌"},
    {fr:"la fenêtre",es:"la ventana",emoji:"🪟"},{fr:"la bouche",es:"la boca",emoji:"🤫"},
    {fr:"le livre",es:"el libro",emoji:"📖"},{fr:"le robinet",es:"el grifo",emoji:"🚿"},
    {fr:"à clé",es:"con llave",emoji:"🗝️"},{fr:"doucement",es:"suave",emoji:"🤫"},
    {fr:"vite",es:"rápido",emoji:"⚡"},{fr:"le magasin",es:"la tienda",emoji:"🏪"},
  ],
  jouer:[
    {fr:"bien",es:"bien",emoji:"👍"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"au foot",es:"al fútbol",emoji:"⚽"},{fr:"au tennis",es:"al tenis",emoji:"🎾"},
    {fr:"de la guitare",es:"la guitarra",emoji:"🎸"},{fr:"du piano",es:"el piano",emoji:"🎹"},
    {fr:"aux cartes",es:"a las cartas",emoji:"🃏"},{fr:"dehors",es:"afuera",emoji:"🌞"},
    {fr:"encore",es:"otra vez",emoji:"🔁"},{fr:"souvent",es:"seguido",emoji:"🔄"},
  ],
  gagner:[
    {fr:"bien",es:"bien",emoji:"💰"},{fr:"toujours",es:"siempre",emoji:"🏆"},
    {fr:"enfin",es:"por fin",emoji:"🎉"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"facilement",es:"fácilmente",emoji:"😌"},{fr:"beaucoup",es:"mucho",emoji:"💵"},
    {fr:"le match",es:"el partido",emoji:"⚽"},{fr:"la course",es:"la carrera",emoji:"🏃"},
    {fr:"du temps",es:"tiempo",emoji:"⏰"},{fr:"sa vie",es:"la vida",emoji:"🌟"},
  ],
  travailler:[
    {fr:"bien",es:"bien",emoji:"👍"},{fr:"beaucoup",es:"mucho",emoji:"💼"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"vite",es:"rápido",emoji:"⚡"},
    {fr:"seul",frF:"seule",frP:"seuls",frFP:"seules",es:"solo",esF:"sola",esP:"solos",esFP:"solas",emoji:"🧍"},
    {fr:"tard",es:"tarde",emoji:"🌙"},{fr:"tôt",es:"temprano",emoji:"🌅"},
    {fr:"souvent",es:"seguido",emoji:"🔄"},{fr:"ici",es:"aquí",emoji:"📍"},
    {fr:"dehors",es:"afuera",emoji:"🌞"},
  ],
  habiter:[
    {fr:"ici",es:"aquí",emoji:"📍"},{fr:"à Paris",es:"en París",emoji:"🗼"},
    {fr:"ensemble",es:"juntos",emoji:"👫"},
    {fr:"seul",frF:"seule",frP:"seuls",frFP:"seules",es:"solo",esF:"sola",esP:"solos",esFP:"solas",emoji:"🧍"},
    {fr:"en ville",es:"en la ciudad",emoji:"🏙️"},{fr:"à la campagne",es:"en el campo",emoji:"🌾"},
    {fr:"au Canada",es:"en Canadá",emoji:"🍁"},{fr:"près d'ici",es:"cerca de aquí",emoji:"📍"},
    {fr:"loin",es:"lejos",emoji:"🔭"},{fr:"depuis longtemps",es:"hace mucho",emoji:"⏳"},
  ],
  rencontrer:[
    {fr:"quelqu'un",es:"a alguien",emoji:"👤"},{fr:"par hasard",es:"por casualidad",emoji:"🍀"},
    {fr:"souvent",es:"seguido",emoji:"🔄"},{fr:"des amis",es:"amigos",emoji:"👥"},
    {fr:"enfin",es:"por fin",emoji:"🎉"},{fr:"demain",es:"mañana",emoji:"📅"},
    {fr:"en ligne",es:"en línea",emoji:"💻"},{fr:"ce soir",es:"esta noche",emoji:"🌙"},
    {fr:"quelque part",es:"en algún lugar",emoji:"🗺️"},{fr:"pour la première fois",es:"por primera vez",emoji:"🌟"},
  ],
  inviter:[
    {fr:"chez moi",es:"a mi casa",emoji:"🏠"},{fr:"à dîner",es:"a cenar",emoji:"🍽️"},
    {fr:"à la fête",es:"a la fiesta",emoji:"🎉"},{fr:"demain",es:"mañana",emoji:"📅"},
    {fr:"ce soir",es:"esta noche",emoji:"🌙"},{fr:"tout le monde",es:"a todos",emoji:"👥"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"souvent",es:"seguido",emoji:"🔄"},
    {fr:"au restaurant",es:"al restaurante",emoji:"🍴"},{fr:"avec plaisir",es:"con gusto",emoji:"😊"},
  ],
  choisir:[
    {fr:"bien",es:"bien",emoji:"✅"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"vite",es:"rápido",emoji:"⚡"},{fr:"librement",es:"libremente",emoji:"🕊️"},
    {fr:"toujours",es:"siempre",emoji:"♾️"},{fr:"le bon",es:"el bueno",emoji:"🌟"},
    {fr:"la meilleure",es:"la mejor",emoji:"🥇"},{fr:"maintenant",es:"ahora",emoji:"⚡"},
    {fr:"difficilement",es:"difícilmente",emoji:"😰"},{fr:"soigneusement",es:"con cuidado",emoji:"🎯"},
  ],
  decider:[
    {fr:"maintenant",es:"ahora",emoji:"⚡"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"vite",es:"rápido",emoji:"⚡"},{fr:"enfin",es:"por fin",emoji:"🎉"},
    {fr:"seul",frF:"seule",frP:"seuls",frFP:"seules",es:"solo",esF:"sola",esP:"solos",esFP:"solas",emoji:"🧍"},
    {fr:"librement",es:"libremente",emoji:"🕊️"},{fr:"de partir",es:"irse",emoji:"✈️"},
    {fr:"de rester",es:"quedarse",emoji:"🪑"},{fr:"demain",es:"mañana",emoji:"📅"},
    {fr:"pour le mieux",es:"para lo mejor",emoji:"🌟"},
  ],
  rire:[
    {fr:"beaucoup",es:"mucho",emoji:"😂"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"souvent",es:"seguido",emoji:"🔄"},{fr:"toujours",es:"siempre",emoji:"♾️"},
    {fr:"un peu",es:"un poco",emoji:"🙂"},{fr:"fort",es:"fuerte",emoji:"😂"},
    {fr:"sans raison",es:"sin razón",emoji:"🤪"},{fr:"de bon cœur",es:"de corazón",emoji:"❤️"},
    {fr:"aux éclats",es:"a carcajadas",emoji:"🤣"},{fr:"encore",es:"otra vez",emoji:"🔁"},
  ],
  pleurer:[
    {fr:"beaucoup",es:"mucho",emoji:"😭"},{fr:"souvent",es:"seguido",emoji:"🔄"},
    {fr:"encore",es:"todavía",emoji:"🔁"},{fr:"de joie",es:"de alegría",emoji:"😂"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"en silence",es:"en silencio",emoji:"🤫"},
    {fr:"la nuit",es:"de noche",emoji:"🌙"},{fr:"sans raison",es:"sin razón",emoji:"💧"},
    {fr:"un peu",es:"un poco",emoji:"😢"},{fr:"parfois",es:"a veces",emoji:"🌦️"},
  ],
  chanter:[
    {fr:"bien",es:"bien",emoji:"🎵"},{fr:"fort",es:"fuerte",emoji:"📣"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"faux",es:"desafinado",emoji:"😅"},
    {fr:"souvent",es:"seguido",emoji:"🔄"},{fr:"toujours",es:"siempre",emoji:"♾️"},
    {fr:"en français",es:"en francés",emoji:"🇫🇷"},{fr:"à voix haute",es:"en voz alta",emoji:"🔊"},
    {fr:"doucement",es:"suave",emoji:"🤫"},{fr:"encore",es:"otra vez",emoji:"🔁"},
  ],
  danser:[
    {fr:"bien",es:"bien",emoji:"💃"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"souvent",es:"seguido",emoji:"🔄"},{fr:"toute la nuit",es:"toda la noche",emoji:"🌙"},
    {fr:"vite",es:"rápido",emoji:"⚡"},{fr:"doucement",es:"suave",emoji:"🕊️"},
    {fr:"encore",es:"otra vez",emoji:"🔁"},{fr:"dehors",es:"afuera",emoji:"🌟"},
    {fr:"sans s'arrêter",es:"sin parar",emoji:"♾️"},{fr:"avec joie",es:"con alegría",emoji:"😄"},
  ],
  conduire:[
    {fr:"bien",es:"bien",emoji:"✅"},{fr:"vite",es:"rápido",emoji:"⚡"},
    {fr:"lentement",es:"despacio",emoji:"🐢"},{fr:"prudemment",es:"con cuidado",emoji:"⚠️"},
    {fr:"seul",frF:"seule",frP:"seuls",frFP:"seules",es:"solo",esF:"sola",esP:"solos",esFP:"solas",emoji:"🧍"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"souvent",es:"seguido",emoji:"🔄"},
    {fr:"en ville",es:"en la ciudad",emoji:"🏙️"},{fr:"de nuit",es:"de noche",emoji:"🌙"},
    {fr:"longtemps",es:"mucho tiempo",emoji:"⏳"},
  ],
  voyager:[
    {fr:"souvent",es:"seguido",emoji:"🔄"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"loin",es:"lejos",emoji:"🔭"},
    {fr:"léger",frF:"légère",frP:"légers",frFP:"légères",es:"ligero",esF:"ligera",esP:"ligeros",esFP:"ligeras",emoji:"🎒"},
    {fr:"en avion",es:"en avión",emoji:"✈️"},
    {fr:"seul",frF:"seule",frP:"seuls",frFP:"seules",es:"solo",esF:"sola",esP:"solos",esFP:"solas",emoji:"🧍"},
    {fr:"partout",es:"por todas partes",emoji:"🌍"},{fr:"en train",es:"en tren",emoji:"🚆"},
    {fr:"en été",es:"en verano",emoji:"☀️"},{fr:"pour le plaisir",es:"por placer",emoji:"😊"},
  ],
  acheter:[
    {fr:"beaucoup",es:"mucho",emoji:"🛒"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"en ligne",es:"en línea",emoji:"💻"},{fr:"pas cher",es:"barato",emoji:"💰"},
    {fr:"du pain",es:"pan",emoji:"🍞"},{fr:"des vêtements",es:"ropa",emoji:"👕"},
    {fr:"un cadeau",es:"un regalo",emoji:"🎁"},{fr:"une maison",es:"una casa",emoji:"🏠"},
    {fr:"à manger",es:"comida",emoji:"🍽️"},{fr:"des fleurs",es:"flores",emoji:"🌸"},
  ],
  vendre:[
    {fr:"bien",es:"bien",emoji:"💰"},{fr:"vite",es:"rápido",emoji:"⚡"},
    {fr:"beaucoup",es:"mucho",emoji:"📈"},{fr:"en ligne",es:"en línea",emoji:"💻"},
    {fr:"pas cher",es:"barato",emoji:"🏷️"},{fr:"sa maison",es:"su casa",emoji:"🏠"},
    {fr:"des fleurs",es:"flores",emoji:"🌸"},{fr:"de la musique",es:"música",emoji:"🎵"},
    {fr:"des livres",es:"libros",emoji:"📚"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
  ],
  grandir:[
    {fr:"vite",es:"rápido",emoji:"⚡"},{fr:"bien",es:"bien",emoji:"👍"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"encore",es:"todavía",emoji:"🔁"},
    {fr:"chaque jour",es:"cada día",emoji:"📅"},{fr:"à vue d'œil",es:"a ojos vistas",emoji:"👁️"},
    {fr:"en sagesse",es:"en sabiduría",emoji:"🦉"},{fr:"normalement",es:"normalmente",emoji:"📏"},
    {fr:"en confiance",es:"con confianza",emoji:"💪"},{fr:"vite",es:"rápido",emoji:"🌱"},
  ],
  changer:[
    {fr:"de vie",es:"de vida",emoji:"🔄"},{fr:"d'avis",es:"de opinión",emoji:"💭"},
    {fr:"vite",es:"rápido",emoji:"⚡"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"de place",es:"de lugar",emoji:"🔀"},{fr:"beaucoup",es:"mucho",emoji:"📈"},
    {fr:"de travail",es:"de trabajo",emoji:"💼"},{fr:"souvent",es:"seguido",emoji:"🔄"},
    {fr:"en mieux",es:"para mejor",emoji:"📈"},{fr:"toujours",es:"siempre",emoji:"♾️"},
  ],
  dormir:[
    {fr:"bien",es:"bien",emoji:"😌"},{fr:"mal",es:"mal",emoji:"😣"},
    {fr:"beaucoup",es:"mucho",emoji:"💤"},{fr:"peu",es:"poco",emoji:"🤏"},
    {fr:"tard",es:"tarde",emoji:"🌙"},{fr:"tôt",es:"temprano",emoji:"🌅"},
    {fr:"profondément",es:"profundo",emoji:"😴"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"dehors",es:"afuera",emoji:"⛺"},{fr:"encore",es:"todavía",emoji:"🔁"},
  ],
  reveiller:[
    {fr:"tôt",es:"temprano",emoji:"🌅"},{fr:"tard",es:"tarde",emoji:"🌙"},
    {fr:"vite",es:"rápido",emoji:"⚡"},{fr:"doucement",es:"suave",emoji:"🤫"},
    {fr:"à 7 heures",es:"a las 7",emoji:"⏰"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"enfin",es:"por fin",emoji:"☀️"},{fr:"de bonne humeur",es:"de buen humor",emoji:"😊"},
    {fr:"facilement",es:"fácilmente",emoji:"😌"},{fr:"souvent",es:"seguido",emoji:"🔄"},
  ],
  preparer:[
    {fr:"le repas",es:"la comida",emoji:"🍽️"},{fr:"le dîner",es:"la cena",emoji:"🍴"},
    {fr:"le déjeuner",es:"el almuerzo",emoji:"☀️"},{fr:"le petit-déjeuner",es:"el desayuno",emoji:"🍳"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"vite",es:"rápido",emoji:"⚡"},
    {fr:"bien",es:"bien",emoji:"👍"},{fr:"l'examen",es:"el examen",emoji:"📝"},
    {fr:"les bagages",es:"el equipaje",emoji:"🧳"},{fr:"le voyage",es:"el viaje",emoji:"✈️"},
  ],
  cuisiner:[
    {fr:"bien",es:"bien",emoji:"👍"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"souvent",es:"seguido",emoji:"🔄"},{fr:"vite",es:"rápido",emoji:"⚡"},
    {fr:"sainement",es:"sano",emoji:"🥗"},{fr:"avec amour",es:"con amor",emoji:"❤️"},
    {fr:"le soir",es:"en la noche",emoji:"🌙"},{fr:"pour toi",es:"para ti",emoji:"🎁"},
    {fr:"des pâtes",es:"pasta",emoji:"🍝"},{fr:"en famille",es:"en familia",emoji:"👨‍👩‍👧"},
  ],
  marcher:[
    {fr:"bien",es:"bien",emoji:"👍"},{fr:"vite",es:"rápido",emoji:"⚡"},
    {fr:"lentement",es:"despacio",emoji:"🐢"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"dehors",es:"afuera",emoji:"🌞"},{fr:"souvent",es:"seguido",emoji:"🔄"},
    {fr:"longtemps",es:"mucho tiempo",emoji:"⏳"},{fr:"pieds nus",es:"descalzo",emoji:"🦶"},
    {fr:"en ville",es:"en la ciudad",emoji:"🏙️"},{fr:"dans la nature",es:"en la naturaleza",emoji:"🌿"},
  ],
  courir:[
    {fr:"vite",es:"rápido",emoji:"⚡"},{fr:"ensemble",es:"juntos",emoji:"🤝"},
    {fr:"souvent",es:"seguido",emoji:"🔄"},{fr:"dehors",es:"afuera",emoji:"🌞"},
    {fr:"longtemps",es:"mucho tiempo",emoji:"⏳"},{fr:"le matin",es:"en la mañana",emoji:"🌅"},
    {fr:"un marathon",es:"un maratón",emoji:"🏃"},{fr:"encore",es:"otra vez",emoji:"🔁"},
    {fr:"sans s'arrêter",es:"sin parar",emoji:"♾️"},{fr:"partout",es:"por todas partes",emoji:"🏃"},
  ],
  tomber:[
    {fr:"vite",es:"rápido",emoji:"⬇️"},{fr:"souvent",es:"seguido",emoji:"🔄"},
    {fr:"amoureux",frF:"amoureuse",frP:"amoureux",frFP:"amoureuses",es:"enamorado",esF:"enamorada",esP:"enamorados",esFP:"enamoradas",emoji:"❤️"},
    {fr:"malade",frF:"malade",frP:"malades",frFP:"malades",es:"enfermo",esF:"enferma",esP:"enfermos",esFP:"enfermas",emoji:"🤒"},
    {fr:"par terre",es:"al suelo",emoji:"🌍"},{fr:"de fatigue",es:"de cansancio",emoji:"😴"},
    {fr:"encore",es:"otra vez",emoji:"🔁"},{fr:"à pic",es:"en picada",emoji:"📉"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"facilement",es:"fácilmente",emoji:"😰"},
  ],
  monter:[
    {fr:"vite",es:"rápido",emoji:"⚡"},{fr:"lentement",es:"despacio",emoji:"🐢"},
    {fr:"ensemble",es:"juntos",emoji:"🤝"},{fr:"en haut",es:"arriba",emoji:"⬆️"},
    {fr:"les escaliers",es:"las escaleras",emoji:"🪜"},{fr:"dans la voiture",es:"al carro",emoji:"🚗"},
    {fr:"à cheval",es:"a caballo",emoji:"🐴"},{fr:"sur scène",es:"al escenario",emoji:"🎭"},
    {fr:"le son",es:"el volumen",emoji:"🔊"},{fr:"encore",es:"otra vez",emoji:"🔁"},
  ],
};

const VM={
  etre:{es:"ser/estar",emoji:"⭐"},avoir:{es:"tener",emoji:"✋"},
  aller:{es:"ir",emoji:"🚶"},faire:{es:"hacer",emoji:"🔨"},
  pouvoir:{es:"poder",emoji:"💪"},vouloir:{es:"querer",emoji:"❤️"},
  savoir:{es:"saber",emoji:"🧠"},devoir:{es:"deber",emoji:"📋"},
  dire:{es:"decir",emoji:"💬"},voir:{es:"ver",emoji:"👁️"},
  prendre:{es:"tomar",emoji:"✋"},venir:{es:"venir",emoji:"🚪"},
  mettre:{es:"poner",emoji:"📦"},partir:{es:"salir/irse",emoji:"🚀"},
  finir:{es:"terminar",emoji:"✅"},sortir:{es:"salir",emoji:"🌟"},
  parler:{es:"hablar",emoji:"🗣️"},manger:{es:"comer",emoji:"🍽️"},
  aimer:{es:"amar/gustar",emoji:"❤️"},penser:{es:"pensar",emoji:"🤔"},
  trouver:{es:"encontrar",emoji:"🔍"},donner:{es:"dar",emoji:"🎁"},
  laisser:{es:"dejar",emoji:"🤲"},croire:{es:"creer",emoji:"🙏"},
  comprendre:{es:"entender",emoji:"🧠"},entendre:{es:"oír",emoji:"👂"},
  attendre:{es:"esperar",emoji:"⏳"},rester:{es:"quedarse",emoji:"🪑"},
  passer:{es:"pasar",emoji:"🚶"},tenir:{es:"sostener",emoji:"🤝"},
  porter:{es:"llevar",emoji:"👜"},arriver:{es:"llegar",emoji:"📍"},
  chercher:{es:"buscar",emoji:"🔍"},appeler:{es:"llamar",emoji:"📞"},
  demander:{es:"pedir",emoji:"🙏"},repondre:{es:"responder",emoji:"💬"},
  montrer:{es:"mostrar",emoji:"👆"},ecrire:{es:"escribir",emoji:"✍️"},
  lire:{es:"leer",emoji:"📖"},ouvrir:{es:"abrir",emoji:"🚪"},
  fermer:{es:"cerrar",emoji:"🔒"},jouer:{es:"jugar",emoji:"🎮"},
  gagner:{es:"ganar",emoji:"🏆"},travailler:{es:"trabajar",emoji:"💼"},
  habiter:{es:"vivir",emoji:"🏠"},rencontrer:{es:"encontrar",emoji:"👥"},
  inviter:{es:"invitar",emoji:"🎉"},choisir:{es:"elegir",emoji:"🎯"},
  decider:{es:"decidir",emoji:"⚖️"},rire:{es:"reírse",emoji:"😂"},
  pleurer:{es:"llorar",emoji:"😭"},chanter:{es:"cantar",emoji:"🎵"},
  danser:{es:"bailar",emoji:"💃"},conduire:{es:"conducir",emoji:"🚗"},
  voyager:{es:"viajar",emoji:"✈️"},acheter:{es:"comprar",emoji:"🛒"},
  vendre:{es:"vender",emoji:"💰"},grandir:{es:"crecer",emoji:"📈"},
  changer:{es:"cambiar",emoji:"🔄"},dormir:{es:"dormir",emoji:"😴"},
  reveiller:{es:"despertar",emoji:"⏰"},preparer:{es:"preparar",emoji:"🧑‍🍳"},
  cuisiner:{es:"cocinar",emoji:"👨‍🍳"},marcher:{es:"caminar",emoji:"🚶"},
  courir:{es:"correr",emoji:"🏃"},tomber:{es:"caer",emoji:"⬇️"},
  monter:{es:"subir",emoji:"⬆️"},
};

function buildSlots(kA,kB){
  const s=[];
  for(let i=0;i<10;i++){
    s.push({inf:kA,conj:C[kA],conjEs:E[kA],preds:P[kA],predIdx:i});
    s.push({inf:kB,conj:C[kB],conjEs:E[kB],preds:P[kB],predIdx:i});
  }
  return s;
}

const PAIRS=[
  ["etre","avoir"],["aller","faire"],["pouvoir","vouloir"],["savoir","devoir"],["dire","voir"],["prendre","venir"],["mettre","partir"],
  ["finir","sortir"],["parler","manger"],["aimer","penser"],["trouver","donner"],["laisser","croire"],["comprendre","entendre"],["attendre","rester"],
  ["passer","tenir"],["porter","arriver"],["chercher","appeler"],["demander","repondre"],["montrer","ecrire"],["lire","ouvrir"],["fermer","jouer"],
  ["gagner","travailler"],["habiter","rencontrer"],["inviter","choisir"],["decider","rire"],["pleurer","chanter"],["danser","conduire"],["voyager","acheter"],
  ["vendre","grandir"],["changer","dormir"],["reveiller","preparer"],["cuisiner","marcher"],["courir","tomber"],["monter","partir"],["etre","avoir"],
];
const TIPS=[
  "être & avoir unlock everything — master these first! ⭐",
  "aller & faire: irregular but used every single day!",
  "Modal verbs: combine with any infinitive for power sentences!",
  "savoir = know how · devoir = must/should · Both essential!",
  "dire & voir: key irregular verbs for daily conversation.",
  "prendre (take) & venir (come) — irregular but super frequent!",
  "mettre (put) & partir (leave) — learn these for travel!",
  "finir: model -IR verb · sortir: irregular, watch out!",
  "parler: model -ER verb · manger adds 'e' before -ons!",
  "aimer & penser — great for expressing feelings and opinions!",
  "trouver & donner — very common -ER verbs, regular pattern!",
  "laisser & croire — to leave/let and to believe!",
  "comprendre & entendre — understanding and hearing!",
  "attendre & rester — waiting and staying. Both super useful!",
  "passer & tenir — to pass/spend time and to hold!",
  "porter & arriver — to carry/wear and to arrive!",
  "chercher & appeler — to look for and to call!",
  "demander & répondre — to ask and to answer!",
  "montrer & écrire — to show and to write!",
  "lire & ouvrir — to read and to open!",
  "fermer & jouer — to close and to play!",
  "gagner & travailler — to win/earn and to work!",
  "habiter & rencontrer — to live and to meet!",
  "inviter & choisir — to invite and to choose!",
  "décider & rire — to decide and to laugh!",
  "pleurer & chanter — to cry and to sing!",
  "danser & conduire — to dance and to drive!",
  "voyager & acheter — to travel and to buy!",
  "vendre & grandir — to sell and to grow!",
  "changer & dormir — to change and to sleep!",
  "se réveiller & préparer — to wake up and to prepare!",
  "cuisiner & marcher — to cook and to walk!",
  "courir & tomber — to run and to fall!",
  "monter & partir — to go up and to leave!",
  "🎉 GRAND REVIEW — 1 full month done. Incroyable! 🏆",
];
const DNAMES=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const DEMOJI=["☀️","🔴","🟠","🟡","🟢","🟣","🩷"];
const DCOLORS=["#FDCB6E","#FF6B6B","#FF9F43","#FECA57","#1DD1A1","#A29BFE","#FD79A8"];

function makeDay(i){
  const[kA,kB]=PAIRS[i];
  const dow=i%7,week=Math.floor(i/7)+1;
  const vA=VM[kA]||{es:kA,emoji:"📝"},vB=VM[kB]||{es:kB,emoji:"📝"};
  return{day:i+1,label:`S${week} ${DNAMES[dow]}`,shortLabel:DNAMES[dow],week,
    color:DCOLORS[dow],emoji:DEMOJI[dow],
    theme:`${kA} + ${kB}`,themeEs:`${vA.es} + ${vB.es}`,tip:TIPS[i],
    slots:buildSlots(kA,kB),verbA:kA,verbB:kB};
}
const MONTH=Array.from({length:35},(_,i)=>makeDay(i));

function speakPromise(text,lang,rate=0.82){
  return new Promise(resolve=>{
    if(!window.speechSynthesis)return resolve();
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang=lang;u.rate=rate;u.pitch=1.05;u.onend=resolve;u.onerror=resolve;
    const voices=window.speechSynthesis.getVoices();
    if(lang==="fr-FR"){const v=voices.find(v=>v.lang.startsWith("fr")&&v.localService)||voices.find(v=>v.lang.startsWith("fr"));if(v)u.voice=v;}
    else{const v=voices.find(v=>v.lang.startsWith("es")&&v.localService)||voices.find(v=>v.lang.startsWith("es"));if(v)u.voice=v;}
    window.speechSynthesis.speak(u);
  });
}
const delay=ms=>new Promise(r=>setTimeout(r,ms));

export default function FrenchDrill({ onTabChange }){
  const[mainTab,setMainTab]=useState(0);
  const[activeCard,setActiveCard]=useState(null);
  const[manualSpk,setManualSpk]=useState(null);
  const[activeDayIdx,setActiveDayIdx]=useState(0);
  const[activeSlot,setActiveSlot]=useState(0);
  const[activeWeek,setActiveWeek]=useState(0);
  const[isPlaying,setIsPlaying]=useState(false);
  const[isPaused,setIsPaused]=useState(false);
  const[playRow,setPlayRow]=useState(null);
  const[playPhase,setPlayPhase]=useState("");
  const stopRef=useRef(false);

  useEffect(()=>{window.speechSynthesis.getVoices();},[]);
  const day=MONTH[activeDayIdx];
  const slot=day.slots[activeSlot];
  const pred=slot.preds[slot.predIdx%slot.preds.length];
  const slotVM=VM[slot.inf]||{es:slot.inf,emoji:"📝"};
  useEffect(()=>{stopPlayback();},[activeDayIdx,activeSlot]);

  function stopPlayback(){stopRef.current=true;window.speechSynthesis.cancel();setIsPlaying(false);setIsPaused(false);setPlayRow(null);setPlayPhase("");}
  function togglePause(){if(isPaused){stopRef.current=false;setIsPaused(false);window.speechSynthesis.resume();}else{setIsPaused(true);window.speechSynthesis.pause();}}
  function buildFR(si){return`${SUBJECTS[si].french} ${slot.conj[si]} ${frForm(pred,si)}`;}
  function buildES(si){return`${SUBJECTS[si].spanish} ${slot.conjEs[si]} ${esForm(pred,si)}`;}

  async function startAutoplay(){
    stopRef.current=false;setIsPlaying(true);setIsPaused(false);
    for(let i=0;i<SUBJECTS.length;i++){
      if(stopRef.current)break;
      setPlayRow(i);
      setPlayPhase("🇫🇷 Français");await speakPromise(buildFR(i),"fr-FR",0.78);if(stopRef.current)break;
      await delay(550);
      setPlayPhase("🇪🇸 Español");await speakPromise(buildES(i),"es-ES",0.82);if(stopRef.current)break;
      await delay(550);
      setPlayPhase("🇫🇷 ¡Repite!");await speakPromise(buildFR(i),"fr-FR",0.78);if(stopRef.current)break;
      await delay(900);
    }
    if(!stopRef.current){setPlayPhase("✅ ¡Terminado!");await delay(1400);}
    setIsPlaying(false);setIsPaused(false);setPlayRow(null);setPlayPhase("");
  }

  function tapRow(si){if(isPlaying)return;window.speechSynthesis.cancel();setManualSpk(si);speakPromise(buildFR(si),"fr-FR").then(()=>setManualSpk(null));}
  const hl=isPlaying?playRow:manualSpk;
  const daysInWeek=MONTH.filter(d=>d.week===activeWeek+1);

  return(
    <div style={{position:"fixed",inset:0,overflowY:"auto",background:"linear-gradient(135deg,#667eea 0%,#764ba2 100%)",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",padding:"20px 24px 60px",boxSizing:"border-box"}}>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:12}}>
        {[["📝 Letras","letters"],["🔢 Números","numbers"],["🧑 Verbos","verbos"]].map(([label,key])=>(
          <button key={key} onClick={()=>onTabChange&&onTabChange(key)} style={{padding:"8px 20px",borderRadius:20,border:`2px solid ${key==="verbos"?"#667eea":"#d0d0ea"}`,background:key==="verbos"?"#667eea":"transparent",color:key==="verbos"?"#fff":"#888",fontSize:17,fontWeight:700,cursor:"pointer"}}>{label}</button>
        ))}
      </div>
      <div style={{textAlign:"center",marginBottom:10}}>
        <div style={{fontSize:15,letterSpacing:4,color:"#999",textTransform:"uppercase",marginBottom:2}}>🇫🇷 → 🇪🇸 · Plan de 1 Mes</div>
        <h1 style={{margin:0,fontSize:32,fontWeight:800,color:"#222",letterSpacing:-0.5}}>French Drill</h1>
        <div style={{fontSize:15,color:"#888",marginTop:1}}>Día {day.day}/35 · Semana {day.week}/5</div>
      </div>

      <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:12}}>
        {["🃏 Cards","📊 Tabla"].map((t,i)=>(
          <button key={i} onClick={()=>{stopPlayback();setMainTab(i);}} style={{padding:"8px 20px",borderRadius:20,border:`2px solid ${mainTab===i?"#667eea":"#d0d0ea"}`,background:mainTab===i?"#667eea":"transparent",color:mainTab===i?"#fff":"#888",fontSize:17,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>{t}</button>
        ))}
      </div>

      {mainTab===0&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,maxWidth:"100%"}}>
          {SUBJECTS.map((s,idx)=>{
            const on=activeCard===idx,spk=manualSpk===idx;
            return(<div key={idx} onClick={()=>{setActiveCard(idx);setManualSpk(idx);speakPromise(s.french,"fr-FR").then(()=>setManualSpk(null));}} style={{background:on?`linear-gradient(135deg,${s.color}22,${s.color}08)`:"#1a1a2e",border:`1.5px solid ${on?s.color:"#d0d0ea"}`,borderRadius:12,padding:"9px 10px",cursor:"pointer",position:"relative",overflow:"hidden",transition:"all 0.2s",transform:on?"scale(0.97)":"scale(1)",userSelect:"none",WebkitTapHighlightColor:"transparent"}}>
              {spk&&<div style={{position:"absolute",inset:0,borderRadius:12,background:`radial-gradient(circle,${s.color}33,transparent 70%)`,animation:"pulse 0.8s ease-in-out infinite alternate",pointerEvents:"none"}}/>}
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:s.color,borderRadius:"12px 12px 0 0",opacity:on?1:0.3}}/>
              <div style={{fontSize:28,marginBottom:2}}>{s.emoji}</div>
              <div style={{fontSize:15,color:s.color,opacity:0.8,fontStyle:"italic",marginBottom:2}}>/{s.phonetic}/</div>
              <div style={{fontSize:34,fontWeight:800,color:on?s.color:"#222",lineHeight:1,marginBottom:2,letterSpacing:-0.5}}>{s.french}</div>
              <div style={{fontSize:18,color:"#9a6e00",fontWeight:600}}>🇪🇸 {s.spanish}</div>
              <div style={{position:"absolute",bottom:6,right:8,fontSize:18,opacity:spk?1:0.2,animation:spk?"bounce 0.5s infinite alternate":"none"}}>🔊</div>
            </div>);
          })}
        </div>
      )}

      {mainTab===1&&(
        <div style={{maxWidth:"100%"}}>
          {/* Autoplay */}
          <div style={{background:"#ebebff",border:`2px solid ${isPlaying?day.color:"#d0d0ea"}`,borderRadius:14,padding:"9px 12px",marginBottom:10,display:"flex",alignItems:"center",gap:10,boxShadow:isPlaying?`0 0 18px ${day.color}44`:"none",transition:"all 0.3s"}}>
            <div style={{display:"flex",gap:5,flexShrink:0}}>
              {!isPlaying?(
                <button onClick={startAutoplay} style={{width:42,height:42,borderRadius:"50%",background:`linear-gradient(135deg,${day.color},${day.color}99)`,border:"none",fontSize:30,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 14px ${day.color}66`}}>▶️</button>
              ):(
                <><button onClick={togglePause} style={{width:36,height:36,borderRadius:"50%",background:isPaused?"#FECA57":"#FF9F43",border:"none",fontSize:23,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{isPaused?"▶":"⏸"}</button>
                <button onClick={stopPlayback} style={{width:36,height:36,borderRadius:"50%",background:"#FF6B6B",border:"none",fontSize:23,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>⏹</button></>
              )}
            </div>
            <div style={{flex:1,minWidth:0}}>
              {!isPlaying?(
                <div><div style={{fontSize:18,fontWeight:700,color:"#222",marginBottom:1}}>▶ Autoplay</div><div style={{fontSize:15,color:"#888"}}>🇫🇷 → 🇪🇸 → 🇫🇷 por cada sujeto</div></div>
              ):(
                <div>
                  <div style={{fontSize:17,fontWeight:700,color:day.color,marginBottom:1}}>{isPaused?"⏸ Pausado":playPhase}</div>
                  {playRow!==null&&<div style={{fontSize:18,color:"#222",fontWeight:600}}><span style={{color:SUBJECTS[playRow].color}}>{SUBJECTS[playRow].emoji} {SUBJECTS[playRow].french}</span><span style={{color:"#888",fontSize:15,marginLeft:5}}>{SUBJECTS[playRow].spanish}</span></div>}
                  <div style={{display:"flex",gap:3,marginTop:3}}>{SUBJECTS.map((_,i)=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:i<(playRow??0)?day.color:i===playRow?"#fff":"#d0d0ea",transition:"background 0.3s"}}/>)}</div>
                </div>
              )}
            </div>
            {isPlaying&&playRow!==null&&<div style={{fontSize:15,color:"#888",flexShrink:0}}><span style={{fontSize:25,fontWeight:800,color:day.color}}>{playRow+1}</span><span style={{color:"#333"}}>/9</span></div>}
          </div>

          {/* Week tabs */}
          <div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:6}}>
            {[0,1,2,3,4].map(w=>(
              <button key={w} onClick={()=>setActiveWeek(w)} style={{padding:"4px 10px",borderRadius:20,border:`1.5px solid ${activeWeek===w?"#fff":"#d0d0ea"}`,background:activeWeek===w?"#fff":"transparent",color:activeWeek===w?"#0a0a14":"#555",fontSize:15,fontWeight:700,cursor:"pointer"}}>S{w+1}</button>
            ))}
          </div>

          {/* Day pills */}
          <div style={{display:"flex",gap:4,justifyContent:"center",flexWrap:"wrap",marginBottom:8}}>
            {daysInWeek.map(d=>(
              <button key={d.day} onClick={()=>{setActiveDayIdx(d.day-1);setActiveSlot(0);}} style={{padding:"4px 8px",borderRadius:20,border:`1.5px solid ${activeDayIdx===d.day-1?d.color:"#d0d0ea"}`,background:activeDayIdx===d.day-1?`${d.color}22`:"transparent",color:activeDayIdx===d.day-1?d.color:"#888",fontSize:13,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>{d.emoji} {d.shortLabel}</button>
            ))}
          </div>

          {/* Day info */}
          <div style={{background:"#f4f4ff",border:`1px solid ${day.color}44`,borderRadius:10,padding:"6px 12px",marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:1}}>
              <span style={{fontSize:18,fontWeight:800,color:day.color}}>Día {day.day} · {day.label}</span>
              <span style={{fontSize:13,color:"#888"}}>🇪🇸 {day.themeEs}</span>
            </div>
            <div style={{fontSize:15,color:"#666",fontStyle:"italic"}}>💡 {day.tip}</div>
          </div>

          {/* Slot pills */}
          <div style={{marginBottom:8}}>
            <div style={{fontSize:13,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:4,textAlign:"center"}}>Práctica {activeSlot+1} / {day.slots.length}</div>
            <div style={{display:"flex",gap:3,flexWrap:"wrap",justifyContent:"center"}}>
              {day.slots.map((_,i)=>(
                <button key={i} onClick={()=>setActiveSlot(i)} style={{width:21,height:21,borderRadius:"50%",border:`1.5px solid ${activeSlot===i?day.color:"#d0d0ea"}`,background:activeSlot===i?day.color:"#1a1a2e",color:activeSlot===i?"#0a0a14":"#555",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all 0.12s"}}>{i+1}</button>
              ))}
            </div>
          </div>

          {/* Verb + pred */}
          <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:5,alignItems:"center",marginBottom:8}}>
            <div style={{background:`${day.color}18`,border:`1.5px solid ${day.color}55`,borderRadius:10,padding:"7px 8px",textAlign:"center"}}>
              <div style={{fontSize:13,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:1}}>🔵 Verbe</div>
              <div style={{fontSize:13,marginBottom:1}}>{slotVM.emoji}</div>
              <div style={{fontSize:25,fontWeight:800,color:day.color,lineHeight:1}}>{slot.inf}</div>
              <div style={{fontSize:13,color:"#9a6e00",marginTop:1}}>🇪🇸 {slotVM.es}</div>
            </div>
            <div style={{fontSize:23,color:"#333",textAlign:"center"}}>+</div>
            <div style={{background:"#1DD1A122",border:"1.5px solid #1DD1A155",borderRadius:10,padding:"7px 8px",textAlign:"center"}}>
              <div style={{fontSize:13,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:1}}>📝 Predicado</div>
              <div style={{fontSize:13,marginBottom:1}}>{pred.emoji}</div>
              <div style={{fontSize:25,fontWeight:800,color:"#1DD1A1",lineHeight:1}}>{pred.fr}</div>
              <div style={{fontSize:13,color:"#9a6e00",marginTop:1}}>🇪🇸 {pred.es}</div>
            </div>
          </div>

          {/* Col headers */}
          <div style={{display:"grid",gridTemplateColumns:"20px 1fr 1fr 1fr",gap:4,marginBottom:3}}>
            {["","🧑 Sujeto","🔵 Verbo","📝 Predicado"].map((h,i)=>(
              <div key={i} style={{fontSize:11,color:"#888",letterSpacing:1,textTransform:"uppercase",fontWeight:700,padding:"0 3px"}}>{h}</div>
            ))}
          </div>

          {/* Rows */}
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            {SUBJECTS.map((s,idx)=>{
              const isActive=hl===idx,pFR=frForm(pred,idx),pES=esForm(pred,idx),isNow=isPlaying&&playRow===idx;
              return(
                <div key={idx} onClick={()=>tapRow(idx)} style={{display:"grid",gridTemplateColumns:"20px 1fr 1fr 1fr",gap:3,alignItems:"stretch",cursor:isPlaying?"default":"pointer",userSelect:"none",WebkitTapHighlightColor:"transparent",opacity:isPlaying&&!isActive?0.4:1,transition:"opacity 0.3s"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{isNow?<span style={{animation:"bounce 0.4s infinite alternate"}}>{s.emoji}</span>:s.emoji}</div>
                  <div style={{background:isActive?`${s.color}28`:"#1a1a2e",border:`1.5px solid ${isActive?s.color:"#d0d0ea"}`,borderRadius:6,padding:"5px 6px",transition:"all 0.2s",boxShadow:isActive?`0 0 10px ${s.color}44`:"none"}}>
                    <div style={{fontSize:22,fontWeight:800,color:s.color,lineHeight:1}}>{s.french}</div>
                    <div style={{fontSize:11,color:"#9a6e00",marginTop:1,fontWeight:600}}>🇪🇸 {s.spanish}</div>
                  </div>
                  <div style={{background:isActive?`${day.color}28`:"#1a1a2e",border:`1.5px solid ${isActive?day.color:"#d0d0ea"}`,borderRadius:6,padding:"5px 6px",transition:"all 0.2s",boxShadow:isActive?`0 0 10px ${day.color}44`:"none"}}>
                    <div style={{fontSize:22,fontWeight:800,color:day.color,lineHeight:1}}>{slot.conj[idx]}</div>
                    <div style={{fontSize:11,color:"#9a6e00",marginTop:1,fontWeight:600}}>🇪🇸 {slot.conjEs[idx]}</div>
                    {isNow&&<div style={{fontSize:11,marginTop:1}}>🔊</div>}
                  </div>
                  <div style={{background:isActive?"#1DD1A128":"#1a1a2e",border:`1.5px solid ${isActive?"#1DD1A1":"#d0d0ea"}`,borderRadius:6,padding:"5px 6px",transition:"all 0.2s",boxShadow:isActive?"0 0 10px #1DD1A144":"none"}}>
                    <div style={{fontSize:20,fontWeight:800,color:"#1DD1A1",lineHeight:1}}>{pFR}</div>
                    <div style={{fontSize:11,color:"#9a6e00",marginTop:1,fontWeight:600}}>🇪🇸 {pES}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {isPlaying&&(
            <div style={{marginTop:10,textAlign:"center",padding:"7px 12px",background:"#ebebff",borderRadius:10,border:"1px solid #2a2a3e"}}>
              <div style={{fontSize:18,fontWeight:700,color:day.color,marginBottom:3}}>{playPhase}</div>
              {playRow!==null&&<><div style={{fontSize:22,color:"#222",fontWeight:700,marginBottom:2}}>🇫🇷 {buildFR(playRow)}</div><div style={{fontSize:20,color:"#9a6e00"}}>🇪🇸 {buildES(playRow)}</div></>}
            </div>
          )}

          <div style={{marginTop:8,background:"#f4f4ff",border:"1px solid #2a2a3e",borderRadius:10,padding:"7px 11px"}}>
            <div style={{fontSize:11,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>📖 Oraciones completas</div>
            {SUBJECTS.map((s,idx)=>{
              const pFR=frForm(pred,idx),pES=esForm(pred,idx),isHl=hl===idx;
              return(
                <div key={idx} onClick={()=>tapRow(idx)} style={{fontSize:17,marginBottom:3,lineHeight:1.5,cursor:isPlaying?"default":"pointer",display:"flex",gap:5,alignItems:"baseline",opacity:isPlaying&&!isHl?0.3:1,transition:"opacity 0.3s"}}>
                  <span style={{color:s.color,fontWeight:700,minWidth:30}}>{s.french}</span>
                  <span style={{color:day.color,fontWeight:700}}>{slot.conj[idx]}</span>
                  <span style={{color:"#1DD1A1",fontWeight:700}}>{pFR}</span>
                  <span style={{color:"#999",fontSize:11,marginLeft:2}}>🇪🇸 {s.spanish} {slot.conjEs[idx]} {pES}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{textAlign:"center",marginTop:16,fontSize:15,color:"#d0d0ea"}}>{isPlaying?`🔊 ${playPhase}`:"toca para escuchar · ▶ para autoplay"}</div>
      <style>{`@keyframes pulse{from{opacity:.4}to{opacity:1}}@keyframes bounce{from{transform:translateY(0)}to{transform:translateY(-4px)}}`}</style>
    </div>
  );
}
