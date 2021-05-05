import logo from './logo.svg';
import Caver from 'caver-js';
import './App.css';

const COUNT_CONTRACT_ADDRESS = '0xdEd6b4769a69D2B954Fe6e7B1E7Da5690FbfeE62';
const ACCESS_KEY_ID = 'KASK69UQCMO4FN6XGIQ3A66X';
const SECRET_ACCESS_KEY = 'Wr2f/abAF5trTKz5RFE3PaR8OqxGegjTvfGH9/xI';
const CHAIN_ID = '1001'; // MAINNET 8217 TESTNET 1001
const COUNT_ABI = '[ { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]'
const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64")
    },
    {name: "x-chain-id", value: CHAIN_ID}
  ]
}

const caver =  new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const CountContract = new caver.contract(JSON.parse(COUNT_ABI), COUNT_CONTRACT_ADDRESS);
const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  console.log(_count);
}

const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log(`BALANCE: ${balance}`);
    return balance;
  })
}

const setCount = async (newCount) => {
  // 사용할 account 설정
  try {
    const privatekey = '0x26c8485748a7f9e9ae637a5c014f9955c2be9aa24ca8f1674e7e98c7123c9a4d';
    const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);
    caver.wallet.add(deployer);
    // 스마트 컨트랙트 실행 트랜젝션 날리기
    // 결과 확인

    const receipt = await CountContract.methods.setCount(newCount).send({
      from: deployer.address, // address
      gas: "0x4bfd200"//
    })
    console.log(receipt);
  } catch(e) {
    console.log(`[ERROR_SET_COUNT]${e}`);
  }
  
}
// 1 Smart contract 배포 주소 파악(가져오기)
// 2 caver.js 이용해서 스마트 컨트랙트 연동하기
// 3 가져온 스마트 컨트랙트 실행 결과(데이터) 웹에 표현하기

function App() {
  readCount();
  getBalance('0xf3810aca8544e19559b6f06249ce5bc93376a2ad');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button title={'카운트 변경'} onClick={()=>{setCount(100)}} />
        <p>
          GOOD <code>src/App.js</code> and save to reload.
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
