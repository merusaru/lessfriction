import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SEED } from "@/lib/seed";

export default function sitemap(): MetadataRoute.Sitemap {
  const reviewed = new Date(SEED.updatedAt);
  return [
    {
      url: SITE.url,
      lastModified: reviewed,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: reviewed,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...SEED.products.map((product) => ({
      url: `${SITE.url}/items/${product.slug}`,
      lastModified: new Date(product.updatedAt ?? product.ts),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
