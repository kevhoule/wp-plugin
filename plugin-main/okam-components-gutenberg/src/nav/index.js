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
registerBlockType('okam/okam-nav', {
  /**
   * This is the display title for your block, which can be translated with `i18n` functions.
   * The block inserter will show this name.
   */
  title: __('Okam Nav', 'okam-nav'),

  /**
   * This is a short description for your block, can be translated with `i18n` functions.
   * It will be shown in the Block Tab in the Settings Sidebar.
   */
  description: __(
    'okam-nav add navigation & menu feature like burger menu, sub menu toggle and more.','okam'
  ),

  /**
 * Attributes used by the block.
 */
  attributes: {
    isBeforeMenuVisible: {
      type: 'boolean',
      default: true,
    },

    isAfterMenuVisible: {
      type: 'boolean',
      default: true,
    },

    burgerModeBreakpoint: {
      type: 'number',
      default: 1024,
    },

		subMenuContainerSelector: {
      type: 'string',
      default: '.has-child',
    },

    subMenuSelector: {
      type: 'string',
      default: '.wp-block-navigation__container .wp-block-navigation__container',
    },

    subMenuClass: {
      type: 'string',
      default: '.wp-block-navigation__container',
    },

    menuId: {
      type: 'string',
      default: 'main-nav-menu',
    },

    allowMultipleSubMenuOpen: {
      type: 'boolean',
      default: false,
    },

    toggleMenuText: {
      type: 'string',
      default: __('Toggle the menu between close and open state', 'okam'),
    },
  },

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
    anchor: true,
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
