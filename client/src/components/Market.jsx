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
    navigate(`/Market/${id.toLowerCase()}`)
  }
  return (    
      <tr className="text-white text-base text-center mx-2 cursor-pointer">
          <td ref={lastCoinRef} onClick={handleTableClicks} className="flex flex-col py-5 justify-center items-center">
            <img className="object-scale-down h-20 w-40" src={img}/>
            {`${name} ${symbol.toUpperCase()}`}
          </td>        
          <td> ${price}</td>
<<<<<<< HEAD
          <td className={priceChange24hr > 0? "positive" : "negative"}> {`${priceChange24hr.toFixed(2)}%`}</td>   
          <td className="heartContainer"><FontAwesomeIcon className={favourite ? "heartIconClicked" : "heartIcon"} onClick={favouriteClicked}icon={faHeart}></FontAwesomeIcon></td>
=======
          <td className={priceChange24hr > 0? "text-green-600" : "text-red-600"}> {`${priceChange24hr.toFixed(2)}%`}</td>   
          <td><FontAwesomeIcon className="hover:fill-red-500" onClick={() => faveItem(symbol, index)} icon={faHeart}></FontAwesomeIcon></td>
>>>>>>> master
      </tr>
  )
}

const Market = () => {  
  const [search, setSearch] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const {coins, hasMore, loading, error} = useGetCoin(pageNumber, search)
  const { coinInfo, changeMarketView, handleSearch, faveCoins, setFaveCoins } = useContext(MarketContext)
  const { currentAccount, userID } = useContext(TransactionContext)
  
  //hooks to determine if last item in coin list is on screen. if so api call for more coin data and render.
  const observer = useRef()
  const lastCoinRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    //checks if element exists and hasMore is true. increase page Number to call more coin info.
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)   
  },[loading, hasMore])

<<<<<<< HEAD
  const faveItem = (symbolName, favourite) => {
      const params = new URLSearchParams()
    params.append('coin', symbolName)
    params.append('wallet_address', currentAccount)
    console.log(symbolName)   
      axios.post("http://localhost:3001/user_coins", params
        ,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
=======
  //saves favourite coins to database
  const faveItem = (symbolName, index) => {
    if(userID) {
      const data = { 'coin' : symbolName, 'wallet_address': currentAccount}
      if (!faveCoins.some(e => e.symbol === symbolName)) {
        console.log(coins[index])
        
        setFaveCoins((prev) => [...prev, coins[index]])
        console.log('fave coins in faveItem func', faveCoins)
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
    } else alert("Please log in to fave")
>>>>>>> master

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
    <div className={`marketContainer flex w-full justify-center items-center gradient-bg-services`}>
      <div>
       <div className="flex justify-center space-x-24 pb-8 pt-8" >
        <h2 className={`market1 text-white text-3xl sm:text-5xl py-2`}>
          Market
        </h2>
        <h2
          className={`favourites1 text-white text-3xl sm:text-5xl py-2`}
          onClick={changeMarketView}
        >
          <Link to={`/${userID}/favourites`} >My Favourite</Link>
        </h2>
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
              <th className="text-white px-20 py-2 ">Coin</th>
              <th className="text-white px-20 py-2 ">Price ($USD) </th>
              <th className="text-white px-20 py-2 ">24hr Percent Change</th>
              <th className="text-white px-20 py-2 ">Add to Watchlist</th>
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