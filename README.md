# Laravelの環境

MySQLも入っていますが、いらないかもしれないです。

＃〜手順〜

cd app/laravel
cp .env.example .env
composer install
依存関係だるい場合
composer install --ignore-platform-req=ext-intl

cd ../..でルートに戻る
プロジェクトrootからDocker立ち上げ
どっかーに入る
docker exec -t -i <CONTAINER_ID> bash
php artisan migrate --seed

## Internal Server Error

UnexpectedValueException
↓
権限周り
chown -R www-data:www-data storage
chmod -R 755 storage
chown -R www-data:www-data storage
キャッシュクリア
php artisan cache:clear
php artisan config:clear
php artisan view:clear
ログファイル
touch storage/logs/laravel.log
chown www-data:www-data storage/logs/laravel.log
chmod 644 storage/logs/laravel.log

## リセット

docker ps -a
docker rm もろもろ
docker imageすべて削除コマンド
{{ edit_1 }}
```
docker image ls -a
docker rmi -f $(docker images -a -q)
```
docker compose up -d --build

## jsxでのvite build

npm run build
npm install

```
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/css/index.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            input: 'resources/js/app.jsx',
        },
    },
});
```

## ポート番号系

sudo lsof -i :3306
sudo kill -9

WSLのmysqlが勝手に起動してた

## nodeとnpmのインストール

curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install -y nodejs
node -v
npm -v

## composer入れ直し

rm -rf composer.lock
composer clear-cache
composer install --ignore-platform-reqs

# デプロイ

踏み台

```
ホスト：sv16186.xserver.jp
ポート：10022
サービス：SSH
SSHバージョン：SSH2
IPバージョン：Auto
ユーザー名：xs586357
秘密鍵：xs586357.key
パスワード：deeptell
```

https://juno-engineer.com/article/laravel-xserver-deploy/
