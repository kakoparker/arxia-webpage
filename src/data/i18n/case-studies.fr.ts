// French content for src/data/case-studies.ts. Keyed by project slug; each
// entry is a complete CaseStudyContent. Missing slugs fall back to English.
import type { CaseStudyContent } from "../case-studies";

export const caseStudiesFr: Record<string, CaseStudyContent> = {
  "romania-ukrainian-interop": {
    title: "Services interopérables pour les réfugiés",
    eyebrow: "Services numériques inclusifs et interopérables",
    practices: ["Intégration de services", "e-Services aux citoyens"],
    lede:
      "Comment la Roumanie a réuni la protection sociale, l’éducation et l’emploi des réfugiés ukrainiens sur une plateforme multilingue unique : un programme financé par la Banque mondiale, et un modèle depuis cité par l’UE.",
    summary:
      "Protection sociale, éducation et emploi des réfugiés ukrainiens, réunis sur une seule plateforme multilingue. Un compte, réutilisé d’une institution à l’autre.",
    metaDescription:
      "Étude de cas : comment la Roumanie a réuni la protection sociale, l’éducation et l’emploi des réfugiés ukrainiens sur une plateforme multilingue et interopérable. Financée par la Banque mondiale, citée par l’UE.",
    metrics: [
      { value: "3", label: "Domaines de service, un seul parcours" },
      { value: "1", label: "Compte, réutilisé entre institutions" },
      { value: "3", label: "Langues · UA RO EN, traduction par IA" },
      { value: "UE", label: "Citée comme référence de réponse aux crises" },
    ],
    problem: {
      heading: "Le problème",
      paragraphs: [
        "Des centaines de milliers de personnes arrivant d’Ukraine se sont heurtées à un paysage de services conçu pour d’autres. Les prestations en espèces, la scolarisation et le placement professionnel relevaient d’institutions différentes, chacune avec ses propres procédures, formulaires et système informatique — aucun n’étant conçu pour un usage multilingue ni pour une gestion de dossiers partagée.",
        "Les formulaires n’existaient qu’en roumain et les institutions improvisaient avec des traducteurs bénévoles. Des politiques généreuses existaient ; les personnes pour qui elles avaient été écrites ne pouvaient pas y accéder.",
      ],
    },
    solution: {
      heading: "Notre réponse",
      intro:
        "Nous avons commencé par les processus, pas par le logiciel. Les parcours des trois domaines ont été cartographiés avec le personnel de terrain et reconstruits autour d’une règle : l’identité et les données de base sont saisies une seule fois, puis réutilisées en toute sécurité par chaque institution.",
      figCaption: "Le flux du service",
      figFrom: "Accueil fragmenté",
      figTo: "Un guichet unique inclusif",
      steps: [
        { title: "Cartographier", text: "Les trois domaines parcourus de bout en bout avec les institutions qui les gèrent." },
        { title: "Repenser", text: "Le parcours reconstruit du point de vue du réfugié ; doublons et étapes inutiles supprimés." },
        { title: "Saisie unique", text: "Identité et données de base saisies une seule fois, puis réutilisées en toute sécurité." },
        { title: "Un guichet unique", text: "Prestations, places scolaires et emplois accessibles depuis un seul compte, sur tout appareil." },
        { title: "Dossier clos", text: "Orienté vers la bonne institution, suivi jusqu’à la prestation." },
      ],
      beneathLabel: "Présent à chaque étape",
      layers: [
        {
          title: "Couche de traduction par IA",
          text: "Formulaires, notifications et messages rendus en UA, RO ou EN — sans interprète intermédiaire.",
          icon: "translation",
        },
        {
          title: "Dossier partagé entre institutions",
          text: "Un seul dossier d’une institution à l’autre ; les ONG et le personnel de terrain peuvent agir au nom de la personne.",
          icon: "case-rails",
        },
      ],
    },
    results: {
      heading: "Le résultat",
      outcomes: [
        { title: "Un point d’entrée, en service", text: "Trois domaines de service accessibles depuis un seul compte multilingue." },
        { title: "La traduction comme infrastructure", text: "La langue prise en charge par la plateforme, pas par des interprètes improvisés." },
        { title: "Reconnu au niveau européen", text: "Une réponse inclusive qui a renforcé les systèmes nationaux au lieu de les contourner." },
      ],
    },
    impact: {
      heading: "L’impact : une solution durable à une crise qui perdure",
      items: [
        { title: "Moins de charge administrative", figure: "burden" },
        { title: "Accès plus rapide aux droits", figure: "speed" },
        { title: "Des institutions qui agissent comme une seule", figure: "institutions" },
      ],
    },
    apply: {
      heading: "Appliquons ce modèle dans votre pays",
      body:
        "La crise a révélé la fragmentation ; elle ne l’a pas créée. Tout événement de vie qui traverse plusieurs institutions se heurte au même mur. Le modèle du guichet unique tient ; seuls les services derrière lui changent.",
      figCaption: "Le modèle du guichet unique",
      pattern: {
        users: "Citoyen · Réfugié · Travailleur social d’ONG",
        core: "Un compte + couche de traduction par IA",
        services: ["Prestations", "Écoles", "Emploi"],
      },
      uses: [
        { title: "Déplacements et migrations", text: "Une capacité permanente, prête avant la prochaine vague d’arrivées.", icon: "migration" },
        { title: "Protection sociale au sens large", text: "Un dossier par ménage, pas par institution.", icon: "social-protection" },
        { title: "Services publics multilingues", text: "Langues minoritaires et de la diaspora prises en charge par défaut.", icon: "multilingual" },
      ],
    },
    cta: {
      heading: "Parlons-en.",
      body:
        "Si vos institutions servent des personnes au-delà des frontières administratives et linguistiques, nous l’avons construit de bout en bout — refonte des processus, plateforme et déploiement en situation de crise.",
    },
    videoTitle: "Services interopérables pour les réfugiés — le cas en 80 secondes",
    videoDescription:
      "Un court film sur la façon dont la Roumanie a reconstruit les parcours des réfugiés en protection sociale, éducation et emploi autour d’un seul compte et d’une couche de traduction par IA.",
  },
};
