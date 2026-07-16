from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
public = root / "public"

with Image.open(public / "icon-master.png") as image:
    image = image.convert("RGB")
    image.resize((192, 192), Image.Resampling.LANCZOS).save(public / "icon-192.png", optimize=True)
    image.resize((180, 180), Image.Resampling.LANCZOS).save(public / "apple-touch-icon.png", optimize=True)
    image.resize((32, 32), Image.Resampling.LANCZOS).save(public / "favicon.ico", format="ICO", sizes=[(32, 32)])

with Image.open(public / "og.png") as image:
    image = image.convert("RGB")
    target_ratio = 1200 / 630
    source_ratio = image.width / image.height
    if source_ratio > target_ratio:
        crop_width = round(image.height * target_ratio)
        left = (image.width - crop_width) // 2
        image = image.crop((left, 0, left + crop_width, image.height))
    elif source_ratio < target_ratio:
        crop_height = round(image.width / target_ratio)
        top = (image.height - crop_height) // 2
        image = image.crop((0, top, image.width, top + crop_height))
    image.resize((1200, 630), Image.Resampling.LANCZOS).save(public / "og.png", optimize=True)

print("Prepared:", public / "og.png", public / "icon-192.png", public / "apple-touch-icon.png", public / "favicon.ico")
