export interface ScrollHeaderInterface {
    blur: boolean;
    velocity?: number;
    direction?: 'scrollDown' | 'scrollUp';
    animation: 'normal' | 'reverse';
    validScroll?: boolean;
  }