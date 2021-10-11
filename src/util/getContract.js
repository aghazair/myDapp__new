import Web3 from 'web3'
import ABI from '../contracts/learnstakecontract'
/* eslint-disable */
const address = '0x5b57B0440a5610FFC1058Eb3380199c5D121e16D';
const getContract = async() => {
    let web3 = new Web3(window.web3.currentProvider)
    let learnContract =  new web3.eth.Contract(ABI, address)
}
export default getContract
/* eslint-enable */