/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies (global)
 */
 import { getIcon } from '../helper.js';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType('okam/okam-wrapper', {
  /**
   * This is the display title for your block, which can be translated with `i18n` functions.
   * The block inserter will show this name.
   */
  title: __('Okam Wrapper', 'okam-wrapper'),

  /**
   * Attributes used by the block.
   */
  attributes: {
    slotName: {
      type: 'string',
      default: null,
    },
    hintTitle: {
      type: 'string',
      default: 'Content'
    },
    hintDescription: {
      type: 'string',
      default: 'This is the content area of the block. You can add any type of content.'
    },
    placeHolder: {
      type: 'string',
      default: '...'
    },
    useTemplate: {
      type: 'boolean',
      default: false,
    },
    lockTemplate: {
      type: 'boolean',
      default: false,
    },
    noWrap: {
      type: 'boolean',
      default: false,
    }
  },

  /**
   * This is a short description for your block, can be translated with `i18n` functions.
   * It will be shown in the Block Tab in the Settings Sidebar.
   */
  description: __(
    'Example block written with ESNext standard and JSX support – build step required.',
    'okam-wrapper'
  ),

  /**
   * Blocks are grouped into categories to help users browse and discover them.
   * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
   */
  category: 'widgets',

  /**
   * An icon property should be specified to make it easier to identify a block.
   * These can be any of WordPress’ Dashicons, or a custom svg element.
   */
  icon: getIcon(),

  /**
   * Optional block extended support features.
   */
  supports: {
    // Removes support for an HTML mode.
    html: false,
  },

  /**
   * @see ./edit.js
   */
  edit: Edit,

  /**
   * @see ./save.js
   */
  save,
});
