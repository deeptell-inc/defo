#!/usr/bin/env bash
# ------------------------------------------------------------------
# setup_laravel_docker.sh
# Laravel × Docker 開発環境を一気に構築・初期化するスクリプト
# （内部で sudo/ssh を多用するため、安全のために各所で
#    確認プロンプトを挟んでいます。Enter で了承）
# ------------------------------------------------------------------

set -euo pipefail

# ---------- ユーザー設定 ここを適宜書き換えてください -----------------
PROJECT_ROOT="/usr/src/defo/app/laravel"   # laravel プロジェクト配置先
CONTAINER_NAME="laravel-app"         # docker‑compose.yml のサービス名
DB_PORT=3306                         # ホスト側で衝突する場合は変更
SEED_DB=true                         # マイグレーション後に --seed するか
# Xserver デプロイ情報（公開鍵認証推奨。パスワードは極力使わない）
XS_HOST="sv16186.xserver.jp"
XS_PORT=10022
XS_USER="xs586357"
XS_PKEY="${HOME}/.ssh/xs586357.key"
# ------------------------------------------------------------------

echo "▶ 1/8 依存パッケージインストール (composer/npm)..."
cd "${PROJECT_ROOT}"
cp -n .env.example .env
composer install --ignore-platform-req=ext-intl
npm install

echo "▶ 2/8 Docker イメージをビルド／起動..."
cd "${PROJECT_ROOT}/../.."           # プロジェクトルート想定
docker compose up -d --build
echo "   → コンテナを起動しました"

echo "▶ 3/8 Laravel マイグレーション..."
CID=$(docker compose ps -q ${CONTAINER_NAME})
docker exec -it "${CID}" php artisan migrate $( $SEED_DB && echo "--seed" )
echo "   → migrate 完了"

echo "▶ 4/8 権限とキャッシュを整理..."
docker exec -it "${CID}" bash -c "
    chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 755 storage bootstrap/cache && \
    touch storage/logs/laravel.log && \
    chown www-data:www-data storage/logs/laravel.log && \
    chmod 644 storage/logs/laravel.log && \
    php artisan cache:clear && \
    php artisan config:clear && \
    php artisan view:clear
"
echo "   → storage 権限 & キャッシュ OK"

echo "▶ 5/8 不要イメージ・コンテナ削除 (任意)"
read -rp '   ‣ 既存 Docker イメージを全削除しますか? [y/N] ' ans
if [[ "${ans:-N}" =~ ^[Yy]$ ]]; then
  docker rm -f $(docker ps -aq) 2>/dev/null || true
  docker rmi -f $(docker images -aq) 2>/dev/null || true
  echo "   → クリア完了"
fi

echo "▶ 6/8 ポート ${DB_PORT} をふさいでいる MySQL を停止..."
if lsof -i :"${DB_PORT}" >/dev/null 2>&1; then
  sudo kill -9 $(sudo lsof -t -i :"${DB_PORT}")
  echo "   → プロセス停止済"
else
  echo "   → 該当プロセスなし"
fi

echo "▶ 7/8 Node・npm のバージョン確認..."
if ! command -v node >/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
node -v && npm -v

echo "▶ 8/8 本番ビルド (vite)..."
npm run build

echo "🎉  ローカルセットアップ完了！"

# ------------------------------------------------------------------
# デプロイ（踏み台）の例
# ------------------------------------------------------------------
read -rp '   ‣ Xserver へ rsync デプロイしますか? [y/N] ' dep
if [[ "${dep:-N}" =~ ^[Yy]$ ]]; then
  echo "   → SSH 接続先: ${XS_USER}@${XS_HOST}:${XS_PORT}"
  rsync -avz -e "ssh -i ${XS_PKEY} -p ${XS_PORT}" \
    --exclude=node_modules --exclude=.git --delete \
    "${PROJECT_ROOT}/" "${XS_USER}@${XS_HOST}:~/laravel"
  echo "   → 転送完了"
  echo "   ★ 初回のみ Xserver 側で以下を実施してください"
  echo "     cd ~/laravel && composer install --no-dev --optimize-autoloader"
fi

echo "✅ すべての処理が終了しました。お疲れさまでした！"
