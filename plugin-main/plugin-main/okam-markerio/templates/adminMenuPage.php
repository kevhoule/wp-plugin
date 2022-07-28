<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * @param string $form_action
 * @param array $data ['enabled' => bool, 'datatoken' => string]
 */

$checked = $data['enabled'] ? ' checked="checked"' : '';
?>
<div class="wrap">
<h2>Markerio Integration</h2>
<form method="post" action="<?php echo esc_attr($form_action) ?>">
    <?php wp_nonce_field('save-okam-markerio') ?>
    <div>
        <label>Is Enabled:</label>
        <input type="checkbox" name="okam_markerio_enabled" value="1" <?php echo $checked ?>  />
    </div>

    <div>
        <label>Token:</label>
        <input type="text" name="okam_markerio_datatoken" value="<?php echo esc_attr($data['datatoken']) ?>" />
    </div>

    <div>
        <input type="submit" name="cmdSave" value="Save" class="button button-primary" />
    </div>
</form>
</div>
