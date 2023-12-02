// import logo from './logo.svg';
import './App.css';
import BlocknativeSdk from 'bnc-sdk';
import Web3 from 'web3';

const provider = window.ethereum
const web3 = new Web3(provider)

const DAPP_ID = process.env.REACT_APP_BLOCKNATIVE_API
const NETWOKRK_ID = 5

// initialize and connect to the api
const blocknative = new BlocknativeSdk({
  dappId: DAPP_ID,
  networkId: NETWOKRK_ID
})

// const { clientIndex } = blocknative

async function send() {
  

  const accounts = await web3.eth.getAccounts()
  const address = accounts[0]
  const txOptions = {
    to: "0x792ec62e6840bFcCEa00c669521F678CE1236705",
    from: address,
    value: "100000000"

  }
  
  console.log('hi 0')
  web3.eth.sendTransaction(txOptions).on('transactionHash', hash => {
    console.log('hi')
      // call with the transaction hash of the transaction that you would like to receive status updates for
      // const { emitter } = blocknative.transaction(clientIndex, hash)
      const { emitter } = blocknative.transaction(hash)

      // listen to some events
      emitter.on('txPool', transaction => {
        console.log(transaction)
        console.log('Transaction is in the mempool')
    }) 
      emitter.on('txConfirmed', transaction => {
        console.log(transaction)
        console.log('Transaction is confirmed!')
    })
  })
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div>
          <button onClick={send}>Send Transaction</button>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
