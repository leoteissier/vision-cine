<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Metadata\GraphQl\Query;
use ApiPlatform\Metadata\GraphQl\QueryCollection;
use ApiPlatform\Metadata\GraphQl\Mutation;
use ApiPlatform\Metadata\GraphQl\DeleteMutation;
use App\Repository\ActorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    paginationType: 'page',
    graphQlOperations: [
        new Query(),
        new QueryCollection(),
        new Mutation(security: 'is_granted("ROLE_USER")', name: 'create'),
        new Mutation(security: 'is_granted("ROLE_ADMIN")', name: 'update'),
        new DeleteMutation(security: 'is_granted("ROLE_ADMIN")', name: 'delete'),
    ]
)]
#[ApiResource(paginationType: true)]
#[ApiFilter(SearchFilter::class, properties: [
    'id' => 'exact',
    'lastname' => 'partial',
    'firstname' => 'partial',
])]
#[ApiFilter(DateFilter::class, properties: [
    'dob',
])]
#[ApiFilter(OrderFilter::class, properties: [
    'createdAt' => ['DESC', 'ASC'],
])]
#[ApiFilter(BooleanFilter::class, properties: [
    'validated',
])]
#[ORM\HasLifecycleCallbacks] // This annotation is used to call the setCreatedAt() method before the entity is persisted and updated.
#[ORM\Entity(repositoryClass: ActorRepository::class)]
#[ORM\Table(name: '`actor`')]
class Actor
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank]
    #[Assert\Type('string')]
    #[ORM\Column(length: 255, nullable: false)]
    private ?string $lastname = null;

    #[Assert\NotBlank]
    #[Assert\Type('string')]
    #[ORM\Column(length: 255, nullable: false)]
    private ?string $firstname = null;

    #[Assert\Type('datetime')]
    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $birthDate = null;

    #[Assert\Type('string')]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $nationality = null;

    #[Assert\Type('string')]
    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $biography = null;

    #[Assert\Type('string')]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $reward = null;

    #[Assert\Type('boolean')]
    #[ORM\Column(type: 'boolean', nullable: false)]
    private ?bool $validated = null;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, nullable: true)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $updatedAt = null;

    #[ORM\ManyToMany(targetEntity: Movie::class, mappedBy: 'actors')]
    private Collection $movies;

    #[ORM\ManyToOne(targetEntity: MediaObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(types: ['https://schema.org/image'])]
    public ?MediaObject $mediaObject = null;

    public function __construct()
    {
        $this->movies = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getBirthDate(): ?\DateTimeInterface
    {
        return $this->birthDate;
    }

    public function setBirthDate(?\DateTimeInterface $birthDate): static
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    public function getNationality(): ?string
    {
        return $this->nationality;
    }

    public function setNationality(string $nationality): static
    {
        $this->nationality = $nationality;

        return $this;
    }

    public function getBiography(): ?string
    {
        return $this->biography;
    }

    public function setBiography(?string $biography): static
    {
        $this->biography = $biography;

        return $this;
    }

    public function getReward(): ?string
    {
        return $this->reward;
    }

    public function setReward(?string $reward): static
    {
        $this->reward = $reward;

        return $this;
    }

    public function getValidated(): bool
    {
        return $this->validated;
    }

    public function setValidated(bool $validated): self
    {
        $this->validated = $validated;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    #[ORM\PrePersist] // This annotation is used to call the setCreatedAt() method before the entity is persisted.
    public function setCreatedAt(): static
    {
        if ($this->createdAt === null) { // Ne définir createdAt que s'il est null
            $this->createdAt = new \DateTimeImmutable();
        }

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    #[ORM\PreUpdate] // This annotation is used to call the setUpdatedAt() method before the entity is updated.
    public function setUpdatedAt(): static
    {
        $this->updatedAt = new \DateTimeImmutable(); // Mettre à jour updatedAt à chaque mise à jour de l'entité

        return $this;
    }

    /**
     * @return Collection<int, Movie>
     */
    public function getMovies(): Collection
    {
        return $this->movies;
    }

    public function addMovie(Movie $movie): static
    {
        if (!$this->movies->contains($movie)) {
            $this->movies->add($movie);
            $movie->addActor($this);
        }

        return $this;
    }

    public function removeMovie(Movie $movie): static
    {
        if ($this->movies->removeElement($movie)) {
            $movie->removeActor($this);
        }

        return $this;
    }

    /**
        * @return MediaObject|null
     */

    public function getMediaObject(): ?MediaObject
    {
        return $this->mediaObject;
    }

    public function setMediaObject(?MediaObject $mediaObject): Actor
    {
        $this->mediaObject = $mediaObject;

        return $this;
    }

    public function removeMediaObject(?MediaObject $mediaObject): static
    {
        $this->mediaObject = null;

        return $this;
    }
}
