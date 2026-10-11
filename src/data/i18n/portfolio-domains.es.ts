// Spanish text overlay for portfolio-domains.ts. Keyed by domain slug.
export interface PortfolioDomainOverlay {
  label?: string;
  description?: string;
}

export const portfolioDomainsEs: Record<string, PortfolioDomainOverlay> = {
  "digital-government": {
    label: "Gobierno Digital",
    description:
      "Servicios digitales diseñados en torno a quienes los usan: trámites más simples, más transparencia y menos papeleo en la administración pública.",
  },
  interoperability: {
    label: "Interoperabilidad y Estandarización",
    description:
      "Intercambio de datos entre instituciones, fronteras y plataformas, sobre estándares abiertos y una integración gobernada.",
  },
  "public-procurement": {
    label: "Contratación Pública",
    description:
      "Contratación electrónica desde la publicación de la licitación hasta la gestión del contrato, con más competencia, menos margen para la corrupción y mejor uso del gasto público.",
  },
  "web-development": {
    label: "Desarrollo Web",
    description:
      "Portales ciudadanos, directorios de servicios y sitios institucionales que reúnen los servicios y la información públicos en un solo lugar.",
  },
  "artificial-intelligence": {
    label: "Inteligencia Artificial",
    description:
      "IA que amplía lo que las organizaciones pueden hacer, del procesamiento de documentos a la analítica predictiva, desplegada con transparencia y apropiación local.",
  },
  "electronic-invoicing": {
    label: "Facturación Electrónica",
    description:
      "Infraestructura de facturación electrónica que simplifica el cumplimiento tributario, reduce el fraude y acorta los ciclos de pago para gobiernos y empresas.",
  },
  "data-governance": {
    label: "Gobernanza de Datos",
    description:
      "Políticas de intercambio de datos, estándares técnicos y marcos de gobernanza para usar los datos de forma responsable entre instituciones y fronteras.",
  },
  "business-strategy": {
    label: "Estrategia y Consultoría de Negocios",
    description:
      "Transferencia de conocimiento, evaluaciones estratégicas y alianzas para que los ecosistemas tecnológicos locales construyan, mantengan y hagan evolucionar su propia infraestructura digital.",
  },
};
