# Vision-Cine Front-End

Ce projet est le front-end de l'application Vision-Cine, construit avec Nuxt.js et intégré avec un backend Symfony.

## Prérequis

- Node.js (version 18 ou supérieure)
- npm (version 7 ou supérieure)
- Docker (pour l'exécution en environnement conteneurisé)

## Installation

### 1. Configuration des Variables d'Environnement

Créez un fichier .env ou .env.local à la racine du répertoire frontend pour configurer les variables d'environnement nécessaires.

```bash
NUXT_PUBLIC_API_BASE=http://localhost:8000/api
NUXT_PUBLIC_URL_BASE=http://localhost:8000
```

Note: En production, remplacez ces valeurs par les URL finales de l'API et du front-end.

## Dépendances Principales

- Nuxt.js - Le framework Vue.js utilisé pour construire le front-end.
- Tailwind CSS - Un framework CSS utilitaire pour styliser l'application.
- Pinia - Un store pour gérer l'état de l'application.

## Structure du Projet

- assets/ - Contient les fichiers CSS et autres ressources statiques.
- components/ - Contient les composants Vue.js réutilisables.
- composables/ - Contient les fonctions réutilisables pour la composition dans Vue.js.
- interfaces/ - Contient les interfaces TypeScript pour la typage des objets dans l'application.
- layouts/ - Contient les layouts de l'application.
- middleware/ - Contient les middlewares utilisés pour gérer les autorisations et la navigation.
- pages/ - Contient les pages Vue.js, chaque fichier correspond à une route.
- plugins/ - Contient les plugins Vue.js à enregistrer avant le démarrage de l'application.
- service/ - Contient les services pour interagir avec les API ou gérer les opérations complexes.
- store/ - Contient les modules Pinia pour la gestion de l'état.
- utils/ - Contient les fonctions utilitaires réutilisables à travers l'application.
- nuxt.config.ts - Le fichier de configuration de Nuxt.js.

## Contribution

Les contributions sont les bienvenues. Veuillez soumettre une Pull Request pour toute modification.
