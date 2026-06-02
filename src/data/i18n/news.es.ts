// Spanish text overlay for src/data/news.ts. Keyed by article slug.
// Body blocks are positional (must match the English source's order).

export interface NewsArticleOverlay {
  title?: string;
  excerpt?: string;
  metaDescription?: string;
  coverAlt?: string;
  body?: Array<{ text?: string; alt?: string; caption?: string }>;
}

export const newsEs: Record<string, NewsArticleOverlay> = {
  "arxia-govtech-internationalization-ukraine-kyiv": {
    title:
      "Construir puentes en Kiev: Arxia y la comunidad Govtech de Ucrania ante la internacionalización de la tecnología pública",
    excerpt:
      "Internacionalizar el Govtech no consiste en exportar productos, sino en construir cooperación entre países. Arxia se reunió con la comunidad Govtech de Ucrania en Kiev para compartir su trayectoria de expansión global y una convicción: la mejor tecnología pública viaja a través de alianzas, no de transacciones.",
    metaDescription:
      "Arxia se sumó al Global Government Technology Centre Kyiv y a la GovTech Alliance of Ukraine en el Govtech Meet-up para hablar sobre la internacionalización de los servicios Govtech, la cooperación multiactor y el apoyo a los innovadores ucranianos para llevar sus soluciones al mundo.",
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
        text: "Por eso el impacto duradero depende de una gobernanza multiactor. Las relaciones sostenibles entre países no las construye un solo actor; requieren que gobiernos, innovadores, expertos y empresas compartan la responsabilidad del resultado. Es más lento y más exigente que una venta, y es el único enfoque que perdura.",
      },
      { text: "Ucrania tiene una historia para contar" },
      {
        text: "Ucrania tiene una historia extraordinaria para contar, con empresas increíbles y líderes valientes. El objetivo de Arxia es ayudar a llevar esa historia al mundo, apoyando a los innovadores ucranianos para que lleven su conocimiento experto y sus soluciones a nuevos mercados, junto a los socios que ya realizan este trabajo en terreno.",
      },
      {
        text: "Para Carlos Parker, esto se ha convertido en una misión personal en Ucrania. El objetivo es fácil de enunciar y más difícil de lograr: construir los puentes que permiten que la tecnología pública —y las personas que están detrás— circulen entre países. Construyamos esos puentes.",
      },
      { text: "Conoce el trabajo de Arxia en Gobierno Digital →" },
    ],
  },
  "arxia-supports-fawe-uganda-ai-acceleration": {
    title:
      "Arxia apoya a FAWE Uganda en la adopción de IA agéntica mediante el Programa de Aceleración de IA",
    excerpt:
      "La mayor parte de las conversaciones sobre IA agéntica ocurren en directorios, pero las ONG son las que más pueden ganar. Arxia condujo su Taller AI Ignite con FAWE Uganda para poner una IA real y responsable en manos de un equipo que impulsa la educación de las niñas en África.",
    metaDescription:
      "Arxia se asocia con FAWE Uganda para llevar IA agéntica al sector sin fines de lucro mediante el Taller AI Ignite y el Programa de Aceleración de IA: IA práctica y responsable para organizaciones que impulsan la educación de las niñas.",
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
        text: "Si trabajas en el sector sin fines de lucro o con él, y te han dicho que esta tecnología no es para ti, o que todavía no es para ti, vale la pena una segunda mirada. Los equipos que realizan el trabajo más importante merecen las mejores herramientas disponibles.",
      },
      { text: "Conoce más sobre el Programa de Aceleración de IA →" },
    ],
  },
};
