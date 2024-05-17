// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// pseudocode ⬇️

contract ManualToken {
  uint256 initialSupply;
  // sometimes you'll add a mint function
  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  // when transfering tokens, it's
  // subtract from address amoutn and add to "to" address

  function transfer(address from, address to, uint256 amount) public {
    balanceOf[from] -= amount; // same as saying balanceOf[from] = balanceOf[from] - amount
    balanceOf[to] += amount;
  }
}
