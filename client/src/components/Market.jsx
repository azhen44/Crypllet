import React ,{useContext, useState, useRef, useCallback} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { MarketContext } from "../context/MarketContext";
import axios from "axios";
import { TransactionContext } from "../context/TransactionContext";
import useGetCoin from "../customHooks/useGetCoin.jsx";
import qs from 'qs'

const Tickercard = ({lastCoinRef, index, id,symbol, name, price, img, priceChange24hr, faveItem}) => {

  let navigate = useNavigate();
  const handleTableClicks = () => {
    navigate(`/Market/${name.toLowerCase()}`)
  }
  return (    
      <tr className="text-white text-base text-center mx-2 cursor-pointer">
          <td ref={lastCoinRef} onClick={handleTableClicks} className="flex flex-col py-5 justify-center items-center">
            <img className="object-scale-down h-20 w-40" src={img}/>
            {`${name} ${symbol.toUpperCase()}`}
          </td>        
          <td> ${price}</td>
          <td className={priceChange24hr > 0? "text-green-600" : "text-red-600"}> {`${priceChange24hr.toFixed(2)}%`}</td>   
          <td><FontAwesomeIcon className="hover:fill-red-500" onClick={() => faveItem(symbol)}icon={faHeart}></FontAwesomeIcon></td>
      </tr>
  )
}

const Market = () => {  
  const [apiCoins, setApiCoins] = useState([])
  const [search, setSearch] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const {coins, hasMore, loading, error} = useGetCoin(pageNumber, search)
  const { coinInfo, changeMarketView, handleSearch, userID } = useContext(MarketContext)
  const { currentAccount } = useContext(TransactionContext)
  const observer = useRef()
  const lastCoinRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entires => {
      if (entires[0].isIntersecting && hasMore) {
        setPageNumber(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)   
  },[loading, hasMore])

  const faveItem = (symbolName) => {
    // const params = new URLSearchParams()
    // params.append('coin', symbolName)
    // params.append('wallet_address', currentAccount)
    // console.log(symbolName)   
      // axios.post("http://localhost:3001/user_coins", params
      //   ,{
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      const data = { 'coin' : symbolName, 'wallet_address': currentAccount}
      axios({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url : "http://localhost:3001/user_coins"
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }


 
  //renders all the coins available
  const allCoins = coins.map((x,index) => {            
    if (coins.length === index + 1) {
      return (
        <Tickercard key={x.id+index} index={index} id={x.id} symbol={x.symbol} name={x.name} price={x.current_price} priceChange24hr={x.price_change_percentage_24h} img={x.image} faveItem={faveItem} lastCoinRef={lastCoinRef}
        /> 
      )
    } else {
      return (
        <Tickercard key={x.id+index} index={index} id={x.id} symbol={x.symbol} name={x.name} price={x.current_price} priceChange24hr={x.price_change_percentage_24h} img={x.image} faveItem={faveItem}
        /> 
      )
    }
  }) 

  //Renders Coins for search term coins
    const temp = handleSearch(search);
    const searchCoin = temp.map((x,index) => {
      return (
        <Tickercard key={x.id+index} index={index} id={x.id} symbol={x.symbol} name={x.name} price={x.current_price} priceChange24hr={x.price_change_percentage_24h} img={x.image} faveItem={faveItem}
        /> 
      )
    })
 
  return (
    <div className="flex w-full justify-center items-center gradient-bg-services">
      <div className="flex flex-col items-center justify-between md:p-20 py-12 px-4">
       <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className={`text-white text-3xl sm:text-5xl py-2 bg-neutral-600`}>
          Market
        </h1>
        <h1
          className={`text-white text-3xl sm:text-5xl py-2`}
          onClick={changeMarketView}
        >
          <Link to={`/${userID}/favourites`} >My Favourite</Link>
        </h1>
      </div>
        <input 
          onClick={handleSearch}
          name="search"
          value={search}
          placeholder={"Enter Coin Name"}
          onChange={(event)=>setSearch(event.target.value)}
        />
        <table>
          <tbody>
            <tr>
              <th className="text-white px-20 py-2 text-gradient ">Coin</th>
              <th className="text-white px-20 py-2 text-gradient ">Price ($USD) </th>
              <th className="text-white px-20 py-2 text-gradient ">24hr Percent Change</th>
              <th className="text-white px-20 py-2 text-gradient">Favourite?</th>
            </tr>
            {search? 
              searchCoin :
              allCoins
            }
          
   
        </tbody>
        </table>
        <div className="text-white text-3xl">{loading && 'Loading...'}</div>
    </div>
  </div>
  )
}

export default Market;