export interface ScrollHeaderInterface {
  readonly blur: boolean;
  readonly velocity?: number;
  readonly direction?: 'scrollDown' | 'scrollUp';
  readonly animation: 'normal' | 'reverse';
  readonly validScroll?: boolean;
}
