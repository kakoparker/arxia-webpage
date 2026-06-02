// French text overlay for src/data/portfolio.ts. Same shape as the ES file.
// Carries title + localized categoryLabel + description for all 43 projects.
import type { PortfolioOverlay } from "./portfolio.es";

const C = {
  digitalGovernment: "Gouvernement numérique",
  interoperability: "Interopérabilité et Standardisation",
  publicProcurement: "Commande publique",
  webDevelopment: "Développement web",
  ai: "Intelligence Artificielle",
  einvoicing: "Facturation Électronique",
  dataGovernance: "Gouvernance des Données",
  business: "Stratégie et Conseil en Affaires",
};

export const portfolioFr: Record<string, PortfolioOverlay> = {
  "senegal-goin-digital": {
    title: "Transformation numérique du Sénégal – Goin' Digital",
    description:
      "Conseil pour la transformation numérique du Gouvernement du Sénégal, facilitant l'adoption du cadre GovStack en cohérence avec la stratégie nationale New Deal Technologique.",
    categoryLabel: C.digitalGovernment,
  },
  "ethiopia-input-output": {
    title: "Plateforme numérique des coefficients Input-Output – Éthiopie",
    description:
      "Conseil et mise en œuvre du mécanisme de coefficients Input-Output sous forme de plateforme numérique, à l'aide du Workflow Building Block du cadre GovStack.",
    categoryLabel: C.digitalGovernment,
  },
  "govstack-adoption-africa": {
    title: "Formation à l'adoption de GovStack – Multi-pays (Afrique)",
    description:
      "Formation à l'adoption de GovStack destinée aux gouvernements de cinq pays africains.",
    categoryLabel: C.digitalGovernment,
  },
  "senegal-bpmn-senum": {
    title: "Modélisation de processus BPMN et coaching – SENUM Sénégal",
    description:
      "Modélisation des processus métier, refonte des services publics et coaching à la mise en œuvre, axés sur le BPMN 2.0 et une implémentation pilote avec Camunda 7 BPM.",
    categoryLabel: C.digitalGovernment,
  },
  "rwanda-web-accessibility": {
    title: "Standardisation de l'accessibilité web – Rwanda",
    description:
      "Standardisation de l'accessibilité web à grande échelle avec 5 experts certifiés WCAG chargés d'auditer et de corriger l'accessibilité sur l'ensemble des sites web du gouvernement.",
    categoryLabel: C.digitalGovernment,
  },
  "rwanda-workflow-platform": {
    title: "Sélection d'une plateforme de workflow – Gouvernement du Rwanda",
    description:
      "Identification, analyse comparative et sélection d'une plateforme de workflow pour la numérisation des processus G2G.",
    categoryLabel: C.digitalGovernment,
  },
  "romania-egov-strategy": {
    title: "Stratégie d'e-gouvernement de la Roumanie (EGOV)",
    description:
      "Conseil pour la stratégie d'e-gouvernement de la Roumanie, comprenant la révision des politiques, la refonte des processus pour 36 « événements de vie » et le renforcement des capacités de 16 institutions publiques centrales.",
    categoryLabel: C.digitalGovernment,
  },
  "cambodia-dpi": {
    title: "Architecture de plateforme numérique de protection sociale – Cambodge",
    description:
      "Conseil pour l'architecture de la plateforme numérique de protection sociale du Cambodge et mise en œuvre du Pub/Sub avec intégration de X-Road, selon l'approche d'architecture de GovStack.",
    categoryLabel: C.interoperability,
  },
  "icglr-regional-data-sharing": {
    title: "Architecture de plateforme régionale d'échange de données – CIRGL",
    description:
      "Élaboration de l'architecture technique et du cahier des charges de la plateforme régionale d'échange de données destinée aux 12 États membres de la CIRGL.",
    categoryLabel: C.interoperability,
  },
  "rwanda-mining-standard": {
    title: "Standard d'échange de données pour les mines et minerais – Rwanda",
    description:
      "Élaboration du standard d'échange de données sur les mines et les minerais du Rwanda, du modèle technique d'interopérabilité pour les systèmes du RMB (GIMCS, DMTS) et de l'audit des systèmes existants.",
    categoryLabel: C.interoperability,
  },
  "rwanda-risa-icglr": {
    title: "Architecture logicielle pour RISA et CIRGL – Rwanda",
    description:
      "Accélération de l'adoption de GovStack au Rwanda, en mettant l'accent sur le Workflow Building Block et le Consent Building Block.",
    categoryLabel: C.interoperability,
  },
  "romania-ukrainian-interop": {
    title: "Cadre d'interopérabilité pour le soutien aux réfugiés ukrainiens – Roumanie",
    description:
      "Cadre national d'interopérabilité interinstitutionnelle et numérisation de la prestation de services pour les réfugiés ukrainiens en Roumanie.",
    categoryLabel: C.interoperability,
  },
  "rwanda-integration-coaching": {
    title: "Coaching en architecture d'intégration logicielle – RISA Rwanda",
    description:
      "Coaching en architecture d'intégration logicielle pour le personnel technique de RISA. Réalisé avec Evolve Ltd.",
    categoryLabel: C.interoperability,
  },
  "icglr-data-sharing-policy": {
    title: "Politique et standard technique d'échange de données – CIRGL",
    description:
      "Élaboration de la politique d'échange de données, du standard technique, du modèle sémantique de données et de sa transposition technique pour la CIRGL et ses 12 pays membres.",
    categoryLabel: C.dataGovernance,
  },
  "rwanda-consent-governance": {
    title: "Gouvernance du consentement et protection des données personnelles – Rwanda",
    description:
      "Développement d'un prototype de gouvernance du consentement et d'accords de protection des données personnelles fondé sur le Consent Building Block de GovStack.",
    categoryLabel: C.dataGovernance,
  },
  "uganda-ppda": {
    title: "Stratégie de transformation numérique de la PPDA – Ouganda",
    description:
      "Accompagnement de l'Autorité de la commande et de la cession publiques (PPDA) de l'Ouganda dans la planification de la mise en œuvre de sa stratégie de transformation numérique.",
    categoryLabel: C.publicProcurement,
  },
  "romania-public-procurement": {
    title: "Système numérique de commande publique – Roumanie",
    description:
      "Refonte des processus et mise en œuvre d'un système numérique de commande publique pour la planification, l'exécution et l'audit.",
    categoryLabel: C.publicProcurement,
  },
  "romania-eprocurement-platform": {
    title: "Plateforme web d'e-procurement – Roumanie",
    description:
      "Plateforme web pour les institutions publiques offrant des workflows couvrant l'ensemble du cycle de vie de la commande. Déployée par plus de 100 institutions publiques.",
    categoryLabel: C.publicProcurement,
  },
  "icglr-websites": {
    title: "Réimplémentation et formation des sites web de la CIRGL",
    description:
      "Réimplémentation des sites web de la CIRGL et formation des gestionnaires de contenu.",
    categoryLabel: C.webDevelopment,
  },
  "somalia-websites": {
    title: "Sites web du Gouvernement de Somalie – Formation et développement",
    description:
      "Formation et appui au développement pour les sites web du Gouvernement de Somalie. Arxia sous-traitée par TYPO3 GmbH.",
    categoryLabel: C.webDevelopment,
  },
  "risa-cms-govstack": {
    title: "Building Block CMS de GovStack – Sites RISA Rwanda",
    description:
      "Conseil, formation, appui à la mise en œuvre et lignes directrices pour les sites web de RISA Rwanda selon l'approche du CMS Building Block de GovStack. Comprend la mise à niveau du CMS TYPO3 ainsi que de nouvelles lignes directrices UX/UI et d'accessibilité web.",
    categoryLabel: C.webDevelopment,
  },
  "rwanda-typo3-coaching": {
    title: "Coaching en développement TYPO3 – Gouvernement du Rwanda",
    description:
      "Coaching en développement TYPO3 pour les sites web du gouvernement du Rwanda. Réalisé avec Evolve Ltd.",
    categoryLabel: C.webDevelopment,
  },
  "rwanda-government-portals": {
    title: "Portails web gouvernementaux et infrastructure numérique – Rwanda",
    description:
      "Conception et déploiement de sites web gouvernementaux, de portails de services numériques et d'infrastructures technologiques. Développement de l'architecture multitenant hébergeant plus de 350 sites web gouvernementaux.",
    categoryLabel: C.webDevelopment,
  },
  "nanotec-portal": {
    title: "Support du portail et de l'intranet Nanotec",
    description:
      "Support d'évolution continue pour le portail et les intranets de Nanotec sur la technologie CMS TYPO3.",
    categoryLabel: C.webDevelopment,
  },
  "philips-speech-portal": {
    title: "Support du portail et de l'intranet Philips Speech",
    description:
      "Support d'évolution continue pour le portail et les intranets de la division Philips Speech sur la technologie CMS TYPO3.",
    categoryLabel: C.webDevelopment,
  },
  "stockli-websites": {
    title: "Sites web Müllex et Stöckli – Suisse",
    description:
      "Sites web de présentation et catalogues électroniques pour le Groupe Stöckli.",
    categoryLabel: C.webDevelopment,
  },
  "audi-planner": {
    title: "Planificateur interactif du showroom et de l'atelier AUDI",
    description:
      "Plateforme web pour la planification interactive en 2D et 3D des showrooms et des espaces d'atelier, fondée sur la technologie PlanningWiz (une spinoff d'Arxia).",
    categoryLabel: C.webDevelopment,
  },
  "mbaza-chatbot": {
    title: "Mbaza Chatbot – Assistant virtuel IA/TAL – Rwanda",
    description:
      "Mise en œuvre d'un assistant virtuel multicanal fondé sur l'IA et le TAL pour la communication du gouvernement avec les citoyens, y compris les personnes non alphabétisées. Canaux : web, application mobile, USSD et appel vocal en langue locale.",
    categoryLabel: C.ai,
  },
  "digital-maturity-tool": {
    title: "Outil d'évaluation de la maturité numérique",
    description:
      "Mise en œuvre d'un outil fondé sur l'IA pour l'évaluation de la maturité numérique et l'élaboration de stratégies au sein des institutions de l'administration publique, déployé en Norvège et en Roumanie auprès des mairies.",
    categoryLabel: C.ai,
  },
  "bpo-chile-automation": {
    title: "Automatisation du back office BPO",
    description:
      "Nous avons développé un agent d'IA qui a automatisé 90 % des processus des BPO de télécommunications au Chili, réduisant de 90 % leurs processus de back office de vérification et d'évaluation des clients.",
    categoryLabel: C.ai,
  },
  "ozmo-ai-acceleration": {
    title: "Programme d'Accélération IA + Atelier IA pour entreprise logicielle",
    description:
      "Réalisation d'un programme d'Accélération IA de 3 mois pour une entreprise logicielle, transformant ses départements Marketing, Administration et Ventes.",
    categoryLabel: C.ai,
  },
  "sigse-ai-acceleration": {
    title: "Programme d'Accélération IA + Atelier IA pour cabinet de conseil",
    description:
      "Réalisation d'un programme d'Accélération IA de 3 mois ayant transformé ses départements marketing, gestion des appels d'offres et opérations.",
    categoryLabel: C.ai,
  },
  "bancom-ai-workshop": {
    title: "Atelier IA et feuille de route pour dirigeants et conseil d'administration",
    description:
      "Programme d'atelier IA IGNITE pour les dirigeants et les responsables de département, ainsi qu'une session distincte pour les membres du conseil d'administration.",
    categoryLabel: C.ai,
  },
  "itstudio-ai-acceleration": {
    title: "Programme d'Accélération IA + Atelier",
    description:
      "Accélération des départements marketing, gestion des appels d'offres et opérations dans le cadre d'un programme de 90 jours.",
    categoryLabel: C.ai,
  },
  "altlegal-ai-agent": {
    title: "Agent d'IA pour le conseil et la mise en œuvre du support juridique",
    description:
      "Conseil et appui à la mise en œuvre d'une solution destinée à évaluer les appels d'offres dans le cadre de la réglementation chilienne, à l'aide de l'IA générative pour l'évaluation.",
    categoryLabel: C.ai,
  },
  "lima-ai-workshop": {
    title: "Atelier IA et feuille de route",
    description:
      "Atelier IA pour l'identification d'opportunités et l'élaboration de feuilles de route en vue d'implémentations potentielles de solutions d'IA dans plus de 10 départements de l'université.",
    categoryLabel: C.ai,
  },
  "chiletec-ai-training": {
    title: "Formation pour entreprises TI : Construction d'agents d'IA pour le quotidien",
    description:
      "Programme de formation court pour le développement d'agents d'IA destinés au travail quotidien.",
    categoryLabel: C.ai,
  },
  "falabella-ai": {
    title: "Atelier et conseil pour la mise en œuvre d'une solution d'IA",
    description:
      "Conseil et atelier de formation pour la mise en œuvre de solutions d'IA destinées à la plus grande chaîne de distribution, dans son siège social au Pérou.",
    categoryLabel: C.ai,
  },
  "grant-prep-automation": {
    title: "Automatisation de la préparation de subventions pour cabinet de conseil",
    description:
      "Mise en œuvre d'un workflow fondé sur l'IA pour l'élaboration de propositions de subventions et d'un outil de reporting financier pour les projets financés par subvention.",
    categoryLabel: C.ai,
  },
  "car-einvoicing": {
    title: "Facturation électronique et déclaration des transactions – République centrafricaine",
    description:
      "Conseil et mise en œuvre de la facturation électronique et de la déclaration des transactions commerciales.",
    categoryLabel: C.einvoicing,
  },
  "zambia-mining-data": {
    title: "Évaluation de la maturité numérique – Mines et Minerais – Zambie",
    description:
      "Évaluation de la maturité numérique et de la gestion des données dans les domaines des mines et des minerais, en préparation de la mise en œuvre de la Base de données nationale des minerais.",
    categoryLabel: C.dataGovernance,
  },
  "burundi-mining-data": {
    title: "Évaluation de la maturité numérique – Mines et Minerais – Burundi",
    description:
      "Évaluation de la maturité numérique et de la gestion des données sur les mines et les minerais au Burundi pour la Base de données régionale des minerais de la CIRGL.",
    categoryLabel: C.dataGovernance,
  },
  "uganda-it-bpo-strategy": {
    title: "Proposition de valeur d'exportation TI et BPO – Ouganda",
    description:
      "Accompagnement pour la refonte de la proposition de valeur à l'export des secteurs TI et BPO de l'Ouganda et évaluation de leur niveau de maturité à l'export. Financé par UKTP.",
    categoryLabel: C.business,
  },
};
