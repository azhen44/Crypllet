import React ,{useContext, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { MarketContext } from "../context/MarketContext";
const Tickercard = ({symbol, price, changePercent}) => {
  return (
    
      <tr className="text-white text-base text-center mx-2 cursor-pointer">
        <td><FontAwesomeIcon className="hover:fill-red-500" icon={faHeart}></FontAwesomeIcon> {symbol.slice(0,-4)}</td>
        <td>{`$${price.slice(0,-6)}`} </td>
        <td>{changePercent.slice(0,-1)}%</td>
      </tr>
    
  )
}


const Market = () => {

  const { coinInfo, isMyFave, changeMarketView} = useContext(MarketContext)
  const res = coinInfo.map( (x) => {
    return (
      <Tickercard key={x.symbol} symbol={x.symbol} price={x.lastPrice} changePercent={x.priceChangePercent}
      />
      
    )
  }) 
  
  return (
    <div className="flex py-20 h-full w-full justify-center items-center gradient-bg-services">
      <div className="space-x-20 flex mf:flex-row flex-col items-center justify-between md:p-20">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className={`text-white text-3xl sm:text-5xl py-2 bg-neutral-600`}>
            Market
          </h1>
          <h1
            className={`text-white text-3xl sm:text-5xl py-2`}
            onClick={changeMarketView}
          >
            My Favourite
          </h1>
        </div>
          <table className="border-separate border border-slate-500">
            <tbody>
              <tr>
                <th className="text-white py-2 px-3">Symbol</th>
                <th className="text-white py-2 px-3">Price</th>
                <th className="text-white py-2 px-3">24hr Change</th>
              </tr>
            </tbody>
          {res}
          </table>
      
      </div>
    </div>
    
  
  )
}

export default Market;