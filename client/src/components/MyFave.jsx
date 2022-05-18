import React ,{useContext, useState} from "react";
import axios from 'axios'
import { MarketContext } from "../context/MarketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../components/MyFave.css";

const Tickercard = ({symbol, price, changePercent}) => {
  return (
    
      <tr className="text-white text-base text-center mx-2 cursor-pointer">
        <td>{symbol.slice(0,-4)} </td>
        <td>{`$${price.slice(0,-6)}`}</td>
        <td>{changePercent.slice(0,-1)}% </td>
        <td className="heartContainer"><FontAwesomeIcon icon={faHeart} className="heartIcon transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover: duration-300 ... "></FontAwesomeIcon></td>
      </tr>
    
  )
}
const MyFave = () => {

  const MakePosNeg = () => {
    let TDs = document.getElementsByClassName('changePercent');

    for (let i = 0; i < TDs.length; i++) {
      const temp = TDs[i];
      if (temp.firstChild.nodeValue.indexOf('-') == 0) {temp.className = "negative";} 
      else {temp.className = "positive";}
    }
  }
  onload = MakePosNeg();

  const { coinInfo, isMyFave, changeMarketView} = useContext(MarketContext)
  const temp = coinInfo.slice(2,5)
  console.log(isMyFave)
  const res = temp.map( (x) => {
    return (
      <Tickercard key={x.symbol} symbol={x.symbol} price={x.lastPrice} changePercent={x.priceChangePercent} />
    )
  }) 
  
  return (
    <div className="favouriteContainer flex w-full justify-center items-center gradient-bg-services">
    <div className="">
      <div className="pb-60 flex space-x-24">
        <h2 
          className='market text-white text-3xl sm:text-5xl py-2'
          onClick={changeMarketView}
          >
          Market
        </h2>
        <h2 className='favourites text-white text-3xl sm:text-5xl py-2'>
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
              <th className="text-white py-2 px-3">Save to Watchlist</th>
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