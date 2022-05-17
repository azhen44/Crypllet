import React, {useContext, useState } from 'react'
import { Navbar, Homepage, Footer, LoadSpinner, Transactions, Services, Market, MyFave  } from './components'
import { MarketContext } from './context/MarketContext'
import { ViewContext } from './context/ViewContext'

const App = () => {
  const { isMyFave } = useContext(MarketContext)
  const { view } = useContext(ViewContext)

  return (
    <div>
      {view === "Send Crypto" && 
        <div className="min-h-screen">       
          <div className='gradient-bg-welcome'>
            <Navbar />
            <Homepage />
          </div>    
          <Services />
          <Transactions />
          <Footer />
        </div>
      }
      {view === "Market" && 
        <div className="h-full bg-black" >       
          <div className='gradient-bg-welcome'>
            <Navbar />
            {isMyFave ? <MyFave /> : <Market />}
          </div>    
          <Footer />
        </div>
      }  
    </div>
    



  )
}

export default App
