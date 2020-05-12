import { ScrollHeaderInterface, ArtistInterface } from '../models';
import { CSSProperties } from 'react';

export function setHeight(original: number): number {
  if (window.outerHeight <= 300) {
    return 100;
  } else if (window.outerHeight <= 450) {
    return 90;
  } else if (window.outerHeight <= 600) {
    return window.outerHeight / 9;
  } else if (window.outerHeight <= 650) {
    return window.outerHeight / 12;
  } else if (window.outerHeight <= 700) {
    return window.outerHeight / 15;
  } else if (window.outerHeight <= 800) {
    return window.outerHeight / 18;
  } else {
    return original;
  }
}

let currentInput: HTMLDivElement | undefined = undefined;
let lockTabbar = false;
export function preventChangeTabbar(prevent: boolean): void {
  lockTabbar = prevent;
}
export function hideTabs(add: boolean): void {
  const ionApp = document.querySelector('ion-app') as HTMLElement;
  add
    ? ionApp.classList.add('hide-tabs')
    : ionApp.classList.remove('hide-tabs');
}
export function focusInput(input: HTMLDivElement): void {
  if (!input) return;
  currentInput = input;
  input.focus();
  input.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'start'
  });
}

export function convertIonicFileSrc(url: string): string {
  if (!url) {
    return url;
  }
  //@ts-ignore
  const webviewUrl = window.WEBVIEW_SERVER_URL;

  if (url.startsWith('/')) {
    return webviewUrl + '/_app_file_' + url;
  }
  if (url.startsWith('file://')) {
    return webviewUrl + url.replace('file://', '/_app_file_');
  }
  if (url.startsWith('content://')) {
    return webviewUrl + url.replace('content:/', '/_app_content_');
  }
  return url;
}

export function hideKeyboard(): void {
  if (lockTabbar) return;
  hideTabs(false);
}
export function showKeyboard(): void {
  if (lockTabbar) return;
  window.Keyboard.hideFormAccessoryBar(true);
  hideTabs(true);
}
export function didShowKeyboard(): void {
  currentInput && focusInput(currentInput);
}

export function totalRows(item: any[], itemPerRow: number): any[] {
  const length = (item && item.length) || 0;
  const total = Math.floor(length / itemPerRow) + 1;
  const array = [...Array(total)];
  return array;
}
export function fromThisRow(
  arrayItem: number,
  rowNumber: number,
  itemPerRow: number
): boolean {
  return Math.floor(arrayItem / itemPerRow) === rowNumber;
}

export function shadowTitle(url: string): CSSProperties {
  return {
    backgroundImage: `linear-gradient(180deg, #ffffff00 40%, #000 100%), url(${url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };
}
export function artistBackground(
  artist: ArtistInterface | any,
  fade: boolean = false,
  coverType: string = 'background',
  gradientOverlay: boolean = false
): CSSProperties {
  let backgroundImageArray: string[] = [];
  if (!artist)
    artist = {
      backgroundGradient: {
        color1: '#079848',
        color2: '#136137'
      },
      cover: {
        background: undefined,
        main: undefined,
        event: undefined,
        biography: undefined,
        deepDive: undefined
      }
    };
  const gradient = `180deg,${artist.backgroundGradient?.color1}00 0%,${artist.backgroundGradient?.color1}d1 45%,${artist.backgroundGradient?.color2} 100%`;
  if (fade) {
    backgroundImageArray.push('linear-gradient(180deg,#00000030,#00000030)');
  }
  if (gradientOverlay && gradient) {
    backgroundImageArray.push(`linear-gradient(${gradient})`);
  }
  if (artist.cover[coverType]) {
    backgroundImageArray.push(`url(${artist.cover[coverType]})`);
  }
  backgroundImageArray.push(`linear-gradient(${gradient})`);
  const backgroundImage = backgroundImageArray.filter(Boolean).join(', ');

  return {
    backgroundImage,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };
}

interface Coordinates {
  translateX: number;
  translateY: number;
  initialX: number;
  initialY: number;
}

export function getFixedTranslatePoints(
  element: Element,
  destX?: number,
  destY?: number,
  alignRight: boolean = false,
  alignBottom: boolean = false
): Coordinates {
  let translateX = 0,
    translateY = 0,
    initialX = 0,
    initialY = 0;
  if (!element) {
    return { translateX, translateY, initialX, initialY };
  }
  if (!element.getBoundingClientRect()) {
    return { translateX, translateY, initialX, initialY };
  }
  initialX = alignRight
    ? element.getBoundingClientRect().right
    : element.getBoundingClientRect().left;
  initialY = element.getBoundingClientRect().top;
  const eWidth = element.getBoundingClientRect().width;
  const elHeight = element.getBoundingClientRect().height;

  if (destX) {
    translateX = alignRight ? window.innerWidth - destX - eWidth : destX;
    translateX -= element.getBoundingClientRect().left;
  }
  if (destY) {
    translateY = alignBottom ? window.innerHeight - destY - elHeight : destY;
    translateY -= element.getBoundingClientRect().top;
  }

  return { translateX, translateY, initialX, initialY };
}

export function validateScrollHeader(
  event: CustomEvent<any>,
  downOffset: number = 40,
  upOffset: number = downOffset
): ScrollHeaderInterface {
  if (!event)
    return {
      validScroll: false,
      velocity: 0,
      blur: false,
      animation: 'reverse'
    };

  const velocity = event.detail.velocityY;
  const direction = velocity > 0 ? 'scrollDown' : 'scrollUp';
  const blur = velocity > 0;
  const validScroll =
    velocity !== 0 &&
    ((event.detail.scrollTop > downOffset && direction === 'scrollDown') ||
      (event.detail.scrollTop < upOffset && direction === 'scrollUp'));
  const animation = velocity > 0 ? 'normal' : 'reverse';

  return { velocity, direction, validScroll, animation, blur };
}

export const addEndingToNumber = (num: number): string => {
  const isMoreThanMillion = num >= 1000000;
  const isMoreThanThousand = num > 999;
  if (isMoreThanMillion) {
    const result = num / 1000000;
    return `${result.toFixed(1)}m`;
  } else if (isMoreThanThousand) {
    return `${Math.round(num / 1000)}k`;
  } else {
    return `${num}`;
  }
};
