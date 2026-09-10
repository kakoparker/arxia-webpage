// Spanish text overlay for src/data/expertise-domains.ts.
// Keyed by domain slug. Anything omitted falls back to English.
// Brand/tech terms kept as-is (Arxia, DPI, e-Procurement, e-Invoicing,
// e-Services, IA, low-code).

export interface ExpertiseDomainOverlay {
  name?: string;
  description?: string;
}

export const expertiseDomainsEs: Record<string, ExpertiseDomainOverlay> = {
  interoperability: {
    name: "Interoperabilidad full-stack",
    description:
      "Gobernanza, estándares, políticas y la propia plataforma de intercambio de datos. La capa técnica es la parte fácil; también cubrimos el resto.",
  },
  "data-governance": {
    name: "Gobernanza de datos",
    description:
      "Las reglas que definen quién puede usar qué datos y con qué fundamento: marcos de gobernanza, regímenes de consentimiento, protección de datos, modelos semánticos y evaluaciones de madurez.",
  },
  "e-procurement": {
    name: "e-Procurement",
    description:
      "Contratación pública digitalizada desde la publicación de la licitación hasta la gestión del contrato, con cada paso trazable y auditable.",
  },
  "e-invoicing": {
    name: "e-Invoicing",
    description:
      "Facturación electrónica, reporte de transacciones y sistemas de cumplimiento tributario, incluidos los estándares transfronterizos.",
  },
  "web-portals": {
    name: "Portales web de gobierno",
    description:
      "Portales ciudadanos e institucionales construidos sobre un mismo estándar, para que cada ministerio ofrezca el mismo nivel de servicio.",
  },
  "agentic-state": {
    name: "Estado agéntico",
    description:
      "Los chatbots son la parte visible. Construimos las capas de estrategia, políticas y datos que hacen que la IA en el gobierno sea segura de operar.",
  },
  "e-services": {
    name: "e-Services",
    description:
      "Rediseñamos y construimos servicios electrónicos con IA y herramientas low-code, para que la entrega se mida en semanas y no en ciclos presupuestarios.",
  },
};
