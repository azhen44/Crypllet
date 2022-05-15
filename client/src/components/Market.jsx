import React ,{useEffect, useState} from "react";
import axios from 'axios'

const Tickercard = ({props}) => {
  console.log('as props', props)

 



  
  return (
    <p className="text-white text-center my-2">
      Symbol :
    </p>
  )
}
  
  


const Market = () => {
  const [coinInfo, setCoinInfo] = useState([])

  const getTickerData = async (ticker) => {
    try {
      console.log(ticker)
      const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=[${ticker}]`
      const response = await axios.get(url)
      if(response) {
        //console.log(response)
        setCoinInfo((prevState)=>([...prevState, response.data] ))
      }
    } catch (error) {
      console.error(error)
    }
  }


  useEffect( () => {
    getTickerData(`"BTCUSDT","ETHUSDT"`)
     //getTickerData('BTCUSDT')
  },[])

  return (
    <div className="flex w-full justify-center items-center gradient-bg-services">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
          Market
        </h1>
        <div>
          {/* {console.log(coinInfo)} */}
          <Tickercard props={coinInfo}/>
        </div>
        
        
         

        
      </div>

      
    </div>
  </div>
    
  
  )
}

export default Market;