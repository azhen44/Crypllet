import React ,{useContext, useState} from "react";
import axios from 'axios'
import { MarketContext } from "../context/MarketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'

const Tickercard = ({symbol, price, changePercent}) => {
  return (
    
      <tr className="text-white text-base text-center mx-2 cursor-pointer">
        <td>{symbol.slice(0,-4)} </td>
        <td>{`$${price.slice(0,-6)}`}</td>
        <td>{changePercent.slice(0,-1)}% </td>
        <td><FontAwesomeIcon className="hover:fill-red-500" icon={faHeart}></FontAwesomeIcon></td>
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
          <Link to={'/Market'} >Market</Link>
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
            {res}
          </tbody>         
        </table>
     
    </div>
  </div>
    
  
  )
}

export default MyFave;