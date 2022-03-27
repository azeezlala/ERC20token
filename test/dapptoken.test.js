
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
})