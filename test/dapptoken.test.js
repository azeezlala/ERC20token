
const DappToken = artifacts.require("DappToken");

contract("DappToken", (account) => {
    before(async () => {
        instance = await DappToken.deployed()
    })
    it("should check for total supply", async () => {
        let totalSupply = await instance.totalSupply()
        let ts = await totalSupply
        assert.equal(ts, 1000000, `the total supply should be 1000000`)
    })
})