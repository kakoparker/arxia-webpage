// French text overlay for src/data/expertise-domains.ts. Same shape/rules as
// expertise-domains.es.ts. Brand/tech terms kept as-is (Arxia, DPI,
// e-Procurement, e-Invoicing, e-Services, IA, low-code).

import type { ExpertiseDomainOverlay } from "./expertise-domains.es";

export const expertiseDomainsFr: Record<string, ExpertiseDomainOverlay> = {
  interoperability: {
    name: "Interopérabilité full-stack",
    description:
      "Gouvernance, normes, politiques et la plateforme d'échange de données elle-même. La couche technique est la partie facile, et nous couvrons aussi le reste.",
    oneLine: "Toutes les couches de l'échange, pas seulement la technique.",
    scope: ["Cadres", "Standards", "Échange"],
  },
  "data-governance": {
    name: "Gouvernance des données",
    description:
      "Les règles qui déterminent qui peut utiliser quelles données, et à quel titre : cadres de gouvernance, régimes de consentement, protection des données, modèles sémantiques et évaluations de maturité.",
    oneLine: "Qui peut utiliser quelles données, et à quel titre.",
    scope: ["Cadres", "Consentement", "Protection des données"],
  },
  "e-procurement": {
    name: "e-Procurement",
    description:
      "Commande publique numérisée de la publication de l'appel d'offres à la gestion du contrat, chaque étape traçable et auditable.",
    oneLine: "De l'appel d'offres au contrat, chaque étape traçable.",
    scope: ["Réforme", "Personnes", "Plateforme"],
  },
  "e-invoicing": {
    name: "e-Invoicing",
    description:
      "Facturation électronique, déclaration des transactions et systèmes de conformité fiscale, y compris les normes transfrontalières.",
    oneLine: "Facturation et conformité fiscale, y compris transfrontalière.",
    scope: ["Stratégie", "Conformité fiscale", "Déclaration"],
  },
  "web-portals": {
    name: "Portails web gouvernementaux",
    description:
      "Portails citoyens et institutionnels bâtis sur une norme unique, pour que chaque ministère offre le même niveau de service.",
    oneLine: "Une norme unique, pour que chaque ministère offre la même qualité.",
    scope: ["Systèmes de design", "Multi-locataire", "Accessibilité"],
  },
  "agentic-state": {
    name: "État agentique",
    description:
      "Les chatbots en sont la partie visible. Nous construisons les couches de stratégie, de politiques et de données qui rendent l'IA sûre à exploiter dans l'administration.",
    oneLine: "Les couches de stratégie et de données qui rendent l'IA sûre.",
    scope: ["Maturité", "Gouvernance", "Agents IA"],
  },
  "e-services": {
    name: "e-Services",
    description:
      "Nous repensons et construisons des e-services avec l'IA et des outils low-code, pour que la livraison se compte en semaines plutôt qu'en cycles budgétaires.",
    oneLine: "Des services reconstruits avec l'IA et le low-code, livrés en semaines.",
    scope: ["Événements de vie", "BPMN", "Low-code"],
  },
};
