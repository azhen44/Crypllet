import React ,{useContext, useState} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MarketContext } from "../context/MarketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const { coinInfo, isMyFave, changeMarketView} = useContext(MarketContext)
  const temp = coinInfo.slice(2,5)
  console.log(isMyFave)
  const res = temp.map( (x) => {
    return (
      <Tickercard key={x.id} symbol={x.symbol} name={x.name} price={x.current_price} priceChange24hr={x.price_change_percentage_24h} img={x.image} faveItem={faveItem} />
    )
  }) 
  
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