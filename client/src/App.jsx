import React, {useContext, useState } from 'react'
import { Navbar, Homepage, Footer, LoadSpinner, Transactions, Services, Market, MyFave  } from './components'
import { MarketContext } from './context/MarketContext'
import { ViewContext } from './context/ViewContext'

const App = () => {
  const { isMyFave } = useContext(MarketContext)
  const { view } = useContext(ViewContext)

  return (
    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>
        <Navbar />
        <Homepage />
      </div>
      {isMyFave ? <MyFave/> : <Market /> }
        <Services />
        <Transactions />
        <Footer />     
    </div>
  )
}

export default App
