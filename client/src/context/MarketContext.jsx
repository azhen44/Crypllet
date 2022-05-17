import React, {useContext, useEffect, useState} from 'react';
import { TransactionContext } from './TransactionContext';
export const MarketContext = React.createContext();
import axios from 'axios';


export const MarketProvider = ({children}) => {
  const [isMyFave, setIsMyFave] = useState(false)
  const [coinInfo, setCoinInfo] = useState([])
  const [coinList, setCoinList] = useState(`"BTCUSDT","ETHUSDT","DOGEUSDT","BNBUSDT","XRPUSDT","ADAUSDT","SOLUSDT","DOTUSDT","LTCUSDT","FTTUSDT"`)
  const { checkIfTransactionExist, checkIfWalletIsConnnected} =useContext(TransactionContext)

  const changeMarketView = () => {
    setIsMyFave(!isMyFave)
  }
  

  const getTickerData = async (ticker) => {
   
    try {
      const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=[${ticker}]`
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
    getTickerData(coinList)
  },[])



  return (
    <MarketContext.Provider value={{coinInfo, isMyFave, changeMarketView}}>
      {children}
    </MarketContext.Provider>
  )


}
