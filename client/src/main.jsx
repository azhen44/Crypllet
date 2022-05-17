import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {TransactionProvider} from './context/TransactionContext'
import { MarketProvider } from './context/MarketContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionProvider>
    <MarketProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MarketProvider>
  </TransactionProvider>
 
)
