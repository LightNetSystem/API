<?php

namespace app\modules\api\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;

class DefaultController extends Controller
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

    /**
     * Renders the index view for the module
     * @return string
     */
    public function actionIndex()
    {
        return [
            Yii::t('app', 'Общее описание') => [
                Yii::t('app', 'На данный момент (12 мая 2018) сервис работает в тестовом режиме в сети Ropsten.'),
                Yii::t('app', 'URL API - https://app.fotonbank.io/api'),
                Yii::t('app', 'Если в процессе обработки запроса не было ошибок или особых ситуаций, то в ответе будет отсутствовать поле "status". В случае ошибок или особых ситуаций будет возвращен массив с полем "status" следущего формата: array[type,description]. "type" - мнемоническое описание. "description" - подробное описание.'),
            ],
            Yii::t('app','Описание полей действий') =>
                [
                    'action' => Yii::t('app', 'Путь, добавляемый к URL API (напр. получение баланса будет выглядеть так https://app.fotonbank.io/api/account/balance/0x98c685AE0F79FCA3Eb6cBa6C9B60B08384660D22)'),
                    'method' => [
                        Yii::t('app', 'Метод HTTP'),
                        [
                            'GET' => Yii::t('app', 'Получить информацию'),
                            'POST' => Yii::t('app', 'Создать новый элемент'),
                            'PUT' => Yii::t('app', 'Обновить существующий элемент'),
                        ],
                    ],
                    'description' => Yii::t('app', 'Краткое описание'),
                    'data' => Yii::t('app', 'Данные запроса'),
                    'return' => Yii::t('app', 'Данные ответа (исключения см. в общем описании)'),
                ],
            Yii::t('app','Действия') => [
                [
                    'action' => 'account/balance/<account>',
                    'method' => 'GET',
                    'description' => Yii::t('app', 'Получить баланс'),
                    'return' => "array[balance][wei,eth]",
                ],
                [
                    'action' => 'account/login',
                    'method' => 'POST',
                    'description' => Yii::t('app', 'Логин'),
                    'data' => 'login,password',
                ],
                [
                    'action' => 'account/register',
                    'method' => 'POST',
                    'description' => Yii::t('app', 'Регистрация'),
                    'data' => 'login,email,password',
                ],
                [
                    'action' => 'account/password/update',
                    'method' => 'PUT',
                    'description' => Yii::t('app', 'Обновить пароль'),
                    'data' => 'old_password,new_password',
                ],
                [
                    'action' => 'account/info/<id>',
                    'method' => 'GET',
                    'description' => Yii::t('app', 'Получить информацию о пользователе'),
                ],
                [
                    'action' => 'account/info/<id>',
                    'method' => 'PUT',
                    'description' => Yii::t('app', 'Обновить информацию о пользователе'),
                    'data' => 'username,email,password_hash,auth_key,ref_number,confirmed_at,unconfirmed_email,blocked_at,registration_ip,created_at,updated_at,flags,last_login_at,',
                ],
            ],
        ];
    }
}
