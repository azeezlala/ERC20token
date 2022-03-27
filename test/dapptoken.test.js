
const DappToken = artifacts.require("DappToken");

contract("DappToken", (account) => {
    before(async () => {
        instance = await DappToken.deployed()
    })
    it("should be named LALA", async () => {
        let name = await instance.name()
        let nm = await name
        assert.equal(nm, "LALA", "the contract name should be LALA")
    })
    it("should be symbol LL", async () => {
        let symbol = await instance.symbol()
        let sym = await symbol
        assert.equal(sym, "LL", "the contract symbol should be LL")
    })
    it("should be standard LL token v1.0", async () => {
        let standard = await instance.standard()
        let std = await standard
        assert.equal(std, "LL token v1.0", "the contract symbol should be LL token v1.0")
    })
    it("should check for total supply", async () => {
        let totalSupply = await instance.totalSupply()
        let ts = await totalSupply
        assert.equal(ts, 1000000, `the total supply should be 1000000`)
    })
    it("should return the balance", async () => {
        let balance = await instance.balanceOf(account[0]);
        let balanceOf = await balance
        assert.equal(balanceOf, 1000000, "it should assign all the token to the deployer account")
    })
    it("should not tranfer token ownership", async () => {
        try {
            let token = await instance.transfer.call(account[1], 99999999999);//.call does not trigger a transaction, will not get a transaction info
            let tk = await token
            assert.fail()
        }catch (e) {
            assert(e.message.indexOf('revert') >= 0, "error message must revert");
            let receipt = await instance.transfer(account[1], 250000, { from: account[0] });
            assert.equal(receipt.logs.length, 1, "trigger one event")
            assert.equal(receipt.logs[0].event, 'Transfer', "should be the 'Transfer' event")
            assert.equal(receipt.logs[0].args._from, account[0], 'sender')
            assert.equal(receipt.logs[0].args._to, account[1], 'from')
            assert.equal(receipt.logs[0].args._value, 250000,'sent amount')
            let balance = await instance.balanceOf(account[1]);
            assert.equal(balance.toNumber(), 250000, "add the amount to the receiving account");
            let ownerBalance = await instance.balanceOf(account[0]);
            assert.equal(ownerBalance.toNumber(), 750000, "deduct amount from owner");
        }
    })
})