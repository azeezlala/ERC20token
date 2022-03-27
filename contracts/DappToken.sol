pragma solidity ^0.8.0;

contract DappToken {
    // constructor
    string public name = "LALA"; //this is for ERC20
    mapping(address => uint256) public balanceOf; //this is for ERC20
    uint256 public totalSupply; //this is for ERC20
    string public symbol = "LL"; //this is for ERC20
    string public standard = "LL token v1.0"; //this is for ERC20
    constructor(uint256 _totalSupply) {
        totalSupply = _totalSupply;
        balanceOf[msg.sender] = totalSupply;
    }
}
