<?php

namespace Okam\MegaMenu;

function getOkamMegaMenuShortCode($attr): string
{
    $settings = \shortcode_atts([
        'menu' => null,
        'allow_multiple_sub_menu_open' => null,
        'burger_mode_breakpoint' => null,
        'menu_id' => null,
        'toggle_menu_text' => null,
        'class_name' => null,
        'use_popover' => null,
    ], $attr);

    $megaMenu = new MegaMenu($settings['menu']);
    return $megaMenu->render($settings);
}

function getOkamMegaMenu(string $menu, string $slug, array $settings = []): string
{
    if (!empty($menu)) {
        return $menu;
    }

    $megaMenu = new MegaMenu($slug);
    return $megaMenu->render($settings);
}

add_action('init', __NAMESPACE__ . '\\registerMegaMenuPostType');

add_shortcode('okam_mega_menu', __NAMESPACE__ . '\\getOkamMegaMenuShortCode');

/**
 * Call with apply_filters('okam_mega_menu', '', 'slug', [])
 * @return string
 */
add_filter('okam_mega_menu', __NAMESPACE__ . '\\getOkamMegaMenu', 10, 3);
