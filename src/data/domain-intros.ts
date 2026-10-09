import type { ExpertiseDomainSlug } from "./expertise-domains";

// ─────────────────────────────────────────────────────────────────────────────
// Homepage domain panels: the introduction shown when a domain block is
// opened. One paragraph per domain, in every locale, written to the CEO's copy
// rules (no "you", no semicolons, no founding-year claims). They describe
// the practice, not clients or cases: those live on the portfolio.
//
// Server-only: the homepage resolves one locale and passes the text to the
// client grid as props, so the other locales never reach the browser.
// ─────────────────────────────────────────────────────────────────────────────

type Intros = Record<ExpertiseDomainSlug, string>;

const en: Intros = {
  interoperability:
    "Connecting two systems is the easy part. Agreeing who may share which data, in what format and under which rules takes far longer, and that is where most exchange projects stall. Arxia works on both: frameworks, data-sharing policy and semantic standards first, then the architecture, the APIs and the X-Road or Pub/Sub layer that moves the data.",
  "data-governance":
    "Data can only move between institutions once someone has decided who may use it, for what purpose and on what legal basis. Arxia drafts the frameworks that settle this: governance rules and roles, consent regimes, data-protection agreements and the semantic models that make records comparable.",
  "e-procurement":
    "A platform only digitalizes the process an institution already has. So the work starts with the reform: the legal framework and the procedures are assessed and simplified before anything is configured. Procurement officers and suppliers learn the new procedures next, and local trainers carry that knowledge after handover. The platform comes last. ProcessPlayer, Arxia's own e-procurement platform, runs the full cycle from purchase request to final payment.",
  "e-invoicing":
    "With electronic invoicing, a tax authority sees transactions when they happen instead of months later at filing time. Arxia advises on e-invoicing strategy and tax compliance, then deploys the infrastructure: the tax authority's gateway, taxpayer onboarding and compliance monitoring. Designs follow regional and international reporting standards, so invoices can cross borders.",
  "web-portals":
    "When every institution builds its own website, people meet a different layout, a different search and a different level of accessibility on each one. A shared standard fixes that. Arxia designs multi-tenant portal platforms where hundreds of sites share one design system and one technical backbone, while each institution keeps control of its own content. The platforms run on TYPO3 and Drupal, with WCAG accessibility built in from the start.",
  "agentic-state":
    "A chatbot answers questions. An agentic state reorganizes the work behind them, so a request moves between institutions instead of a citizen carrying papers from office to office. Arxia works on what decides whether that is safe: AI readiness assessments, governance frameworks, procurement rules for AI and the data underneath. It also builds assistants that citizens use every day, on web, mobile, USSD and voice, including for people who cannot read.",
  "e-services":
    "People meet government at moments in their lives: a birth, a new business, a retirement. Arxia redesigns the services behind those moments, maps the processes in BPMN and builds them on low-code platforms, with AI handling the document load, so a new service can go live in weeks.",
};

const es: Intros = {
  interoperability:
    "Conectar dos sistemas es la parte fácil. Acordar quién puede compartir qué datos, en qué formato y bajo qué reglas lleva mucho más tiempo, y ahí es donde se estancan la mayoría de los proyectos de intercambio. Arxia trabaja en ambos frentes: primero los marcos, la política de intercambio de datos y los estándares semánticos, después la arquitectura, las API y la capa X-Road o Pub/Sub que mueve los datos.",
  "data-governance":
    "Los datos solo pueden circular entre instituciones cuando alguien ha decidido quién puede usarlos, con qué fin y con qué base legal. Arxia redacta los marcos que lo resuelven: reglas y roles de gobernanza, regímenes de consentimiento, acuerdos de protección de datos y los modelos semánticos que hacen comparables los registros.",
  "e-procurement":
    "Una plataforma solo digitaliza el proceso que una institución ya tiene. Por eso el trabajo empieza por la reforma: el marco legal y los procedimientos se evalúan y se simplifican antes de configurar nada. Después, los funcionarios de compras y los proveedores aprenden los nuevos procedimientos, y formadores locales mantienen ese conocimiento tras la transferencia. La plataforma llega al final. ProcessPlayer, la plataforma de contratación electrónica propia de Arxia, gestiona el ciclo completo, de la solicitud de compra al pago final.",
  "e-invoicing":
    "Con la facturación electrónica, una autoridad tributaria ve las transacciones cuando ocurren, no meses después, al presentar las declaraciones. Arxia asesora en estrategia de facturación electrónica y cumplimiento tributario, y despliega la infraestructura: la pasarela de la autoridad tributaria, la incorporación de contribuyentes y el control del cumplimiento. Los diseños siguen estándares de reporte regionales e internacionales, para que las facturas puedan cruzar fronteras.",
  "web-portals":
    "Cuando cada institución construye su propio sitio web, la gente encuentra en cada uno un diseño distinto, un buscador distinto y un nivel de accesibilidad distinto. Un estándar compartido lo resuelve. Arxia diseña plataformas de portales multiinquilino en las que cientos de sitios comparten un mismo sistema de diseño y una misma base técnica, mientras cada institución controla su propio contenido. Las plataformas funcionan sobre TYPO3 y Drupal, con la accesibilidad WCAG integrada desde el inicio.",
  "agentic-state":
    "Un chatbot responde preguntas. Un Estado agéntico reorganiza el trabajo que hay detrás, para que una solicitud circule entre instituciones en lugar de que un ciudadano lleve papeles de una oficina a otra. Arxia trabaja en lo que decide si eso es seguro: evaluaciones de preparación para la IA, marcos de gobernanza, reglas de contratación de IA y los datos que hay debajo. También construye asistentes que la ciudadanía usa a diario, por web, móvil, USSD y voz, también para personas que no saben leer.",
  "e-services":
    "La gente se encuentra con el gobierno en momentos de su vida: un nacimiento, un nuevo negocio, una jubilación. Arxia rediseña los servicios detrás de esos momentos, modela los procesos en BPMN y los construye sobre plataformas low-code, con IA para la carga documental, de modo que un nuevo servicio puede estar en marcha en semanas.",
};

