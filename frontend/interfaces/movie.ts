import type MediaObject from "./mediaObject";

export default interface Movie {
    id?: string;
    _id?: number;
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
    mediaObject?: MediaObject;
}