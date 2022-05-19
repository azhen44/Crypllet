import React ,{useContext, useEffect, useState} from "react";
import axios from 'axios'
import { MarketContext } from "../context/MarketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom'
import useGetCoin from "../customHooks/useGetCoin.jsx";
import { TransactionContext } from "../context/TransactionContext";


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
  const { currentAccount } = useContext(TransactionContext)
  const { coinInfo, getTickerData, handleSearch, changeMarketView, userID} = useContext(MarketContext)
  const [faveCoins, setFaveCoins] = useState([])

  const searchForCoin = (search) => {
    const test = coinInfo.filter((coin) => (
      coin.symbol.toLowerCase() === search     
    ))
    return test;
  }

  const getMyFaves = async () => {      
    try {
      const res = await axios.get(`http://localhost:3001/${userID}/user_coins`)
      if(res) {
        const newArr = res.data.map(coin => {
          return coin.coin_id
        })
        console.log(newArr)
        let res2 = [];
        newArr.forEach(search => {
          console.log(search)
          res2.push(...searchForCoin(String(search)))
        })
        setFaveCoins(res2)
        //localStorage.setItem("faveCoins" , JSON.stringify(res2))
      
        
             
      }
    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(()=>{
    console.log(currentAccount, userID)
    getMyFaves();
  
  },[])


  
  getTickerData();


  
  const res = faveCoins.map( (x) => {
    return (
      <Tickercard key={x.id} id={x.id} symbol={x.symbol} name={x.name} price={x.current_price} priceChange24hr={x.price_change_percentage_24h} img={x.image} />
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
        <h2 className='text-white text-3xl sm:text-5xl py-2 bg-neutral-600' onClick={()=>console.log(faveCoins)}>
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