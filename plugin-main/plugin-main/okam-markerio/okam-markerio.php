<?php

/**
 * Plugin Name: Okam Markerio Integration
 * Plugin URI: https://git.okam.cloud/okam-plugins/okam-markerio/
 * Description: Integre markerio code inside theme header
 * Author: hub@okam.ca
 * Author URI: https://www.okam.ca
 * Version: 1.0.0
 * License: UNLICENSED
 *
 * @package OkamMarkerio
 */

if (!defined('ABSPATH')) {
    exit;
}

require_once __DIR__ . '/src/autoload.php';

// call hook here
(new \Okam\OkamMarkerio\Hooks())->init();
