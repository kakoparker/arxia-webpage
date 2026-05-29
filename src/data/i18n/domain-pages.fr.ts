// French text overlay for src/data/domain-pages.ts. Same shape as the ES file.
import type { DomainPageOverlay } from "./domain-pages.es";

export const domainPagesFr: Record<string, DomainPageOverlay> = {
  "govtech-data": {
    title: "Données",
    tagline: "Le tissu conjonctif de l'État",
    categories: {
      Consultancy: { tagline: "Stratégie, politiques et architecture pour la couche de données de l'État." },
      Services: { tagline: "Livraison, mise en œuvre et habilitation technique." },
      Products: { tagline: "Des plateformes que nous développons et faisons évoluer." },
      Trainings: { tagline: "Renforcement des capacités des décideurs, des équipes juridiques et du personnel technique du secteur public." },
    },
  },
  "govtech-process": {
    title: "Processus",
    tagline: "Les services publics, repensés",
    categories: {
      Consultancy: { tagline: "Stratégie et refonte des processus institutionnels et destinés aux citoyens." },
      Services: { tagline: "Mise en œuvre, intégration et livraison de plateformes." },
      Products: { tagline: "Des plateformes que nous développons et faisons évoluer." },
      Trainings: { tagline: "Renforcement des capacités des équipes techniques du secteur public et des écosystèmes locaux." },
    },
  },
  "govtech-intelligence": {
    title: "Intelligence",
    tagline: "L'État agentique",
    categories: {
      Consultancy: { tagline: "Une IA responsable pour le secteur public, de la stratégie à la gouvernance." },
      Services: { tagline: "Conception et déploiement de l'IA pour le secteur public." },
      Products: { tagline: "Des plateformes que nous développons et faisons évoluer." },
    },
  },
  "industries-data": {
    title: "Données",
    tagline: "Des données d'entreprise, gouvernées et interopérables",
    categories: {
      Consultancy: { tagline: "Stratégie, politiques et standards pour les données d'entreprise." },
      Services: { tagline: "Mise en œuvre et intégration pour les données d'entreprise." },
    },
  },
  "industries-process": {
    title: "Processus",
    tagline: "Les opérations de l'entreprise, réinventées",
    categories: {
      Consultancy: { tagline: "Stratégie, audit et conduite du changement pour les opérations de l'entreprise." },
      Services: { tagline: "Livraison à travers les systèmes d'entreprise, les portails et les flux de travail." },
      Products: { tagline: "Des plateformes pour les opérations de l'entreprise." },
    },
  },
  "industries-intelligence": {
    title: "Intelligence",
    tagline: "L'IA à l'échelle de l'entreprise",
    categories: {
      Consultancy: { tagline: "Stratégie, gouvernance et conseil pour l'IA d'entreprise." },
      Services: { tagline: "Conception, déploiement et formation autour de l'IA d'entreprise." },
      Products: { tagline: "Des plateformes et des agents pour l'IA d'entreprise." },
    },
  },
};
