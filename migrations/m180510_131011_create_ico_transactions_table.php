<?php

use yii\db\Migration;

/**
 * Handles the creation of table `ico_transactions`.
 */
class m180510_131011_create_ico_transactions_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('ico_transactions', [
            'id' => $this->primaryKey(),
            'from' => $this->string(150)->notNull(),
            'to' => $this->string(150)->notNull(),
            'value' => $this->string(100)->notNull(),
            'transaction_full_info' => $this->text()->notNull(),
            'tx_hash' => $this->string(150)->unique()->notNull(),
            'created' => $this->datetime()->notNull(),
        ]);

        $this->createIndex(
            'idx-ico_transactions-from',
            'ico_transactions',
            'from'
        );

        $this->createIndex(
            'idx-ico_transactions-to',
            'ico_transactions',
            'to'
        );

        $this->createIndex(
            'idx-ico_transactions-tx_hash',
            'ico_transactions',
            'tx_hash'
        );

        $this->createIndex(
            'idx-ico_transactions-created',
            'ico_transactions',
            'created'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropIndex(
            'idx-ico_transactions-created',
            'ico_transactions'
        );

        $this->dropIndex(
            'idx-ico_transactions-tx_hash',
            'ico_transactions'
        );

        $this->dropIndex(
            'idx-ico_transactions-to',
            'ico_transactions'
        );

        $this->dropIndex(
            'idx-ico_transactions-from',
            'ico_transactions'
        );

        $this->dropTable('ico_transactions');
    }
}
