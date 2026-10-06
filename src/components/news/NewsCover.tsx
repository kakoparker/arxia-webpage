import Image from "next/image";
import type { NewsArticle } from "@/data/news";

interface NewsCoverProps {
  article: Pick<NewsArticle, "coverImage" | "coverAlt" | "coverFit">;
  sizes: string;
  priority?: boolean;
  /** Subtle zoom when the surrounding `group` link is hovered (cards). */
  zoomOnHover?: boolean;
}

/**
 * Cover image for a news article. Fills a `relative` parent of fixed aspect.
 *
 * Landscape photos crop to fill. Portrait photos and flyers (`coverFit:
 * "contain"`) are shown whole, centred over a blurred, darkened copy of
 * themselves — no awkward crop through faces or flyer text, no empty bars.
 * Both layers share one `src` + `sizes`, so the browser downloads it once.
 */
export function NewsCover({ article, sizes, priority, zoomOnHover }: NewsCoverProps) {
  const zoom = zoomOnHover
    ? "transition-transform duration-500 group-hover:scale-[1.03]"
    : "";

  if (article.coverFit !== "contain") {
    return (
      <Image
        src={article.coverImage}
        alt={article.coverAlt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${zoom}`}
      />
    );
  }

  return (
    <>
      <Image
        src={article.coverImage}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover scale-110 blur-2xl"
      />
      <div className="absolute inset-0 bg-blueprint-dark/45" aria-hidden="true" />
      <Image
        src={article.coverImage}
        alt={article.coverAlt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-contain ${zoom}`}
      />
    </>
  );
}
