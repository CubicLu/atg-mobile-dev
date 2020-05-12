export interface Action<A, T = any> {
  readonly type: A;
  readonly payload?: T;
}

export interface ActionProperty<T> {
  readonly property: string;
  readonly value: T;
}
