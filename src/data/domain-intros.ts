import type { ExpertiseDomainSlug } from "./expertise-domains";

// ─────────────────────────────────────────────────────────────────────────────
// Homepage domain panels: the introduction shown when a domain block is
// opened. One paragraph per domain, in every locale, written to the CEO's copy
// rules (no "you", no semicolons, no founding-year claims) and citing only
// work that is in the public portfolio.
//
// Server-only: the homepage resolves one locale and passes the text to the
// client grid as props, so the other locales never reach the browser.
// ─────────────────────────────────────────────────────────────────────────────

type Intros = Record<ExpertiseDomainSlug, string>;

const en: Intros = {
  interoperability:
    "Connecting two systems is the easy part. Agreeing who may share which data, in what format and under which rules takes far longer, and that is where most exchange projects stall. Arxia works on both: frameworks, data-sharing policy and semantic standards first, then the architecture, the APIs and the X-Road or Pub/Sub layer that moves the data. Recent work includes the architecture of Cambodia's digital social protection platform and a data-sharing policy and standard for the 12 ICGLR member states.",
  "data-governance":
    "Data can only move between institutions once someone has decided who may use it, for what purpose and on what legal basis. Arxia drafts the frameworks that settle this: governance rules and roles, consent regimes, data-protection agreements and the semantic models that make records comparable. In Rwanda, that meant a consent and personal-data protection framework built on the GovStack Consent Building Block, and a national data standard for mining and minerals.",
  "e-procurement":
    "A platform only digitalizes the process an institution already has. So the work starts with the reform: the legal framework and the procedures are assessed and simplified before anything is configured. Procurement officers and suppliers learn the new procedures next, and local trainers carry that knowledge after handover. The platform comes last. ProcessPlayer, Arxia's own e-procurement platform, runs the full cycle from purchase request to final payment for more than 50 public organizations in Romania.",
  "e-invoicing":
    "With electronic invoicing, a tax authority sees transactions when they happen instead of months later at filing time. Arxia advises on e-invoicing strategy and tax compliance, then deploys the infrastructure: the tax authority's gateway, taxpayer onboarding and compliance monitoring. Designs follow regional and international reporting standards, so invoices can cross borders. In the Central African Republic, Arxia provided consultancy and implementation for electronic invoicing and commercial transaction reporting.",
  "web-portals":
    "When every institution builds its own website, people meet a different layout, a different search and a different level of accessibility on each one. A shared standard fixes that. Arxia designs multi-tenant portal platforms where hundreds of sites share one design system and one technical backbone, while each institution keeps control of its own content. In Rwanda, that platform carries more than 350 public websites on TYPO3, and five certified experts audited and fixed the whole portfolio against WCAG accessibility rules.",
  "agentic-state":
    "A chatbot answers questions. An agentic state reorganizes the work behind them, so a request moves between institutions instead of a citizen carrying papers from office to office. Arxia works on what decides whether that is safe: AI readiness assessments, governance frameworks, procurement rules for AI and the data underneath. It also builds assistants that citizens use every day. Mbaza, built for the Rwanda Biomedical Center, answers on web, mobile, USSD and voice calls in the local language, including people who cannot read.",
  "e-services":
    "People meet government at moments in their lives: a birth, a new business, a retirement. Arxia redesigns the services behind those moments, maps the processes in BPMN and builds them on low-code platforms, with AI handling the document load, so a new service can go live in weeks. As part of the consortium for Romania's e-government strategy, Arxia worked on the redesign of 36 life events and on training for 16 central institutions. In Senegal, Arxia supports the government's adoption of the GovStack framework.",
};

