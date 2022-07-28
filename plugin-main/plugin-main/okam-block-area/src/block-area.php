<?php

class BlockArea
{

    private static function getPost($postName)
    {
        return new WP_Query([
            'post_type' => 'block_area',
            'name' => $postName,
            'posts_per_page' => 1,
            'suppress_filters' => false,
        ]);
    }


    public static function getBlockContent($postName = '')
    {
        if (!$postName) {
            return;
        }

        $postName = sanitize_key($postName);
        $posts = self::getPost($postName);

        if (empty($posts) || !$posts->have_posts()) {
            return '';
        }

        $post = $posts->posts[0];
        return apply_filters('the_content', $post->post_content); 
    }
}
