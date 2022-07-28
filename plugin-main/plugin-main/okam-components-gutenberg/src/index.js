/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import './editor.scss';

/**
 * Import all blocks.
 */
import './wrapper';
import './accordion';
import './ligthbox';
import './horizontal-scroll';
import './nav';
import './table';
import './slider-nav';
import './url-wrapper';
import './tabs';
import './popover';
