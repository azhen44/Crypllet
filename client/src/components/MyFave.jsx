import React ,{useContext, useEffect, useState} from "react";
import axios from 'axios'
import { MarketContext } from "../context/MarketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faX } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom'
import useGetCoin from "../customHooks/useGetCoin.jsx";
import { TransactionContext } from "../context/TransactionContext";
import "./MyFave.css"
import qs from 'qs'

//Renders each coin
const Tickercard = ({id, symbol, name, price, img, priceChange24hr, delFaveCoin}) => {
  const [isHovered, setIsHovered] = useState(false)  
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
          <td><FontAwesomeIcon
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
            className={isHovered ? "isHoverX" : ""} 
            onClick={() => delFaveCoin(symbol)} 
            icon={faX} 
            size="lg"
            ></FontAwesomeIcon></td>
      </tr>
  )
}


const MyFave = () => {
  const { currentAccount, userID} = useContext(TransactionContext) //Wallet Address
  const { coinInfo, changeMarketView,  faveCoins, setFaveCoins, getMyFaves} = useContext(MarketContext) 
 


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
    return (
      <Tickercard key={x.id+index} id={x.id} symbol={x.symbol} name={x.name} price={x.current_price} priceChange24hr={x.price_change_percentage_24h} img={x.image} delFaveCoin={delFaveCoin}/>
    )
  }) 

  // useEffect(()=>{
  //   console.log(currentAccount, userID)
  //   getMyFaves();
  // },[])

  
  return (
    <div className="favouriteContainer flex w-full justify-center items-center gradient-bg-services">
      <div className="">
        <div className="flex flex-col md:flex-row pb-10 pt-10 flex items-center justify-center">
          <h2 
            className='market text-white text-3xl sm:text-5xl py-2'
            onClick={changeMarketView}
            >
            <Link to={'/'} >Market</Link>
          </h2>
          <h2 className='favourites text-white text-3xl sm:text-5xl py-2 bg-neutral-600' onClick={()=>console.log(faveCoins)}>
            My Favourites
          </h2>
        </div>
        <div className="listContainer  pb-16">
          <table >
            <tbody className="border-b-4">
              <tr>
                <th className="text-white text-sm md:px-20 py-2 px-3">Symbol</th>
                <th className="text-white text-sm md:px-20 py-2 px-3">Price</th>
                <th className="text-white text-sm md:px-20 py-2 px-3">24hr Change</th>
                <th className="text-white text-sm md:px-20 py-2 px-3">Remove Favourite</th>
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