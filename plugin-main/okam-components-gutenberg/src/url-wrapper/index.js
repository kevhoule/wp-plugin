/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { 
  registerBlockType,
  unstable__bootstrapServerSideBlockDefinitions, // eslint-disable-line camelcase
} from '@wordpress/blocks';

/**
 * Internal dependencies (global)
 */
import {
  getIcon,
  getCombineKeywords,
} from '../helper.js';

/**
 * Internal dependenciesv (block)
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';

const { name } = metadata;

/**
 * Server Side Block Definitions
 */
unstable__bootstrapServerSideBlockDefinitions( { [ name ]: metadata } );

/**
 * Block Regisration
 * 
 * https://developer.wordpress.org/block-editor/developers/block-api/block-registration/
 */
registerBlockType(name, {
  title: __('URL Wrapper'),
  description: __('Add a container with a link wrapper.'),
  keywords: getCombineKeywords([ 
    __('link'), 
    __('card'), 
    __('container'), 
    __('wrapper'), 
  ]),
  icon: getIcon({src:'pressthis'}),
  edit,
  save,
  transforms,
});
