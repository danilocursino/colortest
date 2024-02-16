import lightOrDarkColor from '@check-light-or-dark/color'; 

export function randomColor() {
  const color = Math.floor(Math.random() * 16777215).toString(16);

  return color.toUpperCase();
}

export function randomNumber(min = 1000, max = 10000) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isColorDark(color) {
  return lightOrDarkColor(color);
}

export function isColorBlack(color) {
  return (color === '#000000') ? 'black' : '';
}