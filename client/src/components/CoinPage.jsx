import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Chart, Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import parse from 'html-react-parser';
import LoadSpinner from './LoadSpinner';
import "./CoinPage.css"

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
    <tr className="text-white text-base text-center mx-2 cursor-pointer ">
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
    <div className="flex flex-col justify-center items-center gradient-bg-services ">      
        <div className={""}>
          <table className='coinContainer text-white flex justify-center py-6 text-xs md:text-base'>
            <tbody className="coinPageContainer">
              <tr className='coinPageContainer'>
                <th className="text-white px-2 md:px-10 sm:px-6 py-2 ">Coin</th>
                <th className="text-white px-2 md:px-10 sm:px-6 py-2 ">Price</th>
                <th className="text-white px-2 md:px-10 sm:px-6 py-2 ">24hr Change</th>
                <th className="text-white px-2 md:px-10 sm:px-6 py-2 ">Market Cap</th>
                <th className="text-white px-2 md:px-10 sm:px-6 py-2 ">Circulating Supply </th>
              </tr>            
                {!isGetDataLoading && <InfoCard  props={coin}/>}
            </tbody>
          </table>  
          {!isGetDataLoading &&
            <div className="coinDesc flex flex-wrap justify-center text-white text-base text-center mx-2 pt-2 pb-6 border-b-2">
              {parse(coin.description.en.split(". ")[0])}.
            </div>
          }   
        </div>

        <div className='my-5 flex flex-row content-center bg-gray-900 rounded  text-white py-2' >
          <h2 onClick={() => setDays(1)} className={days === 1? "setDay1 px-4 rounded bg-gray-600" : "setDay1 rounded px-4"}>1D</h2>
          <h2 onClick={() => setDays(7)} className={days === 7? "setDay1 px-4 rounded bg-gray-600" : "setDay1 rounded px-4"}>7D</h2>
          <h2 onClick={() => setDays(30)} className={days === 30? "setDay1 px-4 rounded bg-gray-600" : "setDay1 rounded px-4"}>1M</h2>
          <h2 onClick={() => setDays(90)} className={days === 90? "setDay1 px-4 rounded bg-gray-600" : "setDay1 rounded px-4"}>3M</h2>
          <h2 onClick={() => setDays(365)} className={days === 365? "setDay1 px-4 rounded bg-gray-600" : "setDay1 rounded px-4"}>1Y</h2>
          <h2 onClick={() => setDays('max')} className={days === 'max'? "px-4 rounded bg-gray-600" : "setDay1 rounded px-4"}>ALL</h2>
        </div> 
       
        {isLoading? <LoadSpinner />
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
                    pointRadius: 0
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