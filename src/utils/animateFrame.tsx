interface Animator {
  element: HTMLElement | Element;
  refreshRate: number;
  axisY: number;
  direction: Direction;
  onFinish?: Function | null;
  marginLeft?: number;
  marginRight?: number;
}
type Direction = 'normal' | 'reverse';

export default class VigilAnimator {
  public element: HTMLElement | Element;
  public elementId: string;
  public originalX: number = 0;
  public originalY: number = 0;
  public currentX: number = 0;
  public currentY: number = 0;
  public refreshRate: number;
  public direction: Direction;
  public loaded: boolean = false;
  public step: number = 0;
  public onFinish: Function;
  public finalX: number = 0;
  public finalY: number = 0;
  public distanceX: number = 0;
  public distanceY: number = 0;
  public marginLeft: number;
  public marginRight: number;
  public playing: boolean = false;
  public axisY: number;

  constructor(obj: Animator) {
    this.element = obj.element;
    this.elementId = obj.element.id;
    this.refreshRate = obj.refreshRate;
    this.direction = obj.direction;
    this.onFinish = obj.onFinish ? obj.onFinish : (): void => {};

    this.axisY = this.finalY = this.currentY = obj.axisY;
    this.marginLeft = obj.marginLeft || 0;
    this.marginRight = obj.marginRight || 0;
  }

  load(): void {
    // const elementHeight = this.element.getBoundingClientRect().height;
    // console.log(elementHeight, elementWidth, positionLeft, positionTop);
    if (this.marginLeft) {
      this.finalX = this.marginLeft;
    } else if (this.marginRight) {
      const elementWidth = this.element.getBoundingClientRect().width;
      this.finalX = window.innerWidth - this.marginRight - elementWidth;
    }
    this.originalX = this.element.getBoundingClientRect().left;
    this.originalY = this.element.getBoundingClientRect().top;
    this.distanceX = this.finalX - this.originalX;
    this.distanceY = this.finalY - this.originalY;
    this.currentX = this.currentY = 0;
    this.loaded = true;
  }

  changeDirection(): void {
    this.direction = this.direction === 'normal' ? 'reverse' : 'normal';
  }
  play(): void {
    if (!this.loaded) {
      this.load();
    }
    if (!this.playing) {
      this.playing = true;
    }
    const factor = this.direction === 'normal' ? 1 : -1;
    const rateX = (this.distanceX / this.refreshRate) * factor;
    const rateY = (this.distanceY / this.refreshRate) * factor;
    this.currentX = this.currentX + rateX;
    this.currentY = this.currentY + rateY;
    //console.log("factor", factor, rateX, rateY)
    // const finished = ;
    let finished = false;
    if (
      this.direction === 'normal' &&
      (Math.abs(this.currentX) >= Math.abs(this.distanceX) ||
        Math.abs(this.currentY) >= Math.abs(this.distanceY))
    ) {
      return;
    }
    if (
      this.direction === 'reverse' &&
      (Math.abs(this.currentX) <= 0 || Math.abs(this.currentY) <= 0)
    ) {
      return;
    }
    const transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    (this.element as HTMLElement).style.transform = transform;
    if (finished) {
      this.playing = false;
      this.changeDirection();
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
