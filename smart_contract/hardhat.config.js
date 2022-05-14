//waffle  - plugin to build smart contract tests
require ('@nomiclabs/hardhat-waffle')
require('dotenv').config()

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: process.env.alchemyKey,
      accounts: [process.env.address]
    }
  }
}