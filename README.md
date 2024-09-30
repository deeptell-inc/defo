# Laravelの環境です。
MySQLも入っていますが、いらないかもしれないです。

〜手順〜

cd app/laravel
cp .env.example .env
composer install

cd ../..でルートに戻る
プロジェクトrootからDocker立ち上げ
どっかーに入る
php artisan migrate --seed
