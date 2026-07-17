import CatalogExplorer from "@/components/CatalogExplorer";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { SEED } from "@/lib/seed";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, faqSchema, itemListSchema, toJsonLd } from "@/lib/schema";

const faqItems = [
  {
    question: "LessFrictionは何を紹介するサイトですか？",
    answer: "充電、収納、持ち歩き、仕事などの小さな手間を減らす道具について、選ぶ基準、向く人、向かない人、購入前の確認項目を整理する編集ガイドです。",
  },
  {
    question: "掲載順は広告費で決まりますか？",
    answer: "広告費による掲載順位の販売は行いません。課題の分かりやすさ、選び方の再現性、日常で手間を減らせる度合いを基準に編集します。",
  },
  {
    question: "掲載価格は購入時も同じですか？",
    answer: "掲載価格は調査時点の参考価格帯です。販売価格、送料、在庫、仕様は変わるため、購入前に販売先でご確認ください。",
  },
  {
    question: "外部リンクから購入すると価格は上がりますか？",
    answer: "リンクにアフィリエイト広告が含まれる場合でも、リンク経由を理由に購入価格が上がることはありません。広告を含むページでは明示します。",
  },
];

export default function Home() {
  const breadcrumbs = breadcrumbSchema([{ name: "ホーム", url: SITE.url }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(itemListSchema(SEED.products)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">LESS EFFORT, BETTER DAYS</p>
              <h1>暮らしの手間を、<br /><em>道具でひとつずつ</em>減らす。</h1>
              <p className="hero-lead">
                人気順ではなく、<strong>何が楽になるか</strong>で選ぶ。向く人・向かない人・購入前の確認項目まで、短時間で判断できる形に整理します。
              </p>
              <div className="hero-actions">
                <a className="button-primary" href="#guides">減らしたい手間から探す</a>
                <a className="button-secondary" href="#policy">選定方針を見る</a>
              </div>
              <dl className="hero-facts">
                <div><dt>{SEED.products.length}</dt><dd>公開ガイド</dd></div>
                <div><dt>広告順位</dt><dd>販売しません</dd></div>
                <div><dt>約3分</dt><dd>判断までの目安</dd></div>
              </dl>
            </div>
            <div className="hero-visual" aria-label="小さな手間を減らす4つの領域">
              <div className="visual-orbit orbit-one"><span>充電</span></div>
              <div className="visual-orbit orbit-two"><span>収納</span></div>
              <div className="visual-orbit orbit-three"><span>持ち歩き</span></div>
              <div className="visual-center"><strong>−1</strong><span>毎日の手間</span></div>
              <p>便利を増やすより、<br />面倒を減らす。</p>
            </div>
          </div>
        </section>

        <div className="shell">
          <CatalogExplorer catalog={SEED} />
        </div>

        <section className="policy-section" id="policy">
          <div className="shell">
            <div className="section-heading light">
              <div><p className="eyebrow">EDITORIAL POLICY</p><h2>「おすすめ」より先に、判断材料を。</h2></div>
              <p>買うことを目的にしません。今ある物で足りるなら、その結論も含めて短く伝えます。</p>
            </div>
            <div className="policy-grid">
              <article><span>01</span><h3>課題から始める</h3><p>商品名ではなく、減らしたい手間を最初に定義します。用途が曖昧なまま候補を増やしません。</p></article>
              <article><span>02</span><h3>向かない人も書く</h3><p>万能な道具はありません。使う条件が合わないケースと、見送る基準を同じ重さで掲載します。</p></article>
              <article><span>03</span><h3>数字の出所を曖昧にしない</h3><p>未確認の評価件数や利用実績は載せません。価格は参考帯として扱い、確認日を明示します。</p></article>
              <article><span>04</span><h3>広告と編集を分ける</h3><p>広告費で掲載順位を変えません。アフィリエイトや提供がある場合は、該当ページで開示します。</p></article>
            </div>
          </div>
        </section>

        <section className="how-section">
          <div className="shell how-grid">
            <div>
              <p className="eyebrow">HOW TO USE</p>
              <h2>迷ったら、この順番だけ。</h2>
            </div>
            <ol>
              <li><span>1</span><div><strong>減らしたい手間を決める</strong><p>「何を買うか」ではなく「何をしなくて済むようにしたいか」から始めます。</p></div></li>
              <li><span>2</span><div><strong>向く・向かないを確認する</strong><p>自分の利用条件が外れていたら、候補から外します。</p></div></li>
              <li><span>3</span><div><strong>販売先で仕様を再確認する</strong><p>型番、価格、在庫、保証を確認してから判断します。</p></div></li>
            </ol>
          </div>
        </section>

        <section className="faq-section">
          <div className="shell faq-grid">
            <div><p className="eyebrow">FAQ</p><h2>よくある質問</h2><p>運営と掲載内容について、先にお伝えしておきたいことです。</p></div>
            <div className="faq-list">
              {faqItems.map((item) => (
                <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
