# ハダノコトサロン 公式サイト

福岡県久留米市の完全予約制・完全個室プライベートサロン「ハダノコトサロン」の公式サイトです。

- 公開URL：https://hadanokoto.github.io/hadanokoto-site/
- 構成：静的HTML/CSS（フレームワーク・ビルド工程なし）
- 制作：2026-07-04（公式サイト制作指示書_ClaudeCode用.md に基づく）

## ページ構成

| ファイル | 内容 |
|---|---|
| index.html | トップ（ファーストビュー・リード文・3つの柱） |
| matsuyani.html | バイオウォーミーパック（マツヤニパック） |
| menu.html | メニュー・料金（全メニュー掲載） |
| about.html | サロン・オーナー紹介 |
| access.html | アクセス・ご予約（地図・LINE） |

共通要素：ヘッダー（ロゴ＋ナビ）／フッター（住所・営業時間・LINE・SNS）／全ページ右下に固定「LINEで予約」ボタン。

## 写真差し替え箇所一覧

現在は「写真準備中」のプレースホルダー表示です。写真素材が揃い次第、以下を差し替えてください。
差し替え方法：`assets/img/` に写真を置き、該当ページの `<div class="ph">…</div>` を `<img src="assets/img/ファイル名" alt="説明">` に置き換える。

| ページ | 箇所 | 内容 |
|---|---|---|
| matsuyani.html | 見出し直下 | マツヤニパック施術イメージ 1点 |
| about.html | ページ冒頭（2枚並び） | サロン内観 2点 |
| about.html | 「オーナーより」冒頭 | オーナー写真 1点 |

※旧サイトで使用していた写真（店内画像.jpg・マツヤニ.jpg など）は `assets/img/` に残してあります。差し替え候補として利用できます。

## ロゴ

`assets/img/hadanokologojpg.jpg`（版画調・モノクロ・ロバが左向き・カゴ2つ）。AI生成ロゴの作成・代用は禁止。

## 原稿・文章について

全ページの文章は「公式サイト制作指示書_ClaudeCode用.md」の原稿（薬機法・景表法チェック済み）をそのまま使用しています。**文章を変更する場合は必ず指示書側を正本として更新してから反映すること。** 効能断定（治る・改善・アンチエイジング等）への書き換えは禁止。

## 独自ドメイン（hadanokoto.com）取得後の設定手順

1. **DNS設定（ドメイン取得サービス側）**
   - `www.hadanokoto.com` → CNAMEレコードで `hadanokoto.github.io` を指定
   - apexドメイン（hadanokoto.com）も使う場合は、AレコードでGitHub PagesのIP（185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153）を指定
2. **リポジトリ側**
   - リポジトリ直下に `CNAME` ファイルを作成し、中身に `hadanokoto.com`（1行）を記載してプッシュ
   - GitHub のリポジトリ Settings → Pages → Custom domain に `hadanokoto.com` を入力し、「Enforce HTTPS」を有効化
3. **サイト内URLの更新**
   - 各HTMLの `canonical`・OGP（og:url / og:image）・JSON-LDの `url` / `image`、`sitemap.xml`・`robots.txt` 内の `https://hadanokoto.github.io/hadanokoto-site/` を `https://hadanokoto.com/` に一括置換
4. **公開後**
   - GBP（Googleビジネスプロフィール）・lit.link・Instagram・エキテン等のURLを新ドメインへ差し替え

## 更新のしかた

1. HTMLを編集（文章は指示書を正本に）
2. `git add -A && git commit -m "変更内容" && git push`
3. 1〜2分でGitHub Pagesに反映
