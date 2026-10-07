export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      /** Intrinsic size. When set, the image renders at its natural aspect ratio. */
      width?: number;
      height?: number;
    }
  | { type: "list"; ordered?: boolean; items: ArticleListItem[] }
  | { type: "cta"; text: string; href: string };

/** A list item with an optional bold lead-in ("Data first." / "Governance and control"). */
export interface ArticleListItem {
  lead?: string;
  text: string;
}

export interface NewsArticle {
  slug: string;
  /** Display date, formatted for the requested locale from `isoDate`. */
  date: string;
  isoDate: string;
  /** "month" when only the month is certain: shows "January 2026", not a day. */
  datePrecision?: "day" | "month";
  title: string;
  excerpt: string;
  metaDescription: string;
  tags: string[];
  coverImage: string;
  coverAlt: string;
  /** "contain" for portrait photos and flyers: shown whole over a blurred fill instead of cropped. */
  coverFit?: "cover" | "contain";
  coverCredit?: string;
  body: ArticleBlock[];
}

/** Source records: `date` is derived from `isoDate` per locale. */
type NewsArticleSource = Omit<NewsArticle, "date">;

// Newest first. getNewsArticles() also sorts by isoDate, so order here is for readability.
const newsSources: NewsArticleSource[] = [
  {
    slug: "arxia-uganda-digital-public-services-kampala",
    isoDate: "2026-10-02",
    datePrecision: "month",
    title: "Registries, data exchange and a service portal: Arxia supports the next phase of Uganda's digital public services",
    excerpt: "Arxia spent a week in Kampala planning the future of three building blocks that public services depend on: authoritative data registries, a data exchange hub and a single service portal.",
    metaDescription: "Arxia spent a week in Kampala supporting the advancement of Uganda's digital public services, planning authoritative data registries, a data exchange hub and a service portal for digital service delivery.",
    tags: ["Digital Public Infrastructure", "Interoperability", "Africa"],
    coverImage: "/images/news/arxia-uganda-digital-public-services-kampala/cover.jpg",
    coverAlt: "Daniel Homorodean of Arxia in Kampala, Uganda.",
    body: [
      {
        type: "paragraph",
        text: "Delivering public services digitally takes three things working together: data the state can trust, a way for institutions to share it, and a single front door for citizens.",
      },
      {
        type: "heading",
        text: "A week in Kampala",
      },
      {
        type: "paragraph",
        text: "Arxia CEO Daniel Homorodean spent a week in Kampala supporting the advancement of digital services in Uganda. The focus was on planning the future of three building blocks:",
      },
      {
        type: "list",
        items: [
          {
            lead: "Authoritative data registries",
            text: "the single sources of truth for the information public services depend on.",
          },
          {
            lead: "A data exchange hub",
            text: "so institutions can share data securely instead of asking citizens for it again and again.",
          },
          {
            lead: "A service portal",
            text: "one place where citizens and businesses access public services.",
          },
        ],
      },
      {
        type: "heading",
        text: "Why the trio matters",
      },
      {
        type: "paragraph",
        text: "Each component is useful alone. Together, they are what makes digital execution and delivery of public services possible. This approach runs through Arxia's DPI work, from regional data standards in the Great Lakes region to national interoperability in Cambodia: get the data and the connections right, and services can be built on top with confidence.",
      },
      {
        type: "cta",
        text: "Explore Arxia's work in interoperability →",
        href: "/interoperability",
      },
    ],
  },
  {
    slug: "arxia-ticon-africa-2026-data-interoperability-specialists",
    isoDate: "2026-09-24",
    title: "From data to impact: Arxia at TICON Africa 2026 on building Africa's data and interoperability specialists",
    excerpt: "At the TICON Africa Conference in Livingstone, Arxia's Daniel Homorodean and Grace Labong discussed how Africa can develop the specialists who will govern its data and make its systems work together.",
    metaDescription: "Daniel Homorodean and Grace Labong of Arxia spoke at TICON Africa 2026 in Livingstone, Zambia, in the session 'From Data to Impact: Building Africa's Data and Interoperability Specialists'.",
    tags: ["Interoperability", "Capacity Building", "Event"],
    coverImage: "/images/news/arxia-ticon-africa-2026-data-interoperability-specialists/cover.jpg",
    coverAlt: "TICON Africa 2026 speaker card for Grace Labong, Africa Manager, and Daniel Homorodean, CEO of Arxia.",
    coverFit: "contain",
    body: [
      {
        type: "paragraph",
        text: "Accelerating AI adoption is the topic everyone is talking about. But AI cannot be operationalised without data, and Africa urgently needs the specialists who can govern that data and make systems work together.",
      },
      {
        type: "heading",
        text: "A session at TICON Africa",
      },
      {
        type: "paragraph",
        text: "On 24 September, at the TICON Africa Conference in Livingstone, Zambia, Arxia CEO Daniel Homorodean and Arxia Africa Manager Grace Labong led the session \"From Data to Impact: Building Africa's Data and Interoperability Specialists.\"",
      },
      {
        type: "paragraph",
        text: "TICON Africa brings together ICT leaders, researchers and practitioners shaping the continent's digital future.",
      },
      {
        type: "heading",
        text: "Demand is outpacing capacity",
      },
      {
        type: "paragraph",
        text: "Across the continent, demand for data governance and interoperability profiles is growing much faster than the available capacity. The session explored how Africa can develop these specialists: the people who will build data and interoperability architectures and carry them through to real adoption by institutions and citizens.",
      },
      {
        type: "heading",
        text: "People, not only technology",
      },
      {
        type: "paragraph",
        text: "The discussion went beyond technology adoption to a harder question: does Africa have the people, skills and institutions needed to turn innovation into lasting impact? Young people are one of the continent's greatest assets, yet there is still a significant gap between emerging opportunities and the skills available.",
      },
      {
        type: "paragraph",
        text: "Closing that gap takes more than training. It takes practical skills development, mentorship, innovation ecosystems, partnerships, and real-world challenges where young Africans can apply what they learn, as creators, problem-solvers, entrepreneurs and leaders, not only as users of technology. It also takes collaboration between governments, the private sector, civil society, academia and young people themselves.",
      },
      {
        type: "paragraph",
        text: "Africa's future will not be built by technology alone. It will be built by people with the knowledge, skills, values and opportunities to use that technology for impact.",
      },
      {
        type: "cta",
        text: "Explore Arxia's work in interoperability →",
        href: "/interoperability",
      },
    ],
  },
  {
    slug: "arxia-gobierna-tus-datos-data-governance-partnership",
    isoDate: "2026-08-28",
    title: "Arxia partners with Gobierna Tus Datos to put data governance at the centre of AI adoption",
    excerpt: "A new partnership brings Gobierna Tus Datos' data-protection tools, consulting and training into Arxia's AI Accelerator, so organisations can adopt AI with their data in order from the start.",
    metaDescription: "Arxia and Gobierna Tus Datos signed a partnership to strengthen data governance in Arxia's AI Accelerator, adding Pharus Privacy, data-protection consulting, SENCE training and Lead DPO certification for international markets.",
    tags: ["AI Governance", "Partnership", "Latin America"],
    coverImage: "/images/news/arxia-gobierna-tus-datos-data-governance-partnership/cover.jpg",
    coverAlt: "Arxia × Gobierna Tus Datos: data governance at the centre of AI adoption.",
    coverFit: "contain",
    body: [
      {
        type: "paragraph",
        text: "AI adoption is about much more than tools and hype. Without strong data governance, it is neither effective nor sustainable. That conviction is behind Arxia's new partnership with Gobierna Tus Datos.",
      },
      {
        type: "heading",
        text: "Data at the centre",
      },
      {
        type: "paragraph",
        text: "The partnership adds Gobierna Tus Datos' knowledge and tools to Arxia's AI Accelerator, helping organisations adopt AI in their business processes with data at the centre of the work. It strengthens Arxia's data-governance offer for international markets.",
      },
      {
        type: "heading",
        text: "What the partnership brings",
      },
      {
        type: "paragraph",
        text: "Arxia will integrate the following Gobierna Tus Datos tools and services:",
      },
      {
        type: "list",
        items: [
          {
            lead: "Pharus Privacy",
            text: "a SaaS for managing records of processing activities, consents and data breaches.",
          },
          {
            lead: "Data protection and data governance consulting",
            text: "a six-week readiness assessment for new data-protection legislation.",
          },
          {
            lead: "SENCE-certified training",
            text: ", delivered through OTEC LATAM IT ACADEMY.",
          },
          {
            text: "Lead DPO executive certification.",
          },
        ],
      },
      {
        type: "heading",
        text: "Complete support across the adoption journey",
      },
      {
        type: "paragraph",
        text: "The partnership builds on earlier collaboration, including the \"Gobierna tu IA\" series on Shadow AI. With it, Arxia clients get full support at every level of AI adoption, from governance and compliance to the workflows that deliver results.",
      },
      {
        type: "cta",
        text: "Explore Arxia's work in data governance →",
        href: "/data-governance",
      },
    ],
  },
  {
    slug: "arxia-rwanda-national-dpi-guidelines-kigali",
    isoDate: "2026-08-03",
    datePrecision: "month",
    title: "Back in Kigali: Arxia supports Rwanda's National Digital Public Infrastructure Guidelines",
    excerpt: "Arxia is part of the team supporting Rwanda's forthcoming National DPI Guidelines, which will guide a whole-of-government move to a more integrated, inclusive and citizen-centred digital society.",
    metaDescription: "Arxia returned to Kigali to start a new project supporting Rwanda's National Digital Public Infrastructure Guidelines, a whole-of-government framework for an integrated, inclusive and citizen-centred digital society.",
    tags: ["Digital Public Infrastructure", "Africa", "Project"],
    coverImage: "/images/news/arxia-rwanda-national-dpi-guidelines-kigali/cover.jpg",
    coverAlt: "Daniel Homorodean of Arxia in Kigali, with the Kigali Convention Centre lit up at night.",
    body: [
      {
        type: "paragraph",
        text: "For many years, Rwanda has positioned itself as one of Africa's leaders in government digital transformation. This summer, Arxia returned to Kigali to begin a new project as part of that journey.",
      },
      {
        type: "heading",
        text: "A whole-of-government framework",
      },
      {
        type: "paragraph",
        text: "Rwanda is preparing its National Digital Public Infrastructure Guidelines. They will support a whole-of-government transition towards a more integrated, inclusive and citizen-centred digital society, giving institutions a shared foundation for how digital public services are designed, connected and delivered.",
      },
      {
        type: "heading",
        text: "Arxia's role",
      },
      {
        type: "paragraph",
        text: "Arxia is part of the team supporting this work, bringing its experience in DPI, interoperability and data governance from engagements across Africa, Asia and Europe, from regional data standards in the Great Lakes region to national interoperability work in Cambodia.",
      },
      {
        type: "cta",
        text: "Explore Arxia's work in interoperability →",
        href: "/interoperability",
      },
    ],
  },
  {
    slug: "arxia-caja-cusco-ai-ignite-workshop-peru",
    isoDate: "2026-07-14",
    datePrecision: "month",
    title: "AI at 3,400 metres: Arxia opens the AI Acceleration Program with Caja Cusco in Peru",
    excerpt: "In Cusco, Arxia ran a full-day AI Ignite Workshop with the leadership of Caja Cusco, one of Peru's leading microfinance institutions, on building AI operating systems that work in highly regulated environments.",
    metaDescription: "Arxia delivered the AI Ignite Workshop to the leadership of Caja Cusco in Cusco, Peru: eight hours on agentic AI and AI operating systems for regulated financial institutions, with partners IT Studio.",
    tags: ["AI Acceleration", "Latin America", "Financial Services"],
    coverImage: "/images/news/arxia-caja-cusco-ai-ignite-workshop-peru/cover.jpg",
    coverAlt: "Caja Cusco leaders with Carlos Parker of Arxia after the AI Ignite Workshop in Cusco, Peru.",
    body: [
      {
        type: "paragraph",
        text: "Arxia's consulting work reached new heights this July — literally. At 3,400 metres above sea level, in the ancient Inca capital, Arxia delivered the opening workshop of its AI Acceleration Program to a new client: Caja Cusco.",
      },
      {
        type: "heading",
        text: "A regulated sector, a practical question",
      },
      {
        type: "paragraph",
        text: "Caja Cusco is a leading Peruvian financial institution specialising in microfinance and banking services. In a sector where regulation shapes every decision, the question is not whether AI has value but how to use it safely and in a way that lasts.",
      },
      {
        type: "paragraph",
        text: "For eight hours, Arxia's Carlos Parker and the Caja Cusco leadership team worked through how modern organisations build AI operating systems that function in highly regulated environments.",
      },
      {
        type: "image",
        src: "/images/news/arxia-caja-cusco-ai-ignite-workshop-peru/image-2.jpg",
        alt: "Carlos Parker during the AI Ignite Workshop in Cusco",
        width: 1280,
        height: 805,
      },
      {
        type: "heading",
        text: "A full day of discovery",
      },
      {
        type: "paragraph",
        text: "The AI Ignite Workshop is a two-way conversation, not a lecture. Over the day, the team explored where agentic AI can help their business and which capabilities they need to build so that adoption delivers real results.",
      },
      {
        type: "image",
        src: "/images/news/arxia-caja-cusco-ai-ignite-workshop-peru/image-3.jpg",
        alt: "The AI Ignite Workshop with Caja Cusco leadership",
        width: 1280,
        height: 846,
      },
      {
        type: "heading",
        text: "Weeks of work in Peru",
      },
      {
        type: "paragraph",
        text: "The Cusco workshop closed several weeks of training, workshops and meetings in Peru, made possible with Arxia's partners IT Studio and Manuel Rubén Dueñas Saona. Arxia looks forward to more projects with Caja Cusco and with other financial organisations in Lima.",
      },
      {
        type: "paragraph",
        text: "The AI Acceleration Program keeps expanding, with more countries to be announced. Arxia is also growing its network of delivery partners and welcomes contact from organisations that see a fit in their country, and from consultants who want to join the team as AI operationalisation specialists.",
      },
      {
        type: "cta",
        text: "Learn more about the AI Acceleration Program →",
        href: "https://aiaccelerator.africa",
      },
    ],
  },
  {
    slug: "arxia-typo3-burundi-university-web-design-system",
    isoDate: "2026-07-10",
    datePrecision: "month",
    title: "A shared blueprint for every university website in Burundi, built on open source",
    excerpt: "With Burundi's Ministry of National Education and Scientific Research and KIT Digital Innovation HUB, Arxia and the TYPO3 Association delivered a GovStack-inspired design system that any university can use to launch a professional website. ENS is the first to adopt it.",
    metaDescription: "Arxia and the TYPO3 Association, with Burundi's Ministry of National Education and Scientific Research and KIT Digital Innovation HUB, created an open-source TYPO3 design system for national university websites, first adopted by the École Normale Supérieure.",
    tags: ["Digital Public Infrastructure", "Open Source", "Web Portals"],
    coverImage: "/images/news/arxia-typo3-burundi-university-web-design-system/cover.jpg",
    coverAlt: "The new École Normale Supérieure du Burundi website built on the shared university design system.",
    body: [
      {
        type: "paragraph",
        text: "Every university deserves a world-class digital presence. In Burundi, where the population is growing fast and higher education is expanding quickly to meet demand, good digital tools are urgently needed.",
      },
      {
        type: "heading",
        text: "A design system for a whole sector",
      },
      {
        type: "paragraph",
        text: "In partnership with Burundi's Ministry of National Education and Scientific Research (Ministère de l'Éducation Nationale et de la Recherche Scientifique) and KIT Digital Innovation HUB, Arxia and the TYPO3 Association developed a design system inspired by Arxia's work with GovStack.",
      },
      {
        type: "paragraph",
        text: "It gives every national university the same blueprint for its website. Each institution can quickly implement and customise a professional web portal that reflects its own identity and ambitions, without starting from a blank page.",
      },
      {
        type: "image",
        src: "/images/news/arxia-typo3-burundi-university-web-design-system/image-2.jpg",
        alt: "Pages from the shared university design system",
        width: 800,
        height: 1378,
      },
      {
        type: "heading",
        text: "ENS goes first",
      },
      {
        type: "paragraph",
        text: "The first university to adopt the reference model is the École Normale Supérieure (ENS), which is relaunching its website on this foundation.",
      },
      {
        type: "image",
        src: "/images/news/arxia-typo3-burundi-university-web-design-system/image-3.jpg",
        alt: "A university homepage built on the reference model",
        width: 1280,
        height: 836,
      },
      {
        type: "heading",
        text: "Open, reusable, built to scale",
      },
      {
        type: "paragraph",
        text: "The model is free, open source and built on TYPO3 CMS. Any university, anywhere, can use it to establish a strong, professional online presence quickly.",
      },
      {
        type: "paragraph",
        text: "This is what digital public infrastructure looks like in practice: shared, reusable, open and built for scale.",
      },
      {
        type: "cta",
        text: "Explore Arxia's work on government web portals →",
        href: "/web-portals",
      },
    ],
  },
  {
    slug: "arxia-bidpa-botswana-digital-transformation-strategy",
    isoDate: "2026-07-06",
    title: "Not another strategy on a shelf: Arxia starts the digital transformation strategy for Botswana's BIDPA",
    excerpt: "At the inception meeting with the Botswana Institute for Development Policy Analysis, Arxia committed to a strategy built around people, processes and mission — and to measures that start on day one, not after the final report.",
    metaDescription: "Arxia began developing the digital transformation strategy for the Botswana Institute for Development Policy Analysis (BIDPA), with an inception meeting on 6 July 2026 and measures implemented from day one.",
    tags: ["Digital Transformation", "Africa", "Event"],
    coverImage: "/images/news/arxia-bidpa-botswana-digital-transformation-strategy/cover.jpg",
    coverAlt: "Daniel Homorodean of Arxia with BIDPA representatives at the Botswana Institute for Development Policy Analysis.",
    coverFit: "contain",
    body: [
      {
        type: "paragraph",
        text: "Around 85% of strategies end the same way: as a declaration of good intentions, gathering dust once delivered. At the inception meeting on 6 July, Arxia made a promise to the staff of the Botswana Institute for Development Policy Analysis (BIDPA): this one would be different.",
      },
      {
        type: "heading",
        text: "People and processes before tools",
      },
      {
        type: "paragraph",
        text: "Arxia CEO Daniel Homorodean, working with change-management specialist Gaogaufi Steady Mako, took a clear position. The digital transformation strategy of a national research institute must be centred on the evolution of the organisation's mission, on adopting the most recent trends and practices, and on helping those practices spread across government institutions.",
      },
      {
        type: "paragraph",
        text: "Digital transformation is not built around software tools. It is built on efficient processes and on motivated, empowered people.",
      },
      {
        type: "image",
        src: "/images/news/arxia-bidpa-botswana-digital-transformation-strategy/image-2.jpg",
        alt: "Daniel Homorodean at BIDPA",
        width: 800,
        height: 1067,
      },
      {
        type: "heading",
        text: "Measures from day one",
      },
      {
        type: "paragraph",
        text: "Arxia is not waiting for a final report. Measures are being put in place from the first day of the engagement, keeping the momentum that already drives the BIDPA team to embrace change.",
      },
      {
        type: "image",
        src: "/images/news/arxia-bidpa-botswana-digital-transformation-strategy/image-3.jpg",
        alt: "BIDPA research publications",
        width: 800,
        height: 1067,
      },
      {
        type: "heading",
        text: "An institute built to transform a country",
      },
      {
        type: "paragraph",
        text: "BIDPA's mission is to support the transformation of an entire country through policy research and analysis. Arxia's role is to help it move faster along that path.",
      },
      {
        type: "cta",
        text: "Explore Arxia's work on e-services →",
        href: "/e-services",
      },
    ],
  },
  {
    slug: "arxia-typo3-junetech-2026-burundi",
    isoDate: "2026-06-26",
    title: "Consistency, investment and partnership: Arxia and the TYPO3 Association at JUNETECH 2026 in Burundi",
    excerpt: "As international partners of JUNETECH 2026, Burundi's festival of innovation and digital evolution, Arxia and the TYPO3 Association presented the results of three years of work on open source and standardisation with KIT Digital Innovation HUB.",
    metaDescription: "Arxia and the TYPO3 Association were international partners of JUNETECH 2026 in Bujumbura (23–26 June), presenting with KIT Digital Innovation HUB the results of three years promoting open source and standardisation in Burundi.",
    tags: ["Ecosystem Building", "Open Source", "Event"],
    coverImage: "/images/news/arxia-typo3-junetech-2026-burundi/cover.jpg",
    coverAlt: "JUNETECH 2026 partner announcement naming Arxia as international partner, Bujumbura, 23–26 June 2026.",
    coverFit: "contain",
    body: [
      {
        type: "paragraph",
        text: "How do you create impact and open business opportunities in a new country or a new market? The recipe is simple, if not easy: consistency, investment and partnership.",
      },
      {
        type: "heading",
        text: "A festival of innovation in Bujumbura",
      },
      {
        type: "paragraph",
        text: "From 23 to 26 June, Arxia and the TYPO3 Association took part as international partners in JUNETECH 2026, a festival of innovation and digital transformation in Burundi. The event is led by Chris Clement Igiraneza and the KIT Digital Innovation HUB.",
      },
      {
        type: "image",
        src: "/images/news/arxia-typo3-junetech-2026-burundi/image-2.jpg",
        alt: "JUNETECH 2026 partner announcement: TYPO3 Association",
        width: 762,
        height: 1080,
      },
      {
        type: "heading",
        text: "Three years of a consistent message",
      },
      {
        type: "paragraph",
        text: "For more than three years, Arxia, the TYPO3 Association and KIT have promoted the same message in Burundi: when adopted strategically, open source and standardisation create opportunities for local youth, local innovative companies and the government. That message is now being heard, and acted on.",
      },
      {
        type: "paragraph",
        text: "At JUNETECH, Arxia and TYPO3 presented the tangible results of this work, together with KIT and local institutional partners, and the plan for what comes next.",
      },
      {
        type: "heading",
        text: "In it for the long game",
      },
      {
        type: "paragraph",
        text: "Projects and business don't appear overnight, or for free. Arxia and the TYPO3 Association are committed for the long term. They are ready to partner with each country on its transformation journey, anchored in principles and focused on lasting value.",
      },
      {
        type: "cta",
        text: "Explore Arxia's work on government web portals →",
        href: "/web-portals",
      },
    ],
  },
  {
    slug: "arxia-keynote-icac-2026-silicon-valley-ai-operating-system",
    isoDate: "2026-06-12",
    title: "Arxia keynote at ICAC 2026 in Silicon Valley: how to operationalise agentic AI safely",
    excerpt: "Invited by Common Perú, Arxia's Carlos Parker gave a keynote at the C-Level Americas Summit 2026 in Silicon Valley on the AI Operating System — and spent three days with Latin American leaders on where AI adoption really stands.",
    metaDescription: "Carlos Parker of Arxia delivered the keynote 'AI Operating System (AIOS): how to operationalise agentic AI in business processes effectively and securely' at ICAC 2026 in Silicon Valley, organised by Common Perú (8–12 June 2026).",
    tags: ["AI Acceleration", "Latin America", "Event"],
    coverImage: "/images/news/arxia-keynote-icac-2026-silicon-valley-ai-operating-system/cover.jpg",
    coverAlt: "Carlos Parker of Arxia delivering his keynote at ICAC 2026 in Silicon Valley.",
    body: [
      {
        type: "paragraph",
        text: "C-level leaders don't need theoretical demos. They need architectures that are solid, secure and governable. That was the message Arxia took to Silicon Valley.",
      },
      {
        type: "heading",
        text: "A keynote for Latin American leadership",
      },
      {
        type: "paragraph",
        text: "From 8 to 12 June, Common Perú brought senior executives from Latin America to Silicon Valley for its International Conference & Annual Convention (ICAC 2026), part of the C-Level Americas Summit. Arxia's Carlos Parker was invited as keynote speaker with the session \"AI Operating System (AIOS): how to operationalise agentic AI in business processes effectively and securely.\"",
      },
      {
        type: "paragraph",
        text: "The keynote covered three areas:",
      },
      {
        type: "list",
        items: [
          {
            lead: "Governance and control",
            text: "what an AIOS is and how it structures AI within company strategy.",
          },
          {
            lead: "Operational efficiency",
            text: "concrete strategies to optimise complex processes and operations with autonomous agents.",
          },
          {
            lead: "Security and risk mitigation",
            text: "how to deploy agentic AI while keeping infrastructure agile and environments protected.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "It drew on Arxia's years leading digital transformation, ecosystem development and Digital Public Infrastructure projects in more than 20 countries across Europe, Asia, Africa and Latin America, translated into the language leadership needs today: corporate governance, risk management and technology architecture.",
      },
      {
        type: "image",
        src: "/images/news/arxia-keynote-icac-2026-silicon-valley-ai-operating-system/image-2.jpg",
        alt: "Arxia with ICAC 2026 participants",
        width: 1280,
        height: 1084,
      },
      {
        type: "heading",
        text: "Three days of direct conversations",
      },
      {
        type: "paragraph",
        text: "Beyond the stage, the convention gave Arxia three days of one-to-one conversations with innovative leaders from Peru, Colombia and Ecuador — informal exchanges, between golf, food and a few beers, that are often more valuable than meetings in corporate offices.",
      },
      {
        type: "paragraph",
        text: "A pattern emerged. Most companies are at a similar point: they know AI has value, but they lack a clear structure to drive adoption and sustain use over time. And they all ask the same question: where, concretely, is the return?",
      },
      {
        type: "image",
        src: "/images/news/arxia-keynote-icac-2026-silicon-valley-ai-operating-system/image-3.jpg",
        alt: "The ICAC 2026 audience",
        width: 1280,
        height: 960,
      },
      {
        type: "heading",
        text: "Where the AI Accelerator fits",
      },
      {
        type: "paragraph",
        text: "That is the gap Arxia's AI Accelerator addresses: a 12-week path with concrete results, where adoption, strategy and policy work together towards one goal — return on investment.",
      },
      {
        type: "paragraph",
        text: "Arxia thanks Common Perú and Manuel Rubén Dueñas Saona for the invitation and their trust.",
      },
      {
        type: "cta",
        text: "Learn more about the AI Acceleration Program →",
        href: "https://aiaccelerator.africa",
      },
    ],
  },
  {
    slug: "arxia-govtech-internationalization-ukraine-kyiv",
    isoDate: "2026-05-24",
    title:
      "Building bridges in Kyiv: Arxia and Ukraine's Govtech community on the internationalization of public technology",
    excerpt:
      "Internationalizing Govtech isn't about exporting products — it's about building cooperation between countries. Arxia joined Ukraine's Govtech community in Kyiv to share its global-expansion journey and a conviction: the best public technology travels through partnerships, not transactions.",
    metaDescription:
      "Arxia joined the Global Government Technology Centre Kyiv and the GovTech Alliance of Ukraine at the Govtech Meet-up to discuss the internationalization of Govtech services, multi-stakeholder cooperation, and supporting Ukrainian innovators in taking their solutions to the world.",
    tags: ["Govtech", "Internationalization", "Event"],
    coverImage:
      "/images/news/arxia-govtech-internationalization-ukraine-kyiv/cover.jpg",
    coverAlt:
      "Daniel Homorodean and Carlos Parker of Arxia at the World Economic Forum's Global Government Technology Centre in Kyiv.",
    body: [
      {
        type: "paragraph",
        text:
          "When people talk about taking Govtech across borders, the conversation usually starts and ends with products. Arxia brought a different message to Ukraine's Govtech community.",
      },
      {
        type: "heading",
        text: "A Govtech Meet-up in Kyiv",
      },
      {
        type: "paragraph",
        text:
          "Arxia's Daniel Homorodean and Carlos Parker met with Ukraine's Govtech community at the Govtech Meet-up, convened together with the Global Government Technology Centre Kyiv and the GovTech Alliance of Ukraine. The gathering brought experts, government representatives, innovators, and companies into the same room to advance public-sector technology.",
      },
      {
        type: "heading",
        text: "Sharing the journey, and the lessons learned",
      },
      {
        type: "paragraph",
        text:
          "Arxia used the session to share its own story of global expansion — the experience of internationalizing Govtech services across very different countries and contexts, and the lessons that came with it. After more than two decades in international markets, those lessons are less about technology than about how cooperation is built and sustained.",
      },
      {
        type: "heading",
        text: "Internationalization is more than exporting products",
      },
      {
        type: "paragraph",
        text:
          "The core message was simple. When we talk about the internationalization of Govtech, we are not only talking about exporting products. We are talking about building cooperation structures between countries — connecting experts, governments, innovators, and companies so that solutions take root rather than simply land.",
      },
      {
        type: "heading",
        text: "Why multi-stakeholder governance matters",
      },
      {
        type: "paragraph",
        text:
          "That is also why lasting impact depends on multi-stakeholder governance. Sustainable relationships between countries are not built by any single actor; they require governments, innovators, experts, and companies sharing responsibility for the outcome. It is slower and more demanding than a sale — and it is the only approach that holds.",
      },
      {
        type: "heading",
        text: "Ukraine has a story to tell",
      },
      {
        type: "paragraph",
        text:
          "Ukraine has a remarkable story to tell, with incredible companies and courageous leaders. Arxia's aim is to help carry that story into the world — supporting Ukrainian innovators as they bring their expert knowledge and solutions to new markets, alongside the partners already doing this work on the ground.",
      },
      {
        type: "paragraph",
        text:
          "For Carlos Parker, this has become a personal mission in Ukraine. The goal is easy to state and harder to do: build the bridges that let public technology — and the people behind it — move between countries. Let's build those bridges.",
      },
      {
        type: "cta",
        text: "Explore Arxia's work in Digital Government →",
        href: "/e-services",
      },
    ],
  },
  {
    slug: "arxia-rcg-consulting-ai-accelerator-cluj-napoca",
    isoDate: "2026-05-14",
    datePrecision: "month",
    title: "From pilot to practice: Arxia launches the AI Accelerator Program with RCG Consulting in Cluj-Napoca",
    excerpt: "Over two days in Cluj-Napoca, six RCG Consulting leaders became the firm's first AI Operators, building working workflows for EU grant proposals, document audits, contract drafting and invoice management.",
    metaDescription: "Arxia opened the AI Accelerator Program with RCG Consulting in Cluj-Napoca, Romania: a two-day workshop where six leaders built real AI workflows, followed by three months of governance, change management and training.",
    tags: ["AI Acceleration", "Case Study", "Europe"],
    coverImage: "/images/news/arxia-rcg-consulting-ai-accelerator-cluj-napoca/cover.jpg",
    coverAlt: "The RCG Consulting leadership team with Arxia during the AI Accelerator Program workshop in Cluj-Napoca.",
    body: [
      {
        type: "paragraph",
        text: "RCG Consulting helps organisations across Romania and the wider region navigate European funding, contracts, audits and the operational complexity that comes with growth. It is work that doesn't tolerate shortcuts: every document, clause and deadline matters. Bringing AI into that environment couldn't be a gimmick. It had to work.",
      },
      {
        type: "heading",
        text: "Two days, six AI Operators",
      },
      {
        type: "paragraph",
        text: "Arxia opened the AI Accelerator Program with a two-day workshop in Cluj-Napoca. Six RCG leaders — the people who will become the company's first AI Operators — built real workflows on Claude Cowork. Not demos, but processes they run every week.",
      },
      {
        type: "paragraph",
        text: "The team learned how to connect Claude to their internal systems, how to turn their own methodologies into skills the model applies consistently, and how to design workflows that one person builds and the whole organisation can replicate.",
      },
      {
        type: "heading",
        text: "What was built",
      },
      {
        type: "paragraph",
        text: "By the end of the workshop, the team had working pieces for:",
      },
      {
        type: "list",
        items: [
          {
            text: "Proposal preparation for European grants",
          },
          {
            text: "Document auditing",
          },
          {
            text: "Contract drafting",
          },
          {
            text: "Invoice management",
          },
        ],
      },
      {
        type: "paragraph",
        text: "The team also identified many more use cases to tackle next. That is the moment this kind of work aims for: when the question changes from \"can this help us?\" to \"what should we automate next?\"",
      },
      {
        type: "heading",
        text: "The harder part starts now",
      },
      {
        type: "paragraph",
        text: "The workshop was the first step. The next three months address the harder questions: how to operationalise AI across a firm where everyone works differently, how to set up governance so that AI use is consistent, traceable and respects client confidentiality, how to manage the doubts, habits and fears that come with change, and how to train the rest of the organisation so the knowledge does not stay with six people.",
      },
      {
        type: "paragraph",
        text: "Arxia will work side by side with RCG on governance, change management, internal training, and scaling the workflows from a pilot group to the whole company.",
      },
      {
        type: "heading",
        text: "A proven approach",
      },
      {
        type: "paragraph",
        text: "Arxia has worked on process optimisation and change management through digital transformation for more than ten years. Its AI operationalisation methodology has already been applied on three continents, with clients in banking, academia, retail, NGOs and consulting. Technology is not the point; the process is. Clients internalise the know-how, gain confidence, onboard their teams, champion the change and keep improving on their own.",
      },
      {
        type: "cta",
        text: "Learn more about the AI Acceleration Program →",
        href: "https://aiaccelerator.africa",
      },
    ],
  },
  {
    slug: "arxia-govtech-4-impact-world-congress-madrid-2026",
    isoDate: "2026-05-07",
    title: "Arxia at the Govtech 4 Impact World Congress in Madrid: DPI, AI in government and interoperability",
    excerpt: "Arxia joined public-sector leaders from four continents at G4I 2026 in Madrid to talk Digital Public Infrastructure, AI in government and interoperability — and helped staff the TYPO3 Community Expansion booth.",
    metaDescription: "Arxia took part in the Govtech 4 Impact World Congress (G4I 2026) in Madrid, 5–7 May, focusing on Digital Public Infrastructure, AI in government and interoperability, alongside the TYPO3 Association's Community Expansion Committee.",
    tags: ["Govtech", "Digital Public Infrastructure", "Event"],
    coverImage: "/images/news/arxia-govtech-4-impact-world-congress-madrid-2026/cover.jpg",
    coverAlt: "Members of the TYPO3 Community Expansion Committee, including Arxia, at their booth at the Govtech 4 Impact World Congress in Madrid.",
    coverCredit: "Photo: TYPO3 Association",
    body: [
      {
        type: "paragraph",
        text: "From 5 to 7 May, Madrid hosted the Govtech 4 Impact World Congress (G4I 2026), one of the year's main meeting points for people building technology for the public sector. Arxia was there with three conversations in mind.",
      },
      {
        type: "heading",
        text: "Three conversations",
      },
      {
        type: "paragraph",
        text: "Arxia's Carlos Parker went to Madrid to meet everyone working on:",
      },
      {
        type: "list",
        items: [
          {
            text: "Digital Public Infrastructure",
          },
          {
            text: "AI in government",
          },
          {
            text: "Interoperability",
          },
        ],
      },
      {
        type: "paragraph",
        text: "These three topics define Arxia's work with governments, and G4I brought together the people tackling them from both the public and private sides.",
      },
      {
        type: "image",
        src: "/images/news/arxia-govtech-4-impact-world-congress-madrid-2026/image-2.jpg",
        alt: "Carlos Parker, speaker card for G4I 2026 Madrid",
        width: 1200,
        height: 1200,
      },
      {
        type: "heading",
        text: "Governance and digital sovereignty at the TYPO3 booth",
      },
      {
        type: "paragraph",
        text: "Arxia also took part through the TYPO3 Association's Community Expansion Committee, which Arxia CEO Daniel Homorodean leads. Committee members from Canada, France, Germany, Norway, Romania and Spain staffed the booth. As the booth represented a non-profit association, the goal was not sales but a shared understanding of challenges and solutions — the foundation for sustainable adoption of community-based open source.",
      },
      {
        type: "paragraph",
        text: "Governance and digital sovereignty were high on everyone's agenda. Representatives from the public and private sector from 20 countries across four continents stopped by, from Argentina, Cambodia and Papua New Guinea to Iceland, Uruguay and the United States. After three days, the committee had a record number of conversations to follow up.",
      },
      {
        type: "image",
        src: "/images/news/arxia-govtech-4-impact-world-congress-madrid-2026/image-3.jpg",
        alt: "At the TYPO3 Community Expansion booth",
        width: 1280,
        height: 960,
        caption: "Conversations at the TYPO3 Community Expansion booth. Photo: TYPO3 Association.",
      },
      {
        type: "cta",
        text: "Explore Arxia's work in interoperability →",
        href: "/interoperability",
      },
    ],
  },
  {
    slug: "arxia-supports-fawe-uganda-ai-acceleration",
    isoDate: "2026-04-30",
    title:
      "Arxia supports FAWE Uganda in adopting Agentic AI through the AI Acceleration Program",
    excerpt:
      "Most Agentic AI conversations are happening in boardrooms — but non-profits stand to gain the most. Arxia ran its AI Ignite Workshop with FAWE Uganda to put real, responsible AI into the hands of a team advancing girls' education across Africa.",
    metaDescription:
      "Arxia partners with FAWE Uganda to bring Agentic AI to the non-profit sector through the AI Ignite Workshop and the AI Acceleration Program — practical, responsible AI for organizations advancing girls' education.",
    tags: ["AI Acceleration", "Non-profit", "Case Study"],
    coverImage: "/images/news/fawe-uganda/cover.jpg",
    coverAlt:
      "Arxia and FAWE Uganda team during the AI Ignite Workshop in Kampala",
    body: [
      {
        type: "paragraph",
        text:
          "Most of the conversation around Agentic AI is happening in boardrooms. Enterprises optimizing operations, SMEs automating sales, consultancies selling transformation roadmaps. Meanwhile, the organizations that arguably need this technology the most are barely part of the discussion: non-profits.",
      },
      {
        type: "heading",
        text: "Why non-profits are missing from the Agentic AI conversation",
      },
      {
        type: "paragraph",
        text:
          "Non-profits operate under permanent constraints — limited budgets, small teams, and missions that demand impact far beyond what their resources should reasonably allow. They are expected to do a lot with very little, every single day. If there is any sector where Agentic AI can genuinely change what is possible, it is this one. Not as a productivity gimmick, but as a way to give small teams operational capacity they have never had access to before.",
      },
      {
        type: "heading",
        text: "Six hours with FAWE Uganda",
      },
      {
        type: "paragraph",
        text:
          "This is exactly the conversation we had on April 30th with FAWE Uganda. FAWE is a pan-African organization that has spent decades advancing girls' and women's education across the continent. Their Uganda chapter works on the ground with schools, communities, and policy makers to remove the barriers that keep girls out of classrooms. The work is serious, and the team behind it carries an enormous load.",
      },
      {
        type: "image",
        src: "/images/news/fawe-uganda/image-2.jpg",
        alt: "FAWE Uganda team participating in Arxia's AI Ignite Workshop",
        caption: "FAWE Uganda team during the AI Ignite Workshop session.",
      },
      {
        type: "paragraph",
        text:
          "We spent six hours together running Arxia's AI Ignite Workshop — a hands-on session designed not to talk about AI in the abstract, but to show the FAWE Uganda team how Agentic AI can be applied directly to their day-to-day work. Real use cases, tested live, tailored to how they actually operate.",
      },
      {
        type: "paragraph",
        text:
          "We also spent meaningful time on how to use these tools safely and responsibly, which matters even more in the non-profit context, where trust, data sensitivity, and accountability sit at the core of every interaction.",
      },
      {
        type: "heading",
        text: "What comes next",
      },
      {
        type: "paragraph",
        text:
          "We are now moving into the next phase: helping FAWE Uganda implement Agentic AI into their core processes through the AI Acceleration Program, so the impact lasts well beyond the workshop and translates into measurable gains for the team and the communities they serve.",
      },
      {
        type: "paragraph",
        text:
          "If you work in or with the non-profit sector and you have been told this technology is not for you, or not yet for you, it is worth a second look. The teams doing the most important work deserve the best tools available.",
      },
      {
        type: "cta",
        text: "Learn more about the AI Acceleration Program →",
        href: "https://aiaccelerator.africa",
      },
    ],
  },
  {
    slug: "arxia-vision-africa-ai-ignite-workshop-kampala",
    isoDate: "2026-04-29",
    title: "Arxia and Vision Africa AI bring the AI Ignite Workshop to Ugandan organisations",
    excerpt: "At the Protea Hotel Kololo in Kampala, Arxia and Vision Africa AI ran a hands-on morning on AI operationalisation for Ugandan leaders, facilitated by Carlos Parker and CPA Dr. James Okello Onyoin.",
    metaDescription: "Arxia and Vision Africa AI held the AI Ignite Workshop in Kampala on 29 April 2026, a practical session on AI operationalisation for Ugandan organisations, facilitated by Carlos Parker (Arxia) and CPA Dr. James Okello Onyoin (HLB, Vision Africa AI).",
    tags: ["AI Acceleration", "Africa", "Event"],
    coverImage: "/images/news/arxia-vision-africa-ai-ignite-workshop-kampala/cover.jpg",
    coverAlt: "AI Ignite Workshop speaker card for Carlos Parker, Head of International Business at Arxia, Protea Hotel Kololo, 29 April 2026.",
    coverFit: "contain",
    body: [
      {
        type: "paragraph",
        text: "On 29 April, Arxia and Vision Africa AI joined forces for a practical workshop on AI operationalisation for Ugandan organisations at the Protea Hotel Kololo in Kampala.",
      },
      {
        type: "heading",
        text: "Two perspectives in one room",
      },
      {
        type: "paragraph",
        text: "The session was facilitated by Carlos Parker, Head of International Business at Arxia, and CPA Dr. James Okello Onyoin, Managing Partner at HLB and Board Chairperson of Vision Africa AI. It combined a global view of how organisations are adopting AI with practical applications in finance and business.",
      },
      {
        type: "image",
        src: "/images/news/arxia-vision-africa-ai-ignite-workshop-kampala/image-2.jpg",
        alt: "Speaker card for CPA Dr. James Okello Onyoin",
        width: 800,
        height: 1000,
      },
      {
        type: "heading",
        text: "From interest to operations",
      },
      {
        type: "paragraph",
        text: "The AI Ignite Workshop is built around one question: what systems and frameworks does an organisation need to adopt AI successfully? Participants explored how to integrate AI into the way they already work — streamlining operations, improving efficiency and driving scale — rather than treating it as a separate experiment.",
      },
      {
        type: "paragraph",
        text: "The workshop was full. For those who could not attend, it is the first of many actions in Uganda introducing Arxia's AI Accelerator Program.",
      },
      {
        type: "paragraph",
        text: "Arxia thanks Grace Labong, Clarissa Ociti and Patricia Atim for their support in organising the workshop.",
      },
      {
        type: "cta",
        text: "Learn more about the AI Acceleration Program →",
        href: "https://aiaccelerator.africa",
      },
    ],
  },
  {
    slug: "arxia-uganda-vice-chancellors-forum-ai-universities",
    isoDate: "2026-04-28",
    datePrecision: "month",
    title: "AI in Ugandan universities: Arxia and Vision Africa AI meet the Uganda Vice-Chancellors Forum",
    excerpt: "For more than three hours in Kampala, Arxia and Vision Africa AI worked with Uganda's university leaders on what it takes to bring AI into higher education — and to build AI operating systems that deliver results.",
    metaDescription: "Arxia and Vision Africa AI held a working session with the Uganda Vice-Chancellors Forum in Kampala on implementing AI in universities, AI operating systems, intellectual property and the future of education.",
    tags: ["AI Acceleration", "Higher Education", "Event"],
    coverImage: "/images/news/arxia-uganda-vice-chancellors-forum-ai-universities/cover.jpg",
    coverAlt: "Members of the Uganda Vice-Chancellors Forum with the Arxia and Vision Africa AI team in Kampala.",
    body: [
      {
        type: "paragraph",
        text: "Universities are being asked to prepare students for a world that AI is reshaping, while their own institutions run on processes built for a different era. In Kampala, Arxia sat down with the people who lead them.",
      },
      {
        type: "heading",
        text: "A working session with university leaders",
      },
      {
        type: "paragraph",
        text: "Together with partners Vision Africa AI, the Arxia team met the Uganda Vice-Chancellors Forum for a working session of more than three hours. The focus was practical: what does it take to implement AI in a university, and how do you build AI operating systems that produce results rather than pilots that fade?",
      },
      {
        type: "image",
        src: "/images/news/arxia-uganda-vice-chancellors-forum-ai-universities/image-2.jpg",
        alt: "Carlos Parker of Arxia with a member of the Uganda Vice-Chancellors Forum",
        width: 800,
        height: 1066,
      },
      {
        type: "heading",
        text: "Where higher education is heading",
      },
      {
        type: "paragraph",
        text: "The conversation also looked ahead, at where the sector is going and the challenges universities already face: rethinking intellectual property when AI is part of how knowledge is produced, and adapting to the new realities of teaching and learning.",
      },
      {
        type: "image",
        src: "/images/news/arxia-uganda-vice-chancellors-forum-ai-universities/image-3.jpg",
        alt: "Media coverage during the forum",
        width: 800,
        height: 1066,
      },
      {
        type: "heading",
        text: "Next steps",
      },
      {
        type: "paragraph",
        text: "Several initiatives came out of the session. Arxia and Vision Africa AI are now working on ways to accelerate AI adoption across Uganda's universities, building on the AI Acceleration Program already running with Ugandan organisations.",
      },
      {
        type: "cta",
        text: "Learn more about the AI Acceleration Program →",
        href: "https://aiaccelerator.africa",
      },
    ],
  },
  {
    slug: "arxia-cambodia-social-protection-interoperability-govstack",
    isoDate: "2026-04-24",
    datePrecision: "month",
    title: "10% technology, 90% mindset: Arxia supports Cambodia's Digital Social Protection Platform on interoperability",
    excerpt: "Arxia spent a week with Cambodia's National Social Protection Council on data harmonisation, process re-engineering and integration with the national X-Road, ending with a hands-on GovStack workshop.",
    metaDescription: "Arxia supported Cambodia's National Social Protection Council in evolving the Digital Social Protection Platform: data registry harmonisation, process optimisation, X-Road integration and a GovStack workshop.",
    tags: ["Interoperability", "GovStack", "Event"],
    coverImage: "/images/news/arxia-cambodia-social-protection-interoperability-govstack/cover.jpg",
    coverAlt: "Daniel Homorodean of Arxia with the National Social Protection Council team in Cambodia after the GovStack workshop.",
    body: [
      {
        type: "paragraph",
        text: "Interoperability in digital government is 10% about the right technology and 90% about mindset and governance. Arxia brought that view to Cambodia.",
      },
      {
        type: "heading",
        text: "The mission",
      },
      {
        type: "paragraph",
        text: "Arxia was asked to support the evolution of the Cambodia Digital Social Protection Platform into an integrated, inclusive ecosystem that connects every domain service operator while protecting data integrity and security and keeping process flows effective.",
      },
      {
        type: "paragraph",
        text: "For a week, Arxia CEO Daniel Homorodean worked with the National Social Protection Council (NSPC) on a full interoperability approach: harmonising data-registry models, analysing and optimising processes, and carrying out the technical analysis to speed up integration into Cambodia's national X-Road implementation. The work ran alongside the regulatory pathway that is strengthening institutional alignment.",
      },
      {
        type: "image",
        src: "/images/news/arxia-cambodia-social-protection-interoperability-govstack/image-4.jpg",
        alt: "Working session with the National Social Protection Council",
        width: 1280,
        height: 960,
      },
      {
        type: "heading",
        text: "A hands-on GovStack workshop",
      },
      {
        type: "paragraph",
        text: "The week ended with an in-depth, hands-on workshop on GovStack's concepts, methodologies and specifications, tailored to NSPC's mission and plans.",
      },
      {
        type: "image",
        src: "/images/news/arxia-cambodia-social-protection-interoperability-govstack/image-2.jpg",
        alt: "GovStack workshop: the Payments Building Block",
        width: 1280,
        height: 738,
        caption: "Walking through GovStack building blocks with the NSPC team.",
      },
      {
        type: "heading",
        text: "Four takeaways",
      },
      {
        type: "list",
        items: [
          {
            lead: "Data first.",
            text: "Collect, correct, process, store, protect and harmonise your data. Establish a single source of truth, and interoperability by design follows.",
          },
          {
            lead: "Re-engineer, don't replicate.",
            text: "Digitalising today's bureaucracy is not transformation. Process re-engineering and change strategy belong in every public service manager's toolbox, not only in IT's.",
          },
          {
            lead: "Don't wait for regulation.",
            text: "Good processes and technology for personal data protection and consent management are basic features of a digital ecosystem that serves citizens, not just legal obligations.",
          },
          {
            lead: "Technology follows concept.",
            text: "It should empower, not trap. Standardised data structures, executable process models, modular technology-agnostic architectures, open source and Digital Public Goods make this easier than it used to be.",
          },
        ],
        ordered: true,
      },
      {
        type: "paragraph",
        text: "Arxia looks forward to continuing this journey with Cambodia.",
      },
      {
        type: "cta",
        text: "Explore Arxia's work in interoperability →",
        href: "/interoperability",
      },
    ],
  },
  {
    slug: "icglr-adopts-mining-minerals-data-sharing-standard-brazzaville",
    isoDate: "2026-04-10",
    title: "Twelve countries, one data language: ICGLR adopts the Mining & Minerals Data Sharing Standard developed with Arxia",
    excerpt: "In Brazzaville, the 12 member states of the International Conference on the Great Lakes Region adopted a common standard for mining and minerals data — the result of almost two years of work with Arxia on traceability from mine site to export.",
    metaDescription: "The 12 ICGLR member states adopted the Mining & Minerals Data Sharing Standard in Brazzaville (8–10 April 2026), developed with Arxia to support traceability and auditing of mining data across Central and East Africa.",
    tags: ["Interoperability", "Digital Public Infrastructure", "Event"],
    coverImage: "/images/news/icglr-adopts-mining-minerals-data-sharing-standard-brazzaville/cover.jpg",
    coverAlt: "Daniel Homorodean of Arxia presenting the Mining & Minerals Data Sharing Standard to ICGLR member-state representatives in Brazzaville.",
    body: [
      {
        type: "paragraph",
        text: "Across the Great Lakes region, twelve countries were recording the same things in twelve different ways. A mine, a licence, a shipment: each state had its own definition. Records did not survive crossing a border, and regional reporting meant reconciling spreadsheets that were never designed to fit together.",
      },
      {
        type: "paragraph",
        text: "From 8 to 10 April in Brazzaville, that changed.",
      },
      {
        type: "heading",
        text: "A standard adopted by twelve member states",
      },
      {
        type: "paragraph",
        text: "Representatives of the 12 member states of the International Conference on the Great Lakes Region (ICGLR) debated and adopted the Mining & Minerals Data Sharing Standard. From now on, it will support traceability and auditing of mining data across a region stretching from Central to East Africa.",
      },
      {
        type: "image",
        src: "/images/news/icglr-adopts-mining-minerals-data-sharing-standard-brazzaville/image-2.jpg",
        alt: "ICGLR member-state delegates during the Brazzaville session",
        width: 1280,
        height: 960,
        caption: "Member-state delegates reviewing the standard in Brazzaville.",
      },
      {
        type: "heading",
        text: "Almost two years of work",
      },
      {
        type: "paragraph",
        text: "The adoption closes almost two years of Arxia's engagement with the ICGLR on the regional Data Sharing Policy and the Data Sharing Standard. Together they cover the collection, validation, reporting and updating of mining and minerals data at national and regional level: mine sites, licences, the full chain of custody, related operations and export tracing. Everything is expressed in semantic models with complete technical specifications for implementation.",
      },
      {
        type: "paragraph",
        text: "Arxia started from the data standard, not the software. The common model is published in JSON Schema, OpenAPI and JSON-LD, and on top of it sit offline mobile data capture in each country, an API-based interoperability layer, a regional reporting platform and immutable lifecycle records. When the standard evolves, the platform follows without being reprogrammed.",
      },
      {
        type: "image",
        src: "/images/news/icglr-adopts-mining-minerals-data-sharing-standard-brazzaville/image-3.jpg",
        alt: "Presenting the data model to the regional audience",
        width: 1280,
        height: 960,
      },
      {
        type: "heading",
        text: "What it means in practice",
      },
      {
        type: "paragraph",
        text: "A buyer, an auditor or a regulator can now trace a shipment from the mine to the certificate and verify it independently. For the region, this is a real step towards ending illegal and exploitative mining, and a clear example of how digital public infrastructure improves lives.",
      },
      {
        type: "heading",
        text: "Beyond mining",
      },
      {
        type: "paragraph",
        text: "The same problem exists in climate, agriculture, customs and public health, and it has the same answer: a neutral, shared data layer. Arxia sees the ICGLR standard as a signal for countries everywhere to establish full traceability of mining and minerals data, building on what the Great Lakes region has just achieved, and is ready to support that work.",
      },
      {
        type: "cta",
        text: "Explore Arxia's work in interoperability →",
        href: "/interoperability",
      },
    ],
  },
  {
    slug: "arxia-gobierna-tu-ia-shadow-ai-webinar",
    isoDate: "2026-04-02",
    title: "Govern AI, don't ban it: Arxia joins the 'Gobierna tu IA' panel on Shadow AI",
    excerpt: "While leadership debates whether to adopt AI, teams are already using it — often without anyone knowing. Arxia's Carlos Parker joined the first episode of the 'Gobierna tu IA' series to discuss how organisations can bring Shadow AI into the light.",
    metaDescription: "Carlos Parker of Arxia joined the 'Gobierna tu IA' webinar series (Episode I) with leaders in AI governance and security to discuss Shadow AI risks and how to put controls in place without stifling innovation.",
    tags: ["AI Governance", "Webinar", "Event"],
    coverImage: "/images/news/arxia-gobierna-tu-ia-shadow-ai-webinar/cover.jpg",
    coverAlt: "Flyer for the 'Gobierna tu IA' webinar, Episode I: What is Shadow AI?, featuring Carlos Parker of Arxia among the panellists.",
    coverFit: "contain",
    body: [
      {
        type: "paragraph",
        text: "While organisations debate whether to implement AI, their teams are already using it — and leadership often doesn't know. That is Shadow AI, and on 2 April it was the subject of the first episode of \"Gobierna tu IA\", an open webinar series on AI governance.",
      },
      {
        type: "heading",
        text: "The problem with prohibition",
      },
      {
        type: "paragraph",
        text: "AI adoption is moving faster than internal policies can keep up with. The instinctive reaction of many companies is to ban it. But a ban does not stop use; it pushes it into the shadows, where it exposes the organisation to security risks, data loss and compliance gaps that nobody is tracking.",
      },
      {
        type: "heading",
        text: "What the panel covered",
      },
      {
        type: "paragraph",
        text: "Arxia's Carlos Parker joined a panel of leaders in AI governance and security — Eric Vargas, Gustavo Venegas and Edison Vásquez Droguett — to work through three questions:",
      },
      {
        type: "list",
        items: [
          {
            lead: "What Shadow AI really is",
            text: ", and why it operates under the radar.",
          },
          {
            lead: "The risk map",
            text: "its quiet but very real impact on corporate security.",
          },
          {
            lead: "Strategy",
            text: "how to put controls in place that protect the organisation without suffocating innovation.",
          },
        ],
      },
      {
        type: "heading",
        text: "Governance at the centre of adoption",
      },
      {
        type: "paragraph",
        text: "The conclusion fits Arxia's approach to AI adoption: the goal is not to forbid AI, but to govern it. Clear policies, data governance and traceable use are what let teams use AI openly and safely. This thinking later shaped Arxia's partnership with Gobierna Tus Datos to strengthen the data-governance side of its AI Accelerator offer.",
      },
      {
        type: "cta",
        text: "Explore Arxia's work in data governance →",
        href: "/data-governance",
      },
    ],
  },
  {
    slug: "arxia-uganda-ai-acceleration-mission-kampala-gulu",
    isoDate: "2026-03-31",
    datePrecision: "month",
    title: "Two weeks in Kampala and Gulu: Arxia takes AI acceleration to Uganda's business and public ecosystem",
    excerpt: "Arxia's Carlos Parker and Grace Labong spent two weeks meeting Ugandan institutions, banks, universities, associations and BPO and IT companies — all looking for a way through the AI noise to direct, measurable results.",
    metaDescription: "Arxia's two-week mission in Kampala and Gulu, Uganda, engaged government institutions, banks, universities and BPO companies, including Exquisite Solution Limited, on adopting AI in their operations through the AI Acceleration Program.",
    tags: ["AI Acceleration", "Africa", "Event"],
    coverImage: "/images/news/arxia-uganda-ai-acceleration-mission-kampala-gulu/cover.jpg",
    coverAlt: "Carlos Parker of Arxia with the team of Exquisite Solution Limited at their offices in Uganda.",
    coverFit: "contain",
    body: [
      {
        type: "paragraph",
        text: "Uganda has what any innovation agenda needs: a dynamic business environment, an appetite to expand, and fertile ground for technology. In March, Arxia went to see that potential up close.",
      },
      {
        type: "heading",
        text: "A two-week mission",
      },
      {
        type: "paragraph",
        text: "Arxia colleagues Carlos Parker and Grace Labong spent two weeks in Kampala and Gulu meeting the organisations that shape the country's economy: government institutions, associations, banks, universities, and BPO and IT companies. Each conversation started from the same question: how do you get past the AI \"hype and noise\" and turn it into direct, fast results for your operations?",
      },
      {
        type: "heading",
        text: "A BPO pioneer adapting to the AI era",
      },
      {
        type: "paragraph",
        text: "One of those conversations was with Exquisite Solution Limited, one of the companies that pioneered the business process outsourcing industry in Uganda. Having built that industry, they are now among the first to adapt BPO services to the AI era — rethinking how work is delivered when agents can take on part of the process.",
      },
      {
        type: "image",
        src: "/images/news/arxia-uganda-ai-acceleration-mission-kampala-gulu/image-2.jpg",
        alt: "Arxia and Exquisite Solution Limited in a working session",
        width: 800,
        height: 1008,
        caption: "Working session with the Exquisite Solution Limited team.",
      },
      {
        type: "heading",
        text: "From conversations to practical work",
      },
      {
        type: "paragraph",
        text: "The mission produced strong feedback and practical work started straight away with several clients. It also laid the ground for what followed in the weeks after: AI Ignite workshops in Kampala and a growing pipeline of Ugandan organisations moving into Arxia's AI Acceleration Program.",
      },
      {
        type: "paragraph",
        text: "Arxia has a local presence in Uganda and a clear view of the market's potential. The plan is to keep pushing AI-operationalisation support in every direction the ecosystem is ready to go.",
      },
      {
        type: "cta",
        text: "Learn more about the AI Acceleration Program →",
        href: "https://aiaccelerator.africa",
      },
    ],
  },
  {
    slug: "arxia-pravaida-govtech-lab-ukraine-demo-day-kyiv",
    isoDate: "2026-01-30",
    datePrecision: "month",
    title: "Pravaida reaches the GovTech Lab Ukraine Demo Day: a Chile–Romania–Ukraine consortium for AI-powered legal guidance",
    excerpt: "Arxia, Chilean start-up Dolfs AI and Ukrainian partner Kitsoft took Pravaida — an AI assistant that helps citizens understand laws and regulations — to the final stage of GovTech Lab Ukraine, Kyiv's open-innovation programme for the public sector.",
    metaDescription: "Arxia, Dolfs AI and Kitsoft presented Pravaida, an AI assistant for citizen legal and regulatory guidance, as finalists at the GovTech Lab Ukraine Demo Day organised by the Global Government Technology Centre Kyiv.",
    tags: ["Govtech", "Artificial Intelligence", "Event"],
    coverImage: "/images/news/arxia-pravaida-govtech-lab-ukraine-demo-day-kyiv/cover.jpg",
    coverAlt: "Carlos Parker of Arxia presenting Pravaida during the GovTech Lab Ukraine programme in Kyiv.",
    body: [
      {
        type: "paragraph",
        text: "Most citizens never read a law. They need to know what a law means for them, today, in plain language. That was the problem behind Pravaida, and it took Arxia to the final stage of one of Europe's most demanding public-sector innovation programmes.",
      },
      {
        type: "heading",
        text: "An open-innovation challenge in Kyiv",
      },
      {
        type: "paragraph",
        text: "GovTech Lab Ukraine is the open-innovation programme run by the Global Government Technology Centre Kyiv with the Ministry of Digital Transformation of Ukraine and the World Economic Forum. It pairs government institutions with innovators to design and test digital solutions before they scale. In its 2026 edition, one of the challenges focused on legal assistance, with the Ministry of Justice of Ukraine as the partner institution.",
      },
      {
        type: "paragraph",
        text: "Arxia entered the challenge as part of an intercontinental consortium: Arxia from Romania, the Chilean start-up Dolfs AI, and Kitsoft, one of Ukraine's leading Govtech companies.",
      },
      {
        type: "heading",
        text: "What Pravaida does",
      },
      {
        type: "paragraph",
        text: "Pravaida is an AI assistant that lets governments give citizens accurate information on legislation and regulations through flexible conversational channels — automatically, simply and precisely. It was built on the Dolfs AI Studio platform, as one of the first products of a joint effort to develop AI solutions for governments.",
      },
      {
        type: "image",
        src: "/images/news/arxia-pravaida-govtech-lab-ukraine-demo-day-kyiv/image-3.jpg",
        alt: "Pravaida — GovTech Lab, Global Government Technology Centre Kyiv, Dolfs AI, Arxia, Kitsoft",
        width: 1200,
        height: 1200,
        caption: "Pravaida, developed by Dolfs AI, Arxia and Kitsoft for GovTech Lab Ukraine.",
      },
      {
        type: "heading",
        text: "From bootcamp to Demo Day",
      },
      {
        type: "paragraph",
        text: "As finalists, the team took part in an in-person bootcamp in Kyiv, working with national and international Govtech experts and with the public-sector team on user needs, hypotheses and pilot design. Arxia's Carlos Parker then presented the consortium's pilot platform at the programme's Demo Day, alongside the other finalist teams.",
      },
      {
        type: "image",
        src: "/images/news/arxia-pravaida-govtech-lab-ukraine-demo-day-kyiv/image-2.jpg",
        alt: "The GovTech Lab Ukraine audience in Kyiv",
        width: 1280,
        height: 853,
        caption: "Finalist presentations at the Global Government Technology Centre Kyiv.",
      },
      {
        type: "heading",
        text: "Why Ukraine",
      },
      {
        type: "paragraph",
        text: "Ukraine's Govtech story is one of the most remarkable anywhere: in roughly a decade the country moved from 105th to 5th place in global digital-government rankings, and it did so under full-scale invasion, while under physical and cyber attack, producing platforms such as Diia and Prozorro. Testing a solution in that environment, with that level of expertise in the room, was a privilege for the whole team.",
      },
      {
        type: "paragraph",
        text: "For Arxia, the experience also confirmed a conviction that runs through all of its work: the best public technology is built across borders, by Chileans, Romanians and Ukrainians working on the same problem.",
      },
      {
        type: "cta",
        text: "Explore Arxia's work on the agentic state →",
        href: "/agentic-state",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Localization — overlay translated text by stable slug. Body blocks are
// positional (same order as the English source); missing entries fall back.
// ─────────────────────────────────────────────────────────────────────────────
import { newsEs, type NewsArticleOverlay } from "./i18n/news.es";
import { newsFr } from "./i18n/news.fr";

const NEWS_OVERLAYS: Record<string, Record<string, NewsArticleOverlay>> = {
  es: newsEs,
  fr: newsFr,
};

const DATE_LOCALES: Record<string, string> = { en: "en-US", es: "es-ES", fr: "fr-FR" };

/** "May 24, 2026" / "24 de mayo de 2026" / "24 mai 2026", or month-only when imprecise. */
function formatNewsDate(a: NewsArticleSource, locale: string): string {
  const d = new Date(`${a.isoDate}T00:00:00Z`);
  return new Intl.DateTimeFormat(DATE_LOCALES[locale] ?? DATE_LOCALES.en, {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    ...(a.datePrecision === "month" ? {} : { day: "numeric" }),
  }).format(d);
}

function localizeArticle(a: NewsArticleSource, locale: string): NewsArticle {
  const date = formatNewsDate(a, locale);
  const ov = locale === "en" ? undefined : NEWS_OVERLAYS[locale]?.[a.slug];
  if (!ov) return { ...a, date };
  return {
    ...a,
    date,
    title: ov.title ?? a.title,
    excerpt: ov.excerpt ?? a.excerpt,
    metaDescription: ov.metaDescription ?? a.metaDescription,
    coverAlt: ov.coverAlt ?? a.coverAlt,
    coverCredit: ov.coverCredit ?? a.coverCredit,
    body: a.body.map((block, i): ArticleBlock => {
      const bo = ov.body?.[i];
      if (!bo) return block;
      if (block.type === "image") {
        return { ...block, alt: bo.alt ?? block.alt, caption: bo.caption ?? block.caption };
      }
      if (block.type === "list") {
        return {
          ...block,
          items: block.items.map((item, j) => ({
            lead: bo.items?.[j]?.lead ?? item.lead,
            text: bo.items?.[j]?.text ?? item.text,
          })),
        };
      }
      // heading | paragraph | cta — they all carry `text`
      return { ...block, text: bo.text ?? block.text };
    }),
  };
}

const byNewest = (a: NewsArticleSource, b: NewsArticleSource) =>
  b.isoDate.localeCompare(a.isoDate);

/** Every slug, for static params and the sitemap. */
export const newsSlugs: string[] = newsSources.map((a) => a.slug);

/** All articles, newest first, localized. */
export function getNewsArticles(locale: string = "en"): NewsArticle[] {
  return [...newsSources].sort(byNewest).map((a) => localizeArticle(a, locale));
}

/** The most recent `count` articles, for the homepage teaser. */
export function getLatestNews(locale: string = "en", count = 3): NewsArticle[] {
  return getNewsArticles(locale).slice(0, count);
}

export function getNewsArticle(
  slug: string,
  locale: string = "en"
): NewsArticle | undefined {
  const a = newsSources.find((a) => a.slug === slug);
  return a ? localizeArticle(a, locale) : undefined;
}
