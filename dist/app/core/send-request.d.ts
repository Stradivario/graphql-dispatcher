import { FetchResult } from 'apollo-link';
export declare class RequestProvider {
    sendRequest<T, V = {}>({ variables, query, token, }: {
        variables?: V;
        query: string;
        token?: string;
    }, uri: string): Promise<FetchResult<T>>;
}
