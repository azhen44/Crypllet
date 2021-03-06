import React, {useContext} from 'react'
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAdd } from '../utils/shortenAdd';
import "./Homepage.css"

import { LoadSpinner } from './';

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);




const Homepage = () => {
  const { connectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const {addressTo, amount, keyword, message} = formData;
    e.preventDefault()
    if (!addressTo || !amount || !message) return;

    sendTransaction();
  }

  return (
    
    <div className="flex w-full justify-center items-center">
       <div className="justify-items-center md:p-20 py-12 px-4">
         <div className="justify-items-center pb-20">
          <h1 className="pt-20 text-3xl sm:text-6xl text-white text-center ">
            Send & Receive <br /> Crypto with Ease
          </h1>
          <p className="mt-5 text-white font-light text-base text-center">
            Crypllet is your one stop for the latest crypto updates, quotes, and transactioning.
          </p>
    </div>
        

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="ethCard p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-10">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-end">
 
                  <SiEthereum fontSize={40} color="#fff" />

              </div>
              
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAdd(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>                
              </div>
            </div>   
          </div>         
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />   
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {isLoading
              ? <LoadSpinner />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )}     

          </div>

        </div>
      </div>
    </div>
  )
}

export default Homepage;