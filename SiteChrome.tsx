import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label={`${SITE.name} ホーム`}>
          <span className="brand-mark" aria-hidden="true">LF</span>
          <span>
            <strong>{SITE.name}</strong>
            <small>{SITE.nameJa}</small>
          </span>
        </Link>
        <nav className="global-nav" aria-label="メインナビゲーション">
          <Link href="/#guides">道具を探す</Link>
          <Link href="/#policy">選定方針</Link>
          <Link href="/about">このサイトについて</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="footer-brand" href="/">{SITE.name}</Link>
          <p>{SITE.tagline}</p>
        </div>
        <nav aria-label="フッターナビゲーション">
          <Link href="/about">運営・編集方針</Link>
          <Link href="/about#advertising">広告・アフィリエイト開示</Link>
          <Link href="/sitemap.xml">サイトマップ</Link>
          <Link href="/llms.txt">llms.txt</Link>
        </nav>
        <p className="footer-note">
          掲載価格・在庫・仕様は変わる場合があります。購入前に販売先の表示をご確認ください。
        </p>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 {SITE.publisher}</span>
        <span>最終確認 {SITE.lastReviewed}</span>
      </div>
    </footer>
  );
}
