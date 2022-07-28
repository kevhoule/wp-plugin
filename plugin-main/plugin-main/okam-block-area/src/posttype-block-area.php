<?php

function registerPostType()
{
    $labels = array(
        'name'               => __('Block Areas', 'okam'),
        'singular_name'      => __('Block Area', 'okam'),
        'add_new'            => __('Add new', 'okam'),
        'add_new_item'       => __('Add new Block Area', 'okam'),
        'edit_item'          => __('Edit Block Area', 'okam'),
        'new_item'           => __('New Block Area', 'okam'),
        'view_item'          => __('View Block Area', 'okam'),
        'search_items'       => __('Search Block Area', 'okam'),
        'not_found'          => __('No Block Area found', 'okam'),
        'not_found_in_trash' => __('No Block Area found in thrash', 'okam'),
        'parent_item_colon'  => __('Parent Block Area:', 'okam'),
        'menu_name'          => __('Block Area', 'okam'),
    );

    $args = array(
        'labels'              => $labels,
        'hierarchical'        => false,
        'supports'            => array('title', 'editor', 'revisions'),
        'public'              => true,
        'show_ui'             => true,
        'show_in_rest'          => true,
        'exclude_from_search' => true,
        'has_archive'         => false,
        'query_var'           => true,
        'can_export'          => true,
        'rewrite'             => array('slug' => 'block-area', 'with_front' => true),
        'menu_icon'           => 'dashicons-welcome-widgets-menus',
        'show_in_graphql' => true,
        'graphql_single_name' => 'blockArea',
        'graphql_plural_name' => 'blockAreas',
    );
    register_post_type('block_area', $args);
}

add_action('init', 'registerPostType');
