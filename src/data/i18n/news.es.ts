// Spanish text overlay for src/data/news.ts. Keyed by article slug.
// Body blocks are positional (must match the English source's order).

export interface NewsArticleOverlay {
  title?: string;
  seoTitle?: string;
  excerpt?: string;
  metaDescription?: string;
  coverAlt?: string;
  coverCredit?: string;
  /** Positional: one entry per English body block (heading/paragraph/cta → text, image → alt/caption, list → items). */
  body?: Array<{
    text?: string;
    alt?: string;
    caption?: string;
    items?: Array<{ lead?: string; text?: string }>;
  }>;
}

export const newsEs: Record<string, NewsArticleOverlay> = {
  "arxia-uganda-digital-public-services-kampala": {
    title:
      "Registros, intercambio de datos y un portal de servicios: Arxia acompaña la siguiente fase de los servicios públicos digitales de Uganda",
    seoTitle: "Servicios públicos digitales en Uganda con Arxia",
    excerpt:
      "Arxia pasó una semana en Kampala planificando el futuro de tres componentes de los que dependen los servicios públicos: registros de datos de referencia, un hub de intercambio de datos y un portal único de servicios.",
    metaDescription:
      "Arxia pasó una semana en Kampala planificando tres componentes de los servicios públicos digitales de Uganda: registros, intercambio de datos y un portal.",
    coverAlt: "Daniel Homorodean, de Arxia, en Kampala, Uganda.",
    body: [
      {
        text: "Prestar servicios públicos de forma digital requiere tres elementos que funcionen en conjunto: datos en los que el Estado pueda confiar, una forma de que las instituciones los compartan y una puerta de entrada única para la ciudadanía.",
      },
      { text: "Una semana en Kampala" },
      {
        text: "Daniel Homorodean, CEO de Arxia, pasó una semana en Kampala apoyando el avance de los servicios digitales en Uganda. El trabajo se centró en planificar el futuro de tres bloques de construcción:",
      },
      {
        items: [
          {
            lead: "Registros de datos de referencia",
            text: "las fuentes únicas de verdad para la información de la que dependen los servicios públicos.",
          },
          {
            lead: "Un hub de intercambio de datos",
            text: "para que las instituciones compartan datos de forma segura en lugar de pedírselos a la ciudadanía una y otra vez.",
          },
          {
            lead: "Un portal de servicios",
            text: "un único lugar donde ciudadanos y empresas acceden a los servicios públicos.",
          },
        ],
      },
      { text: "Por qué importa el conjunto" },
      {
        text: "Cada componente es útil por sí solo. Juntos, son lo que hace posible la ejecución y la prestación digital de los servicios públicos. Este enfoque atraviesa el trabajo de Arxia en DPI, desde los estándares regionales de datos en la región de los Grandes Lagos hasta la interoperabilidad nacional en Camboya: si los datos y las conexiones están bien resueltos, los servicios pueden construirse encima con confianza.",
      },
      { text: "Conozca el trabajo de Arxia en interoperabilidad →" },
    ],
  },
  "arxia-ticon-africa-2026-data-interoperability-specialists": {
    title:
      "De los datos al impacto: Arxia en TICON Africa 2026 sobre la formación de especialistas africanos en datos e interoperabilidad",
    seoTitle: "TICON Africa 2026: datos e interoperabilidad",
    excerpt:
      "En la conferencia TICON Africa, en Livingstone, Daniel Homorodean y Grace Labong, de Arxia, analizaron cómo África puede formar a los especialistas que gobernarán sus datos y harán que sus sistemas funcionen en conjunto.",
    metaDescription:
      "En TICON Africa 2026, en Livingstone, Zambia, Arxia habló sobre cómo formar a los especialistas africanos en datos e interoperabilidad.",
    coverAlt:
      "Tarjeta de oradores de TICON Africa 2026 con Grace Labong, gerente para África, y Daniel Homorodean, CEO de Arxia.",
    body: [
      {
        text: "Acelerar la adopción de la IA es el tema del que todos hablan. Pero la IA no puede ponerse en operación sin datos, y África necesita con urgencia especialistas capaces de gobernar esos datos y de lograr que los sistemas funcionen en conjunto.",
      },
      { text: "Una sesión en TICON Africa" },
      {
        text: "El 24 de septiembre, en la conferencia TICON Africa en Livingstone, Zambia, Daniel Homorodean, CEO de Arxia, y Grace Labong, gerente de desarrollo de negocio de Arxia para África, condujeron la sesión \"From Data to Impact: Building Africa's Data and Interoperability Specialists\".",
      },
      {
        text: "TICON Africa reúne a líderes de las TIC, investigadores y profesionales que están dando forma al futuro digital del continente.",
      },
      { text: "La demanda supera a la capacidad" },
      {
        text: "En todo el continente, la demanda de perfiles en gobernanza de datos e interoperabilidad crece mucho más rápido que la capacidad disponible. La sesión abordó cómo África puede formar a estos especialistas: las personas que construirán las arquitecturas de datos e interoperabilidad y las llevarán hasta su adopción real por parte de instituciones y ciudadanos.",
      },
      { text: "Personas, no solo tecnología" },
      {
        text: "La conversación fue más allá de la adopción tecnológica para plantear una pregunta más difícil: ¿cuenta África con las personas, las competencias y las instituciones necesarias para convertir la innovación en un impacto duradero? Los jóvenes son uno de los mayores activos del continente, pero todavía existe una brecha significativa entre las oportunidades emergentes y las competencias disponibles.",
      },
      {
        text: "Cerrar esa brecha exige más que capacitación. Requiere desarrollo práctico de competencias, mentoría, ecosistemas de innovación, alianzas y desafíos reales en los que los jóvenes africanos puedan aplicar lo que aprenden, como creadores, solucionadores de problemas, emprendedores y líderes, y no solo como usuarios de tecnología. También requiere colaboración entre gobiernos, sector privado, sociedad civil, academia y los propios jóvenes.",
      },
      {
        text: "El futuro de África no se construirá solo con tecnología. Lo construirán personas con el conocimiento, las competencias, los valores y las oportunidades para usar esa tecnología con impacto.",
      },
      { text: "Conozca el trabajo de Arxia en interoperabilidad →" },
    ],
  },
  "arxia-gobierna-tus-datos-data-governance-partnership": {
    title:
      "Arxia se asocia con Gobierna Tus Datos para poner la gobernanza de datos en el centro de la adopción de IA",
    seoTitle: "Arxia y Gobierna Tus Datos: gobernanza de datos",
    excerpt:
      "Una nueva alianza incorpora las herramientas de protección de datos, la consultoría y la capacitación de Gobierna Tus Datos al AI Accelerator de Arxia, para que las organizaciones adopten IA con sus datos en orden desde el inicio.",
    metaDescription:
      "Arxia y Gobierna Tus Datos se asocian para sumar al AI Accelerator herramientas, consultoría y capacitación en protección de datos.",
    coverAlt:
      "Arxia × Gobierna Tus Datos: la gobernanza de datos en el centro de la adopción de IA.",
    body: [
      {
        text: "Adoptar IA va mucho más allá de las herramientas y de la moda del momento. Sin una gobernanza de datos sólida, no es efectiva ni sostenible. Esa convicción está detrás de la nueva alianza de Arxia con Gobierna Tus Datos.",
      },
      { text: "Los datos en el centro" },
      {
        text: "La alianza incorpora el conocimiento y las herramientas de Gobierna Tus Datos al AI Accelerator de Arxia, para ayudar a las organizaciones a adoptar IA en sus procesos de negocio con los datos en el centro del trabajo. Además, fortalece la oferta de gobernanza de datos de Arxia para los mercados internacionales.",
      },
      { text: "Qué aporta la alianza" },
      {
        text: "Arxia integrará las siguientes herramientas y servicios de Gobierna Tus Datos:",
      },
      {
        items: [
          {
            lead: "Pharus Privacy",
            text: "un SaaS para gestionar registros de actividades de tratamiento, consentimientos y brechas de datos.",
          },
          {
            lead: "Consultoría en protección y gobernanza de datos",
            text: "una evaluación de preparación de seis semanas ante la nueva legislación de protección de datos.",
          },
          {
            lead: "Capacitación certificada por SENCE",
            text: ", impartida a través de OTEC LATAM IT ACADEMY.",
          },
          {
            text: "Certificación ejecutiva Lead DPO.",
          },
        ],
      },
      { text: "Acompañamiento completo en todo el proceso de adopción" },
      {
        text: "La alianza se apoya en una colaboración previa, que incluye la serie \"Gobierna tu IA\" sobre Shadow AI. Con ella, los clientes de Arxia cuentan con acompañamiento completo en cada nivel de la adopción de IA, desde la gobernanza y el cumplimiento normativo hasta los flujos de trabajo que generan resultados.",
      },
      { text: "Conozca el trabajo de Arxia en gobernanza de datos →" },
    ],
  },
  "arxia-rwanda-national-dpi-guidelines-kigali": {
    title:
      "De vuelta en Kigali: Arxia apoya las Directrices Nacionales de Infraestructura Pública Digital de Ruanda",
    seoTitle: "Infraestructura pública digital: Arxia en Ruanda",
    excerpt:
      "Arxia forma parte del equipo que apoya las próximas Directrices Nacionales de DPI de Ruanda, que orientarán una transición de todo el gobierno hacia una sociedad digital más integrada, inclusiva y centrada en la ciudadanía.",
    metaDescription:
      "Arxia regresó a Kigali para apoyar las Directrices Nacionales de Infraestructura Pública Digital de Ruanda, un marco para todo el gobierno.",
    coverAlt:
      "Daniel Homorodean, de Arxia, en Kigali, con el Kigali Convention Centre iluminado de noche.",
    body: [
      {
        text: "Desde hace muchos años, Ruanda se ha posicionado como uno de los líderes de África en la transformación digital del gobierno. A mediados de este año, Arxia regresó a Kigali para iniciar un nuevo proyecto como parte de ese camino.",
      },
      { text: "Un marco para todo el gobierno" },
      {
        text: "Ruanda está preparando sus Directrices Nacionales de Infraestructura Pública Digital. Estas apoyarán una transición de todo el gobierno hacia una sociedad digital más integrada, inclusiva y centrada en la ciudadanía, y darán a las instituciones una base común sobre cómo se diseñan, conectan y prestan los servicios públicos digitales.",
      },
      { text: "El rol de Arxia" },
      {
        text: "Arxia forma parte del equipo que apoya este trabajo y aporta su experiencia en DPI, interoperabilidad y gobernanza de datos en proyectos en África, Asia y Europa, desde los estándares regionales de datos en la región de los Grandes Lagos hasta el trabajo de interoperabilidad nacional en Camboya.",
      },
      { text: "Conozca el trabajo de Arxia en interoperabilidad →" },
    ],
  },
  "arxia-caja-cusco-ai-ignite-workshop-peru": {
    title:
      "IA a 3400 metros: Arxia inicia el AI Acceleration Program con Caja Cusco en Perú",
    seoTitle: "Caja Cusco y Arxia: AI Ignite Workshop en Perú",
    excerpt:
      "En Cusco, Arxia realizó un AI Ignite Workshop de una jornada completa con la alta dirección de Caja Cusco, una de las principales instituciones de microfinanzas del Perú, sobre cómo construir sistemas operativos de IA que funcionen en entornos altamente regulados.",
    metaDescription:
      "En Cusco, Perú, Arxia impartió un AI Ignite Workshop de ocho horas a la dirección de Caja Cusco sobre IA agéntica en entidades financieras reguladas.",
    coverAlt:
      "Directivos de Caja Cusco junto a Carlos Parker, de Arxia, tras el AI Ignite Workshop en Cusco, Perú.",
    body: [
      {
        text: "Este julio, el trabajo de consultoría de Arxia llegó más alto que nunca, literalmente. A 3400 metros sobre el nivel del mar, en la antigua capital inca, Arxia impartió el taller de apertura de su AI Acceleration Program a un nuevo cliente: Caja Cusco.",
      },
      { text: "Un sector regulado, una pregunta práctica" },
      {
        text: "Caja Cusco es una de las principales instituciones financieras del Perú, especializada en microfinanzas y servicios bancarios. En un sector donde la regulación condiciona cada decisión, la pregunta no es si la IA tiene valor, sino cómo usarla de forma segura y sostenible en el tiempo.",
      },
      {
        text: "Durante ocho horas, Carlos Parker, de Arxia, y el equipo directivo de Caja Cusco trabajaron en cómo las organizaciones modernas construyen sistemas operativos de IA que funcionan en entornos altamente regulados.",
      },
      { alt: "Carlos Parker durante el AI Ignite Workshop en Cusco" },
      { text: "Una jornada completa de descubrimiento" },
      {
        text: "El AI Ignite Workshop es una conversación en dos direcciones, no una clase magistral. A lo largo del día, el equipo exploró dónde la IA agéntica puede ayudar a su negocio y qué capacidades necesita desarrollar para que la adopción genere resultados reales.",
      },
      { alt: "El AI Ignite Workshop con la alta dirección de Caja Cusco" },
      { text: "Semanas de trabajo en Perú" },
      {
        text: "El taller de Cusco cerró varias semanas de capacitaciones, talleres y reuniones en Perú, que fueron posibles gracias a los socios de Arxia IT Studio y Manuel Rubén Dueñas Saona. Arxia espera seguir desarrollando proyectos con Caja Cusco y con otras organizaciones financieras en Lima.",
      },
      {
        text: "El AI Acceleration Program sigue creciendo y pronto se anunciarán nuevos países. Arxia también está ampliando su red de socios de implementación y recibe con gusto el contacto de organizaciones que vean una oportunidad en su país, así como de consultores que quieran sumarse al equipo como especialistas en operacionalización de IA.",
      },
      { text: "Conozca más sobre el AI Acceleration Program →" },
    ],
  },
  "arxia-typo3-burundi-university-web-design-system": {
    title:
      "Un modelo común para cada sitio web universitario de Burundi, construido sobre código abierto",
    seoTitle: "Universidades de Burundi: sistema de diseño en TYPO3",
    excerpt:
      "Junto al Ministerio de Educación Nacional e Investigación Científica de Burundi y KIT Digital Innovation HUB, Arxia y la TYPO3 Association desarrollaron un sistema de diseño inspirado en GovStack que cualquier universidad puede usar para lanzar un sitio web profesional. La ENS es la primera en adoptarlo.",
    metaDescription:
      "Arxia y la TYPO3 Association crearon un sistema de diseño de código abierto para los sitios web universitarios de Burundi. La ENS fue la primera en usarlo.",
    coverAlt:
      "El nuevo sitio web de la École Normale Supérieure du Burundi, construido sobre el sistema de diseño universitario común.",
    body: [
      {
        text: "Toda universidad merece una presencia digital de primer nivel. En Burundi, donde la población crece rápidamente y la educación superior se expande a gran velocidad para responder a la demanda, se necesitan con urgencia buenas herramientas digitales.",
      },
      { text: "Un sistema de diseño para todo un sector" },
      {
        text: "En alianza con el Ministerio de Educación Nacional e Investigación Científica de Burundi (Ministère de l'Éducation Nationale et de la Recherche Scientifique) y KIT Digital Innovation HUB, Arxia y la TYPO3 Association desarrollaron un sistema de diseño inspirado en el trabajo de Arxia con GovStack.",
      },
      {
        text: "El sistema ofrece a cada universidad nacional el mismo modelo para su sitio web. Cada institución puede implementar y personalizar rápidamente un portal web profesional que refleje su propia identidad y sus ambiciones, sin partir de una página en blanco.",
      },
      { alt: "Páginas del sistema de diseño universitario común" },
      { text: "La ENS, primera en adoptarlo" },
      {
        text: "La primera universidad en adoptar el modelo de referencia es la École Normale Supérieure (ENS), que relanza su sitio web sobre esta base.",
      },
      { alt: "Página de inicio de una universidad construida sobre el modelo de referencia" },
      { text: "Abierto, reutilizable y pensado para escalar" },
      {
        text: "El modelo es gratuito, de código abierto y está construido sobre TYPO3 CMS. Cualquier universidad, en cualquier lugar, puede usarlo para establecer rápidamente una presencia en línea sólida y profesional.",
      },
      {
        text: "Así se ve la infraestructura pública digital en la práctica: compartida, reutilizable, abierta y pensada para escalar.",
      },
      { text: "Conozca el trabajo de Arxia en portales web de gobierno →" },
    ],
  },
  "arxia-bidpa-botswana-digital-transformation-strategy": {
    title:
      "No otra estrategia para el cajón: Arxia inicia la estrategia de transformación digital del BIDPA de Botsuana",
    seoTitle: "Estrategia de transformación digital del BIDPA",
    excerpt:
      "En la reunión de inicio con el Botswana Institute for Development Policy Analysis, Arxia se comprometió con una estrategia construida en torno a las personas, los procesos y la misión, y con medidas que comienzan desde el primer día, no después del informe final.",
    metaDescription:
      "Arxia inició la estrategia de transformación digital del BIDPA de Botsuana el 6 de julio de 2026, con medidas aplicadas desde el primer día.",
    coverAlt:
      "Daniel Homorodean, de Arxia, con representantes del BIDPA en el Botswana Institute for Development Policy Analysis.",
    body: [
      {
        text: "Alrededor del 85% de las estrategias terminan igual: como una declaración de buenas intenciones que acumula polvo una vez entregada. En la reunión de inicio del 6 de julio, Arxia hizo una promesa al equipo del Botswana Institute for Development Policy Analysis (BIDPA): esta sería diferente.",
      },
      { text: "Personas y procesos antes que herramientas" },
      {
        text: "Daniel Homorodean, CEO de Arxia, junto con Gaogaufi Steady Mako, especialista en gestión del cambio, planteó una postura clara. La estrategia de transformación digital de un instituto nacional de investigación debe centrarse en la evolución de la misión de la organización, en la adopción de las tendencias y prácticas más recientes y en ayudar a que esas prácticas se extiendan a las instituciones del gobierno.",
      },
      {
        text: "La transformación digital no se construye en torno a herramientas de software. Se construye sobre procesos eficientes y personas motivadas y empoderadas.",
      },
      { alt: "Daniel Homorodean en el BIDPA" },
      { text: "Medidas desde el primer día" },
      {
        text: "Arxia no espera a un informe final. Las medidas se están implementando desde el primer día del proyecto, para mantener el impulso que ya lleva al equipo del BIDPA a abrazar el cambio.",
      },
      { alt: "Publicaciones de investigación del BIDPA" },
      { text: "Un instituto creado para transformar un país" },
      {
        text: "La misión del BIDPA es apoyar la transformación de todo un país mediante la investigación y el análisis de políticas públicas. El rol de Arxia es ayudarlo a avanzar más rápido en ese camino.",
      },
      { text: "Conozca el trabajo de Arxia en e-Services →" },
    ],
  },
  "arxia-typo3-junetech-2026-burundi": {
    title:
      "Constancia, inversión y alianzas: Arxia y la TYPO3 Association en JUNETECH 2026 en Burundi",
    seoTitle: "JUNETECH 2026 en Burundi: Arxia y TYPO3 Association",
    excerpt:
      "Como socios internacionales de JUNETECH 2026, el festival de innovación y evolución digital de Burundi, Arxia y la TYPO3 Association presentaron los resultados de tres años de trabajo en código abierto y estandarización junto a KIT Digital Innovation HUB.",
    metaDescription:
      "En JUNETECH 2026, en Buyumbura, Arxia y la TYPO3 Association presentaron tres años de trabajo en código abierto y estandarización en Burundi.",
    coverAlt:
      "Anuncio de socios de JUNETECH 2026 que presenta a Arxia como socio internacional, Buyumbura, del 23 al 26 de junio de 2026.",
    body: [
      {
        text: "¿Cómo se genera impacto y se abren oportunidades de negocio en un país o un mercado nuevo? La receta es simple, aunque no fácil: constancia, inversión y alianzas.",
      },
      { text: "Un festival de innovación en Buyumbura" },
      {
        text: "Del 23 al 26 de junio, Arxia y la TYPO3 Association participaron como socios internacionales en JUNETECH 2026, un festival de innovación y transformación digital en Burundi. El evento está liderado por Chris Clement Igiraneza y KIT Digital Innovation HUB.",
      },
      { alt: "Anuncio de socios de JUNETECH 2026: TYPO3 Association" },
      { text: "Tres años con un mensaje constante" },
      {
        text: "Durante más de tres años, Arxia, la TYPO3 Association y KIT han promovido el mismo mensaje en Burundi: cuando se adoptan de manera estratégica, el código abierto y la estandarización crean oportunidades para la juventud local, las empresas innovadoras locales y el gobierno. Hoy ese mensaje se escucha y se traduce en acciones.",
      },
      {
        text: "En JUNETECH, Arxia y TYPO3 presentaron los resultados concretos de este trabajo, junto a KIT y a socios institucionales locales, así como el plan para lo que viene.",
      },
      { text: "Una apuesta a largo plazo" },
      {
        text: "Los proyectos y los negocios no aparecen de la noche a la mañana, ni gratis. Arxia y la TYPO3 Association están comprometidas a largo plazo y preparadas para acompañar a cada país en su proceso de transformación, con base en principios y con foco en generar valor duradero.",
      },
      { text: "Conozca el trabajo de Arxia en portales web de gobierno →" },
    ],
  },
  "arxia-keynote-icac-2026-silicon-valley-ai-operating-system": {
    title:
      "Conferencia magistral de Arxia en ICAC 2026 en Silicon Valley: cómo operacionalizar la IA agéntica de forma segura",
    seoTitle: "ICAC 2026: conferencia sobre el AI Operating System",
    excerpt:
      "Por invitación de Common Perú, Carlos Parker, de Arxia, dictó una conferencia magistral en el C-Level Americas Summit 2026 en Silicon Valley sobre el AI Operating System, y pasó tres días con líderes latinoamericanos conversando sobre el estado real de la adopción de IA.",
    metaDescription:
      "En ICAC 2026, en Silicon Valley, Carlos Parker, de Arxia, habló sobre el AI Operating System y cómo operacionalizar la IA agéntica con seguridad.",
    coverAlt:
      "Carlos Parker, de Arxia, durante su conferencia magistral en ICAC 2026 en Silicon Valley.",
    body: [
      {
        text: "Los altos ejecutivos no necesitan demostraciones teóricas. Necesitan arquitecturas sólidas, seguras y gobernables. Ese fue el mensaje que Arxia llevó a Silicon Valley.",
      },
      { text: "Una conferencia magistral para el liderazgo latinoamericano" },
      {
        text: "Del 8 al 12 de junio, Common Perú llevó a altos ejecutivos de América Latina a Silicon Valley para su International Conference & Annual Convention (ICAC 2026), parte del C-Level Americas Summit. Carlos Parker, de Arxia, fue invitado como orador principal con la sesión \"AI Operating System (AIOS): cómo operacionalizar la IA agéntica en los procesos de negocio de forma efectiva y segura\".",
      },
      { text: "La conferencia abordó tres ejes:" },
      {
        items: [
          {
            lead: "Gobernanza y control",
            text: "qué es un AIOS y cómo estructura la IA dentro de la estrategia de la empresa.",
          },
          {
            lead: "Eficiencia operativa",
            text: "estrategias concretas para optimizar procesos y operaciones complejas con agentes autónomos.",
          },
          {
            lead: "Seguridad y mitigación de riesgos",
            text: "cómo desplegar IA agéntica manteniendo una infraestructura ágil y entornos protegidos.",
          },
        ],
      },
      {
        text: "La exposición se basó en los años de Arxia liderando proyectos de transformación digital, desarrollo de ecosistemas e Infraestructura Pública Digital en más de 20 países de Europa, Asia, África y América Latina, traducidos al lenguaje que hoy necesita la alta dirección: gobierno corporativo, gestión de riesgos y arquitectura tecnológica.",
      },
      { alt: "Arxia con participantes de ICAC 2026" },
      { text: "Tres días de conversaciones directas" },
      {
        text: "Más allá del escenario, la convención le dio a Arxia tres días de conversaciones uno a uno con líderes innovadores de Perú, Colombia y Ecuador: intercambios informales, entre golf, comida y algunas cervezas, que muchas veces valen más que las reuniones en oficinas corporativas.",
      },
      {
        text: "Surgió un patrón. La mayoría de las empresas está en un punto similar: sabe que la IA tiene valor, pero le falta una estructura clara para impulsar la adopción y sostener el uso en el tiempo. Y todas se hacen la misma pregunta: ¿dónde está, concretamente, el retorno?",
      },
      { alt: "El público de ICAC 2026" },
      { text: "Dónde encaja el AI Accelerator" },
      {
        text: "Esa es la brecha que aborda el AI Accelerator de Arxia: un recorrido de 12 semanas con resultados concretos, en el que la adopción, la estrategia y las políticas trabajan juntas hacia un solo objetivo: el retorno de la inversión.",
      },
      {
        text: "Arxia agradece a Common Perú y a Manuel Rubén Dueñas Saona por la invitación y la confianza.",
      },
      { text: "Conozca más sobre el AI Acceleration Program →" },
    ],
  },
  "arxia-govtech-internationalization-ukraine-kyiv": {
    title:
      "Construir puentes en Kiev: Arxia y la comunidad Govtech de Ucrania ante la internacionalización de la tecnología pública",
    seoTitle: "Internacionalización Govtech: Arxia en Kiev",
    excerpt:
      "Internacionalizar el Govtech no consiste en exportar productos, sino en construir cooperación entre países. Arxia se reunió con la comunidad Govtech de Ucrania en Kiev para compartir su trayectoria de expansión global y una convicción: la mejor tecnología pública viaja a través de alianzas, no de transacciones.",
    metaDescription:
      "En el Govtech Meet-up de Kiev, Arxia habló sobre la internacionalización de la Govtech y cómo ayudar a los innovadores ucranianos a salir al mundo.",
    coverAlt:
      "Daniel Homorodean y Carlos Parker, de Arxia, en el Global Government Technology Centre del Foro Económico Mundial en Kiev.",
    body: [
      {
        text: "Cuando se habla de llevar el Govtech más allá de las fronteras, la conversación suele empezar y terminar en los productos. Arxia llevó un mensaje distinto a la comunidad Govtech de Ucrania.",
      },
      { text: "Un Govtech Meet-up en Kiev" },
      {
        text: "Daniel Homorodean y Carlos Parker, de Arxia, se reunieron con la comunidad Govtech de Ucrania en el Govtech Meet-up, convocado junto con el Global Government Technology Centre Kyiv y la GovTech Alliance of Ukraine. El encuentro reunió a expertos, representantes de gobierno, innovadores y empresas para impulsar la tecnología del sector público.",
      },
      { text: "Compartir la trayectoria y las lecciones aprendidas" },
      {
        text: "Arxia aprovechó la sesión para compartir su propia historia de expansión global: la experiencia de internacionalizar servicios Govtech en países y contextos muy distintos, y las lecciones que la acompañaron. Tras más de dos décadas en los mercados internacionales, esas lecciones tienen menos que ver con la tecnología que con la forma en que se construye y se sostiene la cooperación.",
      },
      { text: "La internacionalización es más que exportar productos" },
      {
        text: "El mensaje central fue sencillo. Cuando hablamos de la internacionalización del Govtech, no hablamos solo de exportar productos. Hablamos de construir estructuras de cooperación entre países, conectando a expertos, gobiernos, innovadores y empresas para que las soluciones echen raíces en lugar de simplemente aterrizar.",
      },
      { text: "Por qué importa la gobernanza multiactor" },
      {
        text: "Por eso el impacto duradero depende de una gobernanza multiactor. Las relaciones sostenibles entre países no las construye un solo actor. Requieren que gobiernos, innovadores, expertos y empresas compartan la responsabilidad del resultado. Es más lento y más exigente que una venta, y es el único enfoque que perdura.",
      },
      { text: "Ucrania tiene una historia para contar" },
      {
        text: "Ucrania tiene una historia extraordinaria para contar, con empresas increíbles y líderes valientes. El objetivo de Arxia es ayudar a llevar esa historia al mundo, apoyando a los innovadores ucranianos para que lleven su conocimiento experto y sus soluciones a nuevos mercados, junto a los socios que ya realizan este trabajo en terreno.",
      },
      {
        text: "Para Carlos Parker, esto se ha convertido en una misión personal en Ucrania. El objetivo es fácil de enunciar y más difícil de lograr: construir los puentes que permiten que la tecnología pública —y las personas que están detrás— circulen entre países. Construyamos esos puentes.",
      },
      { text: "Conozca el trabajo de Arxia en Gobierno Digital →" },
    ],
  },
  "arxia-rcg-consulting-ai-accelerator-cluj-napoca": {
    title:
      "Del piloto a la práctica: Arxia lanza el AI Accelerator Program con RCG Consulting en Cluj-Napoca",
    seoTitle: "RCG Consulting y el AI Accelerator Program de Arxia",
    excerpt:
      "Durante dos días en Cluj-Napoca, seis líderes de RCG Consulting se convirtieron en los primeros AI Operators de la firma y construyeron flujos de trabajo funcionales para propuestas a fondos de la UE, auditoría de documentos, redacción de contratos y gestión de facturas.",
    metaDescription:
      "En Cluj-Napoca, Rumania, seis líderes de RCG Consulting crearon flujos de trabajo reales con IA en dos días, al inicio del AI Accelerator Program.",
    coverAlt:
      "El equipo directivo de RCG Consulting con Arxia durante el taller del AI Accelerator Program en Cluj-Napoca.",
    body: [
      {
        text: "RCG Consulting ayuda a organizaciones de Rumania y de toda la región a moverse entre los fondos europeos, los contratos, las auditorías y la complejidad operativa que trae el crecimiento. Es un trabajo que no admite atajos: cada documento, cada cláusula y cada plazo importan. Llevar la IA a ese entorno no podía ser un truco. Tenía que funcionar.",
      },
      { text: "Dos días, seis AI Operators" },
      {
        text: "Arxia dio inicio al AI Accelerator Program con un taller de dos días en Cluj-Napoca. Seis líderes de RCG, las personas que se convertirán en los primeros AI Operators de la empresa, construyeron flujos de trabajo reales en Claude Cowork. No demostraciones, sino procesos que ejecutan cada semana.",
      },
      {
        text: "El equipo aprendió a conectar Claude con sus sistemas internos, a convertir sus propias metodologías en skills que el modelo aplica de forma consistente y a diseñar flujos de trabajo que una persona construye y que toda la organización puede replicar.",
      },
      { text: "Lo que se construyó" },
      { text: "Al final del taller, el equipo tenía piezas funcionando para:" },
      {
        items: [
          { text: "Preparación de propuestas para fondos europeos" },
          { text: "Auditoría de documentos" },
          { text: "Redacción de contratos" },
          { text: "Gestión de facturas" },
        ],
      },
      {
        text: "El equipo también identificó muchos otros casos de uso para abordar después. Ese es el momento al que apunta este tipo de trabajo: cuando la pregunta deja de ser \"¿esto puede ayudarnos?\" y pasa a ser \"¿qué deberíamos automatizar ahora?\"",
      },
      { text: "Ahora empieza la parte más difícil" },
      {
        text: "El taller fue el primer paso. Los próximos tres meses abordan las preguntas más difíciles: cómo operacionalizar la IA en una firma donde cada persona trabaja de manera distinta, cómo establecer una gobernanza que haga que el uso de la IA sea consistente, trazable y respetuoso de la confidencialidad de los clientes, cómo gestionar las dudas, los hábitos y los temores que trae el cambio y cómo capacitar al resto de la organización para que el conocimiento no se quede en seis personas.",
      },
      {
        text: "Arxia trabajará codo a codo con RCG en gobernanza, gestión del cambio, capacitación interna y en escalar los flujos de trabajo desde un grupo piloto a toda la empresa.",
      },
      { text: "Un enfoque probado" },
      {
        text: "Arxia lleva más de diez años trabajando en optimización de procesos y gestión del cambio a través de la transformación digital. Su metodología de operacionalización de IA ya se ha aplicado en tres continentes, con clientes de banca, academia, retail, ONG y consultoría. La tecnología no es el objetivo. El proceso sí lo es. Los clientes internalizan el conocimiento, ganan confianza, incorporan a sus equipos, lideran el cambio y siguen mejorando por su cuenta.",
      },
      { text: "Conozca más sobre el AI Acceleration Program →" },
    ],
  },
  "arxia-govtech-4-impact-world-congress-madrid-2026": {
    title:
      "Arxia en el Govtech 4 Impact World Congress de Madrid: DPI, IA en el gobierno e interoperabilidad",
    seoTitle: "Govtech 4 Impact World Congress 2026 en Madrid",
    excerpt:
      "Arxia se sumó a líderes del sector público de cuatro continentes en G4I 2026, en Madrid, para conversar sobre Infraestructura Pública Digital, IA en el gobierno e interoperabilidad, y ayudó a atender el stand de TYPO3 Community Expansion.",
    metaDescription:
      "Arxia participó en el Govtech 4 Impact World Congress de Madrid, del 5 al 7 de mayo de 2026, sobre DPI, IA en el gobierno e interoperabilidad.",
    coverAlt:
      "Miembros del Community Expansion Committee de TYPO3, entre ellos Arxia, en su stand del Govtech 4 Impact World Congress en Madrid.",
    coverCredit: "Foto: TYPO3 Association",
    body: [
      {
        text: "Del 5 al 7 de mayo, Madrid fue sede del Govtech 4 Impact World Congress (G4I 2026), uno de los principales puntos de encuentro del año para quienes construyen tecnología para el sector público. Arxia asistió con tres conversaciones en mente.",
      },
      { text: "Tres conversaciones" },
      {
        text: "Carlos Parker, de Arxia, viajó a Madrid para reunirse con todos los que trabajan en:",
      },
      {
        items: [
          { text: "Infraestructura Pública Digital" },
          { text: "IA en el gobierno" },
          { text: "Interoperabilidad" },
        ],
      },
      {
        text: "Estos tres temas definen el trabajo de Arxia con los gobiernos, y G4I reunió a quienes los abordan tanto desde el sector público como desde el privado.",
      },
      { alt: "Carlos Parker, tarjeta de orador de G4I 2026 Madrid" },
      { text: "Gobernanza y soberanía digital en el stand de TYPO3" },
      {
        text: "Arxia también participó a través del Community Expansion Committee de la TYPO3 Association, que lidera Daniel Homorodean, CEO de Arxia. Miembros del comité de Canadá, Francia, Alemania, Noruega, Rumania y España atendieron el stand. Al tratarse de una asociación sin fines de lucro, el objetivo no eran las ventas, sino construir una comprensión compartida de los desafíos y las soluciones: la base para una adopción sostenible del código abierto comunitario.",
      },
      {
        text: "La gobernanza y la soberanía digital estaban en la agenda de todos. Representantes de los sectores público y privado de 20 países de cuatro continentes pasaron por el stand, desde Argentina, Camboya y Papúa Nueva Guinea hasta Islandia, Uruguay y Estados Unidos. Tras tres días, el comité se llevó un número récord de conversaciones a las que dar seguimiento.",
      },
      {
        alt: "En el stand de TYPO3 Community Expansion",
        caption:
          "Conversaciones en el stand de TYPO3 Community Expansion. Foto: TYPO3 Association.",
      },
      { text: "Conozca el trabajo de Arxia en interoperabilidad →" },
    ],
  },
  "arxia-supports-fawe-uganda-ai-acceleration": {
    title:
      "Arxia apoya a FAWE Uganda en la adopción de IA agéntica mediante el Programa de Aceleración de IA",
    seoTitle: "FAWE Uganda: adopción de IA agéntica con Arxia",
    excerpt:
      "La mayor parte de las conversaciones sobre IA agéntica ocurren en directorios, pero las ONG son las que más pueden ganar. Arxia condujo su Taller AI Ignite con FAWE Uganda para poner una IA real y responsable en manos de un equipo que impulsa la educación de las niñas en África.",
    metaDescription:
      "Arxia impartió el Taller AI Ignite a FAWE Uganda para llevar IA agéntica práctica y responsable a un equipo que impulsa la educación de las niñas.",
    coverAlt:
      "Equipo de Arxia y FAWE Uganda durante el Taller AI Ignite en Kampala",
    body: [
      {
        text: "La mayor parte de la conversación sobre IA agéntica ocurre en directorios. Empresas optimizando operaciones, pymes automatizando ventas, consultoras vendiendo hojas de ruta de transformación. Mientras tanto, las organizaciones que probablemente más necesitan esta tecnología apenas forman parte del debate: las ONG.",
      },
      { text: "Por qué las ONG están ausentes del debate sobre IA agéntica" },
      {
        text: "Las ONG operan bajo restricciones permanentes: presupuestos limitados, equipos pequeños y misiones que exigen un impacto muy superior al que sus recursos deberían razonablemente permitir. Se espera que hagan mucho con muy poco, todos los días. Si hay un sector en el que la IA agéntica puede cambiar genuinamente lo posible, es este. No como una moda de productividad, sino como una forma de dar a equipos pequeños una capacidad operativa a la que nunca antes han tenido acceso.",
      },
      { text: "Seis horas con FAWE Uganda" },
      {
        text: "Esa es exactamente la conversación que tuvimos el 30 de abril con FAWE Uganda. FAWE es una organización panafricana que lleva décadas impulsando la educación de niñas y mujeres en todo el continente. Su capítulo en Uganda trabaja en terreno con escuelas, comunidades y responsables de políticas públicas para eliminar las barreras que mantienen a las niñas fuera de las aulas. El trabajo es serio y el equipo detrás de él carga con una enorme responsabilidad.",
      },
      {
        alt: "Equipo de FAWE Uganda participando en el Taller AI Ignite de Arxia",
        caption: "Equipo de FAWE Uganda durante la sesión del Taller AI Ignite.",
      },
      {
        text: "Pasamos seis horas juntos en el Taller AI Ignite de Arxia, una sesión práctica diseñada no para hablar de IA en abstracto, sino para mostrar al equipo de FAWE Uganda cómo se puede aplicar la IA agéntica directamente a su trabajo del día a día. Casos de uso reales, probados en vivo y adaptados a cómo realmente operan.",
      },
      {
        text: "También dedicamos tiempo significativo a cómo usar estas herramientas de forma segura y responsable, algo que importa aún más en el contexto del sector sin fines de lucro, donde la confianza, la sensibilidad de los datos y la rendición de cuentas están en el centro de cada interacción.",
      },
      { text: "Qué viene a continuación" },
      {
        text: "Ahora avanzamos a la siguiente fase: ayudar a FAWE Uganda a implementar IA agéntica en sus procesos clave a través del Programa de Aceleración de IA, para que el impacto perdure mucho más allá del taller y se traduzca en mejoras medibles para el equipo y las comunidades a las que sirven.",
      },
      {
        text: "Si trabaja en el sector sin fines de lucro o con él, y le han dicho que esta tecnología no es para usted, o que todavía no es para usted, vale la pena una segunda mirada. Los equipos que realizan el trabajo más importante merecen las mejores herramientas disponibles.",
      },
      { text: "Conozca más sobre el Programa de Aceleración de IA →" },
    ],
  },
  "arxia-vision-africa-ai-ignite-workshop-kampala": {
    title:
      "Arxia y Vision Africa AI llevan el AI Ignite Workshop a organizaciones de Uganda",
    seoTitle: "AI Ignite Workshop en Kampala con Vision Africa AI",
    excerpt:
      "En el Protea Hotel Kololo de Kampala, Arxia y Vision Africa AI realizaron una mañana práctica sobre operacionalización de IA para líderes ugandeses, facilitada por Carlos Parker y CPA Dr. James Okello Onyoin.",
    metaDescription:
      "El 29 de abril de 2026, en Kampala, Arxia y Vision Africa AI realizaron el AI Ignite Workshop, una sesión práctica sobre IA para organizaciones de Uganda.",
    coverAlt:
      "Tarjeta de orador del AI Ignite Workshop con Carlos Parker, director de Negocios Internacionales de Arxia, Protea Hotel Kololo, 29 de abril de 2026.",
    body: [
      {
        text: "El 29 de abril, Arxia y Vision Africa AI unieron fuerzas en un taller práctico sobre operacionalización de IA para organizaciones de Uganda, en el Protea Hotel Kololo de Kampala.",
      },
      { text: "Dos perspectivas en una misma sala" },
      {
        text: "La sesión fue facilitada por Carlos Parker, director de Negocios Internacionales de Arxia, y CPA Dr. James Okello Onyoin, socio director de HLB y presidente del directorio de Vision Africa AI. Combinó una mirada global sobre cómo las organizaciones están adoptando la IA con aplicaciones prácticas en finanzas y negocios.",
      },
      { alt: "Tarjeta de orador de CPA Dr. James Okello Onyoin" },
      { text: "Del interés a la operación" },
      {
        text: "El AI Ignite Workshop gira en torno a una pregunta: ¿qué sistemas y marcos necesita una organización para adoptar la IA con éxito? Los participantes exploraron cómo integrar la IA en la forma en que ya trabajan (agilizando operaciones, mejorando la eficiencia e impulsando el crecimiento a escala) en lugar de tratarla como un experimento aparte.",
      },
      {
        text: "El taller tuvo cupo completo. Para quienes no pudieron asistir, es la primera de muchas acciones en Uganda para presentar el AI Accelerator Program de Arxia.",
      },
      {
        text: "Arxia agradece a Grace Labong, Clarissa Ociti y Patricia Atim por su apoyo en la organización del taller.",
      },
      { text: "Conozca más sobre el AI Acceleration Program →" },
    ],
  },
  "arxia-uganda-vice-chancellors-forum-ai-universities": {
    title:
      "IA en las universidades de Uganda: Arxia y Vision Africa AI se reúnen con el Uganda Vice-Chancellors Forum",
    seoTitle: "IA en las universidades de Uganda, con Arxia",
    excerpt:
      "Durante más de tres horas en Kampala, Arxia y Vision Africa AI trabajaron con los líderes universitarios de Uganda en lo que implica llevar la IA a la educación superior y construir sistemas operativos de IA que den resultados.",
    metaDescription:
      "Arxia y Vision Africa AI se reunieron en Kampala con el Uganda Vice-Chancellors Forum sobre la IA en las universidades y los sistemas operativos de IA.",
    coverAlt:
      "Miembros del Uganda Vice-Chancellors Forum con el equipo de Arxia y Vision Africa AI en Kampala.",
    body: [
      {
        text: "A las universidades se les pide preparar a sus estudiantes para un mundo que la IA está transformando, mientras sus propias instituciones funcionan con procesos pensados para otra época. En Kampala, Arxia se sentó con quienes las lideran.",
      },
      { text: "Una sesión de trabajo con líderes universitarios" },
      {
        text: "Junto a sus socios de Vision Africa AI, el equipo de Arxia se reunió con el Uganda Vice-Chancellors Forum en una sesión de trabajo de más de tres horas. El enfoque fue práctico: ¿qué se necesita para implementar IA en una universidad y cómo se construyen sistemas operativos de IA que produzcan resultados, en lugar de pilotos que se desvanecen?",
      },
      {
        alt: "Carlos Parker, de Arxia, con un miembro del Uganda Vice-Chancellors Forum",
      },
      { text: "Hacia dónde va la educación superior" },
      {
        text: "La conversación también miró hacia adelante: hacia dónde va el sector y qué desafíos enfrentan ya las universidades, como repensar la propiedad intelectual cuando la IA forma parte de la manera en que se produce el conocimiento y adaptarse a las nuevas realidades de la enseñanza y el aprendizaje.",
      },
      { alt: "Cobertura de prensa durante el foro" },
      { text: "Próximos pasos" },
      {
        text: "De la sesión surgieron varias iniciativas. Arxia y Vision Africa AI ya trabajan en formas de acelerar la adopción de IA en las universidades de Uganda, a partir del AI Acceleration Program que ya está en marcha con organizaciones ugandesas.",
      },
      { text: "Conozca más sobre el AI Acceleration Program →" },
    ],
  },
  "arxia-cambodia-social-protection-interoperability-govstack": {
    title:
      "10% tecnología, 90% mentalidad: Arxia apoya la interoperabilidad de la Plataforma Digital de Protección Social de Camboya",
    seoTitle: "Plataforma Digital de Protección Social de Camboya",
    excerpt:
      "Arxia pasó una semana con el Consejo Nacional de Protección Social de Camboya trabajando en armonización de datos, reingeniería de procesos e integración con el X-Road nacional, y cerró con un taller práctico sobre GovStack.",
    metaDescription:
      "Arxia trabajó con el Consejo Nacional de Protección Social de Camboya en armonización de datos e integración con X-Road, y cerró con un taller de GovStack.",
    coverAlt:
      "Daniel Homorodean, de Arxia, con el equipo del Consejo Nacional de Protección Social de Camboya tras el taller de GovStack.",
    body: [
      {
        text: "La interoperabilidad en el gobierno digital depende en un 10% de la tecnología adecuada y en un 90% de la mentalidad y la gobernanza. Arxia llevó esa visión a Camboya.",
      },
      { text: "La misión" },
      {
        text: "Arxia fue convocada para apoyar la evolución de la Plataforma Digital de Protección Social de Camboya hacia un ecosistema integrado e inclusivo que conecte a todos los operadores de servicios de cada ámbito, proteja la integridad y la seguridad de los datos y mantenga la eficacia de los flujos de procesos.",
      },
      {
        text: "Durante una semana, Daniel Homorodean, CEO de Arxia, trabajó con el Consejo Nacional de Protección Social (NSPC, por su sigla en inglés) en un enfoque integral de interoperabilidad: armonizar los modelos de los registros de datos, analizar y optimizar los procesos y realizar el análisis técnico para acelerar la integración con la implementación nacional de X-Road en Camboya. El trabajo avanzó en paralelo con el proceso regulatorio que está fortaleciendo la alineación institucional.",
      },
      { alt: "Sesión de trabajo con el Consejo Nacional de Protección Social" },
      { text: "Un taller práctico sobre GovStack" },
      {
        text: "La semana cerró con un taller práctico y en profundidad sobre los conceptos, las metodologías y las especificaciones de GovStack, adaptado a la misión y los planes del NSPC.",
      },
      {
        alt: "Taller de GovStack: el bloque de construcción de Pagos",
        caption:
          "Recorriendo los bloques de construcción de GovStack con el equipo del NSPC.",
      },
      { text: "Cuatro aprendizajes" },
      {
        items: [
          {
            lead: "Primero, los datos.",
            text: "Recopile, corrija, procese, almacene, proteja y armonice sus datos. Establezca una fuente única de verdad, y la interoperabilidad desde el diseño vendrá por añadidura.",
          },
          {
            lead: "Rediseñe, no replique.",
            text: "Digitalizar la burocracia actual no es transformación. La reingeniería de procesos y la estrategia de cambio deben estar en la caja de herramientas de cada gestor de servicios públicos, no solo en la del área de TI.",
          },
          {
            lead: "No espere a la regulación.",
            text: "Los buenos procesos y la tecnología para la protección de datos personales y la gestión del consentimiento son funciones básicas de un ecosistema digital al servicio de la ciudadanía, no solo obligaciones legales.",
          },
          {
            lead: "La tecnología sigue al concepto.",
            text: "Debe empoderar, no atrapar. Las estructuras de datos estandarizadas, los modelos de procesos ejecutables, las arquitecturas modulares e independientes de la tecnología, el código abierto y los Bienes Públicos Digitales lo hacen más fácil que antes.",
          },
        ],
      },
      { text: "Arxia espera seguir recorriendo este camino junto a Camboya." },
      { text: "Conozca el trabajo de Arxia en interoperabilidad →" },
    ],
  },
  "icglr-adopts-mining-minerals-data-sharing-standard-brazzaville": {
    title:
      "Doce países, un mismo lenguaje de datos: la ICGLR adopta el Estándar de Intercambio de Datos de Minería y Minerales desarrollado con Arxia",
    seoTitle: "La ICGLR adopta un estándar de datos mineros",
    excerpt:
      "En Brazzaville, los 12 Estados miembros de la Conferencia Internacional sobre la Región de los Grandes Lagos adoptaron un estándar común para los datos de minería y minerales, resultado de casi dos años de trabajo con Arxia en la trazabilidad desde el sitio minero hasta la exportación.",
    metaDescription:
      "En Brazzaville, los 12 países de la ICGLR adoptaron un estándar de datos mineros desarrollado con Arxia, para la trazabilidad de la mina a la exportación.",
    coverAlt:
      "Daniel Homorodean, de Arxia, presenta el Estándar de Intercambio de Datos de Minería y Minerales a representantes de los Estados miembros de la ICGLR en Brazzaville.",
    body: [
      {
        text: "En la región de los Grandes Lagos, doce países registraban lo mismo de doce maneras distintas. Una mina, una licencia, un envío: cada Estado tenía su propia definición. Los registros no sobrevivían al cruce de una frontera, y los informes regionales obligaban a conciliar hojas de cálculo que nunca se diseñaron para encajar entre sí.",
      },
      { text: "Del 8 al 10 de abril, en Brazzaville, eso cambió." },
      { text: "Un estándar adoptado por doce Estados miembros" },
      {
        text: "Representantes de los 12 Estados miembros de la Conferencia Internacional sobre la Región de los Grandes Lagos (ICGLR) debatieron y adoptaron el Estándar de Intercambio de Datos de Minería y Minerales (Mining & Minerals Data Sharing Standard). A partir de ahora, apoyará la trazabilidad y la auditoría de los datos mineros en una región que se extiende desde África Central hasta África Oriental.",
      },
      {
        alt: "Delegados de los Estados miembros de la ICGLR durante la sesión de Brazzaville",
        caption: "Delegados de los Estados miembros revisan el estándar en Brazzaville.",
      },
      { text: "Casi dos años de trabajo" },
      {
        text: "La adopción cierra casi dos años de trabajo de Arxia con la ICGLR en la Política Regional de Intercambio de Datos y el Estándar de Intercambio de Datos. En conjunto, abarcan la recopilación, validación, reporte y actualización de los datos de minería y minerales a nivel nacional y regional: sitios mineros, licencias, la cadena de custodia completa, las operaciones relacionadas y el rastreo de las exportaciones. Todo se expresa en modelos semánticos con especificaciones técnicas completas para su implementación.",
      },
      {
        text: "Arxia partió del estándar de datos, no del software. El modelo común está publicado en JSON Schema, OpenAPI y JSON-LD, y sobre él se apoyan la captura de datos móvil sin conexión en cada país, una capa de interoperabilidad basada en API, una plataforma regional de reportes y registros inmutables del ciclo de vida. Cuando el estándar evoluciona, la plataforma lo acompaña sin necesidad de reprogramarla.",
      },
      { alt: "Presentación del modelo de datos ante la audiencia regional" },
      { text: "Qué significa en la práctica" },
      {
        text: "Un comprador, un auditor o un regulador ahora puede rastrear un envío desde la mina hasta el certificado y verificarlo de forma independiente. Para la región, es un paso real para poner fin a la minería ilegal y abusiva, y un ejemplo claro de cómo la infraestructura pública digital mejora la vida de las personas.",
      },
      { text: "Más allá de la minería" },
      {
        text: "El mismo problema existe en clima, agricultura, aduanas y salud pública, y tiene la misma respuesta: una capa de datos neutral y compartida. Arxia ve el estándar de la ICGLR como una señal para que países de todo el mundo establezcan la trazabilidad completa de los datos de minería y minerales, a partir de lo que la región de los Grandes Lagos acaba de lograr, y está preparada para apoyar ese trabajo.",
      },
      { text: "Conozca el trabajo de Arxia en interoperabilidad →" },
    ],
  },
  "arxia-gobierna-tu-ia-shadow-ai-webinar": {
    title:
      "Gobernar la IA, no prohibirla: Arxia participa en el panel \"Gobierna tu IA\" sobre Shadow AI",
    seoTitle: "Shadow AI: Arxia en el panel Gobierna tu IA",
    excerpt:
      "Mientras la dirección debate si adoptar IA, los equipos ya la están usando, muchas veces sin que nadie lo sepa. Carlos Parker, de Arxia, participó en el primer episodio de la serie \"Gobierna tu IA\" para analizar cómo las organizaciones pueden sacar el Shadow AI a la luz.",
    metaDescription:
      "Carlos Parker, de Arxia, participó en el Episodio I de \"Gobierna tu IA\" sobre los riesgos del Shadow AI y cómo poner controles sin frenar la innovación.",
    coverAlt:
      "Afiche del webinar \"Gobierna tu IA\", Episodio I: ¿Qué es el Shadow AI?, con Carlos Parker, de Arxia, entre los panelistas.",
    body: [
      {
        text: "Mientras las organizaciones debaten si implementar IA, sus equipos ya la están usando, y a menudo la dirección no lo sabe. Eso es Shadow AI, y el 2 de abril fue el tema del primer episodio de \"Gobierna tu IA\", una serie abierta de webinars sobre gobernanza de IA.",
      },
      { text: "El problema de prohibir" },
      {
        text: "La adopción de IA avanza más rápido de lo que las políticas internas logran seguir. La reacción instintiva de muchas empresas es prohibirla. Pero una prohibición no detiene el uso: lo empuja a la sombra, donde expone a la organización a riesgos de seguridad, pérdida de datos y brechas de cumplimiento que nadie está monitoreando.",
      },
      { text: "Qué abordó el panel" },
      {
        text: "Carlos Parker, de Arxia, se sumó a un panel de líderes en gobernanza y seguridad de IA (Eric Vargas, Gustavo Venegas y Edison Vásquez Droguett) para trabajar tres preguntas:",
      },
      {
        items: [
          {
            lead: "Qué es realmente el Shadow AI",
            text: ", y por qué opera bajo el radar.",
          },
          {
            lead: "El mapa de riesgos",
            text: "su impacto silencioso, pero muy real, en la seguridad corporativa.",
          },
          {
            lead: "Estrategia",
            text: "cómo establecer controles que protejan a la organización sin asfixiar la innovación.",
          },
        ],
      },
      { text: "La gobernanza en el centro de la adopción" },
      {
        text: "La conclusión coincide con el enfoque de Arxia sobre la adopción de IA: el objetivo no es prohibir la IA, sino gobernarla. Políticas claras, gobernanza de datos y un uso trazable son lo que permite a los equipos usar la IA de forma abierta y segura. Esta reflexión dio forma más adelante a la alianza de Arxia con Gobierna Tus Datos para fortalecer el componente de gobernanza de datos de su oferta AI Accelerator.",
      },
      { text: "Conozca el trabajo de Arxia en gobernanza de datos →" },
    ],
  },
  "arxia-uganda-ai-acceleration-mission-kampala-gulu": {
    title:
      "Dos semanas en Kampala y Gulu: Arxia lleva la aceleración de IA al ecosistema empresarial y público de Uganda",
    seoTitle: "Aceleración de IA en Uganda: Kampala y Gulu",
    excerpt:
      "Carlos Parker y Grace Labong, de Arxia, pasaron dos semanas reuniéndose con instituciones, bancos, universidades, asociaciones y empresas de BPO y TI de Uganda, todas en busca de una forma de atravesar el ruido en torno a la IA para obtener resultados directos y medibles.",
    metaDescription:
      "Durante dos semanas en Kampala y Gulu, Arxia se reunió con instituciones, bancos, universidades y empresas de BPO de Uganda sobre la adopción de IA.",
    coverAlt:
      "Carlos Parker, de Arxia, con el equipo de Exquisite Solution Limited en sus oficinas en Uganda.",
    body: [
      {
        text: "Uganda tiene lo que cualquier agenda de innovación necesita: un entorno empresarial dinámico, ganas de expandirse y un terreno fértil para la tecnología. En marzo, Arxia fue a ver ese potencial de cerca.",
      },
      { text: "Una misión de dos semanas" },
      {
        text: "Carlos Parker y Grace Labong, de Arxia, pasaron dos semanas en Kampala y Gulu reuniéndose con las organizaciones que dan forma a la economía del país: instituciones de gobierno, asociaciones, bancos, universidades y empresas de BPO y TI. Cada conversación partió de la misma pregunta: ¿cómo ir más allá del \"hype y el ruido\" de la IA y convertirla en resultados directos y rápidos para sus operaciones?",
      },
      { text: "Un pionero del BPO que se adapta a la era de la IA" },
      {
        text: "Una de esas conversaciones fue con Exquisite Solution Limited, una de las empresas pioneras de la industria de tercerización de procesos de negocio (BPO) en Uganda. Tras haber construido esa industria, hoy están entre los primeros en adaptar los servicios de BPO a la era de la IA, repensando cómo se presta el trabajo cuando los agentes pueden asumir parte del proceso.",
      },
      {
        alt: "Arxia y Exquisite Solution Limited en una sesión de trabajo",
        caption: "Sesión de trabajo con el equipo de Exquisite Solution Limited.",
      },
      { text: "De las conversaciones al trabajo práctico" },
      {
        text: "La misión generó una respuesta muy positiva y el trabajo práctico comenzó de inmediato con varios clientes. También sentó las bases de lo que vino en las semanas siguientes: los AI Ignite Workshops en Kampala y un número creciente de organizaciones ugandesas que se incorporan al AI Acceleration Program de Arxia.",
      },
      {
        text: "Arxia tiene presencia local en Uganda y una visión clara del potencial del mercado. El plan es seguir impulsando el apoyo a la operacionalización de IA en todas las direcciones en las que el ecosistema esté listo para avanzar.",
      },
      { text: "Conozca más sobre el AI Acceleration Program →" },
    ],
  },
  "arxia-pravaida-govtech-lab-ukraine-demo-day-kyiv": {
    title:
      "Pravaida llega al Demo Day de GovTech Lab Ukraine: un consorcio Chile–Rumania–Ucrania para orientación legal con IA",
    seoTitle: "Pravaida en el Demo Day de GovTech Lab Ukraine",
    excerpt:
      "Arxia, la startup chilena Dolfs AI y el socio ucraniano Kitsoft llevaron Pravaida, un asistente de IA que ayuda a la ciudadanía a entender leyes y regulaciones, a la etapa final de GovTech Lab Ukraine, el programa de innovación abierta para el sector público de Kiev.",
    metaDescription:
      "Arxia, Dolfs AI y Kitsoft llegaron al Demo Day de GovTech Lab Ukraine, en Kiev, con Pravaida, un asistente de IA que ayuda a entender las leyes.",
    coverAlt:
      "Carlos Parker, de Arxia, presenta Pravaida durante el programa GovTech Lab Ukraine en Kiev.",
    body: [
      {
        text: "La mayoría de los ciudadanos nunca lee una ley. Lo que necesitan es saber qué significa una ley para ellos, hoy y en lenguaje simple. Ese fue el problema detrás de Pravaida, y llevó a Arxia a la etapa final de uno de los programas de innovación pública más exigentes de Europa.",
      },
      { text: "Un desafío de innovación abierta en Kiev" },
      {
        text: "GovTech Lab Ukraine es el programa de innovación abierta que gestiona el Global Government Technology Centre Kyiv junto al Ministerio de Transformación Digital de Ucrania y el Foro Económico Mundial. Une a instituciones de gobierno con innovadores para diseñar y probar soluciones digitales antes de escalarlas. En su edición 2026, uno de los desafíos se centró en la asistencia legal, con el Ministerio de Justicia de Ucrania como institución asociada.",
      },
      {
        text: "Arxia participó en el desafío como parte de un consorcio intercontinental: Arxia desde Rumania, la startup chilena Dolfs AI y Kitsoft, una de las principales empresas Govtech de Ucrania.",
      },
      { text: "Qué hace Pravaida" },
      {
        text: "Pravaida es un asistente de IA que permite a los gobiernos entregar a la ciudadanía información precisa sobre legislación y regulaciones a través de canales conversacionales flexibles, de forma automática, sencilla y exacta. Se construyó sobre la plataforma Dolfs AI Studio, como uno de los primeros productos de un esfuerzo conjunto para desarrollar soluciones de IA para gobiernos.",
      },
      {
        alt: "Pravaida — GovTech Lab, Global Government Technology Centre Kyiv, Dolfs AI, Arxia, Kitsoft",
        caption:
          "Pravaida, desarrollado por Dolfs AI, Arxia y Kitsoft para GovTech Lab Ukraine.",
      },
      { text: "Del bootcamp al Demo Day" },
      {
        text: "Como finalistas, el equipo participó en un bootcamp presencial en Kiev, donde trabajó con expertos Govtech nacionales e internacionales y con el equipo del sector público en las necesidades de los usuarios, las hipótesis y el diseño del piloto. Luego, Carlos Parker, de Arxia, presentó la plataforma piloto del consorcio en el Demo Day del programa, junto a los demás equipos finalistas.",
      },
      {
        alt: "El público de GovTech Lab Ukraine en Kiev",
        caption:
          "Presentaciones de los finalistas en el Global Government Technology Centre Kyiv.",
      },
      { text: "Por qué Ucrania" },
      {
        text: "La historia Govtech de Ucrania es una de las más notables del mundo: en aproximadamente una década, el país pasó del puesto 105 al 5 en los rankings globales de gobierno digital, y lo hizo durante una invasión a gran escala, bajo ataques físicos y cibernéticos, dando origen a plataformas como Diia y Prozorro. Probar una solución en ese entorno, con ese nivel de experiencia en la sala, fue un privilegio para todo el equipo.",
      },
      {
        text: "Para Arxia, la experiencia también confirmó una convicción presente en todo su trabajo: la mejor tecnología pública se construye más allá de las fronteras, con chilenos, rumanos y ucranianos trabajando en el mismo problema.",
      },
      { text: "Conozca el trabajo de Arxia sobre el Estado agéntico →" },
    ],
  },
};
