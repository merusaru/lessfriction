from __future__ import annotations

import json
import sys
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

BASE = "http://localhost:3000"
PATHS = [
    "/",
    "/about",
    "/items/usb-c-100w-cable",
    "/items/folding-storage-box",
    "/items/lightweight-folding-umbrella",
    "/items/ai-prompt-book-guide",
]

errors: list[str] = []
rows: list[tuple[str, str, str, int, list[str]]] = []

for path in PATHS:
    response = requests.get(urljoin(BASE, path), timeout=10)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    title = soup.title.get_text(strip=True) if soup.title else ""
    description_tag = soup.find("meta", attrs={"name": "description"})
    description = description_tag.get("content", "") if description_tag else ""
    canonical_tag = soup.find("link", attrs={"rel": "canonical"})
    canonical = canonical_tag.get("href", "") if canonical_tag else ""
    h1_count = len(soup.find_all("h1"))

    schema_types: list[str] = []
    for script in soup.find_all("script", attrs={"type": "application/ld+json"}):
        try:
            data = json.loads(script.string or "")
        except json.JSONDecodeError as exc:
            errors.append(f"{path}: JSON-LD parse error: {exc}")
            continue
        payloads = data if isinstance(data, list) else [data]
        for payload in payloads:
            if isinstance(payload, dict):
                schema_type = payload.get("@type")
                if isinstance(schema_type, str):
                    schema_types.append(schema_type)

    og_image = soup.find("meta", attrs={"property": "og:image"})
    og_image_url = og_image.get("content", "") if og_image else ""

    if not title:
        errors.append(f"{path}: missing title")
    if len(description) < 60:
        errors.append(f"{path}: description too short ({len(description)})")
    if h1_count != 1:
        errors.append(f"{path}: expected one h1, got {h1_count}")
    if not canonical.startswith("https://"):
        errors.append(f"{path}: invalid canonical {canonical!r}")
    if not og_image_url:
        errors.append(f"{path}: missing og:image")
    if not schema_types:
        errors.append(f"{path}: missing JSON-LD")

    rows.append((path, title, canonical, h1_count, schema_types))

for path, title, canonical, h1_count, schema_types in rows:
    print(f"{path}\n  title={title}\n  canonical={canonical}\n  h1={h1_count}\n  schemas={','.join(schema_types)}")

if errors:
    print("\nERRORS", file=sys.stderr)
    for error in errors:
        print(f"- {error}", file=sys.stderr)
    raise SystemExit(1)

print("\nAll metadata and JSON-LD checks passed.")
