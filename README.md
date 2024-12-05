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

https://juno-engineer.com/article/laravel-xserver-deploy/

## 手順

・レンタルサーバー
・ドメイン取得
・TeraTermでSSH接続
・public_html配下にapp/laravel配下を配置
・バージョン合わせ
・composer install
・マイグレーション
・npm run build
・WinSCPで、アプリのアップデートのみの場合、更新したローカルフォルダをドラッグアンドドロップ

## サーバーパネルからPHPバージョンが切り替わりません

サーバーパネルからPHPバージョンが切り替わらない場合、いくつかの理由が考えられます。以下の手順で問題を解決してみましょう。

1. **キャッシュのクリア**:
   ブラウザのキャッシュをクリアし、サーバーパネルに再ログインしてみてください。

2. **.htaccessファイルの確認**:
   `public_html` ディレクトリ内の `.htaccess` ファイルを確認します。PHPバージョンを強制的に指定する記述がないか確認してください。

   ```
   [xs586357@sv16186 gozigen-coupon.site]$ cat public_html/.htaccess
   ```

   もし、PHPバージョンを指定する行（例：`AddHandler application/x-httpd-php80 .php`）があれば、それをコメントアウトまたは削除してみてください。

3. **xserver_phpディレクトリの確認**:
   `xserver_php` ディレクトリ内のファイルを確認します。

   ```
   [xs586357@sv16186 gozigen-coupon.site]$ ls -l xserver_php
   ```

   このディレクトリ内に `php.ini` ファイルがあれば、その内容を確認してください。

4. **シンボリックリンクの確認**:
   現在のPHPバージョンへのシンボリックリンクを確認します。

   ```
   [xs586357@sv16186 gozigen-coupon.site]$ ls -l ~/bin/php
   ```

   もし、このリンクが古いバージョンを指している場合は、手動で更新する必要があるかもしれません。

5. **Xserverサポートへの問い合わせ**:
   上記の手順で解決しない場合は、Xserverのサポートに問い合わせることをおすすめします。サーバー側の設定に問題がある可能性があります。

6. **手動でのPHPバージョン切り替え**:
   最後の手段として、SSHを使用して手動でPHPバージョンを切り替えることができます。

   ```
   [xs586357@sv16186 gozigen-coupon.site]$ ln -sf /opt/php-8.1.x/bin/php ~/bin/php
   ```

   （ここで、`8.1.x` は利用可能な最新のPHP 8.1バージョンに置き換えてください）

7. **環境変数の更新**:
   `.bash_profile` または `.bashrc` ファイルを編集して、新しいPHPバージョンのパスを追加します。

   ```
   echo 'export PATH=$HOME/bin:$PATH' >> ~/.bash_profile
   source ~/.bash_profile
   ```

8. **再確認**:
   変更後、再度PHPバージョンを確認します。

   ```
   [xs586357@sv16186 gozigen-coupon.site]$ php -v
   ```

これらの手順を試しても問題が解決しない場合は、Xserverのサポートに詳細な状況を説明して助けを求めることをおすすめします。サーバー側の設定や権限の問題がある可能性があるためです。

## 本番データベース

