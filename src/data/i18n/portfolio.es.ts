// Spanish text overlay for src/data/portfolio.ts. Keyed by project slug.
// Title + localized categoryLabel for all 43 projects. Project descriptions
// stay in English for now (long-form prose; covered by the fallback) — they
// can be filled in here when the next translation pass runs.

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
  "senegal-goin-digital": { title: "Transformación Digital de Senegal – Goin' Digital", categoryLabel: C.digitalGovernment },
  "ethiopia-input-output": { title: "Plataforma Digital de Coeficientes Input-Output – Etiopía", categoryLabel: C.digitalGovernment },
  "govstack-adoption-africa": { title: "Formación en Adopción de GovStack – Multipaís (África)", categoryLabel: C.digitalGovernment },
  "senegal-bpmn-senum": { title: "Modelado de Procesos BPMN y Acompañamiento – SENUM Senegal", categoryLabel: C.digitalGovernment },
  "rwanda-web-accessibility": { title: "Estandarización de Accesibilidad Web – Ruanda", categoryLabel: C.digitalGovernment },
  "rwanda-workflow-platform": { title: "Selección de Plataforma de Flujos de Trabajo – Gobierno de Ruanda", categoryLabel: C.digitalGovernment },
  "romania-egov-strategy": { title: "Estrategia de e-Gobierno de Rumanía (EGOV)", categoryLabel: C.digitalGovernment },
  "cambodia-dpi": { title: "Arquitectura de Plataforma Digital de Protección Social – Camboya", categoryLabel: C.interoperability },
  "icglr-regional-data-sharing": { title: "Arquitectura de Plataforma Regional de Intercambio de Datos – CIRGL", categoryLabel: C.interoperability },
  "rwanda-mining-standard": { title: "Estándar de Intercambio de Datos en Minería y Minerales – Ruanda", categoryLabel: C.interoperability },
  "rwanda-risa-icglr": { title: "Arquitectura de Software para RISA y CIRGL – Ruanda", categoryLabel: C.interoperability },
  "romania-ukrainian-interop": { title: "Marco de Interoperabilidad para Apoyo a Refugiados Ucranianos – Rumanía", categoryLabel: C.interoperability },
  "rwanda-integration-coaching": { title: "Acompañamiento en Arquitectura de Integración de Software – RISA Ruanda", categoryLabel: C.interoperability },
  "icglr-data-sharing-policy": { title: "Política y Estándar Técnico de Intercambio de Datos – CIRGL", categoryLabel: C.dataGovernance },
  "rwanda-consent-governance": { title: "Gobernanza del Consentimiento y Protección de Datos Personales – Ruanda", categoryLabel: C.dataGovernance },
  "uganda-ppda": { title: "Estrategia de Transformación Digital de PPDA – Uganda", categoryLabel: C.publicProcurement },
  "romania-public-procurement": { title: "Sistema Digital de Contratación Pública – Rumanía", categoryLabel: C.publicProcurement },
  "romania-eprocurement-platform": { title: "Plataforma Web de e-Procurement – Rumanía", categoryLabel: C.publicProcurement },
  "icglr-websites": { title: "Reimplementación y Capacitación de los Sitios Web de la CIRGL", categoryLabel: C.webDevelopment },
  "somalia-websites": { title: "Sitios Web del Gobierno de Somalia – Capacitación y Desarrollo", categoryLabel: C.webDevelopment },
  "risa-cms-govstack": { title: "Building Block de CMS de GovStack – Sitios de RISA Ruanda", categoryLabel: C.webDevelopment },
  "rwanda-typo3-coaching": { title: "Acompañamiento en Desarrollo TYPO3 – Gobierno de Ruanda", categoryLabel: C.webDevelopment },
  "rwanda-government-portals": { title: "Portales Web Gubernamentales e Infraestructura Digital – Ruanda", categoryLabel: C.webDevelopment },
  "nanotec-portal": { title: "Soporte de Portal e Intranet de Nanotec", categoryLabel: C.webDevelopment },
  "philips-speech-portal": { title: "Soporte de Portal e Intranet de Philips Speech", categoryLabel: C.webDevelopment },
  "stockli-websites": { title: "Sitios Web de Müllex y Stöckli – Suiza", categoryLabel: C.webDevelopment },
  "audi-planner": { title: "Planificador Interactivo de Salón y Taller AUDI", categoryLabel: C.webDevelopment },
  "mbaza-chatbot": { title: "Mbaza Chatbot – Asistente Virtual con IA/PLN – Ruanda", categoryLabel: C.ai },
  "digital-maturity-tool": { title: "Herramienta de Evaluación de Madurez Digital", categoryLabel: C.ai },
  "bpo-chile-automation": { title: "Automatización de Back Office en BPO", categoryLabel: C.ai },
  "ozmo-ai-acceleration": { title: "Programa de Aceleración de IA + Taller de IA para Empresa de Software", categoryLabel: C.ai },
  "sigse-ai-acceleration": { title: "Programa de Aceleración de IA + Taller de IA para Consultora", categoryLabel: C.ai },
  "bancom-ai-workshop": { title: "Taller de IA y Hoja de Ruta para Ejecutivos y Directorio", categoryLabel: C.ai },
  "itstudio-ai-acceleration": { title: "Programa de Aceleración de IA + Taller", categoryLabel: C.ai },
  "altlegal-ai-agent": { title: "Agente de IA para Consultoría e Implementación de Soporte Legal", categoryLabel: C.ai },
  "lima-ai-workshop": { title: "Taller de IA y Hoja de Ruta", categoryLabel: C.ai },
  "chiletec-ai-training": { title: "Formación para Empresas de TI: Construcción de Agentes de IA para el Día a Día", categoryLabel: C.ai },
  "falabella-ai": { title: "Taller y Consultoría para la Implementación de una Solución de IA", categoryLabel: C.ai },
  "grant-prep-automation": { title: "Automatización de Preparación de Subvenciones para Consultora", categoryLabel: C.ai },
  "car-einvoicing": { title: "Facturación Electrónica y Reporte de Transacciones – República Centroafricana", categoryLabel: C.einvoicing },
  "zambia-mining-data": { title: "Evaluación de Madurez Digital – Minería y Minerales – Zambia", categoryLabel: C.dataGovernance },
  "burundi-mining-data": { title: "Evaluación de Madurez Digital – Minería y Minerales – Burundi", categoryLabel: C.dataGovernance },
  "uganda-it-bpo-strategy": { title: "Propuesta de Valor de Exportación de TI y BPO – Uganda", categoryLabel: C.business },
};