const es: Intros = {
  interoperability:
    "Conectar dos sistemas es la parte fácil. Acordar quién puede compartir qué datos, en qué formato y bajo qué reglas lleva mucho más tiempo, y ahí es donde se estancan la mayoría de los proyectos de intercambio. Arxia trabaja en ambos frentes: primero los marcos, la política de intercambio de datos y los estándares semánticos, después la arquitectura, las API y la capa X-Road o Pub/Sub que mueve los datos. Entre los trabajos recientes están la arquitectura de la plataforma digital de protección social de Camboya y una política y un estándar de intercambio de datos para los 12 Estados miembros de la CIRGL.",
  "data-governance":
    "Los datos solo pueden circular entre instituciones cuando alguien ha decidido quién puede usarlos, con qué fin y con qué base legal. Arxia redacta los marcos que lo resuelven: reglas y roles de gobernanza, regímenes de consentimiento, acuerdos de protección de datos y los modelos semánticos que hacen comparables los registros. En Ruanda, eso significó un marco de consentimiento y protección de datos personales basado en el Consent Building Block de GovStack, y un estándar nacional de datos para la minería y los minerales.",
  "e-procurement":
    "Una plataforma solo digitaliza el proceso que una institución ya tiene. Por eso el trabajo empieza por la reforma: el marco legal y los procedimientos se evalúan y se simplifican antes de configurar nada. Después, los funcionarios de compras y los proveedores aprenden los nuevos procedimientos, y formadores locales mantienen ese conocimiento tras la transferencia. La plataforma llega al final. ProcessPlayer, la plataforma de contratación electrónica propia de Arxia, gestiona el ciclo completo, de la solicitud de compra al pago final, para más de 50 organizaciones públicas en Rumanía.",
  "e-invoicing":
    "Con la facturación electrónica, una autoridad tributaria ve las transacciones cuando ocurren, no meses después, al presentar las declaraciones. Arxia asesora en estrategia de facturación electrónica y cumplimiento tributario, y despliega la infraestructura: la pasarela de la autoridad tributaria, la incorporación de contribuyentes y el control del cumplimiento. Los diseños siguen estándares de reporte regionales e internacionales, para que las facturas puedan cruzar fronteras. En la República Centroafricana, Arxia aportó consultoría e implementación para la facturación electrónica y el reporte de transacciones comerciales.",
  "web-portals":
    "Cuando cada institución construye su propio sitio web, la gente encuentra en cada uno un diseño distinto, un buscador distinto y un nivel de accesibilidad distinto. Un estándar compartido lo resuelve. Arxia diseña plataformas de portales multiinquilino en las que cientos de sitios comparten un mismo sistema de diseño y una misma base técnica, mientras cada institución controla su propio contenido. En Ruanda, esa plataforma aloja más de 350 sitios web públicos sobre TYPO3, y cinco expertos certificados auditaron y corrigieron todo el conjunto según las normas de accesibilidad WCAG.",
  "agentic-state":
    "Un chatbot responde preguntas. Un Estado agéntico reorganiza el trabajo que hay detrás, para que una solicitud circule entre instituciones en lugar de que un ciudadano lleve papeles de una oficina a otra. Arxia trabaja en lo que decide si eso es seguro: evaluaciones de preparación para la IA, marcos de gobernanza, reglas de contratación de IA y los datos que hay debajo. También construye asistentes que la ciudadanía usa a diario. Mbaza, creado para el Rwanda Biomedical Center, responde por web, móvil, USSD y llamadas de voz en el idioma local, también a personas que no saben leer.",
  "e-services":
    "La gente se encuentra con el gobierno en momentos de su vida: un nacimiento, un nuevo negocio, una jubilación. Arxia rediseña los servicios detrás de esos momentos, modela los procesos en BPMN y los construye sobre plataformas low-code, con IA para la carga documental, de modo que un nuevo servicio puede estar en marcha en semanas. Como parte del consorcio de la estrategia de gobierno electrónico de Rumanía, Arxia trabajó en el rediseño de 36 hechos vitales y en la formación de 16 instituciones centrales. En Senegal, Arxia apoya la adopción del marco GovStack por parte del gobierno.",
};

