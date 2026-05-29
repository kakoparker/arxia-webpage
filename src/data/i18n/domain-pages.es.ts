// Spanish text overlay for src/data/domain-pages.ts.
// Keyed by page slug → { page-level fields, categories[name].tagline,
// categories[name].items[itemSlug] }. Anything omitted falls back to English.
// Per-item card text is being translated progressively; gaps stay English.

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
  "govtech-data": {
    title: "Datos",
    tagline: "El tejido conectivo del Estado",
    categories: {
      Consultancy: { tagline: "Estrategia, políticas y arquitectura para la capa de datos del Estado." },
      Services: { tagline: "Entrega, implementación y habilitación técnica." },
      Products: { tagline: "Plataformas que desarrollamos y hacemos evolucionar." },
      Trainings: { tagline: "Desarrollo de capacidades para responsables de políticas, equipos jurídicos y personal técnico del sector público." },
    },
  },
  "govtech-process": {
    title: "Procesos",
    tagline: "Servicios públicos, rediseñados",
    categories: {
      Consultancy: { tagline: "Estrategia y rediseño de procesos institucionales y de cara a la ciudadanía." },
      Services: { tagline: "Implementación, integración y entrega de plataformas." },
      Products: { tagline: "Plataformas que desarrollamos y hacemos evolucionar." },
      Trainings: { tagline: "Desarrollo de capacidades para equipos técnicos del sector público y ecosistemas locales." },
    },
  },
  "govtech-intelligence": {
    title: "Inteligencia",
    tagline: "El Estado agéntico",
    categories: {
      Consultancy: { tagline: "IA responsable para el sector público, de la estrategia a la gobernanza." },
      Services: { tagline: "Construcción y despliegue de IA para el sector público." },
      Products: { tagline: "Plataformas que desarrollamos y hacemos evolucionar." },
    },
  },
  "industries-data": {
    title: "Datos",
    tagline: "Datos empresariales, gobernados e interoperables",
    categories: {
      Consultancy: { tagline: "Estrategia, políticas y estándares para los datos empresariales." },
      Services: { tagline: "Implementación e integración para los datos empresariales." },
    },
  },
  "industries-process": {
    title: "Procesos",
    tagline: "Operaciones empresariales, reinventadas",
    categories: {
      Consultancy: { tagline: "Estrategia, auditoría y gestión del cambio para las operaciones de la empresa." },
      Services: { tagline: "Entrega en sistemas empresariales, portales y flujos de trabajo." },
      Products: { tagline: "Plataformas para las operaciones de la empresa." },
    },
  },
  "industries-intelligence": {
    title: "Inteligencia",
    tagline: "IA a escala empresarial",
    categories: {
      Consultancy: { tagline: "Estrategia, gobernanza y asesoría para la IA empresarial." },
      Services: { tagline: "Construcción, despliegue y formación en torno a la IA empresarial." },
      Products: { tagline: "Plataformas y agentes para la IA empresarial." },
    },
  },
};