const fr: Intros = {
  interoperability:
    "Connecter deux systèmes est la partie facile. Se mettre d'accord sur qui peut partager quelles données, dans quel format et selon quelles règles prend bien plus de temps, et c'est là que la plupart des projets d'échange s'enlisent. Arxia travaille sur les deux : d'abord les cadres, la politique de partage des données et les standards sémantiques, puis l'architecture, les API et la couche X-Road ou Pub/Sub qui fait circuler les données.",
  "data-governance":
    "Les données ne circulent entre institutions qu'une fois décidé qui peut les utiliser, dans quel but et sur quelle base juridique. Arxia rédige les cadres qui tranchent ces questions : règles et rôles de gouvernance, régimes de consentement, accords de protection des données et modèles sémantiques qui rendent les registres comparables.",
  "e-procurement":
    "Une plateforme ne fait que numériser le processus qu'une institution a déjà. Le travail commence donc par la réforme : le cadre juridique et les procédures sont évalués et simplifiés avant toute configuration. Les agents des marchés publics et les fournisseurs apprennent ensuite les nouvelles procédures, et des formateurs locaux font vivre ce savoir après le transfert. La plateforme vient en dernier. ProcessPlayer, la plateforme de marchés publics électroniques d'Arxia, gère le cycle complet, de la demande d'achat au paiement final.",
  "e-invoicing":
    "Avec la facturation électronique, une administration fiscale voit les transactions au moment où elles ont lieu, et non des mois plus tard lors des déclarations. Arxia conseille sur la stratégie de facturation électronique et la conformité fiscale, puis déploie l'infrastructure : la passerelle de l'administration fiscale, l'intégration des contribuables et le suivi de la conformité. Les conceptions suivent les standards de déclaration régionaux et internationaux, pour que les factures puissent passer les frontières.",
  "web-portals":
    "Quand chaque institution construit son propre site, chacun présente une mise en page différente, une recherche différente et un niveau d'accessibilité différent. Un standard commun règle cela. Arxia conçoit des plateformes de portails multi-locataires où des centaines de sites partagent un même système de design et un même socle technique, tandis que chaque institution garde la main sur son contenu. Les plateformes reposent sur TYPO3 et Drupal, avec l'accessibilité WCAG intégrée dès le départ.",
  "agentic-state":
    "Un chatbot répond aux questions. Un État agentique réorganise le travail qui se trouve derrière, pour qu'une demande circule entre institutions au lieu qu'un citoyen porte des papiers d'un guichet à l'autre. Arxia travaille sur ce qui décide si c'est sûr : évaluations de maturité IA, cadres de gouvernance, règles d'achat de l'IA et données sous-jacentes. Arxia construit aussi des assistants que les citoyens utilisent au quotidien, sur le web, le mobile, l'USSD et par la voix, y compris pour les personnes qui ne savent pas lire.",
  "e-services":
    "On rencontre l'administration à des moments de sa vie : une naissance, une nouvelle entreprise, une retraite. Arxia repense les services derrière ces moments, modélise les processus en BPMN et les construit sur des plateformes low-code, avec l'IA pour la charge documentaire, si bien qu'un nouveau service peut être en ligne en quelques semaines.",
};

const INTROS: Record<string, Intros> = { en, es, fr };

/** A domain's homepage-panel introduction, falling back to English. */
export function getDomainIntro(slug: ExpertiseDomainSlug, locale: string = "en"): string {
  return (INTROS[locale] ?? en)[slug];
}
