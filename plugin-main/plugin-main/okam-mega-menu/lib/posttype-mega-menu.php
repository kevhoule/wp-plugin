<?php

namespace Okam\MegaMenu;

function registerMegaMenuPostType(): void
{
    $labels = array(
        'name'               => __('Mega Menu Item', 'okam'),
        'singular_name'      => __('Mega Menu Item', 'okam'),
        'add_new'            => __('Add new', 'okam'),
        'add_new_item'       => __('Add new Mega Menu Item', 'okam'),
        'edit_item'          => __('Edit Mega Menu Item', 'okam'),
        'new_item'           => __('New Mega Menu Item', 'okam'),
        'view_item'          => __('View Mega Menu Item', 'okam'),
        'search_items'       => __('Search Mega Menu Item', 'okam'),
        'not_found'          => __('No Mega Menu Item found', 'okam'),
        'not_found_in_trash' => __('No Mega Menu Item found in thrash', 'okam'),
        'parent_item_colon'  => __('Parent Mega Menu Item:', 'okam'),
        'menu_name'          => __('Mega Menu Item', 'okam'),
    );

    $args = array(
        'labels'              => $labels,
        'hierarchical'        => true,
        'supports'            => array('title', 'editor', 'revisions', 'page-attributes', 'custom-fields'),
        'public'              => true,
        'show_ui'             => true,
        'show_in_rest'          => true,
        'exclude_from_search' => true,
        'has_archive'         => false,
        'query_var'           => true,
        'can_export'          => true,
        'rewrite'             => array('slug' => MegaMenu::POST_TYPE, 'with_front' => true),
        'menu_icon'           => 'dashicons-welcome-widgets-menus',
        'show_in_graphql' => true,
        'graphql_single_name' => 'megaMenuItem',
        'graphql_plural_name' => 'megaMenuItems',
        'template' => [['okam/mega-menu']],
        'template_lock' => 'all',
    );

    register_post_type(MegaMenu::POST_TYPE, $args);


    \register_post_meta(MegaMenu::POST_TYPE, 'item_has_url', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'boolean',
        'default' => true,
    ));

    \register_post_meta(MegaMenu::POST_TYPE, 'item_has_title', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'boolean',
        'default' => true,
    ));

    \register_post_meta(MegaMenu::POST_TYPE, 'item_has_extra_content', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'boolean',
        'default' => false,
    ));

    \register_post_meta(MegaMenu::POST_TYPE, 'item_has_left_icon', array(
        'show_in_rest' => true,
        'single' => true,
        'default' => false,
        'type' => 'boolean',
    ));

    \register_post_meta(MegaMenu::POST_TYPE, 'item_has_right_icon', array(
        'show_in_rest' => true,
        'single' => true,
        'default' => false,
        'type' => 'boolean',
    ));

    \register_post_meta(MegaMenu::POST_TYPE, 'item_link_url', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'default' => '#',
    ));

    // add a column to the post type's admin
    // basically registers the column and sets it's title
    add_filter('manage_' . MegaMenu::POST_TYPE . '_posts_columns', function ($columns) {
        $columns['menu_order'] = "Order"; //column key => title
        return $columns;
    });

    // display the column value
    add_action('manage_' . MegaMenu::POST_TYPE . '_posts_custom_column', function ($column_name, $post_id) {
        if ($column_name == 'menu_order') {
            echo get_post($post_id)->menu_order;
        }
    }, 10, 2); // priority, number of args - MANDATORY HERE!

    // make it sortable
    $menu_order_sortable_on_screen = 'edit-' . MegaMenu::POST_TYPE; // screen name of LIST page of posts
    add_filter('manage_' . $menu_order_sortable_on_screen . '_sortable_columns', function ($columns) {
        // column key => Query variable
        // menu_order is in Query by default so we can just set it
        $columns['menu_order'] = 'menu_order';
        return $columns;
    });
}
