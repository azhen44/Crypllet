import React ,{useContext, useEffect, useState} from "react";
import axios from 'axios'
import { MarketContext } from "../context/MarketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
import { faX } from "@fortawesome/free-solid-svg-icons";
import "../components/MyFave.css";

const Tickercard = ({symbol, name, price, img, priceChange24hr, faveItem}) => {
  return (
    
      <tr className="text-white text-center cursor-pointer">
        <Link to={`/Market/${name}`}>
          <td className=""><img className="object-scale-down h-20 w-40" src={img}/></td> <br/> {name + ' '+ symbol.toUpperCase()}                
        </Link>
          <td> ${price}</td>
          <td className={priceChange24hr > 0? "positive" : "negative"}> {`${priceChange24hr.toFixed(2)}%`}</td>   
          <td className="deleteFave"><FontAwesomeIcon className="xButton" icon={faX}></FontAwesomeIcon></td>
=======
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom'
import useGetCoin from "../customHooks/useGetCoin.jsx";
import { TransactionContext } from "../context/TransactionContext";
import qs from 'qs'

//Renders each coin
const Tickercard = ({id, symbol, name, price, img, priceChange24hr, delFaveCoin}) => {  
  let navigate = useNavigate();
  const handleTableClicks = () => {
    navigate(`/Market/${name.toLowerCase()}`)
  }
  return (    
      <tr className="text-white text-base text-center mx-2 cursor-pointer">
          <td onClick={handleTableClicks} className="flex flex-col py-5 justify-center items-center">
            <img className="object-scale-down h-20 w-40" src={img}/>
            {`${name} ${symbol.toUpperCase()}`}
          </td>                 
          <td> ${price}</td>
          <td className={priceChange24hr > 0? "text-green-600" : "text-red-600"}> {`${priceChange24hr.toFixed(2)}%`}</td>   
          <td><FontAwesomeIcon className="hover:fill-red-500" onClick={() => delFaveCoin(symbol)} icon={faHeart}></FontAwesomeIcon></td>
>>>>>>> master
      </tr>
  )
}


const MyFave = () => {
  const { currentAccount, userID} = useContext(TransactionContext) //Wallet Address
  const { coinInfo, changeMarketView,  faveCoins, setFaveCoins, getMyFaves} = useContext(MarketContext) 
 

<<<<<<< HEAD
  const { coinInfo, isMyFave, changeMarketView} = useContext(MarketContext)
  const temp = coinInfo.slice(2,5)
  console.log(isMyFave)
  const res = temp.map( (x) => {
=======

  //deletes coin from database
  const delFaveCoin = (symbolName) => {
    const data = { 'coin' : symbolName, 'wallet_address': currentAccount}
    setFaveCoins((prev) => {
      return prev.filter( each => each.symbol !== symbolName)    
    })
 
    axios({
      method: 'DELETE',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url : "http://localhost:3001/del/user_coins"
    })
    .catch(error => {
      console.log(error);
    });
  }
  console.log('favecoins in myfave', faveCoins)

  const res = faveCoins.map( (x,index) => {
>>>>>>> master
    return (
      <Tickercard key={x.id+index} id={x.id} symbol={x.symbol} name={x.name} price={x.current_price} priceChange24hr={x.price_change_percentage_24h} img={x.image} delFaveCoin={delFaveCoin}/>
    )
  }) 




  useEffect(()=>{
    console.log(currentAccount, userID)
    getMyFaves();
  },[])

  
  return (
    <div className="favouriteContainer flex w-full justify-center items-center gradient-bg-services">
    <div className="">
      <div className="pb-40 pt-10 flex space-x-24 justify-center">
        <h2 
          className='market text-white text-3xl sm:text-5xl py-2'
          onClick={changeMarketView}
          >
          <Link to={'/Market'} >Market</Link>
        </h2>
        <h2 className='text-white text-3xl sm:text-5xl py-2 bg-neutral-600' onClick={()=>console.log(faveCoins)}>
          My Favourites
        </h2>
      </div>
      <div className="listContainer">
        <table className="border-8">
          <tbody>
            <tr>
              <th className="text-white py-2 px-3">Symbol</th>
              <th className="text-white py-2 px-3">Price</th>
              <th className="text-white py-2 px-3">24hr Change</th>
              <th className="text-white px-20">Remove Favourite</th>
            </tr>
            {res}
          </tbody>         
        </table>
        </div>
    </div>
  </div>
    
  
  )
}

export default MyFave;