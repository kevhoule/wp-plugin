<?php

namespace Okam\MegaMenu;

function okam_mega_menu_dynamic_render_callback(array $block_attributes, string $content): string
{
	$item_has_url = $block_attributes['itemHasUrl'];
	$item_has_title = $block_attributes['itemHasTitle'];
	$item_has_extra_content = $block_attributes['hasExtraContent'];
	$item_link_url  = $block_attributes['itemLinkUrl'];
	$openLinkInNewTab = $block_attributes['openLinkInNewTab'];

	$hrefAttr = $openLinkInNewTab ? 'target="_blank" rel="noopener noreferrer"' : '';

	$className = isset($block_attributes['className']) ?? '';

	$html = '<div class="okam-mega-menu-item '. $className .'">';
	$html .= '<div>';

	if ($item_has_title) {
		$html .= '<div class="okam-navigation-link__title">';

		if ($item_has_url && $item_link_url != null) {
			$html .= '
				<a '. $hrefAttr .' class="okam-navigation-link__content" href="'. $item_link_url .'">
					<span class="okam-navigation-link__label">'. get_the_title() .'</span>
				</a>';
		} else {
			'<span class="okam-navigation-link__label">'. get_the_title() .'</span>';
		}

		$html .= '</div>';
	}

	if (!$item_has_title && $item_has_url && $item_has_extra_content ) {
		$html .= '
			<a '. $hrefAttr .' class="okam-navigation-link__content" href="'. $item_link_url .'">
				<div class="okam-navigation-extra-content">'.  $content .'</div>
			</a>
		';
	} elseif ($item_has_extra_content) {
		$html .= '<div class="okam-navigation-extra-content">'.  $content .'</div>';
	}

	$html .= '</div>';
	$html .= '</div>';

    return $html;
}

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function okam_mega_menu_block_init(): void
{
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new \Error(
			'You need to run `npm start` or `npm run build` for the "okam/okam-mega-menu" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'okam-okam-mega-menu-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'okam-okam-mega-menu-block-editor', 'okam-mega-menu' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'okam-okam-mega-menu-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'okam-okam-mega-menu-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type(
		'okam/mega-menu',
		array(
			'apiVersion' => 2,
			'editor_script' => 'okam-okam-mega-menu-block-editor',
			'editor_style'  => 'okam-okam-mega-menu-block-editor',
			'style'         => 'okam-okam-mega-menu-block',
			'render_callback' => __NAMESPACE__ . '\\okam_mega_menu_dynamic_render_callback',
			'attributes' => [
				'itemHasUrl' => [
					'type' => 'boolean',
					'default' => true
				  ],
			  
				  'itemHasTitle' => [
					'type' => 'boolean',
					'default' => true
				  ],
			  
				  'hasExtraContent' => [
					'type' => 'boolean',
					'default' => false
				  ],
			  
				  'itemHasLeftIcon' => [
					'type' => 'boolean',
					'default' => false
				  ],
			  
				  'itemHasRightIcon' => [
					'type' => 'boolean',
					'default' => false
				  ],
			  
				  'itemLinkUrl' => [
					'type' => 'string',
					'default' => '#'
				  ],

				  'openLinkInNewTab' => [
					  'type' => 'boolean',
					  'default' => false,
				  ]
			]
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\\okam_mega_menu_block_init' );
