import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Chart, Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import parse from 'html-react-parser';

const InfoCard = ({props}) => {
  const summary = props.description.en.split(',',[1])[0]
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return (    
    <tr className="text-white text-base text-center mx-2 cursor-pointer">
        <td className="flex flex-col py-5 justify-center items-center">
          <img className="object-scale-down h-20 w-40" src={props.image.large}/>
          {props.name}
        </td>        
        <td> ${props.market_data.current_price.usd}
          <p className={props.market_data.price_change_percentage_24h_in_currency.usd > 0? "text-green-600" : "text-red-600"}>
            {`${props.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)}%`}
          </p>
        </td>
        <td className={props.market_data.price_change_24h > 0? "text-green-600" : "text-red-600"}>
          {formatter.format(props.market_data.price_change_24h)}</td>   
        <td> {formatter.format(props.market_data.market_cap.usd)}
          <p className={props.market_data.market_cap_change_percentage_24h > 0? "text-green-600" : "text-red-600"}>{props.market_data.market_cap_change_percentage_24h.toFixed(2)}%</p>
        </td>
        <td>
          {`${props.market_data.circulating_supply.toFixed(0).toLocaleString()} ${props.symbol.toUpperCase()}` }
          <p>{ props.market_data.max_supply && ` / ${props.market_data.max_supply.toFixed(0).toLocaleString()}`}</p>
        

        </td>
        
    </tr>
)
}




const CoinPage = () => {
  ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
  const [coin, setCoin] = useState([])
  const { id } = useParams();
  const [days, setDays] = useState(1)
  const [price, setPrice] = useState([])
  const [date, setDate] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGetDataLoading, setIsGetDataLoading] = useState(true)

  const getData = async () => {
    setIsGetDataLoading(true)
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
      if (res) {
        setCoin(res.data)
        setIsGetDataLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getHistory = async (id, days) => {
    setIsLoading(true)
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`)
    const dates = res.data.prices.map(single => {
      let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(single[0])
      return date
    })
    setDate(dates)
    const prices = res.data.prices.map(single => {
      return single[1].toFixed(2)
    })
    setPrice(prices)
    setIsLoading(false)
  }

  useEffect( () => {
    getData();
  },[])

  useEffect( () => {
    getHistory(id, days)
  },[days])

  return (
    
    <div className="flex w-full flex-col justify-center items-center gradient-bg-services ">      
        <div className={"flex flex-col jusitify-center items-start"}>
          <table className='text-white'>
            <tbody>
              <tr>
                <th className="text-white px-20 py-2 text-gradient ">Coin</th>
                <th className="text-white px-20 py-2 text-gradient ">Price</th>
                <th className="text-white px-20 py-2 text-gradient ">24hr Price Change (USD)</th>
                <th className="text-white px-20 py-2 text-gradient ">Market Cap</th>
                <th className="text-white px-20 py-2 text-gradient ">Circulating Supply </th>
              </tr>            
                {!isGetDataLoading && <InfoCard  props={coin}/>}
            </tbody>
          </table>  
          {!isGetDataLoading &&
            <div className="text-white text-base text-center mx-2 cursor-pointer">
              {parse(coin.description.en.split(". ")[0])}.
            </div>
          }   
        </div>

        <div className='flex flex-row text-white'>
          <h2 onClick={() => setDays(1)} className='px-5'>1 Day</h2>
          <h2 onClick={() => setDays(7)} className='px-5'>7 Day</h2>
          <h2 onClick={() => setDays(30)} className='px-5'>30 Day</h2>
        </div> 
       
        {isLoading? <h1 className='text-white'>LOADING</h1>
          :<div className='flex w-full'>
            <Line
              data = {{
                labels : date,
                datasets : [
                  {
                    title: "is this work",
                    label:"gg",
                    data: price,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
                ]
              }}
            />
          </div>
        }
    </div>
  )
};

export default CoinPage;