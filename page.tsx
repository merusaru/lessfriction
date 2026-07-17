import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, toJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "このサイトについて・編集方針",
  description: `${SITE.name}の運営目的、道具選びガイドの編集基準、広告・アフィリエイト、AI利用、更新方針を公開しています。`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "ホーム", url: SITE.url },
    { name: "このサイトについて", url: `${SITE.url}/about` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <SiteHeader />
      <main>
        <header className="about-hero">
          <div className="shell">
            <nav className="breadcrumb" aria-label="パンくずリスト"><Link href="/">ホーム</Link><span aria-hidden="true"> / </span><span>このサイトについて</span></nav>
            <p className="eyebrow">ABOUT & POLICY</p>
            <h1>便利を増やすより、<br />面倒を減らしたい。</h1>
            <p>
              {SITE.name}は、毎日の小さな手間を減らす道具の「選び方」を整理する編集ガイドです。商品を多く見せるのではなく、短時間で買う・見送るを判断できる情報を目指します。
            </p>
          </div>
        </header>

        <div className="shell about-layout">
          <nav className="about-nav" aria-label="ページ内目次">
            <a href="#purpose">運営目的</a>
            <a href="#standard">編集・選定基準</a>
            <a href="#evidence">情報の確かめ方</a>
            <a href="#advertising">広告・アフィリエイト</a>
            <a href="#ai">AI利用</a>
            <a href="#updates">更新・訂正</a>
            <a href="#contact">お問い合わせ</a>
          </nav>

          <div className="about-content">
            <section id="purpose">
              <h2>運営目的</h2>
              <p>
                探す時間、比較する時間、買い直す手間を減らすことが目的です。「売れているから」ではなく、どの条件なら役に立ち、どの条件なら不要かを先に示します。会員登録なしで閲覧できます。
              </p>
            </section>

            <section id="standard">
              <h2>編集・選定基準</h2>
              <ul>
                <li><strong>課題が明確であること：</strong>どの手間を減らす道具か、一文で説明できるテーマを扱います。</li>
                <li><strong>選び方を再現できること：</strong>ブランド名だけでなく、寸法・規格・保証など購入前に確認できる条件を示します。</li>
                <li><strong>不向きな条件も書くこと：</strong>向かない人、注意点、今ある物で代用できる可能性を省きません。</li>
                <li><strong>広告で順位を変えないこと：</strong>広告費による掲載順の販売は行いません。</li>
              </ul>
            </section>

            <section id="evidence">
              <h2>情報の確かめ方</h2>
              <p>
                公開仕様、取扱説明書、メーカー情報、販売ページなど確認可能な情報を基に、一般的な選定基準として編集します。現在公開中の記事は特定商品の長期使用レビューではありません。そのため、未確認の星評価、レビュー件数、販売数、実使用期間は掲載しません。
              </p>
              <div className="notice-box">
                <strong>価格と在庫について</strong>
                <p>価格は調査時点の参考帯です。販売価格、送料、ポイント、在庫、仕様は変動するため、購入前に販売先でご確認ください。</p>
              </div>
            </section>

            <section id="advertising">
              <h2>広告・アフィリエイト開示</h2>
              <p>
                外部リンクの一部には、アフィリエイトプログラムを利用する場合があります。リンク経由で購入されると運営者に紹介料が支払われることがありますが、リンク経由を理由に読者の購入価格が上がることはありません。
              </p>
              <p>
                提供品・広告掲載・タイアップがある場合は、対象ページの分かりやすい位置に明示します。報酬の有無を理由に、注意点や不向きな条件を削除しません。
              </p>
            </section>

            <section id="ai">
              <h2>AI利用の開示</h2>
              <p>
                サイトのコード、情報設計、文章の下書きや校正に生成AIを利用する場合があります。AIの出力は公開前に編集し、根拠のない体験談や評価を追加しません。自動生成した大量ページを無確認で公開する運用は行いません。
              </p>
            </section>

            <section id="updates">
              <h2>更新・訂正方針</h2>
              <p>
                仕様変更、販売終了、法令・サービス変更などを確認した場合は内容を更新します。各ページに最終確認日を表示し、重要な誤りは確認後に訂正します。最終確認日は {SITE.lastReviewed} です。
              </p>
            </section>

            <section id="contact">
              <h2>お問い合わせ</h2>
              <p>
                現時点では公開問い合わせ窓口を準備中です。公開前に専用メールアドレスまたはフォームを設置し、事実誤認、権利侵害、広告表示に関する連絡先をこの欄へ掲載します。
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
