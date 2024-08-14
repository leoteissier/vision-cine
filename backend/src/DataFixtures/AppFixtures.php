<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use App\Entity\User;
use App\Entity\Movie;
use App\Entity\Actor;
use App\Entity\MediaObject;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Lire les informations du super admin depuis le fichier .env
        $superAdminEmail = $_ENV['SUPERADMIN_EMAIL'] ?? null;
        $superAdminUsername = $_ENV['SUPERADMIN_USERNAME'] ?? null;
        $superAdminPassword = $_ENV['SUPERADMIN_PASSWORD'] ?? null;

        // Vérifier si les variables sont définies
        if (empty($superAdminEmail) || empty($superAdminUsername) || empty($superAdminPassword)) {
            throw new \Exception('Les variables SUPERADMIN_EMAIL, SUPERADMIN_USERNAME, et SUPERADMIN_PASSWORD doivent être définies dans le fichier .env.local.');
        }     

        //Créer le dossier public/media s'il n'existe pas
        $mediaDirectory = 'public/media';
        if (is_dir($mediaDirectory)) {
            $this->deleteDirectory($mediaDirectory);
        }
        mkdir($mediaDirectory, 0777, true);

        $faker = \Faker\Factory::create();

        // Générer un nom de fichier d'image aléatoire pour l'user super admin
        $randomImage = $faker->image($mediaDirectory, 480, 640, null, false); // Génère une image aléatoire et retourne le nom du fichier

        $commonMediaObject = new MediaObject();
        $commonMediaObject->setFilePath($randomImage);
        $commonMediaObject->setValidated(true);
        $manager->persist($commonMediaObject);

        // Créer le Super Admin avec les informations tirées des variables d'environnement
        $user = new User();
        $user->setEmail($superAdminEmail);
        $user->setUsername($superAdminUsername);
        $hashedPassword = password_hash($superAdminPassword, PASSWORD_BCRYPT);
        $user->setPassword($hashedPassword);
        $user->setRoles(['ROLE_SUPER_ADMIN']);
        $user->setMediaObject($commonMediaObject);
        $manager->persist($user);

        $faker->addProvider(new \Xylis\FakerCinema\Provider\Person($faker));

        // Créer les acteurs
        $actors = $faker->actors($gender = null, $count = 100, $duplicates = false);
        $createdActors = [];

        foreach ($actors as $actorName) {
            $actor = preg_split('/\s+/', $actorName, 2);

            $firstname = $actor[0];
            $lastname = $actor[1];
            $birthdate = $faker->dateTimeBetween('-80 years', '-20 years');
            $biography = $faker->text(200);
            $country = $faker->country;
            $reward = $faker->randomElement(['Oscars', 'Grammies', 'Golden Globes', 'BAFTA']);

            // Créer un MediaObject unique pour chaque acteur
            $mediaObject = new MediaObject();
            $mediaObject->setFilePath($faker->image('public/media', 480, 640, null, false)); // Générer une image unique
            $mediaObject->setValidated(true);
            $manager->persist($mediaObject);

            $actorEntity = new Actor();
            $actorEntity->setFirstname($firstname);
            $actorEntity->setLastname($lastname);
            $actorEntity->setBirthDate($birthdate);
            $actorEntity->setNationality($country);
            $actorEntity->setBiography($biography);
            $actorEntity->setReward($reward);
            $actorEntity->setValidated(true);
            $actorEntity->setMediaObject($mediaObject);

            $createdActors[] = $actorEntity;

            $manager->persist($actorEntity);
        }

        // Créer les catégories
        $categoryNames = ['Action', 'Aventure', 'Comédie', 'Drame', 'Fantastique', 'Horreur', 'Policier', 'Science-fiction', 'Thriller'];
        $createdCategories = [];

        foreach ($categoryNames as $categoryName) {
            $mediaObject = new MediaObject();
            $mediaObject->setFilePath($faker->image('public/media', 480, 640, null, false)); // Générer une image unique
            $mediaObject->setValidated(true);
            $manager->persist($mediaObject);

            $category = new Category();
            $category->setName($categoryName);
            $category->setMediaObject($mediaObject);
            $category->setValidated(true);
            $manager->persist($category);
            $createdCategories[] = $category;
        }

        // Créer les films
        $faker->addProvider(new \Xylis\FakerCinema\Provider\Movie($faker));
        $movies = $faker->movies(100);

        foreach ($movies as $movieTitle) {
            $releaseDate = $faker->dateTimeBetween('-20 years', 'now');
            $synopsis = $faker->text(200);
            $duration = $faker->numberBetween(60, 180);
            $score = $faker->randomFloat(4, 0, 10);
            $entry = $faker->numberBetween(100000, 10000000);
            $budget = $faker->numberBetween(100000, 10000000);
            $director = $faker->name;
            $website = $faker->url;

            // Créer un MediaObject unique pour chaque film
            $mediaObject = new MediaObject();
            $mediaObject->setFilePath($faker->image('public/media', 480, 640, null, false)); // Générer une image unique
            $mediaObject->setValidated(true);
            $manager->persist($mediaObject);

            $movie = new Movie();
            $movie->setTitle($movieTitle);
            $movie->setReleaseDate($releaseDate);
            $movie->setSynopsis($synopsis);
            $movie->setDuration($duration);
            $movie->setScore($score);
            $movie->setEntry($entry);
            $movie->setBudget($budget);
            $movie->setDirector($director);
            $movie->setWebsite($website);
            $movie->setValidated(true);
            $movie->setMediaObject($mediaObject);

            // Ajouter des acteurs au film
            shuffle($createdActors);
            for ($i = 0; $i < 5; $i++) {
                $movie->addActor($createdActors[$i]);
            }

            // Ajouter des catégories au film
            shuffle($createdCategories);
            for ($i = 0; $i < 3; $i++) {
                $movie->addCategory($createdCategories[$i]);
            }

            $manager->persist($movie);
        }

        $manager->flush();
    }

    private function deleteDirectory($dir)
    {
        if (!is_dir($dir)) {
            return;
        }

        $files = array_diff(scandir($dir), array('.', '..'));

        foreach ($files as $file) {
            $path = $dir . DIRECTORY_SEPARATOR . $file;
            if (is_dir($path)) {
                $this->deleteDirectory($path);
            } else {
                unlink($path);
            }
        }

        rmdir($dir);
    }
}