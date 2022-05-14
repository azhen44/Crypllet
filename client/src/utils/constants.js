require ('dotenv').config();
import abi from './Transactions.json'

export const contractABI = abi.abi
export const contractAddress = process.env.contractAddress