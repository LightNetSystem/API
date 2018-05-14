<?php

namespace app\helpers;

use Yii;

class NodeHelper
{
    /**
     * Запустить node скрипт, сразу возвращающий значение.
     *
     * @param string $scriptName
     * @param array $data
     * @return string
     */
    public static function runScriptRet(string $scriptName, array $data)
    {
        $commandFile = Yii::getAlias('@app') . "/scripts/{$scriptName}.js "
            . implode(' ', array_map(function ($name, $value) {
                return "$name=$value";
            }, array_keys($data), $data));

        $dateTime = date('Y-m-d.H-i-s');

        $commandFileName = Yii::getAlias('@app') . '/data/scripts/' . $dateTime . "-node-script-command.txt";
        $fullCommand = Yii::$app->params['server']['nodejs-path'] . " $commandFile";
        file_put_contents($commandFileName, $fullCommand);

        return exec($fullCommand);
    }
}
