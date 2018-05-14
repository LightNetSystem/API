<?php

namespace app\helpers;

class AppHelper
{
    public static function concatDataForCommand(array $data)
    {
        return implode(' ', array_map(function ($name, $value) {
            return "$name=$value";
        }, array_keys($data), $data));
    }
}
