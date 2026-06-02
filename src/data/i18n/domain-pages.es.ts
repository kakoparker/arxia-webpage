// Spanish text overlay for src/data/domain-pages.ts.
// Keyed by page slug → { page-level fields, categories[name].tagline,
// categories[name].items[itemSlug] }. Anything omitted falls back to English.

export interface DomainPageOverlay {
  title?: string;
  tagline?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  categories?: Record<
    string,
    {
      tagline?: string;
      items?: Record<string, { title?: string; description?: string }>;
    }
  >;
}

export const domainPagesEs: Record<string, DomainPageOverlay> = {
  // ── GOVTECH · DATOS ──────────────────────────────────────────────
  "govtech-data": {
    title: "Datos",
    tagline: "El tejido conectivo del Estado",
    description:
      "Diseñamos la capa de datos de la infraestructura pública digital: interoperabilidad, gobernanza y marcos de intercambio que permiten a las instituciones compartir información de forma segura entre áreas, fronteras y building blocks.",
    metaTitle: "Govtech · Datos — Interoperabilidad y Gobernanza de Datos",
    metaDescription:
      "Interoperabilidad de datos, gobernanza, estándares semánticos y sistemas de intercambio transfronterizo para el sector público. Construido sobre GovStack, X-Road y marcos abiertos.",
    categories: {
      Consultancy: {
        tagline: "Estrategia, políticas y arquitectura para la capa de datos del Estado.",
        items: {
          "interoperability-strategy": {
            title: "Estrategia de interoperabilidad de datos",
            description:
              "Hojas de ruta de interoperabilidad nacional y transfronteriza basadas en GovStack, X-Road y patrones Pub/Sub. Traducimos las prioridades políticas en un plan técnico por etapas que varios ministerios pueden ejecutar en paralelo.",
          },
          "data-governance": {
            title: "Gobernanza de datos",
            description:
              "Políticas, roles, reglas de responsabilidad y arreglos institucionales para un intercambio confiable de datos públicos. Se entrega como un marco formal que tu consejo de ministros o agencia digital puede adoptar y hacer cumplir.",
          },
          "national-registry-design": {
            title: "Diseño de registros nacionales",
            description:
              "Arquitectura y diseño de registros nacionales autoritativos (población, empresas, tierras, vehículos): modelo de datos, estrategia de identificadores, reglas de gobernanza y puntos de integración con la red de intercambio de datos.",
          },
        },
      },
      Services: {
        tagline: "Entrega, implementación y habilitación técnica.",
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
        },
      },
      Products: {
        tagline: "Plataformas que desarrollamos y hacemos evolucionar.",
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
          "Desarrollo de capacidades para responsables de políticas, equipos jurídicos y personal técnico del sector público.",
        items: {
          "training-data-governance": {
            title: "Taller: Gobernanza de datos para instituciones públicas",
            description:
              "Taller estructurado para liderazgo ministerial, equipos jurídicos y personal de agencias digitales. Aborda marcos de gobernanza, roles de responsabilidad, regímenes de consentimiento y cómo integrar las reglas de protección de datos en la práctica institucional diaria.",
          },
          "training-interop-strategies": {
            title: "Taller: Estrategias de interoperabilidad para instituciones públicas",
            description:
              "Taller no técnico para responsables de políticas y liderazgo ministerial. Construye un vocabulario común sobre GovStack, X-Road y patrones Pub-Sub, para que las decisiones sobre iniciativas de intercambio de datos se tomen por el fondo y no por las siglas.",
          },
        },
      },
    },
  },

  // ── GOVTECH · PROCESOS ────────────────────────────────────────────
  "govtech-process": {
    title: "Procesos",
    tagline: "Servicios públicos, rediseñados",
    description:
      "Diseño de servicios basado en BPMN, contratación y facturación de extremo a extremo, y portales gubernamentales estandarizados: modernizando la forma en que el Estado entrega valor a la ciudadanía.",
    metaTitle: "Govtech · Procesos — Diseño de Servicios, e-Procurement y Portales",
    metaDescription:
      "Estrategia de e-gobierno, diseño de procesos BPMN, contratación pública electrónica, facturación electrónica y portales gubernamentales estandarizados. Más de 20 años en más de 20 países.",
    categories: {
      Consultancy: {
        tagline: "Estrategia y rediseño de procesos institucionales y de cara a la ciudadanía.",
        items: {
          "egov-strategy": {
            title: "Estrategias y hojas de ruta de e-gobierno",
            description:
              "Estrategias nacionales de digitalización traducidas en hojas de ruta accionables: secuenciación, presupuesto, gobernanza y titularidad institucional para que la estrategia no se quede en el cajón.",
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
          "eprocurement-strategy": {
            title: "Estrategia de contratación pública electrónica, estándares y alineación normativa",
            description:
              "Trabajo de estrategia nacional de contratación: desde la alineación regulatoria y la adopción de estándares hasta el diseño de la gestión del cambio para las autoridades de contratación.",
          },
          "einvoicing-advisory": {
            title: "Estrategia de facturación electrónica y asesoría de cumplimiento tributario",
            description:
              "Estrategias de facturación electrónica que se mantienen en cumplimiento con la legislación tributaria local y se alinean con los estándares regionales e internacionales de reporte emergentes.",
          },
          "portal-standardization": {
            title: "Estandarización de portales web y arquitectura multiinquilino",
            description:
              "Sistemas de diseño, auditorías de accesibilidad (WCAG AA como piso, no como aspiración) y arquitecturas multiinquilino que permiten que cientos de sitios gubernamentales compartan una sola columna operativa con autonomía por institución y gobernanza central.",
          },
        },
      },
      Services: {
        tagline: "Implementación, integración y entrega de plataformas.",
        items: {
          "egov-development": {
            title: "Desarrollo de sistemas de e-gobierno",
            description:
              "Desarrollo a medida de plataformas gubernamentales: desde registros y sistemas de gestión de expedientes hasta portales de servicios para la ciudadanía, sobre stacks abiertos e interoperables.",
          },
          "eproc-implementation": {
            title: "Implementación integral de plataformas de contratación pública electrónica",
            description:
              "Despliegue completo de sistemas de contratación pública (planificación, licitación, evaluación, adjudicación y gestión de contratos) con integración a los sistemas financieros y de auditoría.",
          },
          "einvoicing-infrastructure": {
            title: "Infraestructura de facturación electrónica y reporte de transacciones",
            description:
              "Despliegue de columnas nacionales de facturación electrónica: desde las pasarelas de la autoridad tributaria hasta el onboarding del contribuyente y el monitoreo del cumplimiento.",
          },
          "government-portals": {
            title: "Portales web gubernamentales estandarizados",
            description:
              "Portales gubernamentales sobre TYPO3 y Drupal: multiinquilino, accesibles, seguros y listos para escalar desde un único ministerio a cientos de instituciones.",
          },
        },
      },
      Products: {
        tagline: "Plataformas que desarrollamos y hacemos evolucionar.",
        items: {
          processplayer: {
            title: "ProcessPlayer",
            description:
              "Plataforma de contratación pública de ciclo completo: planificación, ejecución, acuerdos marco y gestión de contratos. Más de 50 organizaciones, más de 30.000 referencias, en SaaS y on-premise.",
          },
          "arxia-portal-framework": {
            title: "Portales gubernamentales estandarizados",
            description:
              "Stack de portales gubernamentales multiinquilino y compatibles con WCAG sobre TYPO3 y Drupal. Impulsa más de 350 sitios en Ruanda y está diseñado para expandirse a otras administraciones sin reescrituras desde cero.",
          },
        },
      },
      Trainings: {
        tagline: "Desarrollo de capacidades para equipos técnicos del sector público y ecosistemas locales.",
        items: {
          "bpmn-coaching": {
            title: "Taller: Acompañamiento en implementación de BPMN",
            description:
              "Acompañamiento práctico sobre Camunda, Flowable y motores de flujos de trabajo similares. Se entrega dentro de tu equipo, para que la capacidad permanezca cuando nos vamos.",
          },
          "training-typo3": {
            title: "Formación técnica en TYPO3 para el sector público en Portales Gubernamentales Estandarizados",
            description:
              "Formación práctica en TYPO3 para equipos técnicos internos del gobierno: instalación, configuración multiinquilino, modelado de contenidos, accesibilidad (WCAG) y mantenimiento a largo plazo del stack que sostiene los Portales Gubernamentales Estandarizados.",
          },
          "ecosystem-capacity": {
            title: "Internacionalización del ecosistema y propuesta de valor",
            description:
              "Programas que preparan a los ecosistemas tecnológicos locales para realizar trabajo de DPI por sí mismos y competir internacionalmente: desde formación de formadores hasta preparación para la exportación.",
          },
          "govstack-adoption": {
            title: "Programas de adopción de GovStack",
            description:
              "Adopción de GovStack a nivel país: alineación arquitectónica, selección de building blocks, pilotos y preparación institucional.",
          },
        },
      },
    },
  },

  // ── GOVTECH · INTELIGENCIA ────────────────────────────────────────
  "govtech-intelligence": {
    title: "Inteligencia",
    tagline: "El Estado agéntico",
    description:
      "Agentes de IA, automatización inteligente y plataformas potenciadas por IA que vuelven proactivo al sector público: desde asistentes para la ciudadanía hasta flujos de trabajo interinstitucionales.",
    metaTitle: "Govtech · Inteligencia — Estado Agéntico e IA en el Sector Público",
    metaDescription:
      "Agentes de IA, flujos de trabajo automatizados, herramientas de madurez digital y programas de adopción de IA para gobiernos y organizaciones internacionales.",
    categories: {
      Consultancy: {
        tagline: "IA responsable para el sector público, de la estrategia a la gobernanza.",
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
          "digital-maturity": {
            title: "Evaluaciones de madurez digital",
            description:
              "Diagnósticos estructurados que jerarquizan la madurez digital de tu institución y producen un plan de inversión defendible, no solo un informe.",
          },
          "responsible-ai-policy": {
            title: "Política de IA responsable y asesoría en contratación",
            description:
              "Asesoría en políticas de contratación de IA, cláusulas contractuales tipo y requisitos de transparencia, para que tu próxima licitación de IA parta desde una mejor posición.",
          },
        },
      },
      Services: {
        tagline: "Construcción y despliegue de IA para el sector público.",
        items: {
          "ai-agents-public-services": {
            title: "Agentes de IA para servicios públicos",
            description:
              "Asistentes virtuales multicanal en web, móvil, USSD y voz, incluidos canales de baja alfabetización en idiomas locales, que manejan el volumen real de la ciudadanía, no solo demos.",
          },
          "inter-institutional-workflows": {
            title: "Flujos de trabajo interinstitucionales automatizados",
            description:
              "Flujos de trabajo asistidos por IA que enrutan solicitudes, documentos y decisiones entre múltiples organismos, comprimiendo semanas de coordinación en días.",
          },
          "document-processing": {
            title: "Procesamiento documental con IA",
            description:
              "Extracción, clasificación y resumen del backlog documental en el que la mayoría de las instituciones públicas se ahogan: desde permisos hasta solicitudes de subvención.",
          },
          "low-code-eservices": {
            title: "Plataformas low-code de servicios electrónicos",
            description:
              "Plataformas que permiten a tus propios equipos lanzar nuevos servicios públicos y agentes de IA en días, no en trimestres, con gobernanza y trazabilidad integradas.",
          },
          "ai-acceleration-gov": {
            title: "Programa de Aceleración de IA para el Gobierno",
            description:
              "Programa estructurado de adopción de 12 semanas para organizaciones del sector público. Lleva a tu equipo de la estrategia a casos de uso de IA en funcionamiento dentro de un solo trimestre.",
          },
          "ai-ignite-gov": {
            title: "Taller AI IGNITE para el sector público",
            description:
              "Taller de descubrimiento para identificar las primeras oportunidades de IA en tus operaciones, con una lista priorizada, estimaciones de esfuerzo y un plan a 90 días.",
          },
        },
      },
      Products: {
        tagline: "Plataformas que desarrollamos y hacemos evolucionar.",
        items: {
          "ai-governance-platform-gov": {
            title: "Plataforma de Gobernanza de IA para Gobiernos",
            description:
              "¿Tu organización avanza hacia implementaciones de IA y un Estado agéntico? Entonces necesitas una gobernanza sólida. Nuestra plataforma monitoriza cumplimiento, vulnerabilidades de seguridad y evaluación de riesgos de cada sistema de IA en uso dentro de tu organización.",
          },
          holonn: {
            title: "Holonn — Plataforma de matchmaking e IA para ecosistemas",
            description:
              "Holonn permite a organizaciones de apoyo empresarial y ecosistemas (clústeres, hubs, asociaciones y aceleradoras) agregar la oferta de sus miembros con IA, creando marketplaces interactivos que conectan empresas con inversionistas, clientes y socios.",
          },
        },
      },
    },
  },

  // ── INDUSTRIES · DATOS ────────────────────────────────────────────
  "industries-data": {
    title: "Datos",
    tagline: "Datos empresariales, gobernados e interoperables",
    description:
      "Marcos de gobernanza, calidad, cumplimiento e integración de datos que convierten datos empresariales fragmentados en un activo competitivo duradero.",
    metaTitle: "Industries · Datos — Gobernanza de Datos Empresariales",
    metaDescription:
      "Gobernanza de datos empresariales, gestión de datos maestros, cumplimiento del RGPD, calidad de datos y estándares de intercambio sectoriales para sectores regulados.",
    categories: {
      Consultancy: {
        tagline: "Estrategia, políticas y estándares para los datos empresariales.",
        items: {
          "data-governance-strategy": {
            title: "Estrategias de gobernanza de datos",
            description:
              "Marcos empresariales de gobernanza de datos (políticas, roles, responsabilidades de stewardship y derechos de decisión) adaptados a tu sector y entorno normativo.",
          },
          "interoperability-standardization-strategy": {
            title: "Estrategia de interoperabilidad y estandarización de datos",
            description:
              "Estrategia para el intercambio de datos entre sistemas: modelos canónicos, estándares semánticos, contratos de API y los órganos de gobernanza necesarios para mantenerlos coherentes a medida que evoluciona tu panorama.",
          },
          "industry-standards": {
            title: "Estándares sectoriales de intercambio de datos",
            description:
              "Marcos de intercambio de datos específicos del sector (trazabilidad minera, divulgaciones financieras, interoperabilidad logística) traducidos en estándares técnicos concretos.",
          },
        },
      },
      Services: {
        tagline: "Implementación e integración para los datos empresariales.",
        items: {
          "governance-platform": {
            title: "Implementación de plataformas de gobernanza de datos",
            description:
              "Despliegue de plataformas de gobernanza de datos: políticas codificadas, flujos de trabajo configurados, integraciones a los sistemas fuente entregadas.",
          },
          "interoperability-standardization-implementation": {
            title: "Implementación de interoperabilidad y estandarización de datos",
            description:
              "Llevamos los estándares a producción: esquemas canónicos, registros, pipelines de transformación, servicios de validación y los patrones de integración que vuelven rutinario el intercambio entre sistemas en vez de algo a medida.",
          },
          "catalog-lineage": {
            title: "Herramientas de catálogo de datos y linaje",
            description:
              "Catálogos empresariales de datos y herramientas de linaje que realmente se adoptan, porque los configuramos sobre tus datos, no sobre un dataset de demo.",
          },
          pipelines: {
            title: "Integración de datos y desarrollo de pipelines",
            description:
              "Pipelines de datos de nivel productivo (batch y streaming) diseñados para analítica, operaciones y preparación para IA.",
          },
        },
      },
    },
  },

  // ── INDUSTRIES · PROCESOS ─────────────────────────────────────────
  "industries-process": {
    title: "Procesos",
    tagline: "Operaciones empresariales, reinventadas",
    description:
      "Digitalización de procesos, automatización de flujos de trabajo y modernización de sistemas que generan mejoras medibles de eficiencia en panoramas empresariales complejos.",
    metaTitle: "Industries · Procesos — Transformación Empresarial",
    metaDescription:
      "Estrategia de transformación digital, reingeniería de procesos, modernización de sistemas, portales empresariales e internacionalización para la industria.",
    categories: {
      Consultancy: {
        tagline: "Estrategia, auditoría y gestión del cambio para las operaciones de la empresa.",
        items: {
          "transformation-roadmap": {
            title: "Estrategia y hoja de ruta de transformación digital",
            description:
              "Hojas de ruta a nivel directivo que cubren procesos, tecnología y gestión del cambio, escritas para tu directorio, no para una plantilla de consultora.",
          },
          "process-audit": {
            title: "Auditoría y optimización de procesos (BPMN)",
            description:
              "Auditorías de procesos de extremo a extremo con notación BPMN 2.0, recorridos con stakeholders y oportunidades de optimización priorizadas, ligadas a KPI medibles.",
          },
          "tech-assessment": {
            title: "Evaluación del stack tecnológico",
            description:
              "Evaluaciones independientes del stack (licenciamiento, ajuste, deuda técnica y opciones de migración) con una recomendación que tus líderes de ingeniería puedan defender.",
          },
          "change-management": {
            title: "Asesoría en gestión del cambio",
            description:
              "Playbooks de cambio para grandes despliegues de procesos (comunicación, formación, incentivos) para que la adopción no se desplome tres meses después del go-live.",
          },
          "export-strategy": {
            title: "Estrategia de exportación e internacionalización",
            description:
              "Trabajo de posicionamiento de mercado, propuesta de valor y preparación comercial para exportadores de TI y servicios, desde la propuesta de valor hasta la preparación para ferias internacionales.",
          },
          "portal-ia": {
            title: "Arquitectura de información de portales corporativos",
            description:
              "Arquitectura de información para portales empresariales (taxonomías, gobernanza, ciclos de vida de contenidos) para que tu intranet sirva realmente a las personas en lugar de esconderse de ellas.",
          },
        },
      },
      Services: {
        tagline: "Entrega en sistemas empresariales, portales y flujos de trabajo.",
        items: {
          "process-digitalization": {
            title: "Digitalización de procesos empresariales",
            description:
              "Digitalización integral de procesos empresariales clave, diseñada como productos y no como proyectos puntuales, con titularidad operativa clara.",
          },
          "system-modernization": {
            title: "Integración y modernización de sistemas",
            description:
              "Arquitectura de integración, migración de sistemas heredados y modernización progresiva, con patrones de cero downtime donde el negocio lo exige.",
          },
          "custom-platforms": {
            title: "Desarrollo de plataformas a medida",
            description:
              "Desarrollo de plataformas empresariales a medida para casos donde lo estándar no encaja, construido sobre stacks abiertos que puedes hacer tuyos a largo plazo.",
          },
          "workflow-automation": {
            title: "Automatización de flujos de trabajo (Camunda, Flowable)",
            description:
              "Automatización de flujos de trabajo basada en BPMN sobre Camunda y Flowable, diseñada para sobrevivir al cambio organizacional y no quedar cableada a los hábitos de un solo departamento.",
          },
          "corporate-portals": {
            title: "Portales corporativos e intranets (TYPO3, Drupal)",
            description:
              "Plataformas de contenido empresarial (multisitio, multimarca, accesibles) con gobernanza editorial y ciclo de vida que escala entre filiales.",
          },
          "value-proposition": {
            title: "Propuesta de valor industrial y habilitación para la exportación",
            description:
              "Diseño de propuesta de valor para exportadores de TI y servicios, más el apoyo en ferias y construcción de pipeline para convertirla en negocios reales.",
          },
        },
      },
      Products: {
        tagline: "Plataformas para las operaciones de la empresa.",
        items: {
          "processplayer-enterprise": {
            title: "ProcessPlayer",
            description:
              "Variante para el sector privado de nuestra plataforma de contratación, para gestión de licitaciones B2B, acuerdos marco y coordinación con proveedores. Mismo motor que la edición pública, configurada para flujos corporativos.",
          },
          efactura: {
            title: "eFactura",
            description:
              "Plataforma integral de facturación electrónica que valida e-facturas entrantes y salientes, las convierte entre los formatos que tus contrapartes necesitan y gestiona la transmisión de proveedor a comprador junto con las obligaciones de reporte ante las autoridades fiscales. Del lado del comprador, recibe y procesa facturas automáticamente y se integra con tus sistemas ERP y de contabilidad existentes en lugar de reemplazarlos.\n\nMás allá del cumplimiento, eFactura cierra el ciclo de la factura al cobro: una interfaz OpenBanking habilita el pago directo desde el mismo flujo, y una interfaz de servicios de factoring convierte las facturas aprobadas en capital de trabajo, todo desde una sola plataforma.",
          },
        },
      },
    },
  },

  // ── INDUSTRIES · INTELIGENCIA ─────────────────────────────────────
  "industries-intelligence": {
    title: "Inteligencia",
    tagline: "IA a escala empresarial",
    description:
      "Agentes de IA, programas de aceleración y marcos de gobernanza que ayudan a las empresas a adoptar la IA de forma responsable y a escala, con un ROI medible.",
    metaTitle: "Industries · Inteligencia — IA Empresarial",
    metaDescription:
      "Estrategia, gobernanza, agentes, automatización y programas de aceleración de IA empresarial para minería, finanzas, retail, universidades y más.",
    categories: {
      Consultancy: {
        tagline: "Estrategia, gobernanza y asesoría para la IA empresarial.",
        items: {
          "ai-strategy": {
            title: "Estrategia y hoja de ruta de IA",
            description:
              "Trabajo de estrategia de IA que parte de tu modelo operativo, no de una curva genérica de madurez. Produce un portafolio priorizado de casos de uso con responsables y fechas.",
          },
          "ai-governance": {
            title: "Gobernanza de IA (ISO, Ley de IA de la UE)",
            description:
              "Marcos de gobernanza de IA alineados con ISO, la Ley de IA de la UE y tus marcos internos de riesgo. Redactados para sobrevivir a tu primera auditoría regulatoria.",
          },
          "ai-readiness": {
            title: "Evaluación de preparación para la IA",
            description:
              "Diagnóstico honesto de dónde estás (datos, talento, infraestructura, gobernanza) y qué corregir primero para absorber IA a escala.",
          },
          "use-case-prioritization": {
            title: "Identificación y priorización de casos de uso",
            description:
              "Descubrimiento estructurado de oportunidades en tus unidades de negocio, puntuadas por impacto y viabilidad, para que tu presupuesto de IA no financie 20 pilotos que nunca llegan a producción.",
          },
          "board-advisory": {
            title: "Asesoría en IA a nivel directorio",
            description:
              "Briefings, sesiones de estrategia y asesoría continua para directorios y comités ejecutivos que navegan decisiones de gobernanza e inversión en IA.",
          },
        },
      },
      Services: {
        tagline: "Construcción, despliegue y formación en torno a la IA empresarial.",
        items: {
          "ai-agents-enterprise": {
            title: "Desarrollo y despliegue de agentes de IA",
            description:
              "Agentes de IA a medida para back-office, legal, retail y operaciones BPO, construidos para convivir con tus sistemas existentes, no para reemplazarlos de la noche a la mañana.",
          },
          "intelligent-automation": {
            title: "Automatización inteligente de procesos",
            description:
              "Automatización de procesos potenciada por IA que maneja el trabajo desordenado y no estructurado que la RPA clásica no puede: flujos documentales, manejo de excepciones, decisiones de criterio.",
          },
          "chatbots-crm": {
            title: "Chatbots y CRM potenciados por IA",
            description:
              "Asistentes de IA orientados al cliente integrados con tu CRM y base de conocimiento: no chatbots de demo, sino sistemas productivos que manejan volumen real de tickets.",
          },
          "ai-model-integration": {
            title: "Integración de modelos de IA a medida",
            description:
              "Integración de modelos de IA propios y de terceros en tu stack empresarial, con la observabilidad, los controles de costos y los fallbacks que exige la producción.",
          },
          "sovereign-ai-workflows": {
            title: "Sovereign AI Workflows",
            description:
              "Motor seguro y de código abierto de flujos de trabajo con IA para operaciones empresariales, desplegable dentro de tu perímetro de seguridad con plena residencia de los datos.",
          },
          "ai-ignite": {
            title: "Taller AI IGNITE",
            description:
              "Taller de descubrimiento para identificar las primeras oportunidades de aceleración con IA dentro de tu organización, entregado en días, no en meses. Produce un plan a 90 días.",
          },
          "ai-acceleration": {
            title: "Programa de Aceleración de IA",
            description:
              "Programa estructurado de 12 semanas para la adopción de IA en marketing, operaciones y administración, con resultados medibles y herramientas reales puestas en producción al final.",
          },
          "exec-ai-literacy": {
            title: "Programas de alfabetización en IA para ejecutivos y directorios",
            description:
              "Programas estructurados de alfabetización para la alta dirección y los directorios, para que quienes toman decisiones de inversión en IA realmente entiendan qué están aprobando.",
          },
        },
      },
      Products: {
        tagline: "Plataformas y agentes para la IA empresarial.",
        items: {
          "governance-ai-enterprise": {
            title: "GovernanceAI",
            description:
              "Plataforma de gobernanza de IA alineada con ISO, la Ley de IA de la UE y los marcos internos de riesgo: registro de modelos, evaluaciones de riesgo, trazas de auditoría y reporte al directorio.",
          },
          "ai-agents-vertical": {
            title: "Arxia AI Agents — Packs verticales",
            description:
              "Paquetes de agentes preconstruidos y afinados para flujos de retail, finanzas y legal. Desplegables en semanas y configurables a tus datos.",
          },
        },
      },
    },
  },
};
