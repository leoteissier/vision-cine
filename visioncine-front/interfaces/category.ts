export default interface Category {
    id?: number;
    name: string;
    mediaId?: string;
    validated?: boolean;
    mediaObject?: {};
    movies?: string[];
}