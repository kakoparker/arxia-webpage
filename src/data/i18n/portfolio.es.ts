// Spanish text overlay for src/data/portfolio.ts. Keyed by project slug.
// Carries title + localized categoryLabel + description + client + country
// for all 44 projects.
// Missing keys fall back to the English source in portfolio.ts.

export interface PortfolioOverlay {
  title?: string;
  description?: string;
  categoryLabel?: string;
  client?: string;
  country?: string;
}

const C = {
  digitalGovernment: "Gobierno Digital",
  interoperability: "Interoperabilidad y Estandarización",
  publicProcurement: "Contratación Pública",
  webDevelopment: "Desarrollo Web",
  ai: "Inteligencia Artificial",
  einvoicing: "Facturación Electrónica",
  dataGovernance: "Gobernanza de Datos",
  business: "Estrategia y Consultoría de Negocios",
};

export const portfolioEs: Record<string, PortfolioOverlay> = {
  "senegal-goin-digital": {
    title: "Transformación Digital de Senegal – Goin' Digital",
    description:
      "Consultoría para la transformación digital del Gobierno de Senegal, facilitando la adopción del marco GovStack en alineación con la estrategia nacional New Deal Technologique.",
    categoryLabel: C.digitalGovernment,
    client: "GIZ (consorcio liderado por GOPA)",
    country: "Senegal",
  },
  "ethiopia-input-output": {
    title: "Plataforma Digital de Coeficientes Input-Output – Etiopía",
    description:
      "Consultoría e implementación del mecanismo de Coeficientes Input-Output como plataforma digital, utilizando el Workflow Building Block del marco GovStack.",
    categoryLabel: C.digitalGovernment,
    client: "GIZ / Ministerio de Industria de Etiopía",
    country: "Etiopía",
  },
  "govstack-adoption-africa": {
    title: "Formación en Adopción de GovStack – Multipaís (África)",
    description:
      "Formación para la adopción de GovStack dirigida a gobiernos de cinco países africanos.",
    categoryLabel: C.digitalGovernment,
    client: "GIZ / UIT",
    country: "Somalia, Yibuti, Kenia, Senegal, Etiopía",
  },
  "senegal-bpmn-senum": {
    title: "Modelado de Procesos BPMN y Acompañamiento – SENUM Senegal",
    description:
      "Modelado de procesos de negocio, rediseño de servicios públicos y acompañamiento en la implementación, con foco en BPMN 2.0 y una implementación piloto con Camunda 7 BPM.",
    categoryLabel: C.digitalGovernment,
    client: "GIZ / Société Sénégal Numérique S.A. (SENUM)",
    country: "Senegal",
  },
  "rwanda-web-accessibility": {
    title: "Estandarización de Accesibilidad Web – Ruanda",
    description:
      "Estandarización de accesibilidad web a gran escala con 5 expertos certificados en WCAG que auditaron y corrigieron la accesibilidad en el conjunto de sitios web del gobierno.",
    categoryLabel: C.digitalGovernment,
    client: "GIZ / Gobierno de Ruanda",
    country: "Ruanda",
  },
  "rwanda-workflow-platform": {
    title: "Selección de Plataforma de Flujos de Trabajo – Gobierno de Ruanda",
    description:
      "Identificación, evaluación comparativa y selección de una plataforma de flujos de trabajo para la digitalización de procesos G2G.",
    categoryLabel: C.digitalGovernment,
    client: "GIZ / RISA",
    country: "Ruanda",
  },
  "romania-egov-strategy": {
    title: "Estrategia de e-Gobierno de Rumanía (EGOV)",
    description:
      "Consultoría para la estrategia de e-Gobierno de Rumanía, que incluyó la revisión de políticas, el rediseño de procesos para 36 «Eventos de Vida» y el fortalecimiento de capacidades de 16 instituciones públicas centrales.",
    categoryLabel: C.digitalGovernment,
    client: "Secretaría General del Gobierno de Rumanía (consorcio liderado por Ernst & Young)",
    country: "Rumanía",
  },
  "cambodia-dpi": {
    title: "Arquitectura de Plataforma Digital de Protección Social – Camboya",
    description:
      "Consultoría para la arquitectura de la Plataforma Digital de Protección Social de Camboya e implementación de Pub/Sub con integración de X-Road, siguiendo el enfoque de arquitectura de GovStack.",
    categoryLabel: C.interoperability,
    client: "Swiss Tropical and Public Health Institute (Swiss TPH)",
    country: "Camboya",
  },
  "icglr-regional-data-sharing": {
    title: "Arquitectura de Plataforma Regional de Intercambio de Datos – CIRGL",
    description:
      "Desarrollo de la arquitectura técnica y la especificación de requisitos de la plataforma regional de intercambio de datos, destinada a ser utilizada por los 12 Estados miembros de la CIRGL.",
    categoryLabel: C.interoperability,
    client: "GIZ / CIRGL",
    country: "Regional (CIRGL, 12 Estados miembros)",
  },
  "rwanda-mining-standard": {
    title: "Estándar de Intercambio de Datos en Minería y Minerales – Ruanda",
    description:
      "Desarrollo del estándar de intercambio de datos de minería y minerales de Ruanda, del modelo técnico de interoperabilidad para los sistemas del RMB (GIMCS, DMTS) y de la auditoría de los sistemas actuales.",
    categoryLabel: C.interoperability,
    client: "GIZ / Rwanda Mining Board (RMB)",
    country: "Ruanda",
  },
  "rwanda-risa-icglr": {
    title: "Arquitectura de Software para RISA y CIRGL – Ruanda",
    description:
      "Aceleración de la adopción de GovStack en Ruanda, con énfasis en el Workflow Building Block y el Consent Building Block.",
    categoryLabel: C.interoperability,
    client: "GIZ / RISA / CIRGL",
    country: "Ruanda",
  },
  "romania-ukrainian-interop": {
    title: "Marco de Interoperabilidad para Apoyo a Refugiados Ucranianos – Rumanía",
    description:
      "Marco nacional de interoperabilidad interinstitucional y digitalización de la prestación de servicios para los refugiados ucranianos en Rumanía.",
    categoryLabel: C.interoperability,
    client: "Banco Mundial / Cancillería del Primer Ministro de Rumanía",
    country: "Rumanía",
  },
  "rwanda-integration-coaching": {
    title: "Acompañamiento en Arquitectura de Integración de Software – RISA Ruanda",
    description:
      "Acompañamiento en arquitectura de integración de software para el personal técnico de RISA. Realizado junto con Evolve Ltd.",
    categoryLabel: C.interoperability,
    client: "GIZ / RISA",
    country: "Ruanda",
  },
  "icglr-data-sharing-policy": {
    title: "Política y Estándar Técnico de Intercambio de Datos – CIRGL",
    description:
      "Desarrollo de la política de intercambio de datos, el estándar técnico, el modelo semántico de datos y su transposición técnica para la CIRGL y sus 12 países miembros.",
    categoryLabel: C.dataGovernance,
    client: "Impact Transform / CIRGL",
    country: "Regional (CIRGL, 12 países miembros)",
  },
  "rwanda-consent-governance": {
    title: "Gobernanza del Consentimiento y Protección de Datos Personales – Ruanda",
    description:
      "Desarrollo de un prototipo de gobernanza del consentimiento y de acuerdos de protección de datos personales basado en el Consent Building Block de GovStack.",
    categoryLabel: C.dataGovernance,
    client: "GIZ / IREMBO / RISA",
    country: "Ruanda",
  },
  "uganda-ppda": {
    title: "Estrategia de Transformación Digital de PPDA – Uganda",
    description:
      "Apoyo a la Autoridad de Contratación y Disposición Pública (PPDA) de Uganda para planificar la implementación de su estrategia de transformación digital.",
    categoryLabel: C.publicProcurement,
    client: "GIZ / PPDA",
    country: "Uganda",
  },
  "romania-public-procurement": {
    title: "Sistema Digital de Contratación Pública – Rumanía",
    description:
      "Rediseño de procesos e implementación de un sistema digital de contratación pública para la planificación, la ejecución y la auditoría.",
    categoryLabel: C.publicProcurement,
    client: "Unión Europea / Cluj IT Cluster",
    country: "Rumanía",
  },
  "romania-eprocurement-platform": {
    title: "Plataforma Web de e-Procurement – Rumanía",
    description:
      "Plataforma web para instituciones públicas que ofrece flujos de trabajo para todo el ciclo de vida de la contratación. Utilizada por más de 50 organizaciones públicas.",
    categoryLabel: C.publicProcurement,
    client: "Arxia (producto propio)",
    country: "Rumanía",
  },
  "icglr-websites": {
    title: "Reimplementación y Capacitación de los Sitios Web de la CIRGL",
    description:
      "Reimplementación de los sitios web de la CIRGL y capacitación de los gestores de contenido.",
    categoryLabel: C.webDevelopment,
    client: "CIRGL",
    country: "Regional (CIRGL)",
  },
  "somalia-websites": {
    title: "Sitios Web del Gobierno de Somalia – Capacitación y Desarrollo",
    description:
      "Capacitación y soporte de desarrollo para los sitios web del Gobierno de Somalia. Arxia subcontratada por TYPO3 GmbH.",
    categoryLabel: C.webDevelopment,
    client: "UIT / GIZ / TYPO3 GmbH",
    country: "Somalia",
  },
  "risa-cms-govstack": {
    title: "Building Block de CMS de GovStack – Sitios de RISA Ruanda",
    description:
      "Consultoría, formación, soporte de implementación y directrices para los sitios web de RISA Ruanda utilizando el enfoque del CMS Building Block de GovStack. Incluye la actualización del CMS TYPO3 y nuevas directrices de UX/UI y de accesibilidad web.",
    categoryLabel: C.webDevelopment,
    client: "GIZ / Rwanda Information Society Authority (RISA)",
    country: "Ruanda",
  },
  "rwanda-typo3-coaching": {
    title: "Acompañamiento en Desarrollo TYPO3 – Gobierno de Ruanda",
    description:
      "Acompañamiento en desarrollo TYPO3 para los sitios web del gobierno de Ruanda. Realizado junto con Evolve Ltd.",
    categoryLabel: C.webDevelopment,
    client: "GIZ / RISA",
    country: "Ruanda",
  },
  "rwanda-government-portals": {
    title: "Portales Web Gubernamentales e Infraestructura Digital – Ruanda",
    description:
      "Diseño y despliegue de sitios web gubernamentales, portales de servicios digitales e infraestructura tecnológica. Se desarrolló la arquitectura multiinquilino que aloja más de 350 sitios web gubernamentales.",
    categoryLabel: C.webDevelopment,
    client: "GIZ / RISA",
    country: "Ruanda",
  },
  "nanotec-portal": {
    title: "Soporte de Portal e Intranet de Nanotec",
    description:
      "Soporte de evolución continua para el portal y las intranets de Nanotec sobre la tecnología CMS TYPO3.",
    categoryLabel: C.webDevelopment,
    client: "Nanotec Electronic GmbH & Co. KG",
    country: "Alemania / UE",
  },
  "philips-speech-portal": {
    title: "Soporte de Portal e Intranet de Philips Speech",
    description:
      "Soporte de evolución continua para el portal y las intranets de la división Philips Speech sobre la tecnología CMS TYPO3.",
    categoryLabel: C.webDevelopment,
    client: "Speech Processing Solutions (Philips)",
    country: "Global",
  },
  "stockli-websites": {
    title: "Sitios Web de Müllex y Stöckli – Suiza",
    description:
      "Sitios web de presentación y catálogos electrónicos para el Grupo Stöckli.",
    categoryLabel: C.webDevelopment,
    client: "Stöckli Group",
    country: "Suiza",
  },
  "audi-planner": {
    title: "Planificador Interactivo de Salón y Taller AUDI",
    description:
      "Plataforma web para la planificación interactiva en 2D y 3D de salones de exhibición y áreas de taller, construida sobre la tecnología PlanningWiz (un spinoff de Arxia).",
    categoryLabel: C.webDevelopment,
    client: "AUDI",
    country: "Alemania",
  },
  "mbaza-chatbot": {
    title: "Mbaza Chatbot – Asistente Virtual con IA/PLN – Ruanda",
    description:
      "Implementación de un asistente virtual multicanal basado en IA y PLN para la comunicación del gobierno con la ciudadanía, incluidas las personas no alfabetizadas. Canales: web, aplicación móvil, USSD y llamada de voz en lengua local.",
    categoryLabel: C.ai,
    client: "GIZ / Rwanda Biomedical Center",
    country: "Ruanda",
  },
  "digital-maturity-tool": {
    title: "Herramienta de Evaluación de Madurez Digital",
    description:
      "Implementación de una herramienta basada en IA para la evaluación de la madurez digital y el desarrollo de estrategias en instituciones de la administración pública, desplegada en Noruega y en Rumanía con foco en las alcaldías.",
    categoryLabel: C.ai,
    client: "Instituciones gubernamentales",
    country: "Rumanía / Noruega",
  },
  "bpo-chile-automation": {
    title: "Automatización de Back Office en BPO",
    description:
      "Desarrollamos un Agente de IA que automatizó el 90 % de los procesos de los BPO de telecomunicaciones en Chile, reduciendo en un 90 % sus procesos de back office para la verificación y evaluación de clientes.",
    categoryLabel: C.ai,
    client: "15 empresas de BPO",
    country: "Chile",
  },
  "ozmo-ai-acceleration": {
    title: "Programa de Aceleración de IA + Taller de IA para Empresa de Software",
    description:
      "Realización de un programa de Aceleración de IA de 3 meses para una empresa de software, transformando sus departamentos de Marketing, Administración y Ventas.",
    categoryLabel: C.ai,
    client: "OZMO GLOBAL SERVICES",
    country: "Chile / Colombia",
  },
  "fawe-uganda-ai-acceleration": {
    title: "Programa de Aceleración de IA – FAWE Uganda",
    description:
      "Taller AI Ignite y Programa de Aceleración de IA que ponen una IA agéntica práctica y responsable en manos de una organización sin ánimo de lucro que impulsa la educación de las niñas.",
    categoryLabel: C.ai,
    client: "FAWE Uganda (Forum for African Women Educationalists)",
    country: "Uganda",
  },
  "sigse-ai-acceleration": {
    title: "Programa de Aceleración de IA + Taller de IA para Consultora",
    description:
      "Realización de un programa de Aceleración de IA de 3 meses que transformó sus departamentos de marketing, gestión de licitaciones y operaciones.",
    categoryLabel: C.ai,
    client: "SIGSE",
    country: "Angola",
  },
  "bancom-ai-workshop": {
    title: "Taller de IA y Hoja de Ruta para Ejecutivos y Directorio",
    description:
      "Programa de Taller de IA IGNITE para los ejecutivos y responsables de departamento, además de una edición independiente para los miembros del directorio.",
    categoryLabel: C.ai,
    client: "Bancom",
    country: "Perú",
  },
  "itstudio-ai-acceleration": {
    title: "Programa de Aceleración de IA + Taller",
    description:
      "Aceleración de los departamentos de marketing, gestión de licitaciones y operaciones en un programa de 90 días.",
    categoryLabel: C.ai,
    client: "ITStudio",
    country: "Perú",
  },
  "altlegal-ai-agent": {
    title: "Agente de IA para Consultoría e Implementación de Soporte Legal",
    description:
      "Consultoría y soporte de implementación de una solución orientada a evaluar licitaciones en el marco de la regulación chilena, utilizando IA generativa para la evaluación.",
    categoryLabel: C.ai,
    client: "Altlegal",
    country: "Chile",
  },
  "lima-ai-workshop": {
    title: "Taller de IA y Hoja de Ruta",
    description:
      "Taller de IA para la identificación de oportunidades y la elaboración de hojas de ruta de posibles implementaciones de soluciones de IA en más de 10 departamentos de la universidad.",
    categoryLabel: C.ai,
    client: "Universidad de Lima",
    country: "Perú",
  },
  "chiletec-ai-training": {
    title: "Formación para Empresas de TI: Construcción de Agentes de IA para el Día a Día",
    description:
      "Programa de formación breve para el desarrollo de Agentes de IA para el trabajo diario.",
    categoryLabel: C.ai,
    client: "Chiletec",
    country: "Chile",
  },
  "falabella-ai": {
    title: "Taller y Consultoría para la Implementación de una Solución de IA",
    description:
      "Consultoría y taller de formación para la implementación de soluciones de IA para la mayor cadena de retail, en su oficina corporativa en Perú.",
    categoryLabel: C.ai,
    client: "Falabella",
    country: "Perú",
  },
  "grant-prep-automation": {
    title: "Automatización de Preparación de Subvenciones para Consultora",
    description:
      "Implementación de un flujo de trabajo basado en IA para la elaboración de propuestas de subvenciones y de una herramienta de reporte financiero para proyectos financiados con subvenciones.",
    categoryLabel: C.ai,
    client: "Empresa consultora nacional",
    country: "Rumanía",
  },
  "car-einvoicing": {
    title: "Facturación Electrónica y Reporte de Transacciones – República Centroafricana",
    description:
      "Consultoría e implementación de facturación electrónica y reporte de transacciones comerciales.",
    categoryLabel: C.einvoicing,
    client: "En subcontratación",
    country: "República Centroafricana",
  },
  "zambia-mining-data": {
    title: "Evaluación de Madurez Digital – Minería y Minerales – Zambia",
    description:
      "Evaluación de la madurez digital y la gestión de datos en los ámbitos de minería y minerales como preparación para la implementación de la Base de Datos Nacional de Minerales.",
    categoryLabel: C.dataGovernance,
    client: "GIZ",
    country: "Zambia",
  },
  "burundi-mining-data": {
    title: "Evaluación de Madurez Digital – Minería y Minerales – Burundi",
    description:
      "Evaluación de la madurez digital y la gestión de datos en minería y minerales en Burundi para la Base de Datos Regional de Minerales de la CIRGL.",
    categoryLabel: C.dataGovernance,
    client: "GIZ",
    country: "Burundi",
  },
  "uganda-it-bpo-strategy": {
    title: "Propuesta de Valor de Exportación de TI y BPO – Uganda",
    description:
      "Apoyo para la redefinición de la propuesta de valor de exportación de los sectores de TI y BPO de Uganda y evaluación de su nivel de madurez exportadora. Financiado por UKTP.",
    categoryLabel: C.business,
    client: "ONU / Centro de Comercio Internacional (ITC)",
    country: "Uganda",
  },
};
