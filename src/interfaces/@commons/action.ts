export interface Action<A, T = any> {
  type: A;
  payload?: T;
}

export interface ActionProperty<T> {
  property: string;
  payload: T;
}
