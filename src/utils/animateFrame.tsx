interface Animator {
  element: HTMLElement | Element;
  refreshRate: number;
  axisY: number;
  axisX: number;
  direction: Direction;
  onFinish?: Function | null;
  marginRight?: boolean;
}
type Direction = 'normal' | 'reverse';

export default class VigilAnimator {
  public element: HTMLElement | Element;
  public elementId: string;
  public refreshRate: number;
  public direction: Direction;
  public loaded: boolean = false;
  public step: number = 0;
  public onFinish: Function;
  public marginRight: boolean = false;
  public finished: boolean = false;
  public axisY: number;
  public axisX: number = 0;
  public currentStep: number = 0;
  public totalSteps: number = 0;
  public factor: number = 1;
  public distanceX: number = 0;
  public distanceY: number = 0;
  public currentX: number = 0;
  public currentY: number = 0;

  public timesPlayed: number = 0;

  constructor(obj: Animator) {
    this.element = obj.element;
    this.elementId = obj.element.id;
    this.refreshRate = obj.refreshRate;
    this.direction = obj.direction;
    this.marginRight = !!obj.marginRight;
    this.onFinish = obj.onFinish ? obj.onFinish : (): void => {};

    this.axisY = this.currentY = obj.axisY;
    this.axisX = obj.axisX;
  }
  changeDirection(): void {
    const normal: Direction = 'normal';
    const reverse: Direction = 'normal';
    if (this.direction === normal) {
      this.direction = reverse;
    } else {
      this.direction = normal;
    }
  }
  playReverse(): void {
    this.timesPlayed += 1;
    this.changeDirection();
    this.finished = false;
    console.log(this.timesPlayed, this.direction)
    // this.play();
  }
  load(): void {
    (this.element as HTMLElement).style.position = 'fixed';
    (this.element as HTMLElement).style.top =
      this.element.getBoundingClientRect().top + 'px';
    (this.element as HTMLElement).style.left =
      this.element.getBoundingClientRect().left + 'px';
    (this.element as HTMLElement).style.zIndex = '10';

    this.axisX = this.marginRight
      ? window.innerWidth -
        this.axisX -
        this.element.getBoundingClientRect().width
      : this.axisX;
    this.loaded = true;
    this.totalSteps = Math.floor(this.refreshRate / 20);
    this.distanceX = this.axisX - this.element.getBoundingClientRect().left;
    this.distanceY = this.axisY - this.element.getBoundingClientRect().top;
    console.log(this.axisX, this.axisY, this.distanceX, this.distanceY);
  }

  play(): void {
    if (this.timesPlayed >= 2) return;
    if (!this.loaded) this.load();
    if (this.finished) return;
    let factor = this.direction === 'normal' ? 1 : -1;

    const ratioX = this.distanceX / this.totalSteps;
    const ratioY = this.distanceY / this.totalSteps;

    this.currentX = ratioX * this.currentStep * factor;
    this.currentY = ratioY * this.currentStep * factor;
    console.log(ratioX, ratioY, this.currentX, this.currentY, this.currentStep);
    const transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    (this.element as HTMLElement).style.transform = transform;

    if (this.timesPlayed > 0) console.log(factor, this.currentStep);
    const nextStep = this.currentStep + factor;
    if (this.currentStep < this.totalSteps && this.currentStep >= 0) {
      this.currentStep = nextStep;
    } else {
      this.finished = true;
      this.onFinish();
      return;
    }
    requestAnimationFrame(this.play.bind(this));
  }

  elasticPlay(): void {
    if (this.step >= 3) return this.onFinish();
    this.currentY =
      this.direction === 'normal'
        ? (this.currentY -= this.refreshRate)
        : (this.currentY += this.refreshRate);

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
    requestAnimationFrame(this.elasticPlay.bind(this));
  }
}
