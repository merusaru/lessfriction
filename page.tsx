import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getCategory, getProductBySlug, SEED } from "@/lib/seed";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, guideSchema, toJsonLd } from "@/lib/schema";

export function generateStaticParams() {
  return SEED.products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: `${product.note} ${product.verdict}`,
    keywords: product.keywords,
    alternates: { canonical: `/items/${product.slug}` },
    openGraph: {
      type: "article",
      title: `${product.title}｜${SITE.name}`,
      description: product.note,
      url: `${SITE.url}/items/${product.slug}`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${product.title} — ${SITE.name}` }],
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const category = getCategory(product.categoryId);
  const related = SEED.products.filter((item) => item.id !== product.id).slice(0, 3);
  const breadcrumbs = breadcrumbSchema([
    { name: "ホーム", url: SITE.url },
    { name: category?.name ?? "道具選び", url: `${SITE.url}/#guides` },
    { name: product.title, url: `${SITE.url}/items/${product.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(guideSchema(product, category)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <SiteHeader />
      <main>
        <header className="article-hero">
          <div className="shell">
            <nav className="breadcrumb" aria-label="パンくずリスト">
              <Link href="/">ホーム</Link><span aria-hidden="true"> / </span>
              <Link href="/#guides">{category?.name ?? "道具選び"}</Link><span aria-hidden="true"> / </span>
              <span>{product.shortTitle}</span>
            </nav>
            <div className="article-hero-grid">
              <div>
                <span className="article-kicker">{category?.emoji} {category?.name} ／ 選び方ガイド</span>
                <h1>{product.title}</h1>
                <p className="article-deck">{product.note}</p>
                <div className="article-meta">
                  <span>更新 {SITE.lastReviewed}</span>
                  <span>{product.price}</span>
                  <span>執筆 {SITE.author.name}</span>
                </div>
              </div>
              <div className="article-symbol" aria-hidden="true">{product.emoji}</div>
            </div>
          </div>
        </header>

        <div className="shell article-layout">
          <article className="article-body">
            <h2 id="conclusion">先に結論</h2>
            <div className="verdict-box">
              <span>LESSFRICTION VERDICT</span>
              <p>{product.verdict}</p>
            </div>

            <h2 id="problem">この道具で減らせる手間</h2>
            <p>{product.problem}</p>
            <p>
              道具を増やすほど管理も増えます。まず今ある物で代用できるかを確認し、それでも繰り返し発生する手間だけを対象にすると、買った後の持て余しを減らせます。
            </p>

            <h2 id="fit">向く人・向かない人</h2>
            <div className="fit-grid">
              <section className="fit-box good">
                <h3>向いている人</h3>
                <ul>{product.bestFor.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section className="fit-box caution">
                <h3>見送ってよい人</h3>
                <ul>{product.notFor.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            </div>

            <h2 id="check">購入前に確認すること</h2>
            <ol className="check-list">
              {product.checklist.map((item) => <li key={item}>{item}</li>)}
            </ol>

            <h2 id="tradeoff">良い点と注意点</h2>
            <div className="fit-grid">
              <section className="fit-box good">
                <h3>期待できること</h3>
                <ul>{product.pros.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section className="fit-box caution">
                <h3>購入前の注意</h3>
                <ul>{product.cautions.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            </div>

            <section className="compare-link-box" id="compare">
              <h2>条件を満たす候補を比較する</h2>
              <p>
                上の確認項目をメモしてから販売先を開くと、価格だけで選びにくくなります。リンク先の検索結果には条件を満たさない商品も含まれるため、型番・仕様・保証を販売ページで再確認してください。
              </p>
              <a className="external-button" href={product.url} target="_blank" rel="sponsored nofollow noopener">
                Amazonで候補を比較する <span aria-hidden="true">↗</span>
              </a>
              <p className="disclosure">
                外部の販売サイトへ移動します。価格・在庫・仕様は変動します。リンクにアフィリエイト広告が含まれる場合、購入価格を変えずに運営者へ紹介料が支払われることがあります。
              </p>
            </section>
          </article>

          <aside className="article-sidebar" aria-label="この記事の目次">
            <h2>このガイドの内容</h2>
            <nav>
              <a href="#conclusion">先に結論</a>
              <a href="#problem">減らせる手間</a>
              <a href="#fit">向く人・向かない人</a>
              <a href="#check">購入前チェック</a>
              <a href="#tradeoff">良い点と注意点</a>
              <a href="#compare">候補を比較</a>
            </nav>
            <hr />
            <p>判断基準は編集部が作成しています。特定商品の使用レビューではありません。</p>
          </aside>
        </div>

        <section className="related-section">
          <div className="shell">
            <h2>ほかの手間も減らす</h2>
            <div className="related-grid">
              {related.map((item) => (
                <Link className="related-card" href={`/items/${item.slug}`} key={item.id}>
                  <span aria-hidden="true">{item.emoji}</span>
                  <strong>{item.title}</strong>
                  <p>{item.problem}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
