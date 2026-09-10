// French text overlay for src/data/domain-pages.ts. Same shape/rules as
// domain-pages.es.ts. Page identity is translated upstream in
// ./expertise-domains.fr.ts.

import type { DomainPageOverlay } from "./domain-pages.es";

export const domainPagesFr: Record<string, DomainPageOverlay> = {
  "interoperability": {
    categories: {
      Consultancy: {
        tagline:
          "Cadres, normes et architecture pour l'echange national de donnees.",
        items: {
          "interoperability-strategy": {
            title: "Stratégie d'interopérabilité des données",
            description:
              "Feuilles de route d'interopérabilité nationales et transfrontalières fondées sur GovStack, X-Road et des modèles Pub/Sub. Nous traduisons les priorités politiques en un plan technique par étapes que plusieurs ministères peuvent exécuter en parallèle.",
          },
          "national-registry-design": {
            title: "Conception de registres nationaux",
            description:
              "Architecture et conception des registres nationaux faisant foi (population, entreprises, foncier, véhicules) : modèle de données, stratégie d'identifiants, règles de gouvernance et points d'intégration avec la dorsale d'échange de données.",
          },
        },
      },
      Services: {
        tagline:
          "Livraison, mise en oeuvre et accompagnement technique.",
        items: {
          "national-registries-api-gateway": {
            title: "Mise en œuvre de registres nationaux et de l'API gateway",
            description:
              "Livraison de bout en bout des registres nationaux et de la dorsale d'échange de données du pays, avec une messagerie X-Road / Pub-Sub et une API gateway intégrées. De l'architecture de référence à l'autorité de certification, le serveur central et les premières intégrations ministérielles, sur des stacks ouverts éprouvés, afin que l'État ne dépende jamais d'un cœur captif.",
          },
          "api-gateway": {
            title: "Conception d'API gateway et de registre d'APIs",
            description:
              "API gateway de niveau gouvernemental avec contrôle d'accès, quotas et observabilité, ainsi qu'un registre public d'APIs pour que les institutions partenaires puissent découvrir et consommer les données de manière responsable.",
          },
          "regional-platform": {
            title: "Architecture de plateforme régionale d'échange de données",
            description:
              "Conception de plateformes multinationales pour des organisations régionales (par exemple la CIRGL) où plus de 10 États membres doivent partager des données sous des règles techniques et de gouvernance communes.",
          },
          "software-integration": {
            title: "Intégration logicielle",
            description:
              "Intégration concrète des systèmes du secteur public (applications ministérielles, bases de données héritées et APIs modernes) reliés via la couche nationale d'échange de données, avec une remise opérationnelle complète.",
          },
          "inter-institutional-workflows": {
            title: "Flux de travail interinstitutionnels automatisés",
            description:
              "Flux de travail assistés par IA qui acheminent les demandes, documents et décisions entre plusieurs organismes, en comprimant des semaines de coordination en jours.",
          },
          "govstack-adoption": {
            title: "Programmes d'adoption de GovStack",
            description:
              "Adoption de GovStack à l'échelle d'un pays : alignement architectural, choix des building blocks, pilotes et préparation institutionnelle.",
          },
        },
      },
      Products: {
        tagline:
          "Des plateformes que nous possedons et faisons evoluer.",
        items: {
          "arxia-data-exchange": {
            title: "Arxia Data Exchange Platform",
            description:
              "Partage de données sécurisé et fondé sur des standards entre les institutions gouvernementales et au-delà des frontières. Préconfigurée pour les building blocks GovStack et déployable sur une infrastructure souveraine.",
          },
        },
      },
      Trainings: {
        tagline:
          "Renforcement des capacites des decideurs et des equipes techniques du secteur public.",
        items: {
          "training-interop-strategies": {
            title: "Atelier : Stratégies d'interopérabilité pour les institutions publiques",
            description:
              "Atelier non technique pour les décideurs et la direction ministérielle. Construit un vocabulaire commun sur GovStack, X-Road et les modèles Pub-Sub, afin que les décisions concernant les initiatives de partage de données reposent sur le fond plutôt que sur les acronymes.",
          },
        },
      },
    },
  },
  "data-governance": {
    categories: {
      Consultancy: {
        tagline:
          "Cadres de gouvernance, regimes de consentement et diagnostics de maturite.",
        items: {
          "data-governance": {
            title: "Gouvernance des données",
            description:
              "Politiques, rôles, règles de responsabilité et dispositifs institutionnels pour un partage de confiance des données publiques. Livré comme un cadre formel que votre conseil des ministres ou votre agence numérique peut adopter et faire appliquer.",
          },
          "digital-maturity": {
            title: "Évaluations de la maturité numérique",
            description:
              "Diagnostics structurés qui hiérarchisent la maturité numérique de votre institution et produisent un plan d'investissement défendable, pas seulement un rapport.",
          },
        },
      },
      Trainings: {
        tagline:
          "Renforcement des capacites des decideurs, des equipes juridiques et du personnel institutionnel.",
        items: {
          "training-data-governance": {
            title: "Atelier : Gouvernance des données pour les institutions publiques",
            description:
              "Atelier structuré pour la direction ministérielle, les équipes juridiques et le personnel des agences numériques. Couvre les cadres de gouvernance, les rôles de responsabilité, les régimes de consentement et la façon d'inscrire les règles de protection des données dans la pratique institutionnelle quotidienne.",
          },
        },
      },
    },
  },
  "e-procurement": {
    categories: {
      Consultancy: {
        tagline:
          "Strategie, normes et alignement reglementaire pour l'achat public.",
        items: {
          "eprocurement-strategy": {
            title: "Stratégie de commande publique électronique, standards et alignement réglementaire",
            description:
              "Travail de stratégie nationale de commande publique : de l'alignement réglementaire et l'adoption de standards à la conception de la conduite du changement pour les autorités de commande.",
          },
        },
      },
      Services: {
        tagline:
          "Livraison de plateformes de bout en bout.",
        items: {
          "eproc-implementation": {
            title: "Mise en œuvre intégrale de plateformes de commande publique électronique",
            description:
              "Déploiement complet des systèmes de commande publique (planification, appel d'offres, évaluation, attribution et gestion des contrats) avec intégration aux systèmes financiers et d'audit.",
          },
        },
      },
      Products: {
        tagline:
          "Des plateformes que nous possedons et faisons evoluer.",
        items: {
          "processplayer": {
            title: "ProcessPlayer",
            description:
              "Plateforme de commande publique sur tout le cycle : planification, exécution, accords-cadres et gestion des contrats. Plus de 50 organisations, plus de 30 000 références, en SaaS et on-premise.",
          },
        },
      },
    },
  },
  "e-invoicing": {
    categories: {
      Consultancy: {
        tagline:
          "Strategie et conseil en conformite fiscale.",
        items: {
          "einvoicing-advisory": {
            title: "Stratégie de facturation électronique et conseil en conformité fiscale",
            description:
              "Stratégies de facturation électronique qui restent conformes au droit fiscal local et s'alignent sur les standards régionaux et internationaux de déclaration qui émergent.",
          },
        },
      },
      Services: {
        tagline:
          "Infrastructure de facturation et de declaration des transactions.",
        items: {
          "einvoicing-infrastructure": {
            title: "Infrastructure de facturation électronique et de déclaration des transactions",
            description:
              "Déploiement de dorsales nationales de facturation électronique : des passerelles de l'administration fiscale à l'onboarding des contribuables et au suivi de la conformité.",
          },
        },
      },
    },
  },
  "web-portals": {
    categories: {
      Consultancy: {
        tagline:
          "Standardisation, architecture de l'information et strategie multi-tenant.",
        items: {
          "portal-standardization": {
            title: "Standardisation des portails web et architecture multi-locataires",
            description:
              "Systèmes de design, audits d'accessibilité (WCAG AA comme plancher, pas comme bonus) et architectures multi-locataires qui permettent à des centaines de sites publics de partager une seule colonne opérationnelle, avec autonomie par institution et gouvernance centrale.",
          },
        },
      },
      Services: {
        tagline:
          "Livraison de portails a l'echelle institutionnelle et nationale.",
        items: {
          "government-portals": {
            title: "Portails web gouvernementaux standardisés",
            description:
              "Portails gouvernementaux sur TYPO3 et Drupal : multi-locataires, accessibles, sécurisés et prêts à passer d'un ministère unique à des centaines d'institutions.",
          },
        },
      },
      Products: {
        tagline:
          "Des plateformes que nous possedons et faisons evoluer.",
        items: {
          "arxia-portal-framework": {
            title: "Portails gouvernementaux standardisés",
            description:
              "Stack de portails gouvernementaux multi-locataires et conformes WCAG sur TYPO3 et Drupal. Alimente plus de 350 sites au Rwanda et conçu pour s'étendre à d'autres administrations sans réécriture depuis zéro.",
          },
        },
      },
      Trainings: {
        tagline:
          "Formation technique pour les equipes qui exploiteront les portails.",
        items: {
          "training-typo3": {
            title: "Formation technique TYPO3 pour le secteur public sur les Portails Gouvernementaux Standardisés",
            description:
              "Formation pratique TYPO3 pour les équipes techniques internes du gouvernement : installation, configuration multi-locataires, modélisation de contenus, accessibilité (WCAG) et maintenance à long terme du stack qui alimente les Portails Gouvernementaux Standardisés.",
          },
        },
      },
    },
  },
  "agentic-state": {
    categories: {
      Consultancy: {
        tagline:
          "IA responsable dans le secteur public, de la strategie a la gouvernance.",
        items: {
          "ai-readiness-gov": {
            title: "Évaluations de la maturité IA des gouvernements",
            description:
              "Diagnostics de votre situation sur les données, les compétences, l'infrastructure et la préparation juridique, et de ce qu'il faut corriger en premier pour adopter l'IA de manière responsable.",
          },
          "agentic-state-strategy": {
            title: "Stratégie et architecture de l'État agentique",
            description:
              "Stratégie et architectures de référence pour un secteur public où les agents d'IA gèrent les demandes des citoyens et la coordination interinstitutionnelle : pas un chatbot greffé, mais un État repensé.",
          },
          "public-ai-governance": {
            title: "Cadres de gouvernance de l'IA pour le secteur public",
            description:
              "Cadres de gouvernance de l'IA alignés sur l'ISO, le Règlement IA de l'UE et les règles nationales émergentes, adaptés aux ministères, agences et organisations internationales.",
          },
          "responsible-ai-policy": {
            title: "Politique d'IA responsable et conseil en commande publique",
            description:
              "Conseil sur les politiques de commande publique en IA, les clauses contractuelles types et les exigences de transparence, pour que votre prochain appel d'offres en IA parte d'une meilleure position.",
          },
        },
      },
      Services: {
        tagline:
          "Construction et deploiement de l'IA dans le secteur public.",
        items: {
          "ai-agents-public-services": {
            title: "Agents d'IA pour les services publics",
            description:
              "Assistants virtuels multicanaux sur le web, le mobile, l'USSD et la voix, y compris des canaux pour publics peu alphabétisés en langues locales, qui gèrent le volume réel des citoyens, pas seulement des démos.",
          },
          "ai-acceleration-gov": {
            title: "Programme d'Accélération IA pour le Gouvernement",
            description:
              "Programme d'adoption structuré de 12 semaines pour les organisations du secteur public. Fait passer votre équipe de la stratégie à des cas d'usage IA en fonctionnement en un seul trimestre.",
          },
        },
      },
      Products: {
        tagline:
          "Des plateformes que nous possedons et faisons evoluer.",
        items: {
          "ai-governance-platform-gov": {
            title: "Plateforme de Gouvernance de l'IA pour les Gouvernements",
            description:
              "Votre organisation s'oriente vers des déploiements d'IA et un État agentique ? Vous avez besoin d'une gouvernance solide. Notre plateforme surveille la conformité, les vulnérabilités de sécurité et l'évaluation des risques pour chaque système d'IA utilisé dans votre organisation.",
          },
          "holonn": {
            title: "Holonn — Plateforme de matchmaking et de communauté pour écosystèmes",
            description:
              "Holonn permet aux organisations d'appui aux entreprises et aux écosystèmes (clusters, hubs, associations, accélérateurs) d'agréger les offres de leurs membres grâce à l'IA, en créant des places de marché interactives qui mettent en relation entreprises, investisseurs, clients et partenaires.",
          },
        },
      },
      Trainings: {
        tagline:
          "Developper la capacite IA au sein de l'institution.",
        items: {
          "ai-ignite-gov": {
            title: "Atelier AI IGNITE pour le secteur public",
            description:
              "Atelier de découverte pour identifier les premières opportunités d'IA dans vos opérations, avec une liste priorisée, des estimations d'effort et un plan à 90 jours.",
          },
        },
      },
    },
  },
  "e-services": {
    categories: {
      Consultancy: {
        tagline:
          "Refonte des services autour de parcours citoyens reels.",
        items: {
          "egov-strategy": {
            title: "Stratégies et feuilles de route d'e-gouvernement",
            description:
              "Stratégies nationales de numérisation traduites en feuilles de route activables : séquencement, budget, gouvernance et portage institutionnel pour que la stratégie ne reste pas dans un tiroir.",
          },
          "life-events-redesign": {
            title: "Refonte des événements de vie et des services au citoyen",
            description:
              "Nous repensons la façon dont les citoyens vivent les moments clés avec l'État (naissance, création d'entreprise, retraite) en reconstruisant de bout en bout les services qui les sous-tendent.",
          },
          "bpmn-process-design": {
            title: "Conception et optimisation des processus (BPMN 2.0)",
            description:
              "Modélisation BPMN 2.0 des services publics, avec notation formelle, validations avec parties prenantes et pilotes exécutables sur les principaux moteurs de workflow.",
          },
        },
      },
      Services: {
        tagline:
          "Livraison de services en low-code et assistee par l'IA.",
        items: {
          "low-code-eservices": {
            title: "Plateformes low-code de services électroniques",
            description:
              "Des plateformes qui permettent à vos équipes de lancer de nouveaux services publics et agents d'IA en jours et non en trimestres, avec gouvernance et auditabilité intégrées.",
          },
          "document-processing": {
            title: "Traitement documentaire augmenté par l'IA",
            description:
              "Extraction, classification et résumé du backlog documentaire dans lequel la plupart des institutions publiques se noient : des permis aux demandes de subvention.",
          },
          "egov-development": {
            title: "Développement de systèmes d'e-gouvernement",
            description:
              "Développement sur mesure de plateformes gouvernementales : des registres et des systèmes de gestion des dossiers aux portails de services destinés aux citoyens, sur des stacks ouverts et interopérables.",
          },
        },
      },
      Trainings: {
        tagline:
          "Renforcement des capacites des equipes qui concoivent et exploitent les services.",
        items: {
          "bpmn-coaching": {
            title: "Atelier : Coaching à la mise en œuvre BPMN",
            description:
              "Coaching pratique sur Camunda, Flowable et des moteurs de workflow similaires. Livré au sein de votre équipe, pour que la capacité demeure après notre départ.",
          },
          "ecosystem-capacity": {
            title: "Internationalisation de l'écosystème et proposition de valeur",
            description:
              "Programmes qui équipent les écosystèmes technologiques locaux pour réaliser eux-mêmes des travaux de DPI et concourir à l'international, de la formation de formateurs à la préparation à l'exportation.",
          },
        },
      },
    },
  },
};
