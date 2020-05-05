import { AxiosResponse, AxiosError } from 'axios';

export interface APIResponseInterface<T> extends AxiosResponse {}
export interface APIErrorInterface<T> extends AxiosError {}
