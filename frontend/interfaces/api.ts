export default interface ApiParams {
    mode?: RequestMode;
    cache?: RequestCache;
    headers?: HeadersInit;
    method?: string;
    body?: BodyInit;
}