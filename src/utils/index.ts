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