const fr: Intros = {
  interoperability:
    "Connecter deux systèmes est la partie facile. Se mettre d'accord sur qui peut partager quelles données, dans quel format et selon quelles règles prend bien plus de temps, et c'est là que la plupart des projets d'échange s'enlisent. Arxia travaille sur les deux : d'abord les cadres, la politique de partage des données et les standards sémantiques, puis l'architecture, les API et la couche X-Road ou Pub/Sub qui fait circuler les données. Parmi les travaux récents figurent l'architecture de la plateforme numérique de protection sociale du Cambodge et une politique et un standard de partage des données pour les 12 États membres de la CIRGL.",
  "data-governance":
    "Les données ne circulent entre institutions qu'une fois décidé qui peut les utiliser, dans quel but et sur quelle base juridique. Arxia rédige les cadres qui tranchent ces questions : règles et rôles de gouvernance, régimes de consentement, accords de protection des données et modèles sémantiques qui rendent les registres comparables. Au Rwanda, cela a donné un cadre de consentement et de protection des données personnelles fondé sur le Consent Building Block de GovStack, et un standard national de données pour les mines et les minerais.",
  "e-procurement":
    "Une plateforme ne fait que numériser le processus qu'une institution a déjà. Le travail commence donc par la réforme : le cadre juridique et les procédures sont évalués et simplifiés avant toute configuration. Les agents des marchés publics et les fournisseurs apprennent ensuite les nouvelles procédures, et des formateurs locaux font vivre ce savoir après le transfert. La plateforme vient en dernier. ProcessPlayer, la plateforme de marchés publics électroniques d'Arxia, gère le cycle complet, de la demande d'achat au paiement final, pour plus de 50 organisations publiques en Roumanie.",
  "e-invoicing":
    "Avec la facturation électronique, une administration fiscale voit les transactions au moment où elles ont lieu, et non des mois plus tard lors des déclarations. Arxia conseille sur la stratégie de facturation électronique et la conformité fiscale, puis déploie l'infrastructure : la passerelle de l'administration fiscale, l'intégration des contribuables et le suivi de la conformité. Les conceptions suivent les standards de déclaration régionaux et internationaux, pour que les factures puissent passer les frontières. En République centrafricaine, Arxia a assuré le conseil et la mise en œuvre de la facturation électronique et de la déclaration des transactions commerciales.",
  "web-portals":
    "Quand chaque institution construit son propre site, chacun présente une mise en page différente, une recherche différente et un niveau d'accessibilité différent. Un standard commun règle cela. Arxia conçoit des plateformes de portails multi-locataires où des centaines de sites partagent un même système de design et un même socle technique, tandis que chaque institution garde la main sur son contenu. Au Rwanda, cette plateforme porte plus de 350 sites publics sur TYPO3, et cinq experts certifiés ont audité et corrigé l'ensemble selon les règles d'accessibilité WCAG.",
  "agentic-state":
    "Un chatbot répond aux questions. Un État agentique réorganise le travail qui se trouve derrière, pour qu'une demande circule entre institutions au lieu qu'un citoyen porte des papiers d'un guichet à l'autre. Arxia travaille sur ce qui décide si c'est sûr : évaluations de maturité IA, cadres de gouvernance, règles d'achat de l'IA et données sous-jacentes. Arxia construit aussi des assistants que les citoyens utilisent au quotidien. Mbaza, conçu pour le Rwanda Biomedical Center, répond sur le web, le mobile, l'USSD et par appel vocal dans la langue locale, y compris aux personnes qui ne savent pas lire.",
  "e-services":
    "On rencontre l'administration à des moments de sa vie : une naissance, une nouvelle entreprise, une retraite. Arxia repense les services derrière ces moments, modélise les processus en BPMN et les construit sur des plateformes low-code, avec l'IA pour la charge documentaire, si bien qu'un nouveau service peut être en ligne en quelques semaines. Au sein du consortium chargé de la stratégie d'e-gouvernement de la Roumanie, Arxia a travaillé sur la refonte de 36 événements de vie et sur la formation de 16 institutions centrales. Au Sénégal, Arxia accompagne l'adoption du cadre GovStack par le gouvernement.",
};

const INTROS: Record<string, Intros> = { en, es, fr };

/** A domain's homepage-panel introduction, falling back to English. */
export function getDomainIntro(slug: ExpertiseDomainSlug, locale: string = "en"): string {
  return (INTROS[locale] ?? en)[slug];
}
