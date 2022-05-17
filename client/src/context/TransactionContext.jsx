import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { ethers } from 'ethers'
import {contractABI, contractAddress } from '../utils/constants'
export const TransactionContext = React.createContext();
const {ethereum}  = window;

//gets smartcontract. with the abi and address created. 
const getEthereumContract = () => {
  // MetaMask injects a Web3 Provider as "web3.currentProvider", so
  // we can wrap it up in the ethers.js Web3Provider, which wraps a
  // Web3 Provider and exposes the ethers.js Provider API
  const provider = new ethers.providers.Web3Provider(ethereum)
  // There is only ever up to one account in MetaMask exposed
  const signer = provider.getSigner();
  //contain all created functions in smartcontract.
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
  
  return transactionContract
}

export const TransactionProvider = ({children}) => {
  const [currentAccount, setCurrentAccount] = useState("")
  const [formData, setFromData] = useState({addressTo: '', amount: '', keyword:'', message: ''})
  const [isLoading, setIsLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
  const [transactions, setTransactions] = useState([])



  const handleChange = (e, name) => {
    setFromData((prevState) => ({...prevState, [name]: e.target.value}))
  }

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert ("Please install metamask")
      const transactionContract = getEthereumContract();
      const availableTransactions = await transactionContract.getAllTransactions();
      const structuredTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }));
      //console.log(structuredTransactions)
      //console.log('am i rev?', structuredTransactions.reverse())
      setTransactions(structuredTransactions.reverse())
    } catch (error) {
      console.log(error)
    }
    
  }

  const checkIfWalletIsConnnected = async () => {
    try {
      if (!ethereum) return alert ("Please install metamask");
      const accounts = await ethereum.request({method: 'eth_accounts'})

      if (accounts.length) {
        setCurrentAccount(accounts[0])
        getAllTransactions()
        console.log("Connected Wallet: ", accounts[0])
      } else {
        console.log("No accounts found")
      }      
    } catch (error) {
      console.log(error)
      throw new Error("no eth object")      
    }  
  }

  const checkIfTransactionExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", transactionCount)

    } catch (error) {
      console.log(error)
      throw new Error("no eth object")  
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert ("Please install metamask");
      const accounts = await ethereum.request({method: 'eth_requestAccounts'})

      window.location.reload();
    } catch (error) {
      console.log(error)
      throw new Error("no eth object")
    }
  }

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert ("Please install metamask");
      const {addressTo, amount, keyword, message} = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', //21000 gwei = 0.000021 eth
          value: parsedAmount._hex
        }]
      })

      //store on blockchain
      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      setIsLoading(true);
      console.log(`loading - ${transactionHash.hash}`)
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`success - ${transactionHash.hash}`)

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
      window.location.reload();

      
    } catch (error) {
      console.log(error)
      throw new Error("no eth object")     
    }
  }


  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFromData, handleChange, sendTransaction, transactions, isLoading, transactionCount, checkIfTransactionExist, checkIfWalletIsConnnected}}>
      {children}
    </TransactionContext.Provider>
  )

}