import type { Category, Product } from "./types";
import { SITE } from "./site";

export function toJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export function guideSchema(product: Product, category?: Category) {
  const url = `${SITE.url}/items/${product.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: product.title,
    description: product.note,
    url,
    mainEntityOfPage: url,
    inLanguage: SITE.language,
    datePublished: new Date(product.ts).toISOString(),
    dateModified: new Date(product.updatedAt ?? product.ts).toISOString(),
    articleSection: category?.name,
    keywords: product.keywords.join(", "),
    author: {
      "@type": "Organization",
      name: SITE.author.name,
      url: `${SITE.url}${SITE.author.url}`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.publisher,
      url: SITE.url,
    },
    about: {
      "@type": "Thing",
      name: product.shortTitle,
      description: product.problem,
    },
  };
}

export function itemListSchema(products: Product[], name = `${SITE.name} 道具選びガイド`) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE.url}/items/${product.slug}`,
      name: product.title,
    })),
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "LessFrictionは何を紹介するサイトですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "充電、収納、持ち歩き、仕事などの小さな手間を減らす道具について、商品名の羅列ではなく、選ぶ基準、向く人、向かない人、購入前の確認項目を整理する編集ガイドです。",
        },
      },
      {
        "@type": "Question",
        name: "掲載順は広告費で決まりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "広告費による掲載順位の販売は行いません。課題の分かりやすさ、選び方の再現性、日常で手間を減らせる度合いを基準に編集します。広告や提供がある場合は各ページで明示します。",
        },
      },
      {
        "@type": "Question",
        name: "掲載価格は購入時も同じですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "掲載している価格は調査時点の参考価格帯です。販売価格、送料、在庫、仕様は販売先で変わるため、購入前に必ず販売ページをご確認ください。",
        },
      },
      {
        "@type": "Question",
        name: "外部リンクから購入すると価格は上がりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "リンクにアフィリエイト広告が含まれる場合でも、リンク経由を理由に購入価格が上がることはありません。広告を含むページではその旨を明示します。",
        },
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    alternateName: SITE.nameJa,
    url: SITE.url,
    inLanguage: SITE.language,
    description: SITE.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.publisher,
    url: SITE.url,
    logo: `${SITE.url}/icon.svg`,
    description: SITE.description,
    slogan: SITE.tagline,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
