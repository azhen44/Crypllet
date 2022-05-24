import React, { useContext } from 'react'
import { Navbar, Homepage, Footer, LoadSpinner, Transactions, Services, Market, MyFave, CoinPage  } from './components'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { MarketContext } from './context/MarketContext';
import { TransactionContext } from './context/TransactionContext';


const App = () => {
  const {userID} = useContext(TransactionContext)
  return (
    <Router>
      <div className="min-h-screen">       
        <div className='gradient-bg-welcome'>
          <Navbar />
          <Routes >
            <Route path="/" element={<Market />} />
            <Route path="/Market" element={<Market />} />
            <Route path="/Send" element={[<Homepage />, <Services />, <Transactions />]} />
            <Route path={`/${userID}/favourites`} element={<MyFave />} />
            <Route path="/Market/:id" element={<CoinPage />}/>
          </Routes>
          <Footer />
        </div>           
      </div>
    </Router>
  )
}

export default App

{/* <div>
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
</div> */}
