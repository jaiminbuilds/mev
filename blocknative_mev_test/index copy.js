import WebSocket from 'ws'
import BlocknativeSdk from 'bnc-sdk'
import Web3 from 'web3'
import dotenv from 'dotenv';

dotenv.config()

const blocknativeApi = process.env.BLOCKNATIVE_API;
const infuraApi = process.env.INFURA_API;

const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${infuraApi}`)

// create options object
const options = {
  dappId: blocknativeApi,
  networkId: 1,
  ws: WebSocket
  // un-comment if you would like to log all transaction events
  // transactionHandlers: [event => console.log(event.transaction)]
}

// initialize and connect to the api
const blocknative = new BlocknativeSdk(options)
// initialize web3
// const web3 = new Web3(window.ethereum)

// get current account
const accounts = await web3.eth.getAccounts();
const address = accounts[0];

// // create transaction options object
// const txOptions = {
//   from: address,
//   to: "0x792ec62e6840bFcCEa00c669521F678CE1236705",
//   value: "1000000"
// }

// // initiate a transaction via web3.js
// web3.eth.sendTransaction(txOptions).on('transactionHash', hash => {
//   // call with the transaction hash of the
//   // transaction that you would like to receive status updates for
//   const { emitter } = blocknative.transaction(hash)

//   // listen to some events
//   emitter.on('txPool', transaction => {
//     console.log(`Sending ${transaction.value} wei to ${transaction.to}`)
//   })

//   emitter.on('txConfirmed', transaction => {
//     console.log('Transaction is confirmed!')
//   })

//   // catch every other event that occurs and log it
//   emitter.on('all', transaction => {
//     console.log(`Transaction event: ${transaction.eventCode}`)
//   })
// })
// process.exit()

const txOptions = {
  to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  value: 1000000000000000
}

// initiate a transaction via web3.js
web3.eth.sendTransaction(txOptions).on('transactionHash', hash => {
  // call with the transaction hash of the transaction that you would like to receive status updates for
  const { emitter } = blocknative.transaction(hash)

  // listen to some events
  emitter.on('txPool', transaction => {
    console.log(`Sending ${transaction.value} wei to ${transaction.to}`)
  })

  emitter.on('txConfirmed', transaction => {
    console.log('Transaction is confirmed!')
  })

  // catch every other event that occurs and log it
  emitter.on('all', transaction => {
    console.log(`Transaction event: ${transaction.eventCode}`)
  })
})