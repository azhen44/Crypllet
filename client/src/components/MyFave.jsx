import React ,{useContext, useState} from "react";
import axios from 'axios'
import { MarketContext } from "../context/MarketContext";
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Tickercard = ({symbol, price, changePercent}) => {
  return (
    
      <tr className="text-white text-base text-center mx-2 cursor-pointer">
        <td>{symbol.slice(0,-4)} </td>
        <td>{`$${price.slice(0,-6)}`}</td>
        <td>{changePercent.slice(0,-1)}% </td>
      </tr>
    
  )
}
const MyFave = () => {

  const { coinInfo, isMyFave, changeMarketView} = useContext(MarketContext)
  const temp = coinInfo.slice(2,5)
  console.log(isMyFave)
  const res = temp.map( (x) => {
    return (
      <Tickercard key={x.symbol} symbol={x.symbol} price={x.lastPrice} changePercent={x.priceChangePercent} />
    )
  }) 
  
  return (
    <div className="flex py-40 w-full justify-center items-center gradient-bg-services">
    <div className="space-x-20 flex mf:flex-row flex-col items-center justify-between md:p-20">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h2 
          className='text-white text-3xl sm:text-5xl py-2'
          onClick={changeMarketView}
          >
          Market
        </h2>
        <h2 className='text-white text-3xl sm:text-5xl py-2 bg-neutral-600'>
          My Favourites
        </h2>
      </div>
        <table className="table-auto">
          <tbody>
            <tr>
              <th className="text-white py-2 px-3">Symbol</th>
              <th className="text-white py-2 px-3">Price</th>
              <th className="text-white py-2 px-3">24hr Change</th>
            </tr>
          </tbody>
          {res}
          <FontAwesomeIcon icon={faHeart} color="white"></FontAwesomeIcon>
        </table>
     
    </div>
  </div>
    
  
  )
}

export default MyFave;