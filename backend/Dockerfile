# Utiliser l'image officielle PHP avec FPM
FROM php:8.2-fpm

# Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    curl \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    default-mysql-client

# Installer les extensions PHP nécessaires
RUN docker-php-ext-install intl mbstring pdo_mysql

# Installer Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Installer Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Créer un utilisateur non-root pour l'exécution
RUN useradd -m symfonyuser

# Copier les fichiers du projet dans le conteneur et donner les bonnes permissions
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY . /app

RUN chown -R symfonyuser:symfonyuser /app

# Passer à l'utilisateur non-root
USER symfonyuser

# Installer les dépendances PHP
RUN composer install --no-interaction --optimize-autoloader --prefer-dist

# Exposer le port pour le serveur PHP
EXPOSE 8000

# Commande par défaut pour exécuter l'application
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
