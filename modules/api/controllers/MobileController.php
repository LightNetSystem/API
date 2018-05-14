<?php

namespace app\modules\api\controllers;

use yii\rest\ActiveController;

class MobileController extends ActiveController
{
    public $modelClass = 'app\models\IcoTransactions';

    public function actionBalance()
    {
        return $this->render('index');
    }
}
