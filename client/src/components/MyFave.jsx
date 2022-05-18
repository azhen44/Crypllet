import React ,{useContext, useState} from "react";
import axios from 'axios'
import { MarketContext } from "../context/MarketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom'
import useGetCoin from "../customHooks/useGetCoin.jsx";

const Tickercard = ({id, symbol, name, price, img, priceChange24hr, faveItem}) => {
  let navigate = useNavigate();
  const handleTableClicks = () => {
    navigate(`/Market/${name}`)
  }
  return (
    
      <tr className="text-white text-base text-center mx-2 cursor-pointer">

          <td onClick={handleTableClicks} className="flex flex-col py-5 justify-center items-center">
            <img className="object-scale-down h-20 w-40" src={img}/>
            {`${name} ${symbol.toUpperCase()}`}
          </td>                   

          <td> ${price}</td>
          <td className={priceChange24hr > 0? "text-green-600" : "text-red-600"}> {`${priceChange24hr.toFixed(2)}%`}</td>   
          <td><FontAwesomeIcon className="hover:fill-red-500" icon={faHeart}></FontAwesomeIcon></td>
      </tr>
    
    
  )
}


const MyFave = () => {
  const faveItem = (symbolName) => {
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
  }

  const { coinInfo, getTickerData, isMyFave, changeMarketView} = useContext(MarketContext)
  getTickerData();
  const temp = coinInfo.slice(2,5)
  
  const res = temp.map( (x) => {
    return (
      <Tickercard key={x.id} id={x.id} symbol={x.symbol} name={x.name} price={x.current_price} priceChange24hr={x.price_change_percentage_24h} img={x.image} faveItem={faveItem} />
    )
  }) 
  
  return (
    <div className="flex py-40 w-full justify-center items-center gradient-bg-services">
    <div className="space-x-20 flex flex-col items-center justify-between md:p-20">
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
              <th className="text-white px-20 py-2 text-gradient">Favourite?</th>
            </tr>
            {res}
          </tbody>         
        </table>
     
    </div>
  </div>
    
  
  )
}

export default MyFave;