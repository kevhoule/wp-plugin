<?php

namespace Okam\MegaMenu;

use WP_Post;
use WP_Query;

class MegaMenu
{
    public const POST_TYPE = "mega-menu-item";

    /**
     * Current post associated with the mega menu
     * @var WP_Post
     */
    private $post = null;

    /**
     * @param string|int|WP_Post $slug
     */
    public function __construct($slug)
    {
        if (empty($slug)) {
            return;
        }

        if (is_string($slug)) {
            $this->post = $this->fetchPostByName($slug);
        } elseif (is_int($slug) || $slug instanceof WP_Post) {
            $maybePost = \get_post($slug, OBJECT);
            if ($maybePost instanceof WP_Post) {
                $this->post = $maybePost;
            }
        }
    }

    private function fetchPostByName(string $postName): ?WP_Post
    {
        $postName = \sanitize_key($postName);
        $posts = new WP_Query([
            'post_type' => self::POST_TYPE,
            'name' => $postName,
            'posts_per_page' => 1,
            'suppress_filters' => false,
        ]);

        if (empty($posts) || !$posts->have_posts()) {
            return null;
        }

        $post = $posts->posts[0];
        return $post;
    }


    private function getChildrenPost(int $post_id): WP_Query
    {
        $args = [
            'post_parent' => $post_id,
            'post_status' => 'publish',
            'post_type' => self::POST_TYPE,
            'orderby' => 'menu_order',
            'order' => 'ASC',
            'posts_per_page' => -1,
        ];

        return new WP_Query($args);
    }

    private function itemWithPopover($html = []): array {
        $html[] = '<okam-popover>';
        $html[] = '<div slot="button">';
        $html[] = \apply_filters('the_content', $content);
        $html[] = '</div>';
        $html[] = '<div slot="panel">';
        $html[] = '<ul class="sub-menu list-none okam-navigation__popover">';
        $html[] = $this->postLoop($child, $use_popover);
        $html[] = '</ul>';
        $html[] = '</div>';
        $html[] = '</okam-popover>';
        return $html;
    }

    private function postLoop(WP_Query $posts, bool $use_popover = false): string
    {
        $html = [];

        while ($posts->have_posts()) {
            $posts->the_post();
            $content = get_the_content();

            if (!empty($content)) {
                $child = $this->getChildrenPost((int) get_the_ID());

                if ($child->have_posts()) {
                    $html[] = '<li class="okam-navigation-link has-child">';
                    
                    if($use_popover) {
                        $html[] = '<okam-popover>';
                        $html[] = '<div slot="button">';
                        $html[] = \apply_filters('the_content', $content);
                        $html[] = '</div>';
                        $html[] = '<div slot="panel">';
                        $html[] = '<ul class="sub-menu list-none okam-navigation__popover">';
                        $html[] = $this->postLoop($child, true);
                        $html[] = '</ul>';
                        $html[] = '</div>';
                        $html[] = '</okam-popover>';
                        $html[] = '</li>';
                    } else {
                        $html[] = \apply_filters('the_content', $content);
                        $html[] = '<ul class="sub-menu okam-navigation__container">';
                        $html[] = $this->postLoop($child, false);
                        $html[] = '</ul>';
                    }
                } else {
                    $html[] = '<li class="okam-navigation-link">';
                    $html[] = \apply_filters('the_content', $content);
                    $html[] = '</li>';
                }
            }
        }

        return implode('', $html);
    }

    public function render(array $settings = []): string
    {
        if (!$this->post) {
            return '';
        }

        $use_popover = $settings['use_popover'] ?? false;
        $allow_multiple_sub_menu_open = $settings['allow_multiple_sub_menu_open'] ?? "false";
        $burger_mode_breakpoint = $settings['burger_mode_breakpoint'] ?? "1024";
        $menu_id = $settings['menu_id'] ?? "main-nav-menu";
        $toggle_menu_text =  $settings['toggle_menu_text'] ?? __('Toggle the menu between close and open state', 'okam');
        $class_name = $settings['class_name'] ?? '';

        $html = [];
        $html[] = '
            <okam-navigation
                allow-multiple-sub-menu-open="' . htmlspecialchars($allow_multiple_sub_menu_open) . '"
                burger-mode-breakpoint="' . htmlspecialchars($burger_mode_breakpoint) . '"
                is-after-menu-visible="true"
                is-before-menu-visible="true"
                menu-id="' . htmlspecialchars($menu_id) . '"
                toggle-menu-text="' . htmlspecialchars($toggle_menu_text) . '"
                li-link-selector=".okam-navigation-link"
                a-link-selector=".okam-navigation-link__content"
                sub-menu-class=".okam-navigation__container"
                sub-menu-selector=".okam-navigation__container .okam-navigation__container"
                class="okam-navigation ' . htmlspecialchars($class_name) . '"
            >
        ';
        $html[] = '<nav class="okam-navigation"><ul class="menu list-none okam-navigation__container">';

        $parent_posts = $this->getChildrenPost($this->post->ID);
        $html[] = $this->postLoop($parent_posts, $use_popover);

        $html[] = '</ul></nav></okam-navigation>';
        return implode('', $html);
    }
}
