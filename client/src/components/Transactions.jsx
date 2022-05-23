import React, {useContext} from 'react'
import { TransactionContext } from '../context/TransactionContext';
import { shortenAdd } from '../utils/shortenAdd';

const TransactionCard = ({addressTo, addressFrom, timestamp, message, keyword, amount, url}) => {
  return (
    <div className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shawdow-2xl">
      <div className="flex flex-col items-center w-full md-3">
        <div className='w-full mb-6 p-2'>
          <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer" >
            <p className='text-white text-base'>From: {shortenAdd(addressFrom)}</p>
          </a>
          <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer" >
            <p className='text-white text-base'>To: {shortenAdd(addressTo)}</p>
          </a>
          <p className='text-white text-base'>Amount: {amount} ETH</p>
          <p className='text-white text-base'>Message: {message}</p>
          
            <p className="text-[#37c7da] font-bold">{timestamp}</p>
        
        </div>
      </div>      
    </div>
  )

}

const Transactions = () => {
  const { currentAccount, transactions, transactionCount} = useContext(TransactionContext)
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
        ): (
          <h3 className="box-content p-8 rounded-2xl shadow-xl shadow-red-600/40 opacity-80 hover:shadow-red-500/40 text-red-500 text-3xl text-center my-2"
          >Please connect your wallet to see Transactions</h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions.map((transaction, i) => (
            <TransactionCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Transactions;