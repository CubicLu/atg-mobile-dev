export interface Action<A, T> {
  type: A;
  payload: T;
}
