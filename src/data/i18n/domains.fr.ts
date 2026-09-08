// French text overlay for src/data/domains.ts. Same shape/positional rules as
// domains.es.ts. Brand/tech terms kept as-is (Arxia, Govtech, GovStack,
// X-Road, BPMN, RGPD, TYPO3, Drupal, USSD, MDM, ROI, IGNITE, Règlement IA de l'UE…).

import type { ExpertiseTextOverlay } from "./domains.es";

export const domainsFr: ExpertiseTextOverlay = {
  tagline:
    "Infrastructure publique numérique pour les gouvernements et les organisations internationales",
  body: "Nous concevons les fondations de l'infrastructure publique numérique : des services électroniques centrés sur le citoyen et un gouvernement augmenté par l'IA à l'échange fluide de données, la commande publique et la facturation électroniques, les portails standardisés et le renforcement des écosystèmes locaux.",
  domains: {
    data: {
      name: "Données",
      tagline: "Le tissu conjonctif de l'État",
      description:
        "Interopérabilité, gouvernance et infrastructure d'échange de données qui permettent une circulation fluide et sécurisée de l'information entre les institutions, les frontières et les building blocks.",
      services: [
        {
          title: "Stratégie d'interopérabilité des données",
          description:
            "Cadres nationaux et transfrontaliers fondés sur des standards ouverts (GovStack, X-Road, Pub/Sub) et des modèles sémantiques.",
        },
        {
          title: "Gouvernance et standardisation des données",
          description:
            "Politiques, modèles sémantiques de données, standards techniques et dispositifs institutionnels pour un partage de données de confiance.",
        },
        {
          title: "Conception et déploiement de plateformes d'échange de données",
          description:
            "Architecture, mise en œuvre et déploiement de plateformes nationales et régionales d'échange de données.",
        },
        {
          title: "Gouvernance du consentement et protection des données personnelles",
          description:
            "Adoption du Consent Building Block et cadres de protection des données personnelles alignés sur les standards internationaux.",
        },
        {
          title: "Formation à l'interopérabilité des données",
          description:
            "Ateliers et accompagnement pour les agents publics, les architectes et les équipes techniques.",
        },
      ],
    },
    process: {
      name: "Processus",
      tagline: "Les services publics, repensés",
      description:
        "Conception de services pilotée par BPMN, commande publique et facturation de bout en bout, et portails gouvernementaux standardisés qui modernisent la façon dont l'État crée de la valeur pour les citoyens.",
      services: [
        {
          title: "Stratégie et feuilles de route d'e-gouvernement",
          description:
            "Stratégies nationales de numérisation, refonte des événements de vie et programmes de transformation institutionnelle.",
        },
        {
          title: "Conception et optimisation des processus (BPMN)",
          description:
            "Refonte des services et accompagnement à la mise en œuvre avec BPMN 2.0 et des pilotes sur les principales plateformes de workflow.",
        },
        {
          title: "Systèmes de commande publique électronique",
          description:
            "Commande publique de bout en bout : de la planification annuelle et l'exécution aux accords-cadres et à la gestion des contrats.",
        },
        {
          title: "Infrastructure de facturation électronique",
          description:
            "Systèmes de facturation électronique et de déclaration des transactions alignés sur les cadres fiscaux et de conformité.",
        },
        {
          title: "Portails gouvernementaux standardisés",
          description:
            "Portails citoyens, annuaires de services et sites institutionnels sur des cadres accessibles, multi-locataires et de niveau entreprise.",
        },
        {
          title: "Renforcement des capacités et compétitivité des écosystèmes",
          description:
            "Programmes de formation de formateurs, stratégies d'internationalisation et développement des compétences techniques pour les organismes publics et les écosystèmes locaux.",
        },
      ],
    },
    intelligence: {
      name: "Intelligence",
      tagline: "L'État agentique",
      description:
        "Agents d'IA, automatisation intelligente et plateformes augmentées par l'IA qui rendent le secteur public proactif, des assistants destinés aux citoyens aux flux de travail interinstitutionnels.",
      services: [
        {
          title: "Stratégie et architecture de l'État agentique",
          description:
            "Évaluations de la maturité en IA, cadres de gouvernance et feuilles de route pour une IA responsable dans le secteur public.",
        },
        {
          title: "Agents d'IA pour les services publics",
          description:
            "Assistants virtuels multicanaux (web, mobile, voix, USSD) et automatisation du back-office pour les processus gouvernementaux.",
        },
        {
          title: "Services électroniques augmentés par l'IA",
          description:
            "Plateformes low-code pour le lancement rapide de services publics et de flux d'IA sur des stacks souverains et open source.",
        },
        {
          title: "Outils d'évaluation de la maturité numérique",
          description:
            "Outils fondés sur l'IA pour diagnostiquer la maturité numérique des institutions et formuler des stratégies.",
        },
        {
          title: "Écosystèmes augmentés par l'IA",
          description:
            "Plateformes intelligentes de mise en relation, de partage de ressources et de collaboration transfrontalière entre écosystèmes technologiques.",
        },
        {
          title: "Programme d'Accélération IA pour le Gouvernement",
          description:
            "Programme d'adoption structuré et ateliers IGNITE pour les équipes et les dirigeants du secteur public.",
        },
      ],
    },
  },
};
