pragma solidity ^0.8.0;

contract DappToken {
    // constructor
    string public name = "LALA"; //this is for ERC20
    mapping(address => uint256) public balanceOf; //this is for ERC20
    uint256 public totalSupply; //this is for ERC20
    string public symbol = "LL"; //this is for ERC20
    string public standard = "LL token v1.0"; //this is for ERC20
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );
    constructor(uint256 _totalSupply) {
        totalSupply = _totalSupply;
        balanceOf[msg.sender] = totalSupply;
    }
    // Transfer //this is for ERC20
    // Exception if account doesn't have enough
    // Return a boolean
    // Transfer Event
    modifier checkBalance (uint256 _value) {
        require(balanceOf[msg.sender] >= _value, "Don't have enough token to proceed");
        _;
    }
    function transfer(address _to, uint256 _value) public checkBalance(_value) returns(bool success) { //this is for ERC20 token
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
        //Transfer balance
    }
}
