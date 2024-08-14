# Vision-Cine Project

Ce projet est une application de gestion de films et d'acteurs, avec un front-end en Nuxt.js et un back-end en Symfony. L'ensemble est orchestré via Docker pour faciliter le déploiement et la gestion des environnements.

## Structure du Projet

- **frontend/** : Contient le code source du front-end (Nuxt.js).
- **backend/** : Contient le code source du back-end (Symfony).
- **docker-compose.yml** : Fichier de configuration pour Docker.

## Prérequis

- Docker
- Docker Compose

## Installation

### 1. Cloner le Dépôt

```bash
git clone https://github.com/leoteissier/vision-cine.git
cd vision-cine
```

### 2. Configurer les Variables d'Environnement

Créez des fichiers .env.local dans les dossiers frontend/ et backend/ pour configurer les variables d'environnement nécessaires.

### 3. Lancer les Conteneurs Docker

```bash
docker-compose up --build
```

Les applications front-end et back-end seront accessibles respectivement sur http://localhost:3000 et http://localhost:8000.

## Utilisation

Front-End
Le front-end est une application Nuxt.js. Consultez le fichier frontend/README.md pour plus de détails.

## Back-End

Le back-end est une API Symfony. Consultez le fichier backend/README.md pour plus de détails.

## Déploiement

Pour déployer l'application en production, suivez les instructions spécifiques à chaque composant dans les fichiers README de frontend/ et backend/.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

