#!/bin/bash

# Attendre que le service mariadb soit disponible
until mysqladmin ping -hmariadb --silent; do
  echo "Attente de la disponibilité de la base de données MariaDB..."
  sleep 5
done

# Exécuter le fichier SQL d'initialisation
mysql -hmariadb -uroot -p123456 db_symfony < /docker-entrypoint-initdb.d/init.sql
