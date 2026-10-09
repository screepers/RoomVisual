export const COLOR_SETS = {
  white: ['#ffffff', '#4c4c4c'],
  grey: ['#b4b4b4', '#4c4c4c'],
  red: ['#ff7b7b', '#592121'],
  yellow: ['#fdd388', '#5d4c2e'],
  green: ['#00f4a2', '#236144'],
  blue: ['#50d7f9', '#006181'],
  purple: ['#a071ff', '#371383'],
} as const satisfies Record<string, readonly [string, string]>

export const COLORS = {
  gray: '#555555',
  light: '#AAAAAA',
  road: '#666', // >:D
  energy: '#FFE87B',
  power: '#F53547',
  dark: '#181818',
  outline: '#8FBB93',
  speechText: '#000000',
  speechBackground: '#2ccf3b',
} as const
