import React ,{ useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { MarketContext } from "../context/MarketContext";
import axios from "axios";
import { TransactionContext } from "../context/TransactionContext";
import "../components/Market.css";
const Tickercard = ({symbol, name, price, img, priceChange24hr, faveItem}) => {

const [favourite, setFavourite] = useState(false);

const favouriteClicked = () => {
  
  setFavourite(!favourite);
  faveItem(name, favourite);

}


  return (
    
      <tr className="text-white text-base text-center mx-2 cursor-pointer">
        <Link to={`/Market/${name}`}>
          <td className="py-5"><img className="object-scale-down h-20 w-40" src={img}/></td> <br/> {name + ' ' + symbol.toUpperCase()}                
        </Link>
          <td> ${price}</td>
          <td className={priceChange24hr > 0? "positive" : "negative"}> {`${priceChange24hr.toFixed(2)}%`}</td>   
          <td className="heartContainer"><FontAwesomeIcon className={favourite ? "heartIconClicked" : "heartIcon"} onClick={favouriteClicked}icon={faHeart}></FontAwesomeIcon></td>
      </tr>
    
    
  )
}

const Market = () => {
  const { coinInfo, changeMarketView} = useContext(MarketContext)
  const { currentAccount } = useContext(TransactionContext)

  const faveItem = (symbolName, favourite) => {
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

    

  const res = coinInfo.map( (x) => {
    return (

      <Tickercard key={x.id} symbol={x.symbol} name={x.name} price={x.current_price} priceChange24hr={x.price_change_percentage_24h} img={x.image} faveItem={faveItem}
      /> 
   
    )
  }) 
  
  return (
    <div className={`marketContainer flex w-full justify-center items-center gradient-bg-services`}>
      <div>
       <div className="flex justify-center space-x-24 pb-8 pt-8" >
        <h2 className={`market1 text-white text-3xl sm:text-5xl py-2`}>
          Market
        </h2>
        <h2
          className={`favourites1 text-white text-3xl sm:text-5xl py-2`}
          onClick={changeMarketView}
        >
          <Link to={'/favourites'} >My Favourite</Link>
        </h2>
      </div>
        <table className="border-8">
          <tbody>
            <tr>
              <th className="text-white px-20 py-2 ">Coin</th>
              <th className="text-white px-20 py-2 ">Price ($USD) </th>
              <th className="text-white px-20 py-2 ">24hr Percent Change</th>
              <th className="text-white px-20 py-2 ">Add to Watchlist</th>
            </tr>
          {res}
        </tbody>
        </table>
    </div>
  </div>
  )
}

export default Market;