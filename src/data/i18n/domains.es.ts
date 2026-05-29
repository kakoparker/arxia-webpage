// Spanish text overlay for src/data/domains.ts.
// Keyed by vertical slug → domain slug. `services` arrays are positional
// (same order as the English source). Anything omitted falls back to English.
// Brand/tech terms kept as-is (Arxia, Govtech, GovStack, X-Road, BPMN, RGPD,
// TYPO3, Drupal, USSD, MDM, ROI, IGNITE, Ley de IA de la UE…).

export interface VerticalTextOverlay {
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

export const domainsEs: Record<string, VerticalTextOverlay> = {
  govtech: {
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
  },
  industries: {
    tagline:
      "Transformación empresarial para minería, finanzas, retail, universidades y más",
    body: "Ayudamos a las empresas a modernizar sus operaciones, adoptar la IA de forma responsable y gobernar sus datos con eficacia, generando mejoras medibles de eficiencia y ventaja competitiva en industrias reguladas y de alto riesgo.",
    domains: {
      data: {
        name: "Datos",
        tagline: "Datos empresariales, gobernados e interoperables",
        description:
          "Marcos de gobernanza, calidad, cumplimiento e integración de datos que convierten datos empresariales fragmentados en un activo competitivo duradero.",
        services: [
          {
            title: "Estrategia de gobernanza de datos y diseño de marcos",
            description:
              "Políticas, roles y procesos para una administración de datos de nivel empresarial.",
          },
          {
            title: "Calidad de datos y gestión de datos maestros",
            description:
              "Evaluaciones, remediación y plataformas de MDM entre sistemas, departamentos y socios.",
          },
          {
            title: "Cumplimiento normativo (RGPD, estándares del sector)",
            description:
              "Preparación, implementación y monitoreo continuo del cumplimiento para sectores regulados.",
          },
          {
            title: "Integración de datos y pipelines",
            description:
              "Arquitectura de integración y desarrollo de pipelines para analítica, operaciones y preparación para la IA.",
          },
          {
            title: "Estándares de intercambio de datos sectoriales",
            description:
              "Modelos de interoperabilidad específicos del sector (minería, finanzas, logística) y su transposición técnica.",
          },
        ],
      },
      process: {
        name: "Procesos",
        tagline: "Operaciones empresariales, reinventadas",
        description:
          "Digitalización de procesos, automatización de flujos de trabajo y modernización de sistemas que generan mejoras medibles de eficiencia en panoramas empresariales complejos.",
        services: [
          {
            title: "Estrategia y hoja de ruta de transformación digital",
            description:
              "Hojas de ruta a nivel ejecutivo que abarcan procesos, tecnología y gestión del cambio.",
          },
          {
            title: "Auditoría y optimización de procesos",
            description:
              "Reingeniería de procesos de extremo a extremo con pilotos basados en BPMN y KPI medibles.",
          },
          {
            title: "Integración y modernización de sistemas",
            description:
              "Arquitectura de integración, migración de sistemas heredados y desarrollo de plataformas de nivel empresarial.",
          },
          {
            title: "Portales corporativos e intranets",
            description:
              "Plataformas de contenido empresarial sobre TYPO3 y Drupal con accesibilidad, gobernanza y soporte multisitio.",
          },
          {
            title: "Estrategia de exportación e internacionalización",
            description:
              "Posicionamiento de mercado, propuesta de valor y preparación comercial para exportadores de TI y servicios.",
          },
        ],
      },
      intelligence: {
        name: "Inteligencia",
        tagline: "IA a escala empresarial",
        description:
          "Agentes de IA, programas de aceleración y marcos de gobernanza que ayudan a las empresas a adoptar la IA de forma responsable y a escala, con un ROI medible.",
        services: [
          {
            title: "Estrategia y hoja de ruta de IA",
            description:
              "Descubrimiento y priorización de casos de uso y hojas de ruta de IA empresarial ligadas a resultados medibles.",
          },
          {
            title: "Desarrollo de agentes de IA y automatización",
            description:
              "Automatización de back-office, agentes de IA verticales y automatización inteligente de procesos.",
          },
          {
            title: "Taller AI IGNITE",
            description:
              "Taller de descubrimiento para identificar las primeras oportunidades de aceleración con IA dentro de tu organización.",
          },
          {
            title: "Programa de Aceleración de IA",
            description:
              "Programa estructurado de 12 semanas para la adopción de IA en marketing, operaciones y administración.",
          },
          {
            title: "Alfabetización ejecutiva en IA",
            description:
              "Programas para directorios y altos ejecutivos sobre liderazgo, gobernanza y decisiones de portafolio en IA.",
          },
          {
            title: "Gobernanza de IA (ISO, Ley de IA de la UE)",
            description:
              "Plataformas empresariales de gobernanza, riesgo y cumplimiento de IA alineadas con marcos internacionales.",
          },
        ],
      },
    },
  },
};
