export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "cta"; text: string; href: string };

export interface NewsArticle {
  slug: string;
  date: string;
  isoDate: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  tags: string[];
  coverImage: string;
  coverAlt: string;
  body: ArticleBlock[];
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "arxia-supports-fawe-uganda-ai-acceleration",
    date: "April 30, 2026",
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
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
