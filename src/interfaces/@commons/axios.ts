import { AxiosResponse, AxiosError } from 'axios';

export interface APIResponseInterface<T> extends AxiosResponse {
    response: AxiosResponse<T>
}
export interface APIErrorInterface<T> extends AxiosError {
    response: AxiosResponse<T>
}
