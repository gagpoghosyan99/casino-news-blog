import {
  badCasinos,
  getCasinoBySlug,
  goodCasinos,
  top40Casinos,
} from "@/data/casinos";
import type { Casino } from "@/types";
import type { CasinoFilter } from "@/lib/casino-filter";

function withCanonicalBlogSlug(casino: Casino): Casino {
  return getCasinoBySlug(casino.slug) ?? casino;
}

export function getCasinosForDirectory(filter: CasinoFilter): Casino[] {
  if (filter === "good") return goodCasinos.map(withCanonicalBlogSlug);
  if (filter === "bad") return badCasinos.map(withCanonicalBlogSlug);
  return top40Casinos.map(withCanonicalBlogSlug);
}

export function getFeaturedDirectoryCasinos(limit = 10): Casino[] {
  return goodCasinos.slice(0, limit).map(withCanonicalBlogSlug);
}

export function getDirectoryListHeading(filter: CasinoFilter): string {
  if (filter === "good") return "Top-Rated Casino Reviews";
  if (filter === "bad") return "Casinos With Reported Concerns";
  return "Top 40 Online Casino Rankings";
}
