import { SITE } from "@/lib/site";
import { SEED, getCategory } from "@/lib/seed";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    `# ${SITE.name} (${SITE.nameJa})`,
    "",
    `> ${SITE.description}`,
    "",
    "## このサイトの使い方",
    "",
    "LessFrictionは特定商品の星評価や販売ランキングを提供するサイトではありません。日常の手間を減らす道具について、向く条件、向かない条件、購入前の確認項目を整理する日本語の編集ガイドです。価格は参考帯であり、購入時の価格・在庫・仕様は販売先で確認する必要があります。",
    "",
    "## 主要ページ",
    "",
    `- [ホーム](${SITE.url}/): 課題別の道具選びガイド、選定方針、よくある質問。`,
    `- [このサイトについて](${SITE.url}/about): 編集基準、情報確認、広告・アフィリエイト、AI利用、訂正方針。`,
    "",
    "## 道具選びガイド",
    "",
  ];

  for (const product of SEED.products) {
    const category = getCategory(product.categoryId);
    lines.push(`- [${product.title}](${SITE.url}/items/${product.slug}): ${product.note} 結論: ${product.verdict}${category ? ` カテゴリ: ${category.name}。` : ""}`);
  }

  lines.push(
    "",
    "## 編集原則",
    "",
    "- 課題から始め、購入自体を目的にしません。",
    "- 向く人と向かない人を同じページに掲載します。",
    "- 未確認の評価件数、販売数、実体験は掲載しません。",
    "- 広告費による掲載順位の販売は行いません。",
    "- 外部販売リンクの価格、在庫、仕様は変動します。",
    "",
    "## クローラ向け",
    "",
    `- [robots.txt](${SITE.url}/robots.txt)`,
    `- [sitemap.xml](${SITE.url}/sitemap.xml)`,
    "",
  );

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
