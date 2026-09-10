// Spanish text overlay for src/data/domain-pages.ts.
// Keyed by page slug -> categories[name].{tagline, items[itemSlug]}.
// Anything omitted falls back to English. Page identity (name, description)
// is translated upstream in ./expertise-domains.es.ts.

export interface DomainPageOverlay {
  categories?: Record<
    string,
    {
      tagline?: string;
      items?: Record<string, { title?: string; description?: string }>;
    }
  >;
}

export const domainPagesEs: Record<string, DomainPageOverlay> = {
  "interoperability": {
    categories: {
      Consultancy: {
        tagline:
          "Marcos, estandares y arquitectura para el intercambio nacional de datos.",
        items: {
          "interoperability-strategy": {
            title: "Estrategia de interoperabilidad de datos",
            description:
              "Hojas de ruta de interoperabilidad nacional y transfronteriza basadas en GovStack, X-Road y patrones Pub/Sub. Traducimos las prioridades políticas en un plan técnico por etapas que varios ministerios pueden ejecutar en paralelo.",
          },
          "national-registry-design": {
            title: "Diseño de registros nacionales",
            description:
              "Arquitectura y diseño de registros nacionales autoritativos (población, empresas, tierras, vehículos): modelo de datos, estrategia de identificadores, reglas de gobernanza y puntos de integración con la red de intercambio de datos.",
          },
        },
      },
      Services: {
        tagline:
          "Entrega, implementacion y habilitacion tecnica.",
        items: {
          "national-registries-api-gateway": {
            title: "Implementación de registros nacionales y API gateway",
            description:
              "Entrega de extremo a extremo de los registros nacionales y de la red de intercambio de datos del país, con mensajería X-Road / Pub-Sub y API gateway integrados. Desde la arquitectura de referencia hasta la autoridad de certificación, el servidor central y las primeras integraciones ministeriales, sobre stacks abiertos probados para que el Estado nunca dependa de un núcleo cerrado.",
          },
          "api-gateway": {
            title: "Diseño de API gateway y registro de APIs",
            description:
              "API gateway de nivel gubernamental con control de acceso, cuotas y observabilidad, más un registro público de APIs para que las instituciones aliadas descubran y consuman datos de forma responsable.",
          },
          "regional-platform": {
            title: "Arquitectura de plataforma regional de intercambio de datos",
            description:
              "Diseño de plataformas multinacionales para organismos regionales (por ejemplo, la CIRGL) donde más de 10 Estados miembros deben compartir datos bajo reglas técnicas y de gobernanza comunes.",
          },
          "software-integration": {
            title: "Integración de software",
            description:
              "Integración práctica de sistemas del sector público (aplicaciones ministeriales, bases de datos heredadas y APIs modernas) conectados a través de la capa nacional de intercambio de datos, con traspaso operativo completo.",
          },
          "inter-institutional-workflows": {
            title: "Flujos de trabajo interinstitucionales automatizados",
            description:
              "Flujos de trabajo asistidos por IA que enrutan solicitudes, documentos y decisiones entre múltiples organismos, comprimiendo semanas de coordinación en días.",
          },
          "govstack-adoption": {
            title: "Programas de adopción de GovStack",
            description:
              "Adopción de GovStack a nivel país: alineación arquitectónica, selección de building blocks, pilotos y preparación institucional.",
          },
        },
      },
      Products: {
        tagline:
          "Plataformas propias que evolucionamos.",
        items: {
          "arxia-data-exchange": {
            title: "Arxia Data Exchange Platform",
            description:
              "Intercambio seguro de datos basado en estándares entre instituciones gubernamentales y a través de fronteras. Preconfigurada para los building blocks de GovStack y desplegable sobre infraestructura soberana.",
          },
        },
      },
      Trainings: {
        tagline:
          "Fortalecimiento de capacidades para responsables de politicas y equipos tecnicos del sector publico.",
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
          "Marcos de gobernanza, regimenes de consentimiento y diagnosticos de madurez.",
        items: {
          "data-governance": {
            title: "Gobernanza de datos",
            description:
              "Políticas, roles, reglas de responsabilidad y arreglos institucionales para un intercambio confiable de datos públicos. Se entrega como un marco formal que tu consejo de ministros o agencia digital puede adoptar y hacer cumplir.",
          },
          "digital-maturity": {
            title: "Evaluaciones de madurez digital",
            description:
              "Diagnósticos estructurados que jerarquizan la madurez digital de tu institución y producen un plan de inversión defendible, no solo un informe.",
          },
        },
      },
      Trainings: {
        tagline:
          "Fortalecimiento de capacidades para responsables de politicas, equipos legales y personal institucional.",
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
    categories: {
      Consultancy: {
        tagline:
          "Estrategia, estandares y alineacion regulatoria para la compra publica.",
        items: {
          "eprocurement-strategy": {
            title: "Estrategia de contratación pública electrónica, estándares y alineación normativa",
            description:
              "Trabajo de estrategia nacional de contratación: desde la alineación regulatoria y la adopción de estándares hasta el diseño de la gestión del cambio para las autoridades de contratación.",
          },
        },
      },
      Services: {
        tagline:
          "Entrega completa de plataformas.",
        items: {
          "eproc-implementation": {
            title: "Implementación integral de plataformas de contratación pública electrónica",
            description:
              "Despliegue completo de sistemas de contratación pública (planificación, licitación, evaluación, adjudicación y gestión de contratos) con integración a los sistemas financieros y de auditoría.",
          },
        },
      },
      Products: {
        tagline:
          "Plataformas propias que evolucionamos.",
        items: {
          "processplayer": {
            title: "ProcessPlayer",
            description:
              "Plataforma de contratación pública de ciclo completo: planificación, ejecución, acuerdos marco y gestión de contratos. Más de 50 organizaciones, más de 30.000 referencias, en SaaS y on-premise.",
          },
        },
      },
    },
  },
  "e-invoicing": {
    categories: {
      Consultancy: {
        tagline:
          "Estrategia y asesoria en cumplimiento tributario.",
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
          "Infraestructura de facturacion y reporte de transacciones.",
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
          "Estandarizacion, arquitectura de informacion y estrategia multi-tenant.",
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
          "Capacitacion tecnica para los equipos que operaran los portales.",
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
          "IA responsable en el sector publico, de la estrategia a la gobernanza.",
        items: {
          "ai-readiness-gov": {
            title: "Evaluaciones de preparación para la IA en el gobierno",
            description:
              "Diagnósticos sobre dónde se encuentra tu institución en datos, competencias, infraestructura y preparación jurídica, y qué corregir primero para adoptar IA de forma responsable.",
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
              "Asesoría en políticas de contratación de IA, cláusulas contractuales tipo y requisitos de transparencia, para que tu próxima licitación de IA parta desde una mejor posición.",
          },
        },
      },
      Services: {
        tagline:
          "Construccion y despliegue de IA en el sector publico.",
        items: {
          "ai-agents-public-services": {
            title: "Agentes de IA para servicios públicos",
            description:
              "Asistentes virtuales multicanal en web, móvil, USSD y voz, incluidos canales de baja alfabetización en idiomas locales, que manejan el volumen real de la ciudadanía, no solo demos.",
          },
          "ai-acceleration-gov": {
            title: "Programa de Aceleración de IA para el Gobierno",
            description:
              "Programa estructurado de adopción de 12 semanas para organizaciones del sector público. Lleva a tu equipo de la estrategia a casos de uso de IA en funcionamiento dentro de un solo trimestre.",
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
              "¿Tu organización avanza hacia implementaciones de IA y un Estado agéntico? Entonces necesitas una gobernanza sólida. Nuestra plataforma monitoriza cumplimiento, vulnerabilidades de seguridad y evaluación de riesgos de cada sistema de IA en uso dentro de tu organización.",
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
          "Desarrollo de capacidades de IA dentro de la institucion.",
        items: {
          "ai-ignite-gov": {
            title: "Taller AI IGNITE para el sector público",
            description:
              "Taller de descubrimiento para identificar las primeras oportunidades de IA en tus operaciones, con una lista priorizada, estimaciones de esfuerzo y un plan a 90 días.",
          },
        },
      },
    },
  },
  "e-services": {
    categories: {
      Consultancy: {
        tagline:
          "Rediseno de servicios en torno a trayectorias ciudadanas reales.",
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
              "Plataformas que permiten a tus propios equipos lanzar nuevos servicios públicos y agentes de IA en días, no en trimestres, con gobernanza y trazabilidad integradas.",
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
          "Fortalecimiento de capacidades para los equipos que disenan y operan los servicios.",
        items: {
          "bpmn-coaching": {
            title: "Taller: Acompañamiento en implementación de BPMN",
            description:
              "Acompañamiento práctico sobre Camunda, Flowable y motores de flujos de trabajo similares. Se entrega dentro de tu equipo, para que la capacidad permanezca cuando nos vamos.",
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
