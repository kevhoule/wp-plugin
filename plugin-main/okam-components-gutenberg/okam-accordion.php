<?php
/**
 * Plugin Name:     Okam Components
 * Description:     Gutenberg block wrapper for Okam Components
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     okam-components
 *
 * @package         okam
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function okam_components_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "okam/okam-components" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'okam-components-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'okam-components-block-editor', 'okam-components' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'okam-components-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'okam-components-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'okam/okam-components', array(
		'editor_script' => 'okam-components-block-editor',
		'editor_style'  => 'okam-components-block-editor',
		'style'         => 'okam-components-block',
	) );
}
add_action( 'init', 'okam_components_block_init' );
