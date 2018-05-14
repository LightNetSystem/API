<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use app\helpers\CryptoHelper;

class MobileController extends \yii\web\Controller
{
    public $layout = 'mobile';

    /*public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['main'],
                'rules' => [
                    [
                        'actions' => ['main'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
        ];
    }*/


    /**
     * @param string $gwpAddress generated user wallet number
     * @return string
     */
    public function actionIndex($gwpAddress = false, $gwpPrivateKey = false)
    {
        if ($gwpAddress && $gwpPrivateKey) {
            //$gwpAddress = $gwpAddress ?: '0x2E14ea3e5bfC7388edd15c43Ddc55F2F156500cc';    // Rinkeby
            $gwpAddress = $gwpAddress ?: '0xB270EFAEa4FFCEcf160728e74bCdba5E9Ec9A410';  // Ropsten
            $gwpPrivateKey = $gwpPrivateKey ?: 'd06e3225c9683da4c2654e6d89c5be539a85e039421d37a3c3221c95b354264c';  // Ropsten
        }

        $session = Yii::$app->session;
        $session->set('gwpAddress', $gwpAddress);
        $session->set('gwpPrivateKey', $gwpPrivateKey);

        return $this->render('index', [
            'gwpAddress' => $gwpAddress,
            'gwpPrivateKey' => $gwpPrivateKey,
        ]);
    }

    public function actionMain($gwpAddress, $gwpPrivateKey)
    {
        /*$session = Yii::$app->session;
        $session->set('gwpAddress', $gwpAddress);
        $session->set('gwpPrivateKey', $gwpPrivateKey);*/

        $params = [
            'gwpAddress' => $gwpAddress,
            'gwpPrivateKey' => $gwpPrivateKey,
        ];

        if (Yii::$app->request->isAjax) {
            return $this->renderAjax('main', $params);
        }

        return $this->render('main', $params);
    }

    public function actionPayNfc1()
    {
        return $this->renderAjax('pay-nfc-1');
    }

    public function actionPayNfc2()
    {
        return $this->renderAjax('pay-nfc-2');
    }

    public function actionPayNfcSuccess()
    {
        return $this->renderAjax('pay-nfc-success');
    }

    public function actionTransferUsdBank()
    {
        return $this->render('transfer-usd-bank');
    }

    public function actionTransfer()
    {
        //$gwpAddress = Yii::$app->getRequest()->get('gwpAddress') ?? Yii::t('app', 'Not set');
        $gwpAddress = Yii::$app->getRequest()->get('gwpAddress') ?? '0xB270EFAEa4FFCEcf160728e74bCdba5E9Ec9A410';
        $gwpPrivateKey = Yii::$app->getRequest()->get('gwpPrivateKey') ?? 'd06e3225c9683da4c2654e6d89c5be539a85e039421d37a3c3221c95b354264c';
        return $this->render('transfer', [
            'gwpAddress' => $gwpAddress,
            'gwpPrivateKey' => $gwpPrivateKey,
        ]);
    }

    public function actionCurrencyExchange($amount, string $currencyFrom, string $currencyTo)
    {
        return CryptoHelper::convertCurrenciesByExchangeRatesOnline($amount, $currencyFrom, $currencyTo);
    }

