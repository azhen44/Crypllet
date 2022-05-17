import React, {useContext, useState } from 'react'
import { Navbar, Homepage, Footer, LoadSpinner, Transactions, Services, Market, MyFave  } from './components'
import { MarketContext } from './context/MarketContext'

const App = () => {
  const { isMyFave } = useContext(MarketContext)

  return (
    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>
        <Navbar />
        {isMyFave ? <MyFave/> : <Market /> }
        <Homepage />
      </div>
        <Services />
        <Transactions />
        <Footer />     
    </div>
  )
}

export default App
