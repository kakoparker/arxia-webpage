export interface NewsArticle {
  date: string;
  title: string;
  excerpt: string;
  slug: string;
}

export const newsArticles: NewsArticle[] = [
  {
    date: "March 2026",
    title: "Arxia Launches New Digital Public Infrastructure Framework",
    excerpt:
      "Our latest framework for DPI adoption is designed to help governments accelerate their digital transformation journey with modular, interoperable building blocks.",
    slug: "dpi-framework-launch",
  },
  {
    date: "February 2026",
    title: "Partnership with International Trade Centre Expanded",
    excerpt:
      "Arxia deepens its collaboration with ITC to bring digital trade facilitation tools to emerging markets across Africa and Southeast Asia.",
    slug: "itc-partnership-expanded",
  },
  {
    date: "January 2026",
    title: "AI Ethics in Public Sector: Our Approach",
    excerpt:
      "How Arxia ensures transparency, fairness, and accountability in AI deployments for government agencies — a look at our ethical AI framework.",
    slug: "ai-ethics-public-sector",
  },
];
