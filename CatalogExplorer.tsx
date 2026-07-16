"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Catalog } from "@/lib/types";

export default function CatalogExplorer({ catalog, initialQuery = "" }: { catalog: Catalog; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [categoryId, setCategoryId] = useState("all");

  const products = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ja");
    return catalog.products.filter((product) => {
      const category = catalog.categories.find((item) => item.id === product.categoryId);
      const inCategory = categoryId === "all" || product.categoryId === categoryId;
      const haystack = [
        product.title,
        product.shortTitle,
        product.note,
        product.problem,
        ...product.keywords,
        category?.name ?? "",
      ]
        .join(" ")
        .toLocaleLowerCase("ja");
      return inCategory && (!normalized || haystack.includes(normalized));
    });
  }, [catalog, categoryId, query]);

  return (
    <section className="explorer" id="guides" aria-labelledby="guides-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">GUIDES</p>
          <h2 id="guides-title">減らしたい手間から探す</h2>
        </div>
        <p>商品名より先に、困りごとを決める。必要な仕様と、買わなくてよい条件まで整理しました。</p>
      </div>

      <div className="search-panel">
        <label className="search-box">
          <span className="sr-only">道具選びガイドを検索</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" /></svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例：充電、収納、傘"
          />
        </label>
        <div className="filter-row" aria-label="カテゴリで絞り込む">
          <button className={categoryId === "all" ? "active" : ""} onClick={() => setCategoryId("all")} type="button">
            すべて
          </button>
          {catalog.categories.map((category) => (
            <button
              key={category.id}
              className={categoryId === category.id ? "active" : ""}
              onClick={() => setCategoryId(category.id)}
              type="button"
            >
              <span aria-hidden="true">{category.emoji}</span> {category.name}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count" aria-live="polite">{products.length}件のガイド</p>
      <div className="guide-grid">
        {products.map((product, index) => {
          const category = catalog.categories.find((item) => item.id === product.categoryId);
          return (
            <article className="guide-card" key={product.id}>
              <div className="card-topline">
                <span className="category-label" style={{ "--accent": category?.accent } as React.CSSProperties}>
                  {category?.emoji} {category?.name}
                </span>
                <span className="guide-number">GUIDE {String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="guide-icon" aria-hidden="true">{product.emoji}</div>
              <h3><Link href={`/items/${product.slug}`}>{product.title}</Link></h3>
              <p className="problem-copy">{product.problem}</p>
              <p className="guide-note">{product.note}</p>
              <ul className="mini-checklist" aria-label="主な確認項目">
                {product.checklist.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="card-footer">
                <span>{product.price}</span>
                <Link className="text-link" href={`/items/${product.slug}`} aria-label={`${product.title}を読む`}>
                  選び方を読む <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      {products.length === 0 && (
        <div className="empty-state">
          <strong>該当するガイドがありません</strong>
          <p>言葉を短くするか、カテゴリを「すべて」に戻してお試しください。</p>
          <button type="button" onClick={() => { setQuery(""); setCategoryId("all"); }}>絞り込みを解除</button>
        </div>
      )}
    </section>
  );
}
