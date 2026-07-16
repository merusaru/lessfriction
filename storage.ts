"use client";

import type { Catalog } from "./types";

// SSR安全な localStorage ラッパー。
// window.storage が存在する環境(旧サンドボックス互換)ではそれを優先し、
// 通常の Web ブラウザでは localStorage にフォールバックする。
const KEY = "tsunagaru-catalog-v1";

interface WindowStorageLike {
  get: (k: string, shared?: boolean) => Promise<{ value: string } | null>;
  set: (k: string, v: string, shared?: boolean) => Promise<unknown>;
}

function getWindowStorage(): WindowStorageLike | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { storage?: WindowStorageLike };
  return w.storage && typeof w.storage.get === "function" ? w.storage : null;
}

export async function loadCatalog(): Promise<Catalog | null> {
  if (typeof window === "undefined") return null;
  try {
    const ws = getWindowStorage();
    if (ws) {
      const r = await ws.get(KEY, true);
      if (r?.value) return JSON.parse(r.value) as Catalog;
      return null;
    }
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Catalog) : null;
  } catch (err) {
    console.warn("[storage] load failed", err);
    return null;
  }
}

export async function saveCatalog(catalog: Catalog): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const payload = JSON.stringify(catalog);
    const ws = getWindowStorage();
    if (ws) {
      await ws.set(KEY, payload, true);
      return true;
    }
    window.localStorage.setItem(KEY, payload);
    return true;
  } catch (err) {
    console.warn("[storage] save failed", err);
    return false;
  }
}
