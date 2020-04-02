interface Animator {
  element: HTMLElement | Element;
  duration: number;
  axisY?: number;
  axisX?: number;
  direction?: Direction;
  onFinish?: Function | null;
  marginRight?: boolean;
}
type Direction = 'normal' | 'reverse';

export default class VigilAnimator {
  public element: HTMLElement | Element;
  public duration: number;
  public direction: Direction = 'normal';
  public loaded: boolean = false;
  public step: number = 0;
  public onFinish: Function;
  public marginRight: boolean = false;
  public finished: boolean = false;
  public axisY: number = 0;
  public axisX: number = 0;
  public currentStep: number = 0;
  public totalSteps: number = 0;
  public factor: number = 1;
  public distanceX: number = 0;
  public distanceY: number = 0;
  public currentX: number = 0;
  public currentY: number = 0;
  public playing: boolean = false;

  constructor(obj: Animator) {
    this.element = obj.element;
    this.duration = obj.duration;
    this.marginRight = !!obj.marginRight;
    this.onFinish = obj.onFinish ? obj.onFinish : (): void => {};

    if (obj.direction) this.direction = obj.direction;
    if (obj.axisY) this.axisY = this.currentY = obj.axisY;
    if (obj.axisX) this.axisX = obj.axisX;
  }
  changeDirection(): void {
    const normal: Direction = 'normal';
    const reverse: Direction = 'reverse';
    if (this.direction === normal) {
      this.direction = reverse;
    } else {
      this.direction = normal;
    }
  }
  playReverse(): void {
    this.changeDirection();
    this.finished = false;
  }
  load(): void {
    this.axisX = this.marginRight
      ? window.innerWidth -
        this.axisX -
        this.element.getBoundingClientRect().width
      : this.axisX;
    this.loaded = true;
    this.totalSteps = Math.floor(this.duration / 10);
    this.distanceX = this.axisX - this.element.getBoundingClientRect().left;
    this.distanceY = this.axisY - this.element.getBoundingClientRect().top;
  }

  addFixed(): void {
    const elm = this.element as HTMLElement;
    elm.style.position = 'fixed';
    elm.style.top = this.element.getBoundingClientRect().top + 'px';
    elm.style.left = this.element.getBoundingClientRect().left + 'px';
    elm.style.zIndex = '10';
  }
  removeFixed(): void {
    const elm = this.element as HTMLElement;
    elm.style.removeProperty('fixed');
    elm.style.removeProperty('top');
    elm.style.removeProperty('left');
    elm.style.removeProperty('zIndex');
  }

  play(): void {
    if (!this.loaded) {
      this.load();
    }
    if (!this.playing && !this.finished) {
      this.playing = true;
      this.addFixed();
    }

    if (this.finished) return;
    const ratioX = this.distanceX / this.totalSteps;
    const ratioY = this.distanceY / this.totalSteps;
    this.currentX = ratioX * this.currentStep;
    this.currentY = ratioY * this.currentStep;
    const transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    (this.element as HTMLElement).style.transform = transform;

    const direction = this.direction === 'normal' ? 1 : -1;
    const nextStep = this.currentStep + direction;
    let isValid = false;
    if (this.direction === 'normal') {
      isValid = this.currentStep < this.totalSteps;
    } else {
      isValid = this.currentStep >= 0 && this.direction === 'reverse';
    }
    if (isValid) {
      this.currentStep = nextStep;
    } else {
      this.finished = true;
      this.playing = false;
      this.onFinish(this.direction);
      this.direction === 'reverse' && this.removeFixed();
      return;
    }
    requestAnimationFrame((): void => this.play());
  }

  elasticPlay = (): void => {
    const rate = this.duration / 30;
    if (this.step >= 3) return this.onFinish();
    this.currentY =
      this.direction === 'normal'
        ? (this.currentY -= rate)
        : (this.currentY += rate);

    if (this.currentY < 0) this.currentY = 0;
    const absoluteHeight = Math.abs(this.axisY!);
    const nextStep =
      (this.direction === 'normal' && this.currentY <= 1) ||
      (this.direction === 'reverse' && this.currentY >= absoluteHeight + 1);

    if (isNaN(this.currentY)) return;
    this.element.setAttribute(
      'd',
      `M 0 10 c 200-${this.currentY}, 400,0, 400,0`
    );

    if (nextStep) {
      this.step = this.step + 1;
      if (this.step >= 3) return this.onFinish();
      if (this.direction === 'normal') {
        this.axisY = Math.abs(this.axisY!) / 1.41;
      }
      this.currentY = this.direction === 'normal' ? 0 : this.axisY;
      this.direction = this.direction === 'normal' ? 'reverse' : 'normal';
    }
    requestAnimationFrame(this.elasticPlay);
  }
}
