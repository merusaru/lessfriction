export type ZoneKey = "river" | "pond" | "sea";

export interface Category {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  zone: ZoneKey;
  intro: string;
  problem: string;
  accent: string;
}

export interface Product {
  id: string;
  slug: string;
  categoryId: string;
  title: string;
  shortTitle: string;
  emoji: string;
  price: string;
  priceMin?: number;
  priceMax?: number;
  note: string;
  url: string;
  problem: string;
  verdict: string;
  bestFor: string[];
  notFor: string[];
  checklist: string[];
  pros: string[];
  cautions: string[];
  keywords: string[];
  clicks: number;
  ts: number;
  pinned?: boolean;
  updatedAt?: number;
}

export interface Catalog {
  categories: Category[];
  products: Product[];
  updatedAt: number;
}
