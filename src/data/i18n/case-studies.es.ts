// Spanish content for src/data/case-studies.ts. Keyed by project slug; each
// entry is a complete CaseStudyContent. Missing slugs fall back to English.
import type { CaseStudyContent } from "../case-studies";

export const caseStudiesEs: Record<string, CaseStudyContent> = {
  "romania-ukrainian-interop": {
    title: "Servicios interoperables para personas refugiadas",
    eyebrow: "Servicios digitales inclusivos e interoperables",
    practices: ["Integración de servicios", "e-Servicios ciudadanos"],
    lede:
      "Cómo Rumanía reunió la protección social, la educación y el empleo para las personas refugiadas de Ucrania en una única plataforma multilingüe: un programa financiado por el Banco Mundial y un modelo que la UE ha citado desde entonces.",
    summary:
      "Protección social, educación y empleo para las personas refugiadas de Ucrania, reunidos en una sola plataforma multilingüe. Una cuenta, reutilizada entre instituciones.",
    metaDescription:
      "Caso de estudio: cómo Rumanía reunió la protección social, la educación y el empleo para las personas refugiadas de Ucrania en una plataforma multilingüe e interoperable. Financiado por el Banco Mundial y citado por la UE.",
    metrics: [
      { value: "3", label: "Ámbitos de servicio, un solo recorrido" },
      { value: "1", label: "Cuenta, reutilizada entre instituciones" },
      { value: "3", label: "Idiomas · UA RO EN, traducción con IA" },
      { value: "UE", label: "Citado como referencia de respuesta a crisis" },
    ],
    problem: {
      heading: "El problema",
      paragraphs: [
        "Cientos de miles de personas llegadas desde Ucrania se encontraron con un panorama de servicios pensado para otros. Las prestaciones económicas, la escolarización y la inserción laboral dependían de instituciones distintas, cada una con su propio proceso, formularios y sistema informático, y ninguno diseñado para el uso multilingüe ni para una gestión de casos conjunta.",
        "Los formularios solo estaban en rumano y las instituciones improvisaban con traductores voluntarios. Existían políticas generosas, pero las personas para las que se escribieron no podían acceder a ellas.",
      ],
    },
    solution: {
      heading: "Cómo lo resolvimos",
      intro:
        "Empezamos por los procesos, no por el software. Los recorridos de los tres ámbitos se mapearon con el personal de primera línea y se reconstruyeron en torno a una regla: la identidad y los datos básicos se recogen una sola vez y después se reutilizan de forma segura en todas las instituciones.",
      figCaption: "El flujo del servicio",
      figFrom: "Acceso fragmentado",
      figTo: "Una puerta de entrada inclusiva",
      steps: [
        { title: "Mapear", text: "Los tres ámbitos recorridos de principio a fin con las instituciones que los gestionan." },
        { title: "Rediseñar", text: "El recorrido reconstruido desde el lado de la persona refugiada; sin duplicidades ni pasos inútiles." },
        { title: "Registro único", text: "Identidad y datos básicos recogidos una sola vez y reutilizados de forma segura." },
        { title: "Una puerta de entrada", text: "Prestaciones, plazas escolares y empleo desde una sola cuenta y cualquier dispositivo." },
        { title: "Caso resuelto", text: "Derivado a la institución adecuada y seguido hasta la entrega." },
      ],
      beneathLabel: "Presente en cada paso",
      layers: [
        {
          title: "Capa de traducción con IA",
          text: "Formularios, notificaciones y mensajes en UA, RO o EN, sin intérprete de por medio.",
          icon: "translation",
        },
        {
          title: "Expediente compartido entre instituciones",
          text: "Un solo expediente entre instituciones; las ONG y el personal de primera línea pueden actuar en nombre de la persona.",
          icon: "case-rails",
        },
      ],
    },
    results: {
      heading: "El resultado",
      outcomes: [
        { title: "Un punto de entrada, en servicio", text: "Tres áreas de servicio accesibles desde una sola cuenta multilingüe." },
        { title: "La traducción como infraestructura", text: "El idioma lo resuelve la plataforma, no intérpretes improvisados." },
        { title: "Reconocido a nivel europeo", text: "Una respuesta inclusiva que reforzó los sistemas nacionales en lugar de sortearlos." },
      ],
    },
    impact: {
      heading: "El impacto: una solución sostenible para una crisis que continúa",
      items: [
        { title: "Menos carga administrativa", figure: "burden" },
        { title: "Acceso más rápido a los derechos", figure: "speed" },
        { title: "Instituciones que trabajan como una sola", figure: "institutions" },
      ],
    },
    apply: {
      heading: "Apliquemos este modelo en su país",
      body:
        "La crisis puso de manifiesto la fragmentación; no la creó. Cualquier hecho vital que atraviese varias instituciones choca con el mismo muro. El modelo de puerta de entrada se mantiene; solo cambian los servicios que hay detrás.",
      figCaption: "El modelo de puerta de entrada",
      pattern: {
        users: "Ciudadanía · Personas refugiadas · Gestores de ONG",
        core: "Una cuenta + capa de traducción con IA",
        services: ["Prestaciones", "Escuelas", "Empleo"],
      },
      uses: [
        { title: "Desplazamiento y migración", text: "Capacidad permanente, lista antes de la próxima ola de llegadas.", icon: "migration" },
        { title: "Protección social en general", text: "Un expediente por hogar, no por institución.", icon: "social-protection" },
        { title: "Servicios públicos multilingües", text: "Lenguas minoritarias y de la diáspora atendidas por defecto.", icon: "multilingual" },
      ],
    },
    cta: {
      heading: "Hablemos.",
      body:
        "Si sus instituciones atienden a personas más allá de las fronteras entre organismos e idiomas, lo hemos construido de principio a fin: rediseño de procesos, plataforma y despliegue en condiciones de crisis.",
    },
    videoTitle: "Servicios interoperables para personas refugiadas: el caso en 80 segundos",
    videoDescription:
      "Un vídeo breve sobre cómo Rumanía reconstruyó los recorridos de las personas refugiadas en protección social, educación y empleo en torno a una sola cuenta y una capa de traducción con IA.",
  },
};
