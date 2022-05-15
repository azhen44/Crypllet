import {HiMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import React, { useState, useContext, useEffect} from 'react'
import { shortenAdd } from '../utils/shortenAdd'
import logo from '../../images/logo.png'
import { TransactionContext } from '../context/TransactionContext'

const NavBarItem = ({ title, handleNav }) => (
  <li className={`mx-4 cursor-pointer my-2 text-lg`} onClick={(()=>handleNav(title))}>{title}</li>
);
const Navbar = () => {
  const { currentAccount, connectWallet} = useContext(TransactionContext)
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleNav = (item) => {
    console.log(`clicked ${item}`)
  }
  
  return (
    <nav className ="w-full flex md:justify-center justify-between items-center p-4">
      <div className = "md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer"/>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavBarItem key={item + index} title={item}  handleNav={handleNav}/>
        ))}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          {currentAccount ? (
            <p className="text-white text-center my-2">{`Logged in as: ${shortenAdd(currentAccount)}`}</p>
          ): (
            <h3 className="text-white text-center my-2" onClick={connectWallet}>Login with MetaMask</h3>
          )}
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} handleNav={handleNav}/>
            )}
          </ul>
        )}
      </div>
      
     

    </nav>
  )
}

export default Navbar;