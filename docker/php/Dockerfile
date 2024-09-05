FROM php:8.3.7-apache

# rewrite_module をインストール
RUN a2enmod rewrite

# ドキュメントルートを変更
ENV APACHE_DOCUMENT_ROOT /var/www/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# install-php-extensions をインストール
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions

# エクステンションをインストール
RUN install-php-extensions intl pdo_mysql mysqli zip mbstring

# コンテナログイン時のパス指定
WORKDIR /var/www