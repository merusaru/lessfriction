export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lessfriction.jp",
  name: "LessFriction",
  nameJa: "レスフリクション",
  tagline: "暮らしの手間を、道具でひとつずつ減らす。",
  description:
    "LessFriction（レスフリクション）は、充電・収納・持ち歩き・仕事の小さな面倒を減らす道具の選び方を、向く人・向かない人・購入前チェックまで整理する編集ガイドです。",
  locale: "ja_JP",
  language: "ja",
  author: {
    name: "LessFriction編集部",
    url: "/about",
  },
  publisher: "LessFriction編集部",
  themeColor: "#173f35",
  currency: "JPY",
  lastReviewed: "2026-07-11",
} as const;
