<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "ico_transactions".
 *
 * @property int $id
 * @property string $from
 * @property string $to
 * @property string $value
 * @property string $transaction_full_info
 * @property string $tx_hash
 * @property string $created
 */
class IcoTransactions extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'ico_transactions';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['from', 'to', 'value', 'transaction_full_info', 'tx_hash', 'created'], 'required'],
            [['transaction_full_info'], 'string'],
            [['created'], 'safe'],
            [['from', 'to', 'tx_hash'], 'string', 'max' => 150],
            [['value'], 'string', 'max' => 100],
            [['tx_hash'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'from' => Yii::t('app', 'From'),
            'to' => Yii::t('app', 'To'),
            'value' => Yii::t('app', 'Value'),
            'transaction_full_info' => Yii::t('app', 'Transaction Full Info'),
            'tx_hash' => Yii::t('app', 'Tx Hash'),
            'created' => Yii::t('app', 'Created'),
        ];
    }
}
