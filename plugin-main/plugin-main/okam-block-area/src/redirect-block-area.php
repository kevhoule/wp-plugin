<?php
// makes single block area single non-visible to regular user

function redirectSinglePost()
{
    if (is_user_logged_in()) {
        return;
    }

    if (is_singular('block_area')) {
        wp_redirect(home_url());
        exit;
    }
}

add_action('template_redirect', 'redirectSinglePost');
