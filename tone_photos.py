"""
サイトの写真の色と明るさをそろえる（決定事項（続き）§78）
- assets/img/web/ の写真を1枚ずつ補正して上書きする
- 元の写真は assets/img/web/_original/ に退避する（2回目以降は、退避済みの元写真から作り直す）
- カレンダー・ロゴなど「写真ではない画像」は補正しない
使い方：  python tone_photos.py    （リポジトリの一番上のフォルダで実行）
必要なもの： pip install pillow numpy
"""
import pathlib, shutil
import numpy as np
from PIL import Image, ImageEnhance

WEB = pathlib.Path("assets/img/web")
BACKUP = WEB / "_original"
SKIP = {"calendar-current.jpg", "logo.png", "favicon-source-official.png"}  # 写真ではないので補正しない

TARGET = np.array([1.04, 1.00, 0.95])  # ほんのり暖かい白
CAST = 0.6        # 色かぶりを6割だけ直す（直しすぎると不自然になるため）
BRIGHT = 0.68     # 平均の明るさをここにそろえる
SAT = 0.88        # 彩度を少し落として、写真どうしのトーンをそろえる
CONTRAST = 1.04

def tone(src, dst):
    a = np.asarray(Image.open(src).convert("RGB")).astype(np.float32) / 255
    m = a.reshape(-1, 3).mean(0)
    gain = 1 + CAST * (TARGET * m.mean() / m - 1)
    a = np.clip(a * gain, 0, 1)
    lum = (a @ [0.299, 0.587, 0.114]).mean()
    g = min(max(np.log(BRIGHT) / np.log(max(lum, 1e-3)), 0.6), 1.4)
    im = Image.fromarray((a ** g * 255).astype(np.uint8))
    im = ImageEnhance.Color(im).enhance(SAT)
    im = ImageEnhance.Contrast(im).enhance(CONTRAST)
    im.save(dst, quality=88, optimize=True, progressive=True)

BACKUP.mkdir(exist_ok=True)
for f in sorted(WEB.glob("*.jp*g")):
    if f.name in SKIP:
        continue
    orig = BACKUP / f.name
    if not orig.exists():
        shutil.copy2(f, orig)      # 初回だけ元写真を退避
    tone(orig, f)                  # いつも元写真から作るので、何回実行しても同じ結果
    print("補正:", f.name)
