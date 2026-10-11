// Spanish text overlay for src/data/domain-pages.ts.
// Keyed by page slug -> categories[name].{tagline, items[itemSlug]};
// interoperability also carries layers[id].
// Anything omitted falls back to English. Page identity (name, description)
// is translated upstream in ./expertise-domains.es.ts.

type OfferOverlay = Record<string, { title?: string; description?: string }>;
type LayerId = "L03" | "L02" | "L01";
type TrackId = "01" | "02" | "03";

export interface DomainPageOverlay {
  categories?: Record<
    string,
    {
      tagline?: string;
      items?: OfferOverlay;
    }
  >;
  /** Interoperability only: its stack layers, keyed by layer id. */
  layers?: Partial<
    Record<
      LayerId,
      {
        name?: string;
        dimension?: string;
        promise?: string;
        scope?: string;
        items?: OfferOverlay;
      }
    >
  >;
  /** e-Procurement only: its programme tracks, keyed by track id. */
  tracks?: Partial<
    Record<
      TrackId,
      {
        name?: string;
        kind?: string;
        promise?: string;
        scope?: string;
        items?: OfferOverlay;
      }
    >
  >;
}

export const domainPagesEs: Record<string, DomainPageOverlay> = {
  "interoperability": {
    layers: {
      L03: {
        name: "Estrategia y gobernanza",
        dimension: "Organizativa · Jurídica",
        promise:
          "Decidir cómo volverse interoperable antes de escribir una sola línea de código.",
        scope: "Marcos · auditorías de madurez · política de intercambio de datos · hojas de ruta",
        items: {
          "interoperability-frameworks": {
            title: "Marcos nacionales y sectoriales de interoperabilidad",
            description:
              "La arquitectura de referencia, los principios y las reglas que alinean a todas las instituciones de un país o de un sector.",
          },
          "interoperability-maturity": {
            title: "Evaluación y auditoría de madurez en interoperabilidad",
            description:
              "Diagnóstico de preparación en personas, políticas, datos y sistemas, para saber qué construir primero.",
          },
          "data-sharing-policy": {
            title: "Política de intercambio de datos y gobernanza multiparte",
            description:
              "Acuerdos jurídicos y organizativos, reglas de consentimiento incluidas, que permiten a instituciones y países compartir datos con confianza.",
          },
          "adoption-roadmaps": {
            title: "Hojas de ruta de adopción y metodología de mantenimiento",
            description:
              "Planes por etapas que los ministerios pueden ejecutar en paralelo, adopción de GovStack incluida, y la gobernanza que mantiene vivos los estándares.",
          },
        },
      },
      L02: {
        name: "Estándares y semántica",
        dimension: "Semántica",
        promise: "Que los datos signifiquen lo mismo dondequiera que circulen.",
        scope: "Estándares de datos · modelos semánticos · validadores · registros",
        items: {
          "semantic-standards": {
            title: "Modelos semánticos de datos y estándares",
            description:
              "Modelos compartidos y estándares de datos, desde la capa conceptual hasta las transposiciones técnicas.",
          },
          "conformance-tooling": {
            title: "Validadores técnicos y herramientas de conformidad",
            description:
              "Reglas verificables por máquina, para que los datos sean correctos por construcción y no por inspección.",
          },
          "registry-standardization": {
            title: "Estandarización de registros",
            description:
              "Registros autoritativos (población, empresas, tierras) alineados con una misma estructura, estrategia de identificadores y vocabulario.",
          },
          "standard-localization": {
            title: "Localización y mantenimiento de estándares",
            description:
              "Estándares internacionales adaptados al contexto nacional y gobernados para que sigan vigentes.",
          },
        },
      },
      L01: {
        name: "Intercambio e integración",
        dimension: "Técnica",
        promise: "Que los datos fluyan, de forma segura y en producción.",
        scope: "Arquitectura · APIs · X-Road · plataformas de intercambio",
        items: {
          "interoperability-architecture": {
            title: "Diseño de arquitectura de interoperabilidad",
            description:
              "El plano técnico que conecta registros, servicios e instituciones de extremo a extremo.",
          },
          "api-development": {
            title: "Desarrollo e integración de APIs",
            description:
              "APIs basadas en estándares detrás de un gateway gobernado, con los sistemas ministeriales y heredados integrados a través de ellas.",
          },
          "xroad-integration": {
            title: "Despliegue e integración de X-Road",
            description:
              "Instituciones incorporadas a redes nacionales seguras de intercambio de datos (X-Road, Pub/Sub), sobre stacks abiertos y sin núcleo cautivo.",
          },
          "regional-exchange-platforms": {
            title: "Plataformas regionales de intercambio y sistemas de sistemas",
            description:
              "Plataformas multiinstitucionales y multinacionales que recopilan, validan y comparten datos a escala, sobre infraestructura soberana.",
          },
        },
      },
    },
    categories: {
      Trainings: {
        tagline:
          "Fortalecimiento de capacidades para responsables de políticas y equipos técnicos del sector público.",
        items: {
          "training-interop-strategies": {
            title: "Taller: Estrategias de interoperabilidad para instituciones públicas",
            description:
              "Taller no técnico para responsables de políticas y liderazgo ministerial. Construye un vocabulario común sobre GovStack, X-Road y patrones Pub-Sub, para que las decisiones sobre iniciativas de intercambio de datos se tomen por el fondo y no por las siglas.",
          },
        },
      },
    },
  },
  "data-governance": {
    categories: {
      Consultancy: {
        tagline:
          "Marcos de gobernanza, regímenes de consentimiento y diagnósticos de madurez.",
        items: {
          "data-governance": {
            title: "Gobernanza de datos",
            description:
              "Políticas, roles, reglas de responsabilidad y arreglos institucionales para un intercambio confiable de datos públicos. Se entrega como un marco formal que un consejo de ministros o una agencia digital puede adoptar y hacer cumplir.",
          },
          "digital-maturity": {
            title: "Evaluaciones de madurez digital",
            description:
              "Diagnósticos estructurados que jerarquizan la madurez digital de una institución y producen un plan de inversión defendible, no solo un informe.",
          },
        },
      },
      Trainings: {
        tagline:
          "Fortalecimiento de capacidades para responsables de políticas, equipos legales y personal institucional.",
        items: {
          "training-data-governance": {
            title: "Taller: Gobernanza de datos para instituciones públicas",
            description:
              "Taller estructurado para liderazgo ministerial, equipos jurídicos y personal de agencias digitales. Aborda marcos de gobernanza, roles de responsabilidad, regímenes de consentimiento y cómo integrar las reglas de protección de datos en la práctica institucional diaria.",
          },
        },
      },
    },
  },
  "e-procurement": {
    tracks: {
      "01": {
        name: "Reforma",
        kind: "Consultoría",
        promise: "Ordenar las reglas y el proceso antes de escribir una sola línea de código.",
        scope: "Diagnóstico · estrategia · normativa · rediseño de procesos",
        items: {
          "procurement-assessment": {
            title: "Diagnóstico del sistema de contratación",
            description:
              "Un diagnóstico del marco legal, las instituciones, los procesos y los sistemas, para que la reforma empiece donde más importa.",
          },
          "eprocurement-strategy": {
            title: "Estrategia y hoja de ruta de contratación electrónica",
            description:
              "Una estrategia nacional o institucional, por etapas y presupuestada, que las autoridades de contratación pueden ejecutar paso a paso.",
          },
          "regulatory-alignment": {
            title: "Alineación normativa y de estándares",
            description:
              "Reglas, procedimientos y estándares de datos alineados con las buenas prácticas internacionales, para que la plataforma se apoye en una base firme.",
          },
          "process-redesign": {
            title: "Rediseño de los procesos de contratación",
            description:
              "Procesos mapeados y simplificados desde la solicitud de compra hasta el pago, antes de configurar nada en un sistema.",
          },
        },
      },
      "02": {
        name: "Personas",
        kind: "Desarrollo de capacidades",
        promise: "Preparar a quienes operarán el sistema, antes de su puesta en marcha.",
        scope: "Funcionarios · formadores · proveedores · gestión del cambio",
        items: {
          "procurement-officer-training": {
            title: "Formación para funcionarios de compras",
            description:
              "Formación práctica en los nuevos procedimientos y en la plataforma, construida sobre los expedientes de contratación de su día a día.",
          },
          "local-trainers": {
            title: "Formadores locales y capacidad institucional",
            description:
              "Formadores y equipos locales preparados para transmitir el conocimiento, de modo que la capacidad siga creciendo tras el traspaso.",
          },
          "supplier-engagement": {
            title: "Acompañamiento a proveedores",
            description:
              "Difusión y orientación que incorporan a los proveedores, pequeñas empresas incluidas, a los procedimientos electrónicos.",
          },
          "change-management": {
            title: "Gestión del cambio y soporte",
            description:
              "Implicación de los responsables y soporte diario para que un sistema nuevo se convierta en una nueva forma de trabajar.",
          },
        },
      },
      "03": {
        name: "Plataforma",
        promise: "Cada paso digital, cada documento justificado, cada importe trazable.",
        scope: "Solicitudes · plan de compras · contratos · auditoría",
        items: {
          "purchase-requests": {
            title: "Solicitudes de compra digitales",
            description:
              "Necesidades registradas, justificadas y aprobadas en línea, con firma electrónica en lugar de expedientes en papel.",
          },
          "procurement-plan": {
            title: "Plan de compras y seguimiento presupuestario",
            description:
              "Cantidades e importes controlados frente al plan anual de contratación y los compromisos presupuestarios, en tiempo real.",
          },
          "contracts-suppliers": {
            title: "Contratos, pedidos y proveedores",
            description:
              "Contratos, acuerdos marco y pedidos a proveedores seguidos hasta el último pago.",
          },
          "audit-reporting": {
            title: "Informes listos para auditoría",
            description:
              "Informes para responsables y auditores de todos los niveles, con cada documento justificado y registrado.",
          },
        },
      },
    },
  },
  "e-invoicing": {
    categories: {
      Consultancy: {
        tagline:
          "Estrategia y asesoría en cumplimiento tributario.",
        items: {
          "einvoicing-advisory": {
            title: "Estrategia de facturación electrónica y asesoría de cumplimiento tributario",
            description:
              "Estrategias de facturación electrónica que se mantienen en cumplimiento con la legislación tributaria local y se alinean con los estándares regionales e internacionales de reporte emergentes.",
          },
        },
      },
      Services: {
        tagline:
          "Infraestructura de facturación y reporte de transacciones.",
        items: {
          "einvoicing-infrastructure": {
            title: "Infraestructura de facturación electrónica y reporte de transacciones",
            description:
              "Despliegue de columnas nacionales de facturación electrónica: desde las pasarelas de la autoridad tributaria hasta el onboarding del contribuyente y el monitoreo del cumplimiento.",
          },
        },
      },
    },
  },
  "web-portals": {
    categories: {
      Consultancy: {
        tagline:
          "Estandarización, arquitectura de información y estrategia multi-tenant.",
        items: {
          "portal-standardization": {
            title: "Estandarización de portales web y arquitectura multiinquilino",
            description:
              "Sistemas de diseño, auditorías de accesibilidad (WCAG AA como piso, no como aspiración) y arquitecturas multiinquilino que permiten que cientos de sitios gubernamentales compartan una sola columna operativa con autonomía por institución y gobernanza central.",
          },
        },
      },
      Services: {
        tagline:
          "Entrega de portales a escala institucional y nacional.",
        items: {
          "government-portals": {
            title: "Portales web gubernamentales estandarizados",
            description:
              "Portales gubernamentales sobre TYPO3 y Drupal: multiinquilino, accesibles, seguros y listos para escalar desde un único ministerio a cientos de instituciones.",
          },
        },
      },
      Products: {
        tagline:
          "Plataformas propias que evolucionamos.",
        items: {
          "arxia-portal-framework": {
            title: "Portales gubernamentales estandarizados",
            description:
              "Stack de portales gubernamentales multiinquilino y compatibles con WCAG sobre TYPO3 y Drupal. Impulsa más de 350 sitios en Ruanda y está diseñado para expandirse a otras administraciones sin reescrituras desde cero.",
          },
        },
      },
      Trainings: {
        tagline:
          "Capacitación técnica para los equipos que operarán los portales.",
        items: {
          "training-typo3": {
            title: "Formación técnica en TYPO3 para el sector público en Portales Gubernamentales Estandarizados",
            description:
              "Formación práctica en TYPO3 para equipos técnicos internos del gobierno: instalación, configuración multiinquilino, modelado de contenidos, accesibilidad (WCAG) y mantenimiento a largo plazo del stack que sostiene los Portales Gubernamentales Estandarizados.",
          },
        },
      },
    },
  },
  "agentic-state": {
    categories: {
      Consultancy: {
        tagline:
          "IA responsable en el sector público, de la estrategia a la gobernanza.",
        items: {
          "ai-readiness-gov": {
            title: "Evaluaciones de preparación para la IA en el gobierno",
            description:
              "Diagnósticos sobre dónde se encuentra una institución en datos, competencias, infraestructura y preparación jurídica, y qué corregir primero para adoptar IA de forma responsable.",
          },
          "agentic-state-strategy": {
            title: "Estrategia y arquitectura del Estado agéntico",
            description:
              "Estrategia y arquitecturas de referencia para un sector público donde los agentes de IA gestionan solicitudes ciudadanas y la coordinación interinstitucional: no un chatbot añadido, sino un Estado rediseñado.",
          },
          "public-ai-governance": {
            title: "Marcos de gobernanza de IA para el sector público",
            description:
              "Marcos de gobernanza de IA alineados con ISO, la Ley de IA de la UE y las reglas nacionales emergentes, adaptados a ministerios, agencias y organizaciones internacionales.",
          },
          "responsible-ai-policy": {
            title: "Política de IA responsable y asesoría en contratación",
            description:
              "Asesoría en políticas de contratación de IA, cláusulas contractuales tipo y requisitos de transparencia, para que la próxima licitación de IA parta desde una mejor posición.",
          },
        },
      },
      Services: {
        tagline:
          "Construcción y despliegue de IA en el sector público.",
        items: {
          "ai-agents-public-services": {
            title: "Agentes de IA para servicios públicos",
            description:
              "Asistentes virtuales multicanal en web, móvil, USSD y voz, incluidos canales de baja alfabetización en idiomas locales, que manejan el volumen real de la ciudadanía, no solo demos.",
          },
          "ai-acceleration-gov": {
            title: "Programa de Aceleración de IA para el Gobierno",
            description:
              "Programa estructurado de adopción de 12 semanas para organizaciones del sector público. Lleva a un equipo de la estrategia a casos de uso de IA en funcionamiento dentro de un solo trimestre.",
          },
          "inter-institutional-workflows": {
            title: "Flujos de trabajo interinstitucionales automatizados",
            description:
              "Flujos de trabajo asistidos por IA que enrutan solicitudes, documentos y decisiones entre múltiples organismos, comprimiendo semanas de coordinación en días.",
          },
        },
      },
      Products: {
        tagline:
          "Plataformas propias que evolucionamos.",
        items: {
          "ai-governance-platform-gov": {
            title: "Plataforma de Gobernanza de IA para Gobiernos",
            description:
              "Una organización que avanza hacia implementaciones de IA y un Estado agéntico necesita una gobernanza sólida. La plataforma monitoriza el cumplimiento, las vulnerabilidades de seguridad y el riesgo de cada sistema de IA que la organización utiliza.",
          },
          "holonn": {
            title: "Holonn: Plataforma de matchmaking e IA para ecosistemas",
            description:
              "Holonn permite a organizaciones de apoyo empresarial y ecosistemas (clústeres, hubs, asociaciones y aceleradoras) agregar la oferta de sus miembros con IA, creando marketplaces interactivos que conectan empresas con inversionistas, clientes y socios.",
          },
        },
      },
      Trainings: {
        tagline:
          "Desarrollo de capacidades de IA dentro de la institución.",
        items: {
          "ai-ignite-gov": {
            title: "Taller AI IGNITE para el sector público",
            description:
              "Taller de descubrimiento para identificar las primeras oportunidades de IA en las operaciones de una institución, con una lista priorizada, estimaciones de esfuerzo y un plan a 90 días.",
          },
        },
      },
    },
  },
  "e-services": {
    categories: {
      Consultancy: {
        tagline:
          "Rediseño de servicios en torno a trayectorias ciudadanas reales.",
        items: {
          "egov-strategy": {
            title: "Estrategias y hojas de ruta de e-gobierno",
            description:
              "Estrategias nacionales de digitalización traducidas en hojas de ruta ejecutables: secuenciación, presupuesto, gobernanza y titularidad institucional para que la estrategia no se quede en el cajón.",
          },
          "life-events-redesign": {
            title: "Rediseño de eventos de vida y servicios a la ciudadanía",
            description:
              "Rediseñamos cómo la ciudadanía vive los momentos clave con el Estado (nacimiento, registro de empresa, jubilación) reconstruyendo los servicios que los sustentan de extremo a extremo.",
          },
          "bpmn-process-design": {
            title: "Diseño y optimización de procesos (BPMN 2.0)",
            description:
              "Modelado de procesos con BPMN 2.0 para servicios públicos, con notación formal, validaciones con grupos de interés y pilotos ejecutables sobre los principales motores de flujos de trabajo.",
          },
        },
      },
      Services: {
        tagline:
          "Entrega de servicios con low-code y asistida por IA.",
        items: {
          "low-code-eservices": {
            title: "Plataformas low-code de servicios electrónicos",
            description:
              "Plataformas que permiten a los equipos propios de una institución lanzar nuevos servicios públicos y agentes de IA en días, no en trimestres, con gobernanza y trazabilidad integradas.",
          },
          "document-processing": {
            title: "Procesamiento documental con IA",
            description:
              "Extracción, clasificación y resumen del backlog documental en el que la mayoría de las instituciones públicas se ahogan: desde permisos hasta solicitudes de subvención.",
          },
          "egov-development": {
            title: "Desarrollo de sistemas de e-gobierno",
            description:
              "Desarrollo a medida de plataformas gubernamentales: desde registros y sistemas de gestión de expedientes hasta portales de servicios para la ciudadanía, sobre stacks abiertos e interoperables.",
          },
        },
      },
      Trainings: {
        tagline:
          "Fortalecimiento de capacidades para los equipos que diseñan y operan los servicios.",
        items: {
          "bpmn-coaching": {
            title: "Taller: Acompañamiento en implementación de BPMN",
            description:
              "Acompañamiento práctico sobre Camunda, Flowable y motores de flujos de trabajo similares. Se entrega dentro del equipo del cliente, para que la capacidad permanezca cuando Arxia se va.",
          },
          "ecosystem-capacity": {
            title: "Internacionalización del ecosistema y propuesta de valor",
            description:
              "Programas que preparan a los ecosistemas tecnológicos locales para realizar trabajo de DPI por sí mismos y competir internacionalmente: desde formación de formadores hasta preparación para la exportación.",
          },
        },
      },
    },
  },
};
