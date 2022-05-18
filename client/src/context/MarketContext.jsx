import React, {useContext, useEffect, useState} from 'react';
import { TransactionContext } from './TransactionContext';
export const MarketContext = React.createContext({coinInfo:[]});
import axios from 'axios';


export const MarketProvider = ({children}) => {
  const [isMyFave, setIsMyFave] = useState(false)
  const [coinInfo, setCoinInfo] = useState([])
  const { checkIfTransactionExist, checkIfWalletIsConnnected} =useContext(TransactionContext)

  const changeMarketView = () => {
    setIsMyFave(!isMyFave)
  }
  

  const getTickerData = async () => {   
    // `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  
     try {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false`
      const response = await axios.get(url,
        {params: {per_page:10, page:1}}
        )
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
  },[])



  return (
    <MarketContext.Provider value={{coinInfo, isMyFave, changeMarketView, getTickerData}}>
      {children}
    </MarketContext.Provider>
  )


}
