/**
 * WordPress dependencies
 */
import Logo from './assets/logo';

/** 
 * Icon helper 
 */
export function getIcon (icon) {
  return {
      foreground: '#002D2D',
      src: Logo,
      ...icon,
  };
};

/** 
 * Keywords helper 
 */
export function getCombineKeywords (blockKeywords) {  
  const defaultKeywords = [
    'okam',
  ];
  return defaultKeywords.concat(blockKeywords);
};