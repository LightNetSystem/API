<?php

namespace app\modules\api\controllers;

use Yii;
use yii\web\Response;
use app\helpers\NodeHelper;
use dektrium\user\models\LoginForm;
use dektrium\user\models\User;

class AccountController extends \yii\web\Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['contentNegotiator'] = [
            'class' => \yii\filters\ContentNegotiator::className(),
            'formats' => [
                'application/json' => Response::FORMAT_JSON
            ]
        ];

        return $behaviors;
    }

    public function actionBalance(string $account)
    {
        $balance = NodeHelper::runScriptRet('get_balance', [
            'HttpProvider' => Yii::$app->params['ether']['httpProvider'],
            'AccountAddress' => $account,
        ]);

        return [
            'balance' => [
                'wei' => $balance,
                'eth' => $balance / 1000000000000000000,
            ],
        ];
    }

    public function actionLogin()
    {
        if (!\Yii::$app->user->isGuest) {
            return [
                'status' => 'already logged',
            ];
        }

        /** @var LoginForm $model */
        $model = \Yii::createObject(LoginForm::className());

        //$this->performAjaxValidation($model);

        if ($model->load(\Yii::$app->getRequest()->post()) && $model->login()) {
            return [
                'status' => 'logged',
            ];
        }

        return [
            'status' => 'error',
        ];
    }

    public function actionRegister()
    {
        if (!$this->validate()) {
            return [
                'status' => 'validation error',
            ];
        }

        $user = Yii::createObject(User::className());
        $user->setScenario('register');
        $this->loadAttributes($user);

        if (!$user->register()) {
            return [
                'status' => 'error',
            ];
        }

        return [
            'status' => 'registered',
        ];
    }

    protected function loadAttributes(User $user)
    {
        $user->setAttributes($this->attributes);
    }

    public function actionInfo($id)
    {
        return User::findOne($id);
    }

    public function actionPasswordUpdate()
    {

    }
}
