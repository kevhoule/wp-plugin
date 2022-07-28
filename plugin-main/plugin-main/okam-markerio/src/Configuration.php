<?php

namespace Okam\OkamMarkerio;

class Configuration
{
    private const OPTION_KEY_ENABLED = 'okam_markerio_enabled';
    private const OPTION_KEY_DATATOKEN = 'okam_markerio_datatoken';
    public const OPTION_VALUE_ENABLED = '1';
    public const OPTION_VALUE_DISABLED = '0';
    public const TR_DOMAIN = 'okam-markerio';

    private const INJECT_SCRIPT_20210119 = 'https://edge.marker.io/latest/shim.js';

    public function isEnabled(): bool
    {
        $option = \get_option(self::OPTION_KEY_ENABLED);
        return $option === self::OPTION_VALUE_ENABLED;
    }

    public function setEnabled(bool $isEnabled)
    {
        $this->setOption(self::OPTION_KEY_ENABLED, $isEnabled ? self::OPTION_VALUE_ENABLED : self::OPTION_VALUE_DISABLED);
    }

    public function setOption(string $name, string $value)
    {
        \update_option($name, $value);
    }

    public function setDataToken(string $token)
    {
        $this->setOption(self::OPTION_KEY_DATATOKEN, $token);
    }

    public function getDataToken(): string
    {
        $option = \get_option(self::OPTION_KEY_DATATOKEN);
        if (!is_string($option)) {
            return '';
        }
        return $option;
    }

    // could be from an external source (database, list...)
    public function getInjectScript(string $version = '1.0.0'): string
    {
        // version is not used yet
        return self::INJECT_SCRIPT_20210119;
    }
}
