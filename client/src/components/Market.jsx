import React ,{useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { MarketContext } from "../context/MarketContext";
import "../components/Market.css";



const Tickercard = ({symbol, price, changePercent}) => {

  const MakePosNeg = () => {
    let TDs = document.getElementsByClassName('percentChange');

    for (let i = 0; i < TDs.length; i++) {
      const temp = TDs[i];
      if (temp.firstChild.nodeValue.indexOf('-') == 0) {temp.className = "negative";} 
      else {temp.className = "positive";}
    }
  }
MakePosNeg();

  return (
    
      <tr className="text-white text-base text-center mx-2 cursor-pointer">
        <td>{symbol.slice(0,-4)}</td>
        <td>{`$${price.slice(0,-6)}`} </td>
        <td className="percentChange">{changePercent.slice(0,-1)}%</td>
        <td className="heartContainer"><FontAwesomeIcon icon={faHeart} className="heartIcon transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover: duration-300 ... "></FontAwesomeIcon></td>
      </tr>
    
  )
}

const Market = () => {
  const { coinInfo, changeMarketView} = useContext(MarketContext)

  const res = coinInfo.map( (x) => {
    return (
      <Tickercard key={x.symbol} symbol={x.symbol} price={x.lastPrice} changePercent={x.priceChangePercent}
      />
      
    )
  }) 
  
  return (
    <div className={`marketContainer flex w-full justify-center items-center gradient-bg-services`}>
      <div className="">
       <div className="flex space-x-24 pb-8 pt-8" >
        <h2 className={`market1 text-white text-3xl sm:text-5xl py-2 bg-neutral-600`}>
          Market
        </h2>
        <h2
          className={`favourites1 text-white text-3xl sm:text-5xl py-2`}
          onClick={changeMarketView}
        >
          My Favourite
        </h2>
      </div>
        <table className="border-8">
          <tbody>
            <tr>
              <th className="text-white py-2">Symbol</th>
              <th className="text-white py-2">Price</th>
              <th className="text-white py-2">24hr Change</th>
              <th className="text-white py-2 px-3">Save to Watchlist</th>
            </tr>
          {res}
        </tbody>
        </table>
    </div>
  </div>
  )
}

export default Market;