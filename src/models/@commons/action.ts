import { Nullable } from '../../types';

export interface Action<A, T = any> {
  readonly type: A;
  readonly payload?: T;
}

export interface ActionProperty<T> {
  readonly property: string;
  readonly value: T;
}

export interface DefaultReducerInterface {
  successMessage: Nullable<string>;
  errorMessage: Nullable<string>;
  loading: boolean;
}
