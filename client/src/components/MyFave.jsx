import React ,{useContext, useState} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MarketContext } from "../context/MarketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../components/MyFave.css";

const Tickercard = ({symbol, name, price, img, priceChange24hr, faveItem}) => {
  return (
    
      <tr className="text-white text-base text-center mx-2 cursor-pointer">
        <Link to={`/Market/${name}`}>
          <td className="py-5"><img className="object-scale-down h-20 w-40" src={img}/></td> <br/> {name + ' '+ symbol.toUpperCase()}                
        </Link>
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
      <Tickercard key={x.id} symbol={x.symbol} name={x.name} price={x.current_price} priceChange24hr={x.price_change_percentage_24h} img={x.image} faveItem={faveItem} />
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
              <th className="text-white px-20 py-2 text-gradient">Favourite?</th>
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