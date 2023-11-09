// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract FundMe {

    uint256 public minimumUsd = 50;

    function fund() public payable {
        // Want to be able to set a minimum fund amount in USD

        // 1. How do we send ETH to this address
        require(msg.value >= minimumUsd, "Didn't send enough!");
    }
    
    // function withdraw() {}

}