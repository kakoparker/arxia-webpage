// Spanish text overlay for portfolio-domains.ts. Keyed by domain slug.
export interface PortfolioDomainOverlay {
  label?: string;
  description?: string;
}

export const portfolioDomainsEs: Record<string, PortfolioDomainOverlay> = {
  "digital-government": {
    label: "Gobierno Digital",
    description:
      "Diseñamos e implementamos servicios digitales centrados en la ciudadanía que modernizan la administración pública, mejoran la transparencia y reducen la fricción burocrática, para que el Estado funcione mejor para todas las personas.",
  },
  interoperability: {
    label: "Interoperabilidad y Estandarización",
    description:
      "Construimos el tejido conectivo entre sistemas, habilitando el intercambio fluido de datos entre instituciones, fronteras y plataformas mediante estándares abiertos y marcos de integración robustos.",
  },
  "public-procurement": {
    label: "Contratación Pública",
    description:
      "Implementamos sistemas integrales de contratación electrónica que aumentan la competencia, reducen la corrupción y aportan mayor valor al gasto público: desde la publicación de licitaciones hasta la gestión de contratos.",
  },
  "web-development": {
    label: "Desarrollo Web",
    description:
      "Creamos puertas de entrada digitales unificadas (portales ciudadanos, directorios de servicios y sitios institucionales) que consolidan el acceso a los servicios e información públicos en una experiencia intuitiva.",
  },
  "artificial-intelligence": {
    label: "Inteligencia Artificial",
    description:
      "Desplegamos soluciones de IA que aumentan las capacidades del sector público —desde el procesamiento inteligente de documentos hasta la analítica predictiva— siempre con transparencia, ética y apropiación local en el centro.",
  },
  "electronic-invoicing": {
    label: "Facturación Electrónica",
    description:
      "Diseñamos y desplegamos infraestructura de facturación electrónica que agiliza el cumplimiento tributario, reduce el fraude y acelera los ciclos de pago tanto para gobiernos como para empresas.",
  },
  "data-governance": {
    label: "Gobernanza de Datos",
    description:
      "Desarrollamos políticas de intercambio de datos, estándares técnicos y marcos de gobernanza que permiten una gestión responsable de los datos entre instituciones y fronteras.",
  },
  "business-strategy": {
    label: "Estrategia y Consultoría de Negocios",
    description:
      "Fortalecemos los ecosistemas tecnológicos locales mediante transferencia de conocimiento, evaluaciones estratégicas y alianzas que aseguran que los países puedan construir, mantener y hacer evolucionar su propia infraestructura digital.",
  },
};
