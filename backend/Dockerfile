# Utiliser l'image officielle PHP avec FPM
FROM php:8.2-fpm

# Installer les dépendances nécessaires et les extensions PHP
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    curl \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    default-mysql-client \
    && docker-php-ext-install intl mbstring pdo_mysql \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony \
    && useradd -m symfonyuser

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY --chown=symfonyuser:symfonyuser . /app

# Passer à l'utilisateur non-root
USER symfonyuser

# Installer les dépendances PHP
RUN composer install --no-interaction --optimize-autoloader --prefer-dist

# Exposer le port pour le serveur PHP
EXPOSE 8000

# Commande par défaut pour exécuter l'application
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
