export const red = {
  foregroundColor: 'red',
  backgroundColor: 'redBack'
};

export const yellow = {
  foregroundColor: 'yellow',
  backgroundColor: 'yellowBack'
};

export const green = {
  foregroundColor: 'green',
  backgroundColor: 'greenBack'
};

export const cyan = {
  foregroundColor: 'cyan',
  backgroundColor: 'cyanBack'
};

export const blue = {
  foregroundColor: 'blue',
  backgroundColor: 'blueBack'
};

export const magenta = {
  foregroundColor: 'magenta',
  backgroundColor: 'magentaBack'
};

export const all = [
  red,
  yellow,
  green,
  cyan,
  blue,
  magenta
];

export function getPrevTheme(theme) {
  return all[(all.indexOf(theme) + all.length - 1) % all.length];
}

export function getNextTheme(theme) {
  return all[(all.indexOf(theme) + all.length + 1) % all.length];
}
