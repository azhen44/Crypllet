import React ,{useContext, useState, useRef, useCallback, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { MarketContext } from "../context/MarketContext";
import axios from "axios";
import { TransactionContext } from "../context/TransactionContext";
import useGetCoin from "../customHooks/useGetCoin.jsx";
import qs from 'qs'
import "./Market.css";

const Tickercard = ({lastCoinRef, index, id,symbol, name, price, img, priceChange24hr, faveItem}) => {
  const {faveCoins, getMyFaves } = useContext(MarketContext) 
  const [isHovered, setIsHovered] = useState(false)
  const [listOfFaveCoins, setListOfFaveCoins] = useState([])

  // useEffect( () => {
  //   getMyFaves()
  // },[])

  useEffect(() => {
    setListOfFaveCoins(faveCoins.map(x => x.symbol))
  },[faveCoins])


  let navigate = useNavigate();
  const handleTableClicks = () => {
    navigate(`/Market/${id.toLowerCase()}`)
  }
  return (    
      <tr className="text-white text-base text-center mx-2 cursor-pointer hover:bg-gray-900">
          <td ref={lastCoinRef} onClick={handleTableClicks} className="flex flex-col py-5 justify-center items-center">
            <img className="object-scale-down h-20 w-40" src={img}/>
            {`${name} ${symbol.toUpperCase()}`}
          </td>        
          <td> ${price}</td>
          <td className={priceChange24hr > 0? "positive" : "negative"}> {`${priceChange24hr.toFixed(2)}%`}</td>   
          <td className={isHovered ? "fa-bounce" : ""} >
            <FontAwesomeIcon
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)} 
              className={listOfFaveCoins.includes(symbol) ? "heartIcon" : ""}
              icon={faHeart} 
              size="lg" 
              onClick={() => faveItem(symbol, index)}
          /></td>
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
    } else alert("Please log in to create your watchlist")

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
       <div className="pb-10 pt-10 flex space-x-24 justify-center" >
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
      <div className="searchBarContainer">
        <input 
          className="searchBar"
          onClick={handleSearch}
          name="search"
          value={search}
          placeholder={"Enter Coin Name"}
          onChange={(event)=>setSearch(event.target.value)}
        />
        </div>
        <table className="rounded-lg my-10">
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
        <div className="items-center text-white text-5xl">{loading && 'Loading...'}</div>
    </div>
  </div>
  )
}

export default Market;