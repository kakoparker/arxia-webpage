// French text overlay for src/data/domain-pages.ts. Same shape as the ES file.
import type { DomainPageOverlay } from "./domain-pages.es";

export const domainPagesFr: Record<string, DomainPageOverlay> = {
  // ── GOVTECH · DONNÉES ────────────────────────────────────────────
  "govtech-data": {
    title: "Données",
    tagline: "Le tissu conjonctif de l'État",
    description:
      "Nous concevons la couche de données de l'infrastructure publique numérique : interopérabilité, gouvernance et cadres d'échange qui permettent aux institutions de partager l'information de manière sécurisée entre directions, frontières et building blocks.",
    metaTitle: "Govtech · Données — Interopérabilité et Gouvernance des Données",
    metaDescription:
      "Interopérabilité des données, gouvernance, standards sémantiques et systèmes d'échange transfrontalier pour le secteur public. Construit sur GovStack, X-Road et des cadres ouverts.",
    categories: {
      Consultancy: {
        tagline: "Stratégie, politiques et architecture pour la couche de données de l'État.",
        items: {
          "interoperability-strategy": {
            title: "Stratégie d'interopérabilité des données",
            description:
              "Feuilles de route d'interopérabilité nationales et transfrontalières fondées sur GovStack, X-Road et des modèles Pub/Sub. Nous traduisons les priorités politiques en un plan technique par étapes que plusieurs ministères peuvent exécuter en parallèle.",
          },
          "data-governance": {
            title: "Gouvernance des données",
            description:
              "Politiques, rôles, règles de responsabilité et dispositifs institutionnels pour un partage de confiance des données publiques. Livré comme un cadre formel que votre conseil des ministres ou votre agence numérique peut adopter et faire appliquer.",
          },
          "national-registry-design": {
            title: "Conception de registres nationaux",
            description:
              "Architecture et conception des registres nationaux faisant foi (population, entreprises, foncier, véhicules) : modèle de données, stratégie d'identifiants, règles de gouvernance et points d'intégration avec la dorsale d'échange de données.",
          },
        },
      },
      Services: {
        tagline: "Livraison, mise en œuvre et habilitation technique.",
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
        },
      },
      Products: {
        tagline: "Des plateformes que nous développons et faisons évoluer.",
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
          "Renforcement des capacités des décideurs, des équipes juridiques et du personnel technique du secteur public.",
        items: {
          "training-data-governance": {
            title: "Atelier : Gouvernance des données pour les institutions publiques",
            description:
              "Atelier structuré pour la direction ministérielle, les équipes juridiques et le personnel des agences numériques. Couvre les cadres de gouvernance, les rôles de responsabilité, les régimes de consentement et la façon d'inscrire les règles de protection des données dans la pratique institutionnelle quotidienne.",
          },
          "training-interop-strategies": {
            title: "Atelier : Stratégies d'interopérabilité pour les institutions publiques",
            description:
              "Atelier non technique pour les décideurs et la direction ministérielle. Construit un vocabulaire commun sur GovStack, X-Road et les modèles Pub-Sub, afin que les décisions concernant les initiatives de partage de données reposent sur le fond plutôt que sur les acronymes.",
          },
        },
      },
    },
  },

  // ── GOVTECH · PROCESSUS ───────────────────────────────────────────
  "govtech-process": {
    title: "Processus",
    tagline: "Les services publics, repensés",
    description:
      "Conception de services pilotée par BPMN, commande publique et facturation de bout en bout, et portails gouvernementaux standardisés : modernisation de la façon dont l'État crée de la valeur pour les citoyens.",
    metaTitle: "Govtech · Processus — Conception de Services, e-Procurement et Portails",
    metaDescription:
      "Stratégie d'e-gouvernement, conception de processus BPMN, commande publique électronique, facturation électronique et portails gouvernementaux standardisés. Plus de 20 ans dans plus de 20 pays.",
    categories: {
      Consultancy: {
        tagline: "Stratégie et refonte des processus institutionnels et destinés aux citoyens.",
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
          "eprocurement-strategy": {
            title: "Stratégie de commande publique électronique, standards et alignement réglementaire",
            description:
              "Travail de stratégie nationale de commande publique : de l'alignement réglementaire et l'adoption de standards à la conception de la conduite du changement pour les autorités de commande.",
          },
          "einvoicing-advisory": {
            title: "Stratégie de facturation électronique et conseil en conformité fiscale",
            description:
              "Stratégies de facturation électronique qui restent conformes au droit fiscal local et s'alignent sur les standards régionaux et internationaux de déclaration qui émergent.",
          },
          "portal-standardization": {
            title: "Standardisation des portails web et architecture multi-locataires",
            description:
              "Systèmes de design, audits d'accessibilité (WCAG AA comme plancher, pas comme bonus) et architectures multi-locataires qui permettent à des centaines de sites publics de partager une seule colonne opérationnelle, avec autonomie par institution et gouvernance centrale.",
          },
        },
      },
      Services: {
        tagline: "Mise en œuvre, intégration et livraison de plateformes.",
        items: {
          "egov-development": {
            title: "Développement de systèmes d'e-gouvernement",
            description:
              "Développement sur mesure de plateformes gouvernementales : des registres et des systèmes de gestion des dossiers aux portails de services destinés aux citoyens, sur des stacks ouverts et interopérables.",
          },
          "eproc-implementation": {
            title: "Mise en œuvre intégrale de plateformes de commande publique électronique",
            description:
              "Déploiement complet des systèmes de commande publique (planification, appel d'offres, évaluation, attribution et gestion des contrats) avec intégration aux systèmes financiers et d'audit.",
          },
          "einvoicing-infrastructure": {
            title: "Infrastructure de facturation électronique et de déclaration des transactions",
            description:
              "Déploiement de dorsales nationales de facturation électronique : des passerelles de l'administration fiscale à l'onboarding des contribuables et au suivi de la conformité.",
          },
          "government-portals": {
            title: "Portails web gouvernementaux standardisés",
            description:
              "Portails gouvernementaux sur TYPO3 et Drupal : multi-locataires, accessibles, sécurisés et prêts à passer d'un ministère unique à des centaines d'institutions.",
          },
        },
      },
      Products: {
        tagline: "Des plateformes que nous développons et faisons évoluer.",
        items: {
          processplayer: {
            title: "ProcessPlayer",
            description:
              "Plateforme de commande publique sur tout le cycle : planification, exécution, accords-cadres et gestion des contrats. Plus de 50 organisations, plus de 30 000 références, en SaaS et on-premise.",
          },
          "arxia-portal-framework": {
            title: "Portails gouvernementaux standardisés",
            description:
              "Stack de portails gouvernementaux multi-locataires et conformes WCAG sur TYPO3 et Drupal. Alimente plus de 350 sites au Rwanda et conçu pour s'étendre à d'autres administrations sans réécriture depuis zéro.",
          },
        },
      },
      Trainings: {
        tagline: "Renforcement des capacités des équipes techniques du secteur public et des écosystèmes locaux.",
        items: {
          "bpmn-coaching": {
            title: "Atelier : Coaching à la mise en œuvre BPMN",
            description:
              "Coaching pratique sur Camunda, Flowable et des moteurs de workflow similaires. Livré au sein de votre équipe, pour que la capacité demeure après notre départ.",
          },
          "training-typo3": {
            title: "Formation technique TYPO3 pour le secteur public sur les Portails Gouvernementaux Standardisés",
            description:
              "Formation pratique TYPO3 pour les équipes techniques internes du gouvernement : installation, configuration multi-locataires, modélisation de contenus, accessibilité (WCAG) et maintenance à long terme du stack qui alimente les Portails Gouvernementaux Standardisés.",
          },
          "ecosystem-capacity": {
            title: "Internationalisation de l'écosystème et proposition de valeur",
            description:
              "Programmes qui équipent les écosystèmes technologiques locaux pour réaliser eux-mêmes des travaux de DPI et concourir à l'international, de la formation de formateurs à la préparation à l'exportation.",
          },
          "govstack-adoption": {
            title: "Programmes d'adoption de GovStack",
            description:
              "Adoption de GovStack à l'échelle d'un pays : alignement architectural, choix des building blocks, pilotes et préparation institutionnelle.",
          },
        },
      },
    },
  },

  // ── GOVTECH · INTELLIGENCE ────────────────────────────────────────
  "govtech-intelligence": {
    title: "Intelligence",
    tagline: "L'État agentique",
    description:
      "Agents d'IA, automatisation intelligente et plateformes augmentées par l'IA qui rendent le secteur public proactif : des assistants destinés aux citoyens aux flux de travail interinstitutionnels.",
    metaTitle: "Govtech · Intelligence — État Agentique et IA du Secteur Public",
    metaDescription:
      "Agents d'IA, flux de travail automatisés, outils de maturité numérique et programmes d'adoption de l'IA pour les gouvernements et les organisations internationales.",
    categories: {
      Consultancy: {
        tagline: "Une IA responsable pour le secteur public, de la stratégie à la gouvernance.",
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
          "digital-maturity": {
            title: "Évaluations de la maturité numérique",
            description:
              "Diagnostics structurés qui hiérarchisent la maturité numérique de votre institution et produisent un plan d'investissement défendable, pas seulement un rapport.",
          },
          "responsible-ai-policy": {
            title: "Politique d'IA responsable et conseil en commande publique",
            description:
              "Conseil sur les politiques de commande publique en IA, les clauses contractuelles types et les exigences de transparence, pour que votre prochain appel d'offres en IA parte d'une meilleure position.",
          },
        },
      },
      Services: {
        tagline: "Conception et déploiement de l'IA pour le secteur public.",
        items: {
          "ai-agents-public-services": {
            title: "Agents d'IA pour les services publics",
            description:
              "Assistants virtuels multicanaux sur le web, le mobile, l'USSD et la voix, y compris des canaux pour publics peu alphabétisés en langues locales, qui gèrent le volume réel des citoyens, pas seulement des démos.",
          },
          "inter-institutional-workflows": {
            title: "Flux de travail interinstitutionnels automatisés",
            description:
              "Flux de travail assistés par IA qui acheminent les demandes, documents et décisions entre plusieurs organismes, en comprimant des semaines de coordination en jours.",
          },
          "document-processing": {
            title: "Traitement documentaire augmenté par l'IA",
            description:
              "Extraction, classification et résumé du backlog documentaire dans lequel la plupart des institutions publiques se noient : des permis aux demandes de subvention.",
          },
          "low-code-eservices": {
            title: "Plateformes low-code de services électroniques",
            description:
              "Des plateformes qui permettent à vos équipes de lancer de nouveaux services publics et agents d'IA en jours et non en trimestres, avec gouvernance et auditabilité intégrées.",
          },
          "ai-acceleration-gov": {
            title: "Programme d'Accélération IA pour le Gouvernement",
            description:
              "Programme d'adoption structuré de 12 semaines pour les organisations du secteur public. Fait passer votre équipe de la stratégie à des cas d'usage IA en fonctionnement en un seul trimestre.",
          },
          "ai-ignite-gov": {
            title: "Atelier AI IGNITE pour le secteur public",
            description:
              "Atelier de découverte pour identifier les premières opportunités d'IA dans vos opérations, avec une liste priorisée, des estimations d'effort et un plan à 90 jours.",
          },
        },
      },
      Products: {
        tagline: "Des plateformes que nous développons et faisons évoluer.",
        items: {
          "ai-governance-platform-gov": {
            title: "Plateforme de Gouvernance de l'IA pour les Gouvernements",
            description:
              "Votre organisation s'oriente vers des déploiements d'IA et un État agentique ? Vous avez besoin d'une gouvernance solide. Notre plateforme surveille la conformité, les vulnérabilités de sécurité et l'évaluation des risques pour chaque système d'IA utilisé dans votre organisation.",
          },
          holonn: {
            title: "Holonn — Plateforme de matchmaking et de communauté pour écosystèmes",
            description:
              "Holonn permet aux organisations d'appui aux entreprises et aux écosystèmes (clusters, hubs, associations, accélérateurs) d'agréger les offres de leurs membres grâce à l'IA, en créant des places de marché interactives qui mettent en relation entreprises, investisseurs, clients et partenaires.",
          },
        },
      },
    },
  },

  // ── INDUSTRIES · DONNÉES ──────────────────────────────────────────
  "industries-data": {
    title: "Données",
    tagline: "Des données d'entreprise, gouvernées et interopérables",
    description:
      "Cadres de gouvernance, de qualité, de conformité et d'intégration des données qui transforment des données d'entreprise fragmentées en un actif concurrentiel durable.",
    metaTitle: "Industries · Données — Gouvernance des Données d'Entreprise",
    metaDescription:
      "Gouvernance des données d'entreprise, gestion des données de référence, conformité RGPD, qualité des données et standards sectoriels d'échange de données pour les secteurs réglementés.",
    categories: {
      Consultancy: {
        tagline: "Stratégie, politiques et standards pour les données d'entreprise.",
        items: {
          "data-governance-strategy": {
            title: "Stratégies de gouvernance des données",
            description:
              "Cadres de gouvernance des données en entreprise (politiques, rôles, responsabilités d'intendance et droits de décision) adaptés à votre secteur et à votre environnement réglementaire.",
          },
          "interoperability-standardization-strategy": {
            title: "Stratégie d'interopérabilité et de standardisation des données",
            description:
              "Stratégie d'échange de données entre systèmes : modèles canoniques, standards sémantiques, contrats d'API et instances de gouvernance nécessaires pour les garder cohérents au fil de l'évolution de votre paysage.",
          },
          "industry-standards": {
            title: "Standards sectoriels d'échange de données",
            description:
              "Cadres d'échange de données propres au secteur (traçabilité minière, déclarations financières, interopérabilité logistique) traduits en standards techniques concrets.",
          },
        },
      },
      Services: {
        tagline: "Mise en œuvre et intégration pour les données d'entreprise.",
        items: {
          "governance-platform": {
            title: "Mise en œuvre de plateformes de gouvernance des données",
            description:
              "Déploiement de plateformes de gouvernance des données : politiques codifiées, flux de travail configurés, intégrations aux systèmes sources livrées.",
          },
          "interoperability-standardization-implementation": {
            title: "Mise en œuvre de l'interopérabilité et de la standardisation des données",
            description:
              "Mise en production des standards : schémas canoniques, registres, pipelines de transformation, services de validation et patterns d'intégration qui rendent les échanges entre systèmes routiniers plutôt que sur mesure.",
          },
          "catalog-lineage": {
            title: "Outils de catalogue de données et de lignage",
            description:
              "Catalogues d'entreprise et outils de lignage qui sont réellement adoptés, parce que nous les paramétrons autour de vos données, pas d'un jeu de démonstration.",
          },
          pipelines: {
            title: "Intégration de données et développement de pipelines",
            description:
              "Pipelines de données de niveau production (batch et streaming) conçus pour l'analytique, les opérations et la préparation à l'IA.",
          },
        },
      },
    },
  },

  // ── INDUSTRIES · PROCESSUS ────────────────────────────────────────
  "industries-process": {
    title: "Processus",
    tagline: "Les opérations de l'entreprise, réinventées",
    description:
      "Numérisation des processus, automatisation des flux de travail et modernisation des systèmes qui génèrent des gains d'efficacité mesurables dans des environnements d'entreprise complexes.",
    metaTitle: "Industries · Processus — Transformation des Entreprises",
    metaDescription:
      "Stratégie de transformation numérique, réingénierie des processus, modernisation des systèmes, portails d'entreprise et internationalisation pour l'industrie.",
    categories: {
      Consultancy: {
        tagline: "Stratégie, audit et conduite du changement pour les opérations de l'entreprise.",
        items: {
          "transformation-roadmap": {
            title: "Stratégie et feuille de route de transformation numérique",
            description:
              "Feuilles de route au niveau direction qui couvrent processus, technologie et conduite du changement, rédigées pour votre conseil d'administration, pas pour un modèle de cabinet.",
          },
          "process-audit": {
            title: "Audit et optimisation des processus (BPMN)",
            description:
              "Audits de processus de bout en bout avec notation BPMN 2.0, ateliers avec parties prenantes et opportunités d'optimisation priorisées, liées à des KPI mesurables.",
          },
          "tech-assessment": {
            title: "Évaluation du stack technologique",
            description:
              "Évaluations indépendantes du stack (licences, adéquation, dette technique et options de migration) avec une recommandation que vos responsables de l'ingénierie peuvent défendre.",
          },
          "change-management": {
            title: "Conseil en conduite du changement",
            description:
              "Playbooks de conduite du changement pour de grands déploiements de processus (communication, formation, incitatifs) afin que l'adoption ne s'effondre pas trois mois après le go-live.",
          },
          "export-strategy": {
            title: "Stratégie d'exportation et d'internationalisation",
            description:
              "Travail de positionnement de marché, de proposition de valeur et de préparation commerciale pour les exportateurs de TI et de services, de la proposition de valeur à la préparation aux salons internationaux.",
          },
          "portal-ia": {
            title: "Architecture de l'information des portails d'entreprise",
            description:
              "Architecture de l'information pour les portails d'entreprise (taxonomies, gouvernance, cycles de vie des contenus) afin que votre intranet serve réellement vos collaborateurs plutôt que de se cacher d'eux.",
          },
        },
      },
      Services: {
        tagline: "Livraison à travers les systèmes d'entreprise, les portails et les flux de travail.",
        items: {
          "process-digitalization": {
            title: "Numérisation des processus d'entreprise",
            description:
              "Numérisation de bout en bout des processus métier centraux, conçue comme des produits et non comme des projets ponctuels, avec une appropriation opérationnelle claire.",
          },
          "system-modernization": {
            title: "Intégration et modernisation des systèmes",
            description:
              "Architecture d'intégration, migration des systèmes hérités et modernisation progressive, avec des patterns sans interruption lorsque le métier l'exige.",
          },
          "custom-platforms": {
            title: "Développement de plateformes sur mesure",
            description:
              "Développement de plateformes d'entreprise sur mesure pour les cas d'usage où le standard ne convient pas, construit sur des stacks ouverts que vous pouvez maîtriser à long terme.",
          },
          "workflow-automation": {
            title: "Automatisation des flux de travail (Camunda, Flowable)",
            description:
              "Automatisation des flux de travail pilotée par BPMN sur Camunda et Flowable, conçue pour survivre aux changements d'organisation et ne pas se figer dans les habitudes d'un seul département.",
          },
          "corporate-portals": {
            title: "Portails d'entreprise et intranets (TYPO3, Drupal)",
            description:
              "Plateformes de contenu d'entreprise (multi-sites, multi-marques, accessibles) avec une gouvernance éditoriale et un cycle de vie qui s'étendent aux filiales.",
          },
          "value-proposition": {
            title: "Proposition de valeur industrielle et habilitation à l'export",
            description:
              "Conception de proposition de valeur pour les exportateurs de TI et de services, plus l'accompagnement aux salons et la construction du pipeline pour la transformer en affaires concrètes.",
          },
        },
      },
      Products: {
        tagline: "Des plateformes pour les opérations de l'entreprise.",
        items: {
          "processplayer-enterprise": {
            title: "ProcessPlayer",
            description:
              "Variante secteur privé de notre plateforme de commande, pour la gestion des appels d'offres B2B, les accords-cadres et la coordination avec les fournisseurs. Même moteur que l'édition publique, configurée pour des flux de travail d'entreprise.",
          },
          efactura: {
            title: "eFactura",
            description:
              "Plateforme intégrale de facturation électronique qui valide les e-factures entrantes et sortantes, les convertit dans les formats requis par vos partenaires commerciaux et gère la transmission du vendeur à l'acheteur, en parallèle des obligations de déclaration auprès des autorités fiscales. Côté acheteur, elle reçoit et traite les factures automatiquement et s'interface à vos systèmes ERP et comptables existants au lieu de les remplacer.\n\nAu-delà de la conformité, eFactura boucle la chaîne de la facture à l'encaissement : une interface OpenBanking permet le paiement direct depuis le même flux, et une interface de factoring transforme les créances approuvées en fonds de roulement, le tout depuis une seule plateforme.",
          },
        },
      },
    },
  },

  // ── INDUSTRIES · INTELLIGENCE ─────────────────────────────────────
  "industries-intelligence": {
    title: "Intelligence",
    tagline: "L'IA à l'échelle de l'entreprise",
    description:
      "Agents d'IA, programmes d'accélération et cadres de gouvernance qui aident les entreprises à adopter l'IA de manière responsable et à grande échelle, avec un ROI mesurable.",
    metaTitle: "Industries · Intelligence — IA d'Entreprise",
    metaDescription:
      "Stratégie, gouvernance, agents, automatisation et programmes d'accélération de l'IA d'entreprise pour les mines, la finance, le commerce, les universités et au-delà.",
    categories: {
      Consultancy: {
        tagline: "Stratégie, gouvernance et conseil pour l'IA d'entreprise.",
        items: {
          "ai-strategy": {
            title: "Stratégie et feuille de route IA",
            description:
              "Un travail de stratégie IA qui part de votre modèle d'exploitation, pas d'une courbe de maturité générique. Produit un portefeuille priorisé de cas d'usage avec responsables et échéances.",
          },
          "ai-governance": {
            title: "Gouvernance de l'IA (ISO, Règlement IA de l'UE)",
            description:
              "Cadres de gouvernance de l'IA alignés sur l'ISO, le Règlement IA de l'UE et vos cadres internes de risque. Rédigés pour passer votre premier audit réglementaire.",
          },
          "ai-readiness": {
            title: "Évaluation de la maturité IA",
            description:
              "Diagnostic honnête de votre situation (données, talents, infrastructure, gouvernance) et de ce qu'il faut corriger en premier pour absorber l'IA à grande échelle.",
          },
          "use-case-prioritization": {
            title: "Identification et priorisation des cas d'usage",
            description:
              "Découverte structurée des opportunités dans vos unités opérationnelles, notées sur l'impact et la faisabilité, pour que votre budget IA ne finance pas 20 pilotes qui n'arrivent jamais en production.",
          },
          "board-advisory": {
            title: "Conseil IA au niveau du conseil d'administration",
            description:
              "Briefings, sessions de stratégie et conseil continu pour les conseils d'administration et comités exécutifs qui pilotent les décisions de gouvernance et d'investissement en IA.",
          },
        },
      },
      Services: {
        tagline: "Conception, déploiement et formation autour de l'IA d'entreprise.",
        items: {
          "ai-agents-enterprise": {
            title: "Développement et déploiement d'agents d'IA",
            description:
              "Agents d'IA sur mesure pour le back-office, le juridique, le commerce et les opérations BPO, conçus pour coexister avec vos systèmes existants et non pour les remplacer du jour au lendemain.",
          },
          "intelligent-automation": {
            title: "Automatisation intelligente des processus",
            description:
              "Automatisation des processus augmentée par l'IA qui prend en charge le travail désordonné et non structuré que la RPA classique ne sait pas traiter : flux documentaires, gestion des exceptions, décisions de jugement.",
          },
          "chatbots-crm": {
            title: "Chatbots et CRM augmentés par l'IA",
            description:
              "Assistants d'IA destinés aux clients, intégrés à votre CRM et à votre base de connaissances : pas des chatbots de démo, mais des systèmes en production qui traitent un volume réel de tickets.",
          },
          "ai-model-integration": {
            title: "Intégration de modèles d'IA sur mesure",
            description:
              "Intégration de modèles d'IA propriétaires et tiers dans votre stack d'entreprise, avec l'observabilité, le contrôle des coûts et les solutions de repli qu'exige la production.",
          },
          "sovereign-ai-workflows": {
            title: "Sovereign AI Workflows",
            description:
              "Moteur sécurisé et open source de flux de travail IA pour les opérations d'entreprise, déployable à l'intérieur de votre périmètre de sécurité avec une pleine résidence des données.",
          },
          "ai-ignite": {
            title: "Atelier AI IGNITE",
            description:
              "Atelier de découverte pour identifier les premières opportunités d'accélération par l'IA au sein de votre organisation, livré en jours et non en mois. Produit un plan à 90 jours.",
          },
          "ai-acceleration": {
            title: "Programme d'Accélération IA",
            description:
              "Programme structuré de 12 semaines pour l'adoption de l'IA dans le marketing, les opérations et l'administration, avec des résultats mesurables et de vrais outils livrés à la fin.",
          },
          "exec-ai-literacy": {
            title: "Programmes de culture IA pour dirigeants et conseils d'administration",
            description:
              "Programmes structurés de culture IA pour la direction et les conseils d'administration, afin que celles et ceux qui prennent les décisions d'investissement en IA comprennent réellement ce qu'ils approuvent.",
          },
        },
      },
      Products: {
        tagline: "Des plateformes et des agents pour l'IA d'entreprise.",
        items: {
          "governance-ai-enterprise": {
            title: "GovernanceAI",
            description:
              "Plateforme de gouvernance de l'IA alignée sur l'ISO, le Règlement IA de l'UE et les cadres internes de risque : registre de modèles, évaluations de risques, traces d'audit et reporting au conseil d'administration.",
          },
          "ai-agents-vertical": {
            title: "Arxia AI Agents — Packs verticaux",
            description:
              "Paquets d'agents préconstruits, calibrés pour les flux de travail du commerce, de la finance et du juridique. Déployables en semaines, configurables sur vos données.",
          },
        },
      },
    },
  },
};
