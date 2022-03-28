pragma solidity ^0.8.0;

contract DappToken {
    // constructor
    string public name = "LALA"; //this is for ERC20
    mapping(address => uint256) public balanceOf; //this is for ERC20
    uint256 public totalSupply; //this is for ERC20
    string public symbol = "LL"; //this is for ERC20
    string public standard = "LL token v1.0"; //this is for ERC20
    mapping(address => mapping(address => uint256)) public allowance; //this is for ERC20 to store approved delegate transfer
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
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
    }
    // Delegate Transfer //for ERC-20

    // approve is for ERC20
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    modifier checkToken (uint256 _value, address _from) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        _;
    }
    //transferFrom is for ERC20
    function transferFrom(address _from, address _to, uint256 _value) public checkToken(_value, _from) returns (bool success) {
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
    }
}
