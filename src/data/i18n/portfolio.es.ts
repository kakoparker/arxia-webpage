// Spanish text overlay for src/data/portfolio.ts. Keyed by project slug.
// Carries title + localized categoryLabel + description for all 43 projects.
// Missing keys fall back to the English source in portfolio.ts.

export interface PortfolioOverlay {
  title?: string;
  description?: string;
  categoryLabel?: string;
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
  },
  "ethiopia-input-output": {
    title: "Plataforma Digital de Coeficientes Input-Output – Etiopía",
    description:
      "Consultoría e implementación del mecanismo de Coeficientes Input-Output como plataforma digital, utilizando el Workflow Building Block del marco GovStack.",
    categoryLabel: C.digitalGovernment,
  },
  "govstack-adoption-africa": {
    title: "Formación en Adopción de GovStack – Multipaís (África)",
    description:
      "Formación para la adopción de GovStack dirigida a gobiernos de cinco países africanos.",
    categoryLabel: C.digitalGovernment,
  },
  "senegal-bpmn-senum": {
    title: "Modelado de Procesos BPMN y Acompañamiento – SENUM Senegal",
    description:
      "Modelado de procesos de negocio, rediseño de servicios públicos y acompañamiento en la implementación, con foco en BPMN 2.0 y una implementación piloto con Camunda 7 BPM.",
    categoryLabel: C.digitalGovernment,
  },
  "rwanda-web-accessibility": {
    title: "Estandarización de Accesibilidad Web – Ruanda",
    description:
      "Estandarización de accesibilidad web a gran escala con 5 expertos certificados en WCAG que auditaron y corrigieron la accesibilidad en el conjunto de sitios web del gobierno.",
    categoryLabel: C.digitalGovernment,
  },
  "rwanda-workflow-platform": {
    title: "Selección de Plataforma de Flujos de Trabajo – Gobierno de Ruanda",
    description:
      "Identificación, evaluación comparativa y selección de una plataforma de flujos de trabajo para la digitalización de procesos G2G.",
    categoryLabel: C.digitalGovernment,
  },
  "romania-egov-strategy": {
    title: "Estrategia de e-Gobierno de Rumanía (EGOV)",
    description:
      "Consultoría para la estrategia de e-Gobierno de Rumanía, que incluyó la revisión de políticas, el rediseño de procesos para 36 «Eventos de Vida» y el fortalecimiento de capacidades de 16 instituciones públicas centrales.",
    categoryLabel: C.digitalGovernment,
  },
  "cambodia-dpi": {
    title: "Arquitectura de Plataforma Digital de Protección Social – Camboya",
    description:
      "Consultoría para la arquitectura de la Plataforma Digital de Protección Social de Camboya e implementación de Pub/Sub con integración de X-Road, siguiendo el enfoque de arquitectura de GovStack.",
    categoryLabel: C.interoperability,
  },
  "icglr-regional-data-sharing": {
    title: "Arquitectura de Plataforma Regional de Intercambio de Datos – CIRGL",
    description:
      "Desarrollo de la arquitectura técnica y la especificación de requisitos de la plataforma regional de intercambio de datos, destinada a ser utilizada por los 12 Estados miembros de la CIRGL.",
    categoryLabel: C.interoperability,
  },
  "rwanda-mining-standard": {
    title: "Estándar de Intercambio de Datos en Minería y Minerales – Ruanda",
    description:
      "Desarrollo del estándar de intercambio de datos de minería y minerales de Ruanda, del modelo técnico de interoperabilidad para los sistemas del RMB (GIMCS, DMTS) y de la auditoría de los sistemas actuales.",
    categoryLabel: C.interoperability,
  },
  "rwanda-risa-icglr": {
    title: "Arquitectura de Software para RISA y CIRGL – Ruanda",
    description:
      "Aceleración de la adopción de GovStack en Ruanda, con énfasis en el Workflow Building Block y el Consent Building Block.",
    categoryLabel: C.interoperability,
  },
  "romania-ukrainian-interop": {
    title: "Marco de Interoperabilidad para Apoyo a Refugiados Ucranianos – Rumanía",
    description:
      "Marco nacional de interoperabilidad interinstitucional y digitalización de la prestación de servicios para los refugiados ucranianos en Rumanía.",
    categoryLabel: C.interoperability,
  },
  "rwanda-integration-coaching": {
    title: "Acompañamiento en Arquitectura de Integración de Software – RISA Ruanda",
    description:
      "Acompañamiento en arquitectura de integración de software para el personal técnico de RISA. Realizado junto con Evolve Ltd.",
    categoryLabel: C.interoperability,
  },
  "icglr-data-sharing-policy": {
    title: "Política y Estándar Técnico de Intercambio de Datos – CIRGL",
    description:
      "Desarrollo de la política de intercambio de datos, el estándar técnico, el modelo semántico de datos y su transposición técnica para la CIRGL y sus 12 países miembros.",
    categoryLabel: C.dataGovernance,
  },
  "rwanda-consent-governance": {
    title: "Gobernanza del Consentimiento y Protección de Datos Personales – Ruanda",
    description:
      "Desarrollo de un prototipo de gobernanza del consentimiento y de acuerdos de protección de datos personales basado en el Consent Building Block de GovStack.",
    categoryLabel: C.dataGovernance,
  },
  "uganda-ppda": {
    title: "Estrategia de Transformación Digital de PPDA – Uganda",
    description:
      "Apoyo a la Autoridad de Contratación y Disposición Pública (PPDA) de Uganda para planificar la implementación de su estrategia de transformación digital.",
    categoryLabel: C.publicProcurement,
  },
  "romania-public-procurement": {
    title: "Sistema Digital de Contratación Pública – Rumanía",
    description:
      "Rediseño de procesos e implementación de un sistema digital de contratación pública para la planificación, la ejecución y la auditoría.",
    categoryLabel: C.publicProcurement,
  },
  "romania-eprocurement-platform": {
    title: "Plataforma Web de e-Procurement – Rumanía",
    description:
      "Plataforma web para instituciones públicas que ofrece flujos de trabajo para todo el ciclo de vida de la contratación. Implementada por más de 100 instituciones públicas.",
    categoryLabel: C.publicProcurement,
  },
  "icglr-websites": {
    title: "Reimplementación y Capacitación de los Sitios Web de la CIRGL",
    description:
      "Reimplementación de los sitios web de la CIRGL y capacitación de los gestores de contenido.",
    categoryLabel: C.webDevelopment,
  },
  "somalia-websites": {
    title: "Sitios Web del Gobierno de Somalia – Capacitación y Desarrollo",
    description:
      "Capacitación y soporte de desarrollo para los sitios web del Gobierno de Somalia. Arxia subcontratada por TYPO3 GmbH.",
    categoryLabel: C.webDevelopment,
  },
  "risa-cms-govstack": {
    title: "Building Block de CMS de GovStack – Sitios de RISA Ruanda",
    description:
      "Consultoría, formación, soporte de implementación y directrices para los sitios web de RISA Ruanda utilizando el enfoque del CMS Building Block de GovStack. Incluye la actualización del CMS TYPO3 y nuevas directrices de UX/UI y de accesibilidad web.",
    categoryLabel: C.webDevelopment,
  },
  "rwanda-typo3-coaching": {
    title: "Acompañamiento en Desarrollo TYPO3 – Gobierno de Ruanda",
    description:
      "Acompañamiento en desarrollo TYPO3 para los sitios web del gobierno de Ruanda. Realizado junto con Evolve Ltd.",
    categoryLabel: C.webDevelopment,
  },
  "rwanda-government-portals": {
    title: "Portales Web Gubernamentales e Infraestructura Digital – Ruanda",
    description:
      "Diseño y despliegue de sitios web gubernamentales, portales de servicios digitales e infraestructura tecnológica. Se desarrolló la arquitectura multiinquilino que aloja más de 350 sitios web gubernamentales.",
    categoryLabel: C.webDevelopment,
  },
  "nanotec-portal": {
    title: "Soporte de Portal e Intranet de Nanotec",
    description:
      "Soporte de evolución continua para el portal y las intranets de Nanotec sobre la tecnología CMS TYPO3.",
    categoryLabel: C.webDevelopment,
  },
  "philips-speech-portal": {
    title: "Soporte de Portal e Intranet de Philips Speech",
    description:
      "Soporte de evolución continua para el portal y las intranets de la división Philips Speech sobre la tecnología CMS TYPO3.",
    categoryLabel: C.webDevelopment,
  },
  "stockli-websites": {
    title: "Sitios Web de Müllex y Stöckli – Suiza",
    description:
      "Sitios web de presentación y catálogos electrónicos para el Grupo Stöckli.",
    categoryLabel: C.webDevelopment,
  },
  "audi-planner": {
    title: "Planificador Interactivo de Salón y Taller AUDI",
    description:
      "Plataforma web para la planificación interactiva en 2D y 3D de salones de exhibición y áreas de taller, construida sobre la tecnología PlanningWiz (un spinoff de Arxia).",
    categoryLabel: C.webDevelopment,
  },
  "mbaza-chatbot": {
    title: "Mbaza Chatbot – Asistente Virtual con IA/PLN – Ruanda",
    description:
      "Implementación de un asistente virtual multicanal basado en IA y PLN para la comunicación del gobierno con la ciudadanía, incluidas las personas no alfabetizadas. Canales: web, aplicación móvil, USSD y llamada de voz en lengua local.",
    categoryLabel: C.ai,
  },
  "digital-maturity-tool": {
    title: "Herramienta de Evaluación de Madurez Digital",
    description:
      "Implementación de una herramienta basada en IA para la evaluación de la madurez digital y el desarrollo de estrategias en instituciones de la administración pública, desplegada en Noruega y en Rumanía con foco en las alcaldías.",
    categoryLabel: C.ai,
  },
  "bpo-chile-automation": {
    title: "Automatización de Back Office en BPO",
    description:
      "Desarrollamos un Agente de IA que automatizó el 90 % de los procesos de los BPO de telecomunicaciones en Chile, reduciendo en un 90 % sus procesos de back office para la verificación y evaluación de clientes.",
    categoryLabel: C.ai,
  },
  "ozmo-ai-acceleration": {
    title: "Programa de Aceleración de IA + Taller de IA para Empresa de Software",
    description:
      "Realización de un programa de Aceleración de IA de 3 meses para una empresa de software, transformando sus departamentos de Marketing, Administración y Ventas.",
    categoryLabel: C.ai,
  },
  "sigse-ai-acceleration": {
    title: "Programa de Aceleración de IA + Taller de IA para Consultora",
    description:
      "Realización de un programa de Aceleración de IA de 3 meses que transformó sus departamentos de marketing, gestión de licitaciones y operaciones.",
    categoryLabel: C.ai,
  },
  "bancom-ai-workshop": {
    title: "Taller de IA y Hoja de Ruta para Ejecutivos y Directorio",
    description:
      "Programa de Taller de IA IGNITE para los ejecutivos y responsables de departamento, además de una edición independiente para los miembros del directorio.",
    categoryLabel: C.ai,
  },
  "itstudio-ai-acceleration": {
    title: "Programa de Aceleración de IA + Taller",
    description:
      "Aceleración de los departamentos de marketing, gestión de licitaciones y operaciones en un programa de 90 días.",
    categoryLabel: C.ai,
  },
  "altlegal-ai-agent": {
    title: "Agente de IA para Consultoría e Implementación de Soporte Legal",
    description:
      "Consultoría y soporte de implementación de una solución orientada a evaluar licitaciones en el marco de la regulación chilena, utilizando IA generativa para la evaluación.",
    categoryLabel: C.ai,
  },
  "lima-ai-workshop": {
    title: "Taller de IA y Hoja de Ruta",
    description:
      "Taller de IA para la identificación de oportunidades y la elaboración de hojas de ruta de posibles implementaciones de soluciones de IA en más de 10 departamentos de la universidad.",
    categoryLabel: C.ai,
  },
  "chiletec-ai-training": {
    title: "Formación para Empresas de TI: Construcción de Agentes de IA para el Día a Día",
    description:
      "Programa de formación breve para el desarrollo de Agentes de IA para el trabajo diario.",
    categoryLabel: C.ai,
  },
  "falabella-ai": {
    title: "Taller y Consultoría para la Implementación de una Solución de IA",
    description:
      "Consultoría y taller de formación para la implementación de soluciones de IA para la mayor cadena de retail, en su oficina corporativa en Perú.",
    categoryLabel: C.ai,
  },
  "grant-prep-automation": {
    title: "Automatización de Preparación de Subvenciones para Consultora",
    description:
      "Implementación de un flujo de trabajo basado en IA para la elaboración de propuestas de subvenciones y de una herramienta de reporte financiero para proyectos financiados con subvenciones.",
    categoryLabel: C.ai,
  },
  "car-einvoicing": {
    title: "Facturación Electrónica y Reporte de Transacciones – República Centroafricana",
    description:
      "Consultoría e implementación de facturación electrónica y reporte de transacciones comerciales.",
    categoryLabel: C.einvoicing,
  },
  "zambia-mining-data": {
    title: "Evaluación de Madurez Digital – Minería y Minerales – Zambia",
    description:
      "Evaluación de la madurez digital y la gestión de datos en los ámbitos de minería y minerales como preparación para la implementación de la Base de Datos Nacional de Minerales.",
    categoryLabel: C.dataGovernance,
  },
  "burundi-mining-data": {
    title: "Evaluación de Madurez Digital – Minería y Minerales – Burundi",
    description:
      "Evaluación de la madurez digital y la gestión de datos en minería y minerales en Burundi para la Base de Datos Regional de Minerales de la CIRGL.",
    categoryLabel: C.dataGovernance,
  },
  "uganda-it-bpo-strategy": {
    title: "Propuesta de Valor de Exportación de TI y BPO – Uganda",
    description:
      "Apoyo para la redefinición de la propuesta de valor de exportación de los sectores de TI y BPO de Uganda y evaluación de su nivel de madurez exportadora. Financiado por UKTP.",
    categoryLabel: C.business,
  },
};
