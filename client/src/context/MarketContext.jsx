import React, {useContext, useEffect, useState} from 'react';
import { TransactionContext } from './TransactionContext';
export const MarketContext = React.createContext({coinInfo:[]});
import axios from 'axios';


export const MarketProvider = ({children}) => {
  const [isMyFave, setIsMyFave] = useState(false)
  const [coinInfo, setCoinInfo] = useState([])
  const [coinList, setCoinList] = useState(`"BTCUSDT","ETHUSDT","DOGEUSDT","BNBUSDT","XRPUSDT","ADAUSDT","SOLUSDT","DOTUSDT","LTCUSDT","FTTUSDT"`)
  const { checkIfTransactionExist, checkIfWalletIsConnnected} =useContext(TransactionContext)

  const changeMarketView = () => {
    setIsMyFave(!isMyFave)
  }
  

  const getTickerData = async () => {
   
    // try {
    //   const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=[${ticker}]`
    //   const response = await axios.get(url)
    //   if(response) {
    //     setCoinInfo(response.data)
    //   }
    // } catch (error) {
    //   console.error(error)
    // }
    // THIS GIVES ALL COINS
    //https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
    
     try {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false`
      const response = await axios.get(url)
      if(response) {
        setCoinInfo(response.data)
      }
    } catch (error) {
      console.error(error)
    }
    

    
 
  }
  useEffect(() => {
    checkIfWalletIsConnnected();
    checkIfTransactionExist();
    getTickerData()
  },[])



  return (
    <MarketContext.Provider value={{coinInfo, isMyFave, changeMarketView}}>
      {children}
    </MarketContext.Provider>
  )


}
