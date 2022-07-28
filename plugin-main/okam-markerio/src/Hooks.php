<?php

namespace Okam\OkamMarkerio;

class Hooks
{
    /**
     * Initiate filters and actions
     */
    public function init()
    {
        if (is_admin()) {
            \add_action('admin_menu', [$this, 'adminMenu']);
        }
        \add_action('wp_head', [$this, 'wpHead']);
    }

    public function adminMenu()
    {
        \add_options_page(
            __('Markerio Integration', Configuration::TR_DOMAIN),
            __('Markerio Integration', Configuration::TR_DOMAIN),
            'manage_options',
            'okam-markerio',
            [$this, 'adminMenuPage']
        );
    }

    public function adminMenuPage()
    {
        $configuration = new Configuration();
        $form_action = admin_url('options-general.php?page=okam-markerio');
        if (isset($_POST['cmdSave']) && check_admin_referer('save-okam-markerio')) {
            $isEnabled = ($_POST['okam_markerio_enabled'] ?? '') === '1';
            $dataToken = ($_POST['okam_markerio_datatoken'] ?? '');
            $configuration->setEnabled($isEnabled);

            if (is_string($dataToken)) {
                $configuration->setDataToken($dataToken);
            }
        }
        $data = [
            'enabled' => $configuration->isEnabled(),
            'datatoken' => $configuration->getDataToken(),
        ];
        require_once dirname(__DIR__) . '/templates/adminMenuPage.php';
    }

    public function wpHead()
    {
        $configuration = new Configuration();
        if (!$configuration->isEnabled()) {
            return;
        }

        $dataToken = $configuration->getDataToken();
        if ($dataToken !== '') {
            $src = $configuration->getInjectScript();
            echo '<script id="markerio-config">window.markerConfig = {destination:"'. esc_attr($dataToken) .'"};</script>';
            echo '<script id="markerio-script">!function(e,r,t){if(e.__Marker)return;e.__Marker={};var n=r.createElement("script");n.async=1,n.src="' . esc_attr($src) . '";var s=r.getElementsByTagName("script")[0];s.parentNode.insertBefore(n,s)}(window,document);</script>';
        }
    }
}
