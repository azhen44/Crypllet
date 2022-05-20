import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Chart, Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';




const CoinPage = () => {
  ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
  const [coin, setCoin] = useState([])
  const { id } = useParams();
  const [days, setDays] = useState(1)
  const [price, setPrice] = useState()
  const [date, setDate] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
      console.log(res)
      setCoin(res)
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
    <div className="flex w-full flex-col justify-center items-center gradient-bg-services">
        <div className={"flex flex-row jusitify-center items-start"}>
          <p>gg</p>
  
          
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