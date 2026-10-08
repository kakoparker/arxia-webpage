// French text overlay for src/data/domain-pages.ts. Same shape/rules as
// domain-pages.es.ts. Page identity is translated upstream in
// ./expertise-domains.fr.ts.

import type { DomainPageOverlay } from "./domain-pages.es";

export const domainPagesFr: Record<string, DomainPageOverlay> = {
  "interoperability": {
    layers: {
      L03: {
        name: "Stratégie et gouvernance",
        dimension: "Organisationnelle · Juridique",
        promise:
          "Décider comment devenir interopérable avant d'écrire la moindre ligne de code.",
        scope: "Cadres · audits de maturité · politique de partage des données · feuilles de route",
        items: {
          "interoperability-frameworks": {
            title: "Cadres nationaux et sectoriels d'interopérabilité",
            description:
              "L'architecture de référence, les principes et les règles qui alignent toutes les institutions d'un pays ou d'un secteur.",
          },
          "interoperability-maturity": {
            title: "Évaluation et audit de maturité en interopérabilité",
            description:
              "Un diagnostic de préparation sur les personnes, les politiques, les données et les systèmes, pour savoir quoi construire en premier.",
          },
          "data-sharing-policy": {
            title: "Politique de partage des données et gouvernance multipartite",
            description:
              "Des accords juridiques et organisationnels, règles de consentement comprises, qui permettent aux institutions et aux pays de partager des données en confiance.",
          },
          "adoption-roadmaps": {
            title: "Feuilles de route d'adoption et méthodologie de maintenance",
            description:
              "Des plans par étapes que les ministères mènent en parallèle, adoption de GovStack comprise, et la gouvernance qui fait vivre les standards.",
          },
        },
      },
      L02: {
        name: "Standards et sémantique",
        dimension: "Sémantique",
        promise: "Que les données aient le même sens partout où elles circulent.",
        scope: "Standards de données · modèles sémantiques · validateurs · registres",
        items: {
          "semantic-standards": {
            title: "Modèles sémantiques de données et standards",
            description:
              "Des modèles partagés et des standards de données, de la couche conceptuelle jusqu'aux transpositions techniques.",
          },
          "conformance-tooling": {
            title: "Validateurs techniques et outils de conformité",
            description:
              "Des règles vérifiables par machine, pour que les données soient correctes par construction et non par inspection.",
          },
          "registry-standardization": {
            title: "Standardisation des registres",
            description:
              "Des registres de référence (population, entreprises, foncier) alignés sur une même structure, une stratégie d'identifiants et un vocabulaire.",
          },
          "standard-localization": {
            title: "Localisation et maintenance des standards",
            description:
              "Des standards internationaux adaptés au contexte national, puis gouvernés pour rester à jour.",
          },
        },
      },
      L01: {
        name: "Échange et intégration",
        dimension: "Technique",
        promise: "Faire circuler les données, en sécurité et en production.",
        scope: "Architecture · API · X-Road · plateformes d'échange",
        items: {
          "interoperability-architecture": {
            title: "Conception d'architecture d'interopérabilité",
            description:
              "Le plan technique qui relie registres, services et institutions de bout en bout.",
          },
          "api-development": {
            title: "Développement et intégration d'API",
            description:
              "Des API fondées sur des standards derrière une passerelle gouvernée, avec les systèmes ministériels et existants intégrés à travers elles.",
          },
          "xroad-integration": {
            title: "Déploiement et intégration de X-Road",
            description:
              "Des institutions raccordées aux réseaux nationaux sécurisés d'échange de données (X-Road, Pub/Sub), sur des stacks ouvertes sans cœur verrouillé.",
          },
          "regional-exchange-platforms": {
            title: "Plateformes d'échange régionales et systèmes de systèmes",
            description:
              "Des plateformes multi-institutions et multi-pays qui collectent, valident et partagent des données à grande échelle, sur une infrastructure souveraine.",
          },
        },
      },
    },
    categories: {
      Trainings: {
        tagline:
          "Renforcement des capacités des décideurs et des équipes techniques du secteur public.",
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
          "Cadres de gouvernance, régimes de consentement et diagnostics de maturité.",
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
          "Renforcement des capacités des décideurs, des équipes juridiques et du personnel institutionnel.",
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
    tracks: {
      "01": {
        name: "Réforme",
        kind: "Conseil",
        promise: "Fixer les règles et le processus avant d'écrire une seule ligne de code.",
        scope: "Diagnostic · stratégie · réglementation · refonte des processus",
        items: {
          "procurement-assessment": {
            title: "Diagnostic du système de commande publique",
            description:
              "Un diagnostic du cadre juridique, des institutions, des processus et des systèmes, pour que la réforme commence là où elle compte le plus.",
          },
          "eprocurement-strategy": {
            title: "Stratégie et feuille de route de dématérialisation",
            description:
              "Une stratégie nationale ou institutionnelle, phasée et chiffrée, que les autorités de la commande publique peuvent mettre en œuvre pas à pas.",
          },
          "regulatory-alignment": {
            title: "Alignement réglementaire et normatif",
            description:
              "Règles, procédures et standards de données alignés sur les bonnes pratiques internationales, pour que la plateforme repose sur des bases solides.",
          },
          "process-redesign": {
            title: "Refonte des processus d'achat",
            description:
              "Des processus cartographiés et simplifiés, de la demande d'achat au paiement, avant toute configuration dans un système.",
          },
        },
      },
      "02": {
        name: "Personnes",
        kind: "Renforcement des capacités",
        promise: "Préparer celles et ceux qui feront vivre le système, avant sa mise en service.",
        scope: "Acheteurs · formateurs · fournisseurs · conduite du changement",
        items: {
          "procurement-officer-training": {
            title: "Formation des acheteurs publics",
            description:
              "Une formation pratique aux nouvelles procédures et à la plateforme, construite autour des dossiers d'achat du quotidien.",
          },
          "local-trainers": {
            title: "Formateurs locaux et capacité institutionnelle",
            description:
              "Des formateurs et des équipes locales prêts à transmettre le savoir, pour que la capacité continue de croître après le transfert.",
          },
          "supplier-engagement": {
            title: "Accompagnement des fournisseurs",
            description:
              "Sensibilisation et accompagnement qui amènent les fournisseurs, petites entreprises comprises, vers les procédures électroniques.",
          },
          "change-management": {
            title: "Conduite du changement et support",
            description:
              "L'engagement des dirigeants et un support au quotidien, pour qu'un nouveau système devienne une nouvelle façon de travailler.",
          },
        },
      },
      "03": {
        name: "Plateforme",
        promise: "Chaque étape numérique, chaque document justifié, chaque montant traçable.",
        scope: "Demandes · plan d'achats · contrats · audit",
        items: {
          "purchase-requests": {
            title: "Demandes d'achat dématérialisées",
            description:
              "Des besoins exprimés, justifiés et approuvés en ligne, avec signature électronique à la place des dossiers papier.",
          },
          "procurement-plan": {
            title: "Plan d'achats et suivi budgétaire",
            description:
              "Quantités et montants suivis en temps réel par rapport au plan annuel d'achats et aux engagements budgétaires.",
          },
          "contracts-suppliers": {
            title: "Contrats, commandes et fournisseurs",
            description:
              "Contrats, accords-cadres et commandes fournisseurs suivis jusqu'au dernier paiement.",
          },
          "audit-reporting": {
            title: "Rapports prêts pour l'audit",
            description:
              "Des rapports pour les responsables et les auditeurs à tous les niveaux, chaque document étant justifié et archivé.",
          },
        },
      },
    },
  },
  "e-invoicing": {
    categories: {
      Consultancy: {
        tagline:
          "Stratégie et conseil en conformité fiscale.",
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
          "Infrastructure de facturation et de déclaration des transactions.",
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
          "Standardisation, architecture de l'information et stratégie multi-tenant.",
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
          "Livraison de portails à l'échelle institutionnelle et nationale.",
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
          "Des plateformes que nous possédons et faisons évoluer.",
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
          "Formation technique pour les équipes qui exploiteront les portails.",
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
          "IA responsable dans le secteur public, de la stratégie à la gouvernance.",
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
          "Construction et déploiement de l'IA dans le secteur public.",
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
          "inter-institutional-workflows": {
            title: "Flux de travail interinstitutionnels automatisés",
            description:
              "Flux de travail assistés par IA qui acheminent les demandes, documents et décisions entre plusieurs organismes, en comprimant des semaines de coordination en jours.",
          },
        },
      },
      Products: {
        tagline:
          "Des plateformes que nous possédons et faisons évoluer.",
        items: {
          "ai-governance-platform-gov": {
            title: "Plateforme de Gouvernance de l'IA pour les Gouvernements",
            description:
              "Votre organisation s'oriente vers des déploiements d'IA et un État agentique ? Vous avez besoin d'une gouvernance solide. Notre plateforme surveille la conformité, les vulnérabilités de sécurité et l'évaluation des risques pour chaque système d'IA utilisé dans votre organisation.",
          },
          "holonn": {
            title: "Holonn: Plateforme de matchmaking et de communauté pour écosystèmes",
            description:
              "Holonn permet aux organisations d'appui aux entreprises et aux écosystèmes (clusters, hubs, associations, accélérateurs) d'agréger les offres de leurs membres grâce à l'IA, en créant des places de marché interactives qui mettent en relation entreprises, investisseurs, clients et partenaires.",
          },
        },
      },
      Trainings: {
        tagline:
          "Développer la capacité IA au sein de l'institution.",
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
          "Refonte des services autour de parcours citoyens réels.",
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
          "Livraison de services en low-code et assistée par l'IA.",
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
          "Renforcement des capacités des équipes qui conçoivent et exploitent les services.",
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
