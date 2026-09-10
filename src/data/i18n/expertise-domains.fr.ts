// French text overlay for src/data/expertise-domains.ts. Same shape/rules as
// expertise-domains.es.ts. Brand/tech terms kept as-is (Arxia, DPI,
// e-Procurement, e-Invoicing, e-Services, IA, low-code).

import type { ExpertiseDomainOverlay } from "./expertise-domains.es";

export const expertiseDomainsFr: Record<string, ExpertiseDomainOverlay> = {
  interoperability: {
    name: "Interopérabilité full-stack",
    description:
      "Bien plus que la couche technique : nous accompagnons toutes les couches qui comptent — gouvernance, normes, politiques et, bien sûr, la mise en œuvre de la plateforme d'échange de données.",
  },
  "data-governance": {
    name: "Gouvernance des données",
    description:
      "Cadres de gouvernance, gestion du consentement, protection des données, modèles sémantiques et évaluations de maturité numérique.",
  },
  "e-procurement": {
    name: "e-Procurement",
    description:
      "Numérisation de bout en bout de la commande publique sur l'ensemble du cycle de vie, avec une traçabilité et une auditabilité complètes.",
  },
  "e-invoicing": {
    name: "e-Invoicing",
    description:
      "Facturation électronique, déclaration des transactions et systèmes de conformité fiscale, y compris les normes transfrontalières.",
  },
  "web-portals": {
    name: "Portails web gouvernementaux",
    description:
      "Portails citoyens et institutionnels standardisés, alignés sur une stratégie et sur les normes mondiales.",
  },
  "agentic-state": {
    name: "État agentique",
    description:
      "Bien plus que des chatbots IA : nous accompagnons la stratégie, les politiques et les couches de données qui rendent l'IA possible dans l'administration, de manière sûre et éthique.",
  },
  "e-services": {
    name: "e-Services",
    description:
      "Nous concevons, optimisons et mettons en œuvre des e-services avec l'IA et des solutions low-code, pour des résultats en temps record.",
  },
};
