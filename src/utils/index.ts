import { ScrollHeaderInterface, ArtistInterface } from '../interfaces';
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

export function artistBackground(
  artist: ArtistInterface | any,
  coverType: string = 'background'
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
  if (artist.cover[coverType]) {
    backgroundImageArray.push(`url(${artist.cover[coverType]})`);
  }
  backgroundImageArray.push(`linear-gradient(${gradient})`);
  const backgroundImage = backgroundImageArray.filter(Boolean).join(', ');

  return {
    backgroundImage,
    filter: 'saturate(1.19)',
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
  // console.log(element.offsetHeight, element.offsetTop, element.getBoundingClientRect().top)
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
