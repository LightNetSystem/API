var cryptoMvp = {
    getBalanceOfAccount: function (account) {
        //TODO: to translate
        var balance = '<span style="color: red">error</span>';

        try {
            var web3 = new Web3(new Web3.providers.HttpProvider(cryptoMvp.httpProvider));
            balance = web3.eth.getBalance(account) / 1000000000000000000;
        } catch (error) {
            helper.log('Crypto Error: ' + error);
        }

        return balance;
    }
};
