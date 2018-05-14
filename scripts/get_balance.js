/**
 * HttpProvider
 * AccountAddress
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

async function gb() {
    let balance = await web3.eth.getBalance(vars['AccountAddress']);
    console.log(balance);
}

gb();

//let balance = web3.eth.getBalance(vars['AccountAddress']) / 1000000000000000000;
/*balance = web3.eth.getBalance(vars['AccountAddress']).then(function (result) {
    result = result / 1000000000000000000;
    console.log('result: ' + result);
});*/
