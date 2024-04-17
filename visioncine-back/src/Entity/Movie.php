<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;

use ApiPlatform\Metadata\GraphQl\DeleteMutation;
use ApiPlatform\Metadata\GraphQl\Mutation;
use ApiPlatform\Metadata\GraphQl\Query;
use ApiPlatform\Metadata\GraphQl\QueryCollection;

use ApiPlatform\Metadata\ApiFilter;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;

use App\Repository\MovieRepository;

use DateTimeInterface;

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
    'title' => 'partial',
])]
#[ApiFilter(OrderFilter::class, properties: [
    'createdAt' => 'DESC',
])]
#[ApiFilter(BooleanFilter::class, properties: [
    'validated',
])]
#[ORM\HasLifecycleCallbacks] // This annotation is used to call the setCreatedAt() method before the entity is persisted and updated.
#[ORM\Entity(repositoryClass: MovieRepository::class)]
#[ORM\Table(name: '`movie`')]
class Movie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank]
    #[Assert\Type('string')]
    #[ORM\Column(type: 'string', length: 255, nullable: false)]
    private ?string $title = null;

    #[Assert\NotBlank]
    #[Assert\Type('string')]
    #[ORM\Column(type: 'text', nullable: false)]
    private ?string $synopsis = null;

    #[Assert\NotBlank]
    #[Assert\Type('integer')]
    #[ORM\Column(type: 'integer', nullable: false)]
    private ?int $duration = null;

    #[Assert\Type('date')]
    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?DateTimeInterface $releaseDate = null;

    #[Assert\Range(
        notInRangeMessage: 'The score must be between {{ min }} and {{ max }}',
        min: 0,
        max: 10
    )]
    #[Assert\Type('float')]
    #[ORM\Column(type: 'float', nullable: true)]
    private ?float $score = null;

    #[Assert\Type('integer')]
    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $entry = null;

    #[Assert\Type('integer')]
    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $budget = null;

    #[Assert\Type('string')]
    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $director = null;

    #[Assert\Url(message: 'The url {{ value }} is not a valid url')]
    #[Assert\Type('string')]
    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $website = null;

    #[Assert\Type('boolean')]
    #[ORM\Column(type: 'boolean', nullable: false)]
    private ?bool $validated = null;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, nullable: false)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $updatedAt = null;

    #[ORM\ManyToMany(targetEntity: Actor::class, inversedBy: 'movies')]
    private Collection $actors;

    #[ORM\ManyToMany(targetEntity: Category::class, mappedBy: 'movies')]
    private Collection $categories;

    #[ORM\ManyToOne(targetEntity: MediaObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(types: ['https://schema.org/image'])]
    public ?MediaObject $mediaObject = null;

    public function __construct()
    {
        $this->actors = new ArrayCollection();
        $this->categories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getReleaseDate(): ?DateTimeInterface
    {
        return $this->releaseDate;
    }

    public function setReleaseDate(?DateTimeInterface $releaseDate): static
    {
        $this->releaseDate = $releaseDate;

        return $this;
    }

    public function getSynopsis(): ?string
    {
        return $this->synopsis;
    }

    public function setSynopsis(string $synopsis): static
    {
        $this->synopsis = $synopsis;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): static
    {
        $this->duration = $duration;

        return $this;
    }

    public function getScore(): ?int
    {
        return $this->score;
    }

    public function setScore(int $score): static
    {
        $this->score = $score;

        return $this;
    }

    public function getEntry(): ?int
    {
        return $this->entry;
    }

    public function setEntry(int $entry): static
    {
        $this->entry = $entry;

        return $this;
    }

    public function getBudget(): ?int
    {
        return $this->budget;
    }

    public function setBudget(int $budget): static
    {
        $this->budget = $budget;

        return $this;
    }

    public function getDirector(): ?string
    {
        return $this->director;
    }

    public function setDirector(string $director): static
    {
        $this->director = $director;

        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(string $website): static
    {
        $this->website = $website;

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
        $this->updatedAt = new \DateTimeImmutable();

        return $this;
    }

    /**
     * @return Collection<int, Actor>
     */
    public function getActors(): Collection
    {
        return $this->actors;
    }

    public function addActor(Actor $actor): static
    {
        if (!$this->actors->contains($actor)) {
            $this->actors->add($actor);
        }

        return $this;
    }

    public function removeActor(Actor $actor): static
    {
        $this->actors->removeElement($actor);

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): static
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
            $category->addMovie($this);
        }

        return $this;
    }

    public function removeCategory(Category $category): static
    {
        if ($this->categories->removeElement($category)) {
            $category->removeMovie($this);
        }

        return $this;
    }

    /**
        * @return MediaObject
     */

    public function getMediaObject(): MediaObject
    {
        return $this->mediaObject;
    }

    public function setMediaObject(?MediaObject $mediaObject): Movie
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
