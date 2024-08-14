export default interface Movie {
    id?: number;
    title: string;
    synopsis: string;
    releaseDate: string;
    duration: number;
    score: number;
    entry: number;
    budget: number;
    director: string;
    website: string;
    mediaId?: string;
}