    public function actionEosExchange($account, $accountPrivateKey, $amount)
    {
        //TODO: вынести в модель

        /*$nodejsFile = Yii::getAlias('@app') . '/scripts/exchange.js'
            . ' AccountAddress=' . Yii::$app->params['ether']['accountAddress']
            . ' PrivateKeyRaw=' . Yii::$app->params['ether']['privateKey']
            . ' ContractAddress=' . Ico::getCurrentContract()
            . ' DestinationAccount=' . $this->callbackUser->ETH
            . ' TokensAmount=' . $feonTokensWei;

        file_put_contents($fileName, $values . "\n\ncommand: $nodejsFile");

        $pathResult = Yii::getAlias('@app') . '/data/bitcoin_callbacks/' . $dateTime . "-$address.nodejs.log";

        exec(Yii::$app->params['server']['nodejs-path'] . " $nodejsFile > $pathResult 2>&1 &");*/

        if (substr($accountPrivateKey, 0, 2) == '0x') {
            $accountPrivateKey = substr($accountPrivateKey, 2);
        }

        $commandFile = Yii::getAlias('@app') . '/scripts/exchange.js'
            . ' HttpProvider=' . Yii::$app->params['ether']['httpProvider']
            . ' AccountAddress=' . $account
            . ' AccountPrivateKey=' . $accountPrivateKey
            . ' SourceAddress=' . '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'      //ETH
            . ' DestAddress=' . '0xd3c64BbA75859Eb808ACE6F2A6048ecdb2d70817'        //EOS
            . ' ContractAddress=' . '0x0a56d8a49E71da8d7F9C65F95063dB48A3C9560B'    // https://github.com/KyberNetwork/smart-contracts/blob/ropsten/web3deployment/ropsten.json - "network"
            . ' Value=' . $amount;
        //. ' ContractABI=' . Yii::$app->params['ether']['ABI'];

        $dateTime = date('Y-m-d.H-i-s');

        $commandFileName = Yii::getAlias('@app') . '/data/scripts/' . $dateTime . " - eos-script-command.txt";
        $resultFileName = Yii::getAlias('@app') . '/data/scripts/' . $dateTime . " - eos-script-result.txt";

        $fullCommand = Yii::$app->params['server']['nodejs-path'] . " $commandFile > $resultFileName 2>&1 &";
        file_put_contents($commandFileName, $fullCommand);

        exec($fullCommand);
    }

    public function actionExchange()
    {
        $from = Yii::$app->getRequest()->post('from');
        $to = Yii::$app->getRequest()->post('to');
        $amount = Yii::$app->getRequest()->post('amount');

        $session = Yii::$app->session;
        $account = $session->get('gwpAddress');
        $accountPrivateKey = $session->get('gwpPrivateKey');

        if (substr($accountPrivateKey, 0, 2) == '0x') {
            $accountPrivateKey = substr($accountPrivateKey, 2);
        }

        $fromAccount = Yii::$app->params['ether']['ropsten']['tokens'][$from]['address'];
        $toAccount = Yii::$app->params['ether']['ropsten']['tokens'][$to]['address'];

        $commandFile = Yii::getAlias('@app') . '/scripts/exchange.js'
            . ' HttpProvider=' . Yii::$app->params['ether']['httpProvider']
            . ' AccountAddress=' . $account
            . ' AccountPrivateKey=' . $accountPrivateKey
            . ' SourceAddress=' . $fromAccount
            . ' DestAddress=' . $toAccount
            . ' ContractAddress=' . '0x0a56d8a49E71da8d7F9C65F95063dB48A3C9560B'    // https://github.com/KyberNetwork/smart-contracts/blob/ropsten/web3deployment/ropsten.json - "network"
            . ' Value=' . $amount;

        $dateTime = date('Y-m-d.H-i-s');

        $commandFileName = Yii::getAlias('@app') . '/data/scripts/' . $dateTime . " - $from-$to-script-command.txt";
        $resultFileName = Yii::getAlias('@app') . '/data/scripts/' . $dateTime . "-$from-$to-script-result.txt";

        $fullCommand = Yii::$app->params['server']['nodejs-path'] . " $commandFile > $resultFileName 2>&1 &";
        file_put_contents($commandFileName, $fullCommand);

        exec($fullCommand);

        $url = '';

        sleep(7);
        if ($content = file_get_contents($resultFileName)) {
            list($left, $right) = explode('txHash: ', $content);
            $hash = substr($right, 0, 66);
            $url = 'https://ropsten.etherscan.io/tx/' . $hash;
        }

        //txHash: 0xf4b6bc9a0b78651381ad797d98840b83cb5960496e7de6e2c11da6b6f5e67098

        return $url;
    }
}
