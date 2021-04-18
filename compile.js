const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

const source = fs.readFileSync(inboxPath, 'utf-8');

let complierInput = {
  language: 'Solidity',
  sources:
  {
      'Inbox.sol': 
      {
          content: source
      }
  },
  settings:
  {
      optimizer:
      {
          enabled: true
      },
      outputSelection:
      {
          '*':{
              '*':['*']
          }
      }
  }
};
console.log('Compiling Contract');
let compiledContract = JSON.parse(solc.compile(JSON.stringify(complierInput)));
console.log('Contract Compiled');
// console.log(Object.keys(compiledContract.contracts['Inbox.sol']['Inbox']))
// console.log(Object.keys(compiledContract.contracts['Inbox.sol']['Inbox'].evm.deployedBytecode))
for (let contractName in compiledContract.contracts['Inbox.sol']) {
  // console.log(contractName , compiledContract.contracts['Inbox.sol'][contractName].abi);      
  let abi = compiledContract.contracts['Inbox.sol'][contractName].abi;
  const outputPath = path.resolve(__dirname, 'contracts/bin', `${contractName}_abi.json`);
  fs.writeFileSync(outputPath, JSON.stringify(abi));
  // return compiledContract.contracts['Inbox.sol'][contractName];
}

// console.log(Object.keys(compiledContract.contracts['Inbox.sol']['Inbox']))
module.exports = compiledContract.contracts['Inbox.sol']['Inbox']