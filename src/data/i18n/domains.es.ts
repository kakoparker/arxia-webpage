// Spanish text overlay for src/data/domains.ts.
// Keyed by domain slug. `services` arrays are positional (same order as the
// English source). Anything omitted falls back to English.
// Brand/tech terms kept as-is (Arxia, Govtech, GovStack, X-Road, BPMN, RGPD,
// TYPO3, Drupal, USSD, MDM, ROI, IGNITE, Ley de IA de la UE…).

export interface ExpertiseTextOverlay {
  tagline?: string;
  body?: string;
  domains?: Record<
    string,
    {
      name?: string;
      tagline?: string;
      description?: string;
      services?: { title?: string; description?: string }[];
    }
  >;
}

export const domainsEs: ExpertiseTextOverlay = {
  tagline:
    "Infraestructura pública digital para gobiernos y organizaciones internacionales",
  body: "Diseñamos los cimientos de la infraestructura pública digital: desde servicios electrónicos centrados en la ciudadanía y un gobierno potenciado por IA hasta el intercambio fluido de datos, la contratación y la facturación electrónicas, portales estandarizados y el fortalecimiento de los ecosistemas locales.",
  domains: {
    data: {
      name: "Datos",
      tagline: "El tejido conectivo del Estado",
      description:
        "Interoperabilidad, gobernanza e infraestructura de intercambio de datos que permiten un flujo de información fluido y seguro entre instituciones, fronteras y building blocks.",
      services: [
        {
          title: "Estrategia de interoperabilidad de datos",
          description:
            "Marcos nacionales y transfronterizos basados en estándares abiertos (GovStack, X-Road, Pub/Sub) y modelos semánticos.",
        },
        {
          title: "Gobernanza y estandarización de datos",
          description:
            "Políticas, modelos semánticos de datos, estándares técnicos y arreglos institucionales para un intercambio de datos confiable.",
        },
        {
          title: "Diseño e implementación de plataformas de intercambio de datos",
          description:
            "Arquitectura, implementación y despliegue de plataformas nacionales y regionales de intercambio de datos.",
        },
        {
          title: "Gobernanza del consentimiento y protección de datos personales",
          description:
            "Adopción del Consent Building Block y marcos de protección de datos personales alineados con estándares internacionales.",
        },
        {
          title: "Formación en interoperabilidad de datos",
          description:
            "Talleres y acompañamiento para funcionarios públicos, arquitectos y equipos técnicos.",
        },
      ],
    },
    process: {
      name: "Procesos",
      tagline: "Servicios públicos, rediseñados",
      description:
        "Diseño de servicios basado en BPMN, contratación y facturación de extremo a extremo, y portales gubernamentales estandarizados que modernizan la forma en que el Estado genera valor para la ciudadanía.",
      services: [
        {
          title: "Estrategia y hojas de ruta de e-Gobierno",
          description:
            "Estrategias nacionales de digitalización, rediseño de eventos de vida y programas de transformación institucional.",
        },
        {
          title: "Diseño y optimización de procesos (BPMN)",
          description:
            "Rediseño de servicios y acompañamiento en la implementación con BPMN 2.0 y pilotos en las principales plataformas de flujos de trabajo.",
        },
        {
          title: "Sistemas de contratación pública electrónica",
          description:
            "Contratación pública de extremo a extremo: desde la planificación anual y la ejecución hasta los acuerdos marco y la gestión de contratos.",
        },
        {
          title: "Infraestructura de facturación electrónica",
          description:
            "Sistemas de facturación electrónica y reporte de transacciones alineados con los marcos tributarios y de cumplimiento.",
        },
        {
          title: "Portales gubernamentales estandarizados",
          description:
            "Portales ciudadanos, directorios de servicios y sitios institucionales sobre marcos accesibles, multiinquilino y de nivel empresarial.",
        },
        {
          title: "Desarrollo de capacidades y competitividad de ecosistemas",
          description:
            "Programas de formación de formadores, estrategias de internacionalización y desarrollo de competencias técnicas para entidades públicas y ecosistemas locales.",
        },
      ],
    },
    intelligence: {
      name: "Inteligencia",
      tagline: "El Estado agéntico",
      description:
        "Agentes de IA, automatización inteligente y plataformas potenciadas por IA que vuelven proactivo al sector público, desde asistentes para la ciudadanía hasta flujos de trabajo interinstitucionales.",
      services: [
        {
          title: "Estrategia y arquitectura del Estado agéntico",
          description:
            "Evaluaciones de preparación para la IA, marcos de gobernanza y hojas de ruta para una IA responsable en el sector público.",
        },
        {
          title: "Agentes de IA para servicios públicos",
          description:
            "Asistentes virtuales multicanal (web, móvil, voz, USSD) y automatización de back-office para flujos de trabajo del gobierno.",
        },
        {
          title: "Servicios electrónicos potenciados por IA",
          description:
            "Plataformas low-code para el lanzamiento rápido de servicios públicos y flujos de IA sobre stacks soberanos y de código abierto.",
        },
        {
          title: "Herramientas de evaluación de madurez digital",
          description:
            "Herramientas basadas en IA para diagnosticar la madurez digital institucional y formular estrategias.",
        },
        {
          title: "Ecosistemas potenciados por IA",
          description:
            "Plataformas inteligentes de matchmaking, intercambio de recursos y colaboración transfronteriza entre ecosistemas tecnológicos.",
        },
        {
          title: "Programa de Aceleración de IA para el Gobierno",
          description:
            "Programa estructurado de adopción y talleres IGNITE para equipos y líderes del sector público.",
        },
      ],
    },
  },
};
