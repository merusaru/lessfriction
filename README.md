# LessFriction（レスフリクション）

**暮らしの手間を、道具でひとつずつ減らす。**

LessFrictionは、商品名や人気順位からではなく、「何の手間を減らしたいか」から道具を選ぶ日本語の編集ガイドです。向く人、向かない人、選定基準、購入前の確認項目を同じページに整理し、短時間で買う・見送るを判断できる構成にしています。

## 現在の公開内容

| ページ | 役割 |
|---|---|
| `/` | 価値提案、課題別検索、カテゴリ絞り込み、選定方針、FAQ |
| `/items/usb-c-100w-cable` | USB-C 100W対応ケーブルの選び方 |
| `/items/folding-storage-box` | 折りたたみ収納ボックスの選び方 |
| `/items/lightweight-folding-umbrella` | 軽量折りたたみ傘の選び方 |
| `/items/ai-prompt-book-guide` | 生成AIの入門書を選ぶ基準 |
| `/about` | 運営主体、選定基準、広告・AI利用・更新方針の開示 |
| `/robots.txt` | 検索・AIクローラー向けクロール方針 |
| `/sitemap.xml` | インデックス対象の実在URL一覧 |
| `/llms.txt` | 生成AI向けのサイト要約と主要URL |

## 設計方針

トップページと各詳細ページは検索エンジンがJavaScriptなしでも本文を取得できるよう静的生成します。各詳細ガイドには固有URL、固有タイトル、description、canonical、Open Graph、ArticleおよびBreadcrumbListの構造化データを付与しています。

未検証の実体験、評価件数、星評価、在庫、販売数は掲載しません。価格は調査時点の参考帯として扱い、購入前に販売先で型番、仕様、価格、在庫、保証を確認するよう明示します。アフィリエイトや提供を導入する場合は、該当ページと運営方針で開示してください。

## 技術構成

| 項目 | 採用技術 |
|---|---|
| フレームワーク | Next.js 16.2 / App Router |
| UI | React 19.2 / TypeScript 5 |
| スタイル | Tailwind CSS 4 + グローバルCSS |
| レンダリング | 静的生成を基本とするServer Components |
| インタラクション | クライアント側のキーワード検索・カテゴリ絞り込み |
| SEO | Metadata API、sitemap、robots、JSON-LD、llms.txt |

## セットアップ

Node.js 20以降とpnpmを前提にしています。

```bash
pnpm install
pnpm dev
```

本番確認は次の順で実行します。

```bash
pnpm lint
NEXT_PUBLIC_SITE_URL=https://your-domain.example pnpm build
pnpm start
```

## 環境変数

| 変数 | 必須 | 用途 |
|---|---:|---|
| `NEXT_PUBLIC_SITE_URL` | 本番では必須 | canonical、OG URL、sitemap、robots、構造化データに使う公開URL |

未指定時は `https://lessfriction.jp` を使用します。ドメイン取得前や別ドメインで公開する場合は、**必ず実際の公開URLを環境変数へ設定してからビルド**してください。

## コンテンツ更新

掲載ガイドは `src/lib/seed.ts` で一元管理します。新しいガイドを追加する際は、課題、向く人、向かない人、選定基準、購入前チェック、参考価格帯、確認日、参考リンクを揃えてください。詳細URLは `slug` から自動生成され、`generateStaticParams`、sitemap、ItemList、関連記事へ反映されます。

ブランド名、説明、運営主体、テーマカラー、最終確認日は `src/lib/site.ts` で管理します。確認日を更新する場合は、掲載内容も同日に再確認してください。

## 主要ファイル

```text
src/
├── app/
│   ├── layout.tsx                 # 共通メタデータ・WebSite/Organization JSON-LD
│   ├── page.tsx                   # トップ・FAQ・ItemList・選定方針
│   ├── about/page.tsx             # 運営・編集・広告・AI利用方針
│   ├── items/[slug]/page.tsx      # 固有メタデータ付き詳細ガイド
│   ├── robots.ts                  # robots.txt
│   ├── sitemap.ts                 # sitemap.xml
│   ├── llms.txt/route.ts          # llms.txt
│   ├── icon.svg                   # ブラウザアイコン
│   └── globals.css                # レスポンシブデザイン
├── components/
│   ├── SiteChrome.tsx             # 共通ヘッダー・フッター
│   └── CatalogExplorer.tsx        # 検索・カテゴリ絞り込み
└── lib/
    ├── site.ts                    # ブランド・URL・更新日
    ├── seed.ts                    # 編集ガイドデータ
    ├── types.ts                   # データ型
    └── schema.ts                  # JSON-LD生成

public/
├── og.png                         # 1200×630の共有画像
├── icon-192.png
├── icon-512.png
└── apple-touch-icon.png
```

## 検証

2026年7月11日時点で、`pnpm lint` と `pnpm build` はエラーなしで完了しています。トップ、About、4本の詳細ガイド、robots、sitemap、llms.txtはHTTP 200を返し、全HTMLページで固有title、description、HTTPS canonical、OG画像、H1が1個、解析可能なJSON-LDを確認しました。デスクトップとモバイルで横スクロールがないこと、キーワード検索とカテゴリ絞り込みが正しく動作することも確認済みです。

## 公開前チェック

公開先で `NEXT_PUBLIC_SITE_URL` を実URLへ設定し、Google Search Consoleへ所有権を登録してsitemapを送信してください。また、ブランド名とドメインの最終的な商標・権利確認は別途行ってください。現時点の公開検索では同名の日本語生活用品選定メディアは確認していませんが、これは法的な商標調査を代替しません。

## ライセンス

Private。公開・再配布条件は所有者が決定してください。
