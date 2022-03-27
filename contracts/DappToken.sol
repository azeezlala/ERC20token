pragma solidity ^0.8.0;

contract DappToken {
    // constructor
    uint256 public totalSupply; //this is from ERC20
    constructor(uint256 _totalSupply) {
        totalSupply = _totalSupply;
    }
}
