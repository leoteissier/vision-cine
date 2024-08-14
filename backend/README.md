
# Vision-Cine Backend

## Description

Ceci est le backend du projet Vision-Cine, développé avec Symfony 6.3. Il gère les API pour les films, les acteurs, et les catégories, ainsi que l'authentification JWT. Le backend est conteneurisé avec Docker pour une configuration et un déploiement simplifiés.

## Prérequis

- Docker & Docker Compose
- PHP 8.2 ou plus (si vous travaillez en dehors du conteneur Docker)
- Composer

## Installation

### 1. Configuration de l'environnement

1. Copier le fichier `.env.example` en `.env` :

    ```bash
    cp .env.example .env
    ```

2. Mettre à jour les variables d'environnement dans `.env`, notamment pour la base de données et JWT :

    ```env
    DATABASE_URL="mysql://root:123456@mariadb:3306/db_symfony?serverVersion=10.8.8-MariaDB&charset=utf8mb4"
    JWT_PASSPHRASE="votre-passphrase"
    ```

### 2. Initialisation de la base de données

1. Appliquer les migrations :

    ```bash
    docker-compose exec backend php bin/console doctrine:migrations:migrate --no-interaction
    ```

2. Charger les fixtures :

    ```bash
    docker-compose exec backend php bin/console doctrine:fixtures:load --no-interaction --append
    ```

## Authentification JWT

L'application utilise JWT pour l'authentification. Assurez-vous que les clés sont générées correctement :

1. Générer les clés JWT en utilisant la commande suivante :

    ```bash
    docker-compose exec backend php bin/console lexik:jwt:generate-keypair
    ```

    Cette commande génère automatiquement les clés privées et publiques et les place dans le répertoire `config/jwt/`.

2. Mettre à jour la passphrase dans le fichier `.env` si nécessaire :

    ```env
    JWT_PASSPHRASE="votre-passphrase"
    ```

## Débogage

Les logs de Symfony sont disponibles dans le répertoire `var/log` :

```bash
docker-compose exec backend tail -f var/log/dev.log
```

## Contribution

Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des changements que vous souhaitez apporter.
