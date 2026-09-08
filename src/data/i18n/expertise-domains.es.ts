// Spanish text overlay for src/data/expertise-domains.ts.
// Keyed by domain slug. Anything omitted falls back to English.
// Brand/tech terms kept as-is (Arxia, DPI, e-Procurement, e-Invoicing,
// e-Services, IA, low-code).

export interface ExpertiseDomainOverlay {
  name?: string;
  description?: string;
}

export const expertiseDomainsEs: Record<string, ExpertiseDomainOverlay> = {
  "digital-transformation": {
    name: "Transformación digital y DPI",
    description:
      "Construimos los building blocks digitales del Estado moderno: desde la estrategia, las políticas y los estándares hasta la implementación técnica.",
  },
  interoperability: {
    name: "Interoperabilidad full-stack",
    description:
      "Más que la capa técnica: acompañamos todas las capas que importan — gobernanza, estándares, políticas y, por supuesto, la implementación de la plataforma de intercambio de datos.",
  },
  "data-governance": {
    name: "Gobernanza de datos",
    description:
      "Marcos de gobernanza, gestión del consentimiento, protección de datos, modelos semánticos y evaluaciones de madurez digital.",
  },
  "e-procurement": {
    name: "e-Procurement",
    description:
      "Digitalización integral de la contratación pública a lo largo de todo el ciclo de vida, con trazabilidad y auditabilidad completas.",
  },
  "e-invoicing": {
    name: "e-Invoicing",
    description:
      "Facturación electrónica, reporte de transacciones y sistemas de cumplimiento tributario, incluidos los estándares transfronterizos.",
  },
  "web-portals": {
    name: "Portales web de gobierno",
    description:
      "Portales ciudadanos e institucionales estandarizados, alineados con una estrategia y con estándares globales.",
  },
  "agentic-state": {
    name: "Estado agéntico",
    description:
      "Más que chatbots de IA: acompañamos la estrategia, las políticas y las capas de datos que habilitan la IA en el gobierno, de forma segura y ética.",
  },
  "e-services": {
    name: "e-Services",
    description:
      "Diseñamos, optimizamos e implementamos servicios electrónicos con IA y soluciones low-code, para que vea resultados en tiempo récord.",
  },
};
