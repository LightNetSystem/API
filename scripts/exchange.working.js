/*var util = require('util');
 console.log(util.inspect(process.env, {showHidden: false, depth: null}));
 console.log(util.inspect(module.paths, {showHidden: false, depth: null}));*/

/*let vars = {};

 process.argv.forEach(function (val, index, array) {
 if (index < 2) {
 return;
 }
 //console.log(index + ': ' + val);
 let arr = val.split('=');
 vars[arr[0]] = arr[1];
 });*/

let Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/yjaFPKGKkrh2mp7GPBSt"));

web3.eth.defaultAccount = '0xE40662cCB4aCbE85F0702DAeb72b72b5760171E6';

let privateKey = new Buffer('0fb1e0efd294f60f5255c3a75cd938c1670227874466234f4b7bfad4ccf4b6eb', 'hex');

let functionName = 'trade';
let types = ['address', 'uint256', 'address', 'address', 'uint256', 'uint256', 'address'];
let args = [
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    0.01 * 1000000000000000000,
    '0xd3c64BbA75859Eb808ACE6F2A6048ecdb2d70817',   //EOS
    '0xE40662cCB4aCbE85F0702DAeb72b72b5760171E6',
    100 * 1000000000000000000,
    '0x21cc997b0ab0b3c53', //1,
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

web3.eth.getTransactionCount('0xE40662cCB4aCbE85F0702DAeb72b72b5760171E6').then(function (count) {
    console.log("getTransactionCount count: " + count);

    let nonce = web3.utils.toHex(count);
    console.log("nonce: " + nonce);
    //let gasPrice = web3.utils.toHex(21 * 1e9);
    //let gasLimitHex = web3.utils.toHex(4700000);
    let gasPrice = web3.utils.toHex(21 * 1e9);
    let gasLimitHex = web3.utils.toHex(4700000);
    let rawTx = {
        'nonce': nonce,
        'gasPrice': gasPrice,
        'gasLimit': gasLimitHex,
        'from': '0xE40662cCB4aCbE85F0702DAeb72b72b5760171E6',
        'to': '0x0a56d8a49E71da8d7F9C65F95063dB48A3C9560B',
        'data': data,
        value: 0.01 * 1000000000000000000
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
