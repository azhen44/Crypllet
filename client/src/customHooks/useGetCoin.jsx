import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function useSearch(pageNumber) {
  const[loading, setLoading] = useState(true)
  const [error, setError] = useState(true)
  const [coins, setCoins] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    console.log('useeff')
    setLoading(true)
    setError(false)
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&sparkline=false`
    axios.get(url,
      {params: {page:pageNumber}}
    ).then( (data => { 
      setCoins(prev => {
        return [...prev, ...data.data]
      })
      setHasMore(data.data.length > 0)
      setLoading(false)
    })).catch( e => {
      console.log(error)
      setError(true)
    })


  },[pageNumber])
  return {loading, error, coins, hasMore}
}