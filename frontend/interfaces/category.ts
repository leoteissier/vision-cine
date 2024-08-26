export default interface Category {
    id?: string;
    _id?: number;
    name: string;
    mediaId: string;
    validated: boolean;
    movies?: string[];
}