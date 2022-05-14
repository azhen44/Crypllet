// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


contract Transactions {
  uint256 transactionCounter;
  
  // event to be called
  event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

  struct TransferStruct {
    address sender;
    address receiver;
    uint amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  TransferStruct[] transactions; //transactions will be an array of Transfer Structures

  function addToBlockchain() public {

  }

  function getAllTransactions() public view returns (TransferStruct[] memory){
    //return transactions
  }

  function getTransactionCount() public view returns (uint256) {
    // returns # of transaction     
  }

}
