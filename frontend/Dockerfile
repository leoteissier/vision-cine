# Utilise une image Node officielle comme base
FROM node:22

# Crée un répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json pour tirer parti du cache de Docker
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste de l'application
COPY . .

# Build de l'application
RUN npm run generate

# Expose le port 3000
EXPOSE 3000

# Démarre l'application en mode production
CMD ["npm", "run", "dev"]
