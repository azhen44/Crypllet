import React, {useContext, useEffect, useState} from 'react';
import { TransactionContext } from './TransactionContext';
export const MarketContext = React.createContext({coinInfo:[]});
import axios from 'axios';


export const MarketProvider = ({children}) => {
  const [faveCoins, setFaveCoins] = useState([]) // favourite coins to be displayed  
  const [isMyFave, setIsMyFave] = useState(false)
  const [coinInfo, setCoinInfo] = useState([])
  const { checkIfTransactionExist, checkIfWalletIsConnnected, userID, setUserID} =useContext(TransactionContext)

  const changeMarketView = () => {
    setIsMyFave(!isMyFave)
  }

  const handleSearch = (search) => { 
    return coinInfo.filter((coin) => (
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    ))
  }
  

  const getTickerData = async () => {   
    // `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  
     try {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false`
      const response = await axios.get(url,
        {params: {per_page:100, page:1}}
        )
      if(response) {
        setCoinInfo(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  //searches for 
  const searchForCoin = (search) => {
    return coinInfo.filter((coin) => (
      coin.symbol.toLowerCase() === search     
    ))
  }

    //gets my favourited coins from database
    const getMyFaves = async () => {      
      try {
        const res = await axios.get(`http://localhost:3001/${localStorage.getItem("userID")}/user_coins`)
        if(res) {
          const newArr = res.data.map(coin => {
            return coin.coin_id
          })
          let res2 = [];
          newArr.forEach(search => {
            res2.push(...searchForCoin(String(search)))
          })
          setFaveCoins(res2)
        }
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    checkIfWalletIsConnnected();
    checkIfTransactionExist();
    getTickerData();
    getMyFaves();
    //setUserID(parseInt(localStorage.getItem("userID"))) 
  },[])



  return (
    <MarketContext.Provider value={{coinInfo, isMyFave, changeMarketView, getTickerData, handleSearch, userID, faveCoins, setFaveCoins, getMyFaves}}>
      {children}
    </MarketContext.Provider>
  )


}
