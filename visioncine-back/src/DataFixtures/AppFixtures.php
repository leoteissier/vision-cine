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
use Symfony\Component\VarDumper\Cloner\Data;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create();

        $commonMediaObject = new MediaObject();
        $commonMediaObject->setFilePath('6585666a690d8_star-wars-6.jpg'); // Mettre le nom de l'image dans le dossier public/media
        $commonMediaObject->setValidated(true);
        $manager->persist($commonMediaObject);

        // Super Admin // Remplacer les champs vides par les informations de l'utilisateur
        $user = new User();
        $user->setEmail('');
        $user->setUsername('');
        $hashedPassword = password_hash('', PASSWORD_BCRYPT);
        $user->setPassword($hashedPassword);
        $user->setRoles(['ROLE_SUPER_ADMIN']);
        $user->setMediaObject($commonMediaObject);
        $manager->persist($user);

        // User // Remplacer les champs vides par les informations de l'utilisateur
        $user = new User();
        $user->setEmail('');
        $user->setUsername('');
        $hashedPassword = password_hash('', PASSWORD_BCRYPT);
        $user->setPassword($hashedPassword);
        $user->setRoles(['ROLE_USER']);
        $user->setMediaObject($commonMediaObject);
        $manager->persist($user);

        $faker->addProvider(new \Xylis\FakerCinema\Provider\Person($faker));
        $actors = $faker->actors($gender = null, $count = 100, $duplicates = false);

        $createdActors = [];

        foreach ($actors as $actor) {
            $actor = preg_split('/\s+/', $actor, 2);

            $firstname = $actor[0];
            $lastname = $actor[1];
            $birthdate = $faker->dateTimeBetween($startDate = '-80 years', $endDate = '-20 years', $timezone = null);
            $biography = $faker->text($maxNbChars = 200);
            $country = $faker->country;
            $reward = $faker->randomElement(['Oscars', 'Grammies', 'Golden Globes', 'BAFTA']);


            $actor = new Actor();
            $actor->setFirstname($firstname);
            $actor->setLastname($lastname);
            $actor->setBirthDate($birthdate);
            $actor->setNationality($country);
            $actor->setBiography($biography);
            $actor->setReward($reward);
            $actor->setValidated(true);
            $actor->setMediaObject($commonMediaObject);

            $createdActors[] = $actor;

            $manager->persist($actor);
        }

        $categoryNames = ['Action', 'Aventure', 'Comédie', 'Drame', 'Fantastique', 'Horreur', 'Policier', 'Science-fiction', 'Thriller'];

        foreach ($categoryNames as $categoryName) {

            $category = new Category();
            $category->setName($categoryName);
            $category->setMediaObject($commonMediaObject);
            $category->setValidated(true);
            $manager->persist($category);
            $createdCategories[] = $category;
        }

        $faker->addProvider(new \Xylis\FakerCinema\Provider\Movie($faker));
        $movies = $faker->movies(100);

        foreach ($movies as $movie) {
            $title = $movie;
            $releaseDate = $faker->dateTimeBetween($startDate = '-20 years', $endDate = 'now', $timezone = null);
            $synopsis = $faker->text($maxNbChars = 200);
            $duration = $faker->numberBetween($min = 60, $max = 180);
            $score = $faker->randomFloat($nbMaxDecimals = 4, $min = 0, $max = 10);
            $entry = $faker->numberBetween($min = 100000, $max = 10000000);
            $budget = $faker->numberBetween($min = 100000, $max = 10000000);
            $director = $faker->name;
            $website = $faker->url;

            $movie = new Movie();
            $movie->setTitle($title);
            $movie->setReleaseDate($releaseDate);
            $movie->setSynopsis($synopsis);
            $movie->setDuration($duration);
            $movie->setScore($score);
            $movie->setEntry($entry);
            $movie->setBudget($budget);
            $movie->setDirector($director);
            $movie->setWebsite($website);
            $movie->setValidated(true);
            $movie->setMediaObject($commonMediaObject);

            shuffle($createdActors);
            for ($i = 0; $i < 5; $i++) {
                $movie->addActor($createdActors[$i]);
            }

            shuffle($createdCategories);
            for ($i = 0; $i < 3; $i++) {
                $movie->addCategory($createdCategories[$i]);
            }

            $manager->persist($movie);
        }

        $manager->flush();
    }
}
