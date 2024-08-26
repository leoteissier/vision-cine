import type MediaObject from "./mediaObject";

export default interface Actor {
    id?: string;
    _id?: number;
    firstname: string;
    lastname: string;
    birthdate: string;
    nationality: string;
    biography: string;
    reward: string;
    mediaId?: string;
    mediaObject?: MediaObject;
}
