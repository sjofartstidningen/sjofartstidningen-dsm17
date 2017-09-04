import { path } from 'ramda';

export default {
  color: {
    brand: '#0599e4',
    black: '#1a1a1a',
    grey: '#9c9e9f',
    white: '#ffffff',
    warning: '#ffc107',
  },
};

export const color = c => path(['theme', 'color', c]);
