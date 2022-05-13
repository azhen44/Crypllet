import { useState } from 'react'
import { Navbar, Homepage, Footer, LoadSpinner, Transactions, Services  } from './components'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>
        <Navbar />
        <Homepage />
      </div>
        <Services />
        <Transactions />
        <Footer />      

    </div>
  )
}

export default App
