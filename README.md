# Crypllet

## Project Description
Development focuses on a single page application (SPA) called Crypllet, built using React.
Data is persisted by the API server using a PostgreSQL database.
The client application communicates with an API server over HTTP, using the JSON format.

## Project Features
* Users can log into their Metamask wallet via Metamask's API to save favourite cryptocurrencies or send rETH through the blockchain.
* Users can check the price on a variety of cryptocurrencies.
* Users can add faveourite cryptocurrencies to their watchlist and save it for future references.
* User can search for their desired cryptocurrency.
* Users can click on the cryptocurrencies to view more information including historical graphs.
* Users can send rETH on the ropsten testnet of the ETH blockchain to a wallet address
* Users can view their transaction history to and from their wallet address.

![Main Page](https://github.com/azhen44/Crypllet/blob/master/documents/mainpage.png?raw=true)
The overview of the Crypllet. Views all Coins

![Search](https://github.com/azhen44/Crypllet/blob/master/documents/search.png?raw=true)
Search feature to finding specific coins.

![Favourites](https://github.com/azhen44/Crypllet/blob/master/documents/favepage.png?raw=true)
My favourites page containing list of all coins that has been favourited

![history1day](https://github.com/azhen44/Crypllet/blob/master/documents/history1day.png?raw=true)
A history graphical graph of the price for 1 day

![historyalltime](https://github.com/azhen44/Crypllet/blob/master/documents/historyalltime.png?raw=true)
A history graphical graph of the price for all time

![Send](https://github.com/azhen44/Crypllet/blob/master/documents/search.png?raw=true)
Web3 app page where users can send rETH over the ETH blockchain

![transaction](https://github.com/azhen44/Crypllet/blob/master/documents/transactionhistory.png?raw=true)
A history of the last 9 transaction history to and from the signed in account.

## Tech Stack
Front-End: React, Axios, JSX, HTML, SASS, JavaScript
Back-End: Express, Node.js
Database: PostgreSQL 
Smart Contract: Solidity, Hardhat

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```