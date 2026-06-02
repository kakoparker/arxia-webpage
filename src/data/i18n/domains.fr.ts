// French text overlay for src/data/domains.ts. Same shape/positional rules as
// domains.es.ts. Brand/tech terms kept as-is (Arxia, Govtech, GovStack,
// X-Road, BPMN, RGPD, TYPO3, Drupal, USSD, MDM, ROI, IGNITE, Règlement IA de l'UE…).

import type { VerticalTextOverlay } from "./domains.es";

export const domainsFr: Record<string, VerticalTextOverlay> = {
  govtech: {
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
  },
  industries: {
    tagline:
      "Transformation des entreprises pour les mines, la finance, le commerce, les universités et au-delà",
    body: "Nous aidons les entreprises à moderniser leurs opérations, à adopter l'IA de manière responsable et à gouverner efficacement leurs données, en générant des gains d'efficacité mesurables et un avantage concurrentiel dans les secteurs réglementés et à fort enjeu.",
    domains: {
      data: {
        name: "Données",
        tagline: "Des données d'entreprise, gouvernées et interopérables",
        description:
          "Cadres de gouvernance, de qualité, de conformité et d'intégration des données qui transforment des données d'entreprise fragmentées en un actif concurrentiel durable.",
        services: [
          {
            title: "Stratégie de gouvernance des données et conception de cadres",
            description:
              "Politiques, rôles et processus pour une intendance des données de niveau entreprise.",
          },
          {
            title: "Qualité des données et gestion des données de référence",
            description:
              "Évaluations, remédiation et plateformes de MDM entre systèmes, départements et partenaires.",
          },
          {
            title: "Conformité réglementaire (RGPD, standards sectoriels)",
            description:
              "Préparation, mise en œuvre et suivi continu de la conformité pour les secteurs réglementés.",
          },
          {
            title: "Intégration de données et pipelines",
            description:
              "Architecture d'intégration et développement de pipelines pour l'analytique, les opérations et la préparation à l'IA.",
          },
          {
            title: "Standards sectoriels de partage de données",
            description:
              "Modèles d'interopérabilité propres au secteur (mines, finance, logistique) et leur transposition technique.",
          },
        ],
      },
      process: {
        name: "Processus",
        tagline: "Les opérations de l'entreprise, réinventées",
        description:
          "Numérisation des processus, automatisation des flux de travail et modernisation des systèmes qui génèrent des gains d'efficacité mesurables dans des environnements d'entreprise complexes.",
        services: [
          {
            title: "Stratégie et feuille de route de transformation numérique",
            description:
              "Feuilles de route au niveau de la direction couvrant les processus, la technologie et la conduite du changement.",
          },
          {
            title: "Audit et optimisation des processus",
            description:
              "Réingénierie des processus de bout en bout avec des pilotes pilotés par BPMN et des KPI mesurables.",
          },
          {
            title: "Intégration et modernisation des systèmes",
            description:
              "Architecture d'intégration, migration des systèmes hérités et développement de plateformes de niveau entreprise.",
          },
          {
            title: "Portails d'entreprise et intranets",
            description:
              "Plateformes de contenu d'entreprise sur TYPO3 et Drupal, avec accessibilité, gouvernance et prise en charge multisite.",
          },
          {
            title: "Stratégie d'exportation et d'internationalisation",
            description:
              "Positionnement de marché, proposition de valeur et préparation commerciale pour les exportateurs de services et de TI.",
          },
        ],
      },
      intelligence: {
        name: "Intelligence",
        tagline: "L'IA à l'échelle de l'entreprise",
        description:
          "Agents d'IA, programmes d'accélération et cadres de gouvernance qui aident les entreprises à adopter l'IA de manière responsable et à grande échelle, avec un ROI mesurable.",
        services: [
          {
            title: "Stratégie et feuille de route IA",
            description:
              "Découverte et priorisation des cas d'usage et feuilles de route d'IA d'entreprise liées à des résultats mesurables.",
          },
          {
            title: "Développement d'agents d'IA et automatisation",
            description:
              "Automatisation du back-office, agents d'IA verticaux et automatisation intelligente des processus.",
          },
          {
            title: "Atelier AI IGNITE",
            description:
              "Atelier de découverte pour identifier les premières opportunités d'accélération par l'IA au sein de votre organisation.",
          },
          {
            title: "Programme d'Accélération IA",
            description:
              "Programme structuré de 12 semaines pour l'adoption de l'IA dans le marketing, les opérations et l'administration.",
          },
          {
            title: "Culture IA des dirigeants",
            description:
              "Programmes destinés aux conseils d'administration et aux dirigeants sur le leadership, la gouvernance et les décisions de portefeuille en IA.",
          },
          {
            title: "Gouvernance de l'IA (ISO, Règlement IA de l'UE)",
            description:
              "Plateformes d'entreprise de gouvernance, de risque et de conformité de l'IA alignées sur les cadres internationaux.",
          },
        ],
      },
    },
  },
};
