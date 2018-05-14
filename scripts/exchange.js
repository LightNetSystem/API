/**
 * HttpProvider
 * AccountAddress
 * AccountPrivateKey
 * SourceAddress
 * DestAddress
 * ContractAddress
 * Value
 */

var util = require('util');

let vars = {};

process.argv.forEach(function (val, index, array) {
    if (index < 2) {
        return;
    }
    //console.log(index + ': ' + val);
    let arr = val.split('=');
    vars[arr[0]] = arr[1];
});

let Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider(vars['HttpProvider']));

web3.eth.defaultAccount = vars['AccountAddress'];

var ContractABI = [{"constant":false,"inputs":[{"name":"alerter","type":"address"}],"name":"removeAlerter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"reserve","type":"address"},{"name":"src","type":"address"},{"name":"dest","type":"address"},{"name":"add","type":"bool"}],"name":"listPairForReserve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"perReserveListedPairs","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"enabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOperators","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"},{"name":"sendTo","type":"address"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxGasPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAlerter","type":"address"}],"name":"addAlerter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"negligibleRateDiff","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeBurnerContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"expectedRateContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"whiteListContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"field","type":"bytes32"},{"name":"value","type":"uint256"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getUserCapInWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_enable","type":"bool"}],"name":"setEnable","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isReserve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdminQuickly","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAlerters","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"dest","type":"address"},{"name":"srcQty","type":"uint256"}],"name":"getExpectedRate","outputs":[{"name":"expectedRate","type":"uint256"},{"name":"slippageRate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"reserves","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOperator","type":"address"}],"name":"addOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"reserve","type":"address"},{"name":"add","type":"bool"}],"name":"addReserve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"operator","type":"address"}],"name":"removeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_whiteList","type":"address"},{"name":"_expectedRate","type":"address"},{"name":"_feeBurner","type":"address"},{"name":"_maxGasPrice","type":"uint256"},{"name":"_negligibleRateDiff","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"dest","type":"address"},{"name":"srcQty","type":"uint256"}],"name":"findBestRate","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"walletId","type":"address"}],"name":"trade","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"sendTo","type":"address"}],"name":"withdrawEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getNumReserves","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"user","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_admin","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"EtherReceival","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"src","type":"address"},{"indexed":false,"name":"dest","type":"address"},{"indexed":false,"name":"actualSrcAmount","type":"uint256"},{"indexed":false,"name":"actualDestAmount","type":"uint256"}],"name":"ExecuteTrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reserve","type":"address"},{"indexed":false,"name":"add","type":"bool"}],"name":"AddReserveToNetwork","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reserve","type":"address"},{"indexed":false,"name":"src","type":"address"},{"indexed":false,"name":"dest","type":"address"},{"indexed":false,"name":"add","type":"bool"}],"name":"ListReservePairs","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"sendTo","type":"address"}],"name":"TokenWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"sendTo","type":"address"}],"name":"EtherWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pendingAdmin","type":"address"}],"name":"TransferAdminPending","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAdmin","type":"address"},{"indexed":false,"name":"previousAdmin","type":"address"}],"name":"AdminClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAlerter","type":"address"},{"indexed":false,"name":"isAdd","type":"bool"}],"name":"AlerterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOperator","type":"address"},{"indexed":false,"name":"isAdd","type":"bool"}],"name":"OperatorAdded","type":"event"}];

let contract = new web3.eth.Contract(ContractABI, vars['ContractAddress']);
//TODO: 0 parameter - ??
let expectedRate = contract.methods.getExpectedRate(vars['SourceAddress'], vars['DestAddress'], 0).call().then(function (result) {
    if (!result) {
        //TODO: exchange from source to dest is currently not available - handle this
        console.log('exchange from source to dest is currently not available');
        return;
    }
    console.log("result: " + util.inspect(result, {showHidden: false, depth: null}));
    console.log("result.slippageRate: " + util.inspect(result.slippageRate, {showHidden: false, depth: null}));
    resend(result.slippageRate);
});
//console.log(util.inspect(expectedRate, {showHidden: false, depth: null}));
//console.log("expectedRate: " + expectedRate);

function resend(slippageRate) {

    let privateKey = new Buffer(vars['AccountPrivateKey'], 'hex');

    let functionName = 'trade';
    let types = ['address', 'uint256', 'address', 'address', 'uint256', 'uint256', 'address'];
    let args = [
        vars['SourceAddress'],      //'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', //ETH
        vars['Value'] * 1000000000000000000,
        vars['DestAddress'],        // '0xd3c64BbA75859Eb808ACE6F2A6048ecdb2d70817',   //EOS
        vars['AccountAddress'],
        '0x8000000000000000000000000000000000000000000000000000000000000000',       //100 * 1000000000000000000,
        slippageRate, //1,
        0
        //'8000000000000000000000000000000000000000000000000000000000000000',
        //4294967295,
        //1,
        //0
    ];

    let fullName = functionName + '(' + types.join() + ')';
    console.log("fullName: " + fullName);

    let data = web3.eth.abi.encodeFunctionSignature(fullName) + web3.eth.abi.encodeParameters(types, args).replace('0x', '');
    console.log("data: " + data);

    web3.eth.getTransactionCount(vars['AccountAddress']).then(function (count) {
        console.log("getTransactionCount count: " + count);

        let nonce = web3.utils.toHex(count);
        console.log("nonce: " + nonce);
        //let gasPrice = web3.utils.toHex(21 * 1e9);
        let gasPrice = web3.utils.toHex(200 * 1e9);
        //let gasLimitHex = web3.utils.toHex(4700000);
        let gasLimitHex = web3.utils.toHex(4700000);
        let rawTx = {
            'nonce': nonce,
            'gasPrice': gasPrice,
            'gasLimit': gasLimitHex,
            'from': vars['AccountAddress'],
            'to': vars['ContractAddress'],   //'0x0a56d8a49E71da8d7F9C65F95063dB48A3C9560B', // https://github.com/KyberNetwork/smart-contracts/blob/ropsten/web3deployment/ropsten.json - "network"
            'data': data,
            value: vars['Value'] * 1000000000000000000
        };

        const Tx = require('ethereumjs-tx');
        let tx = new Tx(rawTx);
        tx.sign(privateKey);
        let serializedTx = '0x' + tx.serialize().toString('hex');
        console.log('serializedTx : ' + serializedTx);

        web3.eth.sendSignedTransaction(serializedTx, function (err, txHash) {
            //TODO: throw on error
            console.log("err: " + err, "txHash: " + txHash);
            web3.eth.getTransaction(txHash, console.log);
        }).catch(function (err) {
            console.log("sendSignedTransaction err: " + err);
        }).then(function (end) {
            console.log("sendSignedTransaction end: " + end);
            util = require("util");
            let obj_str = util.inspect(end);
            console.log(obj_str);
        });

    });
}