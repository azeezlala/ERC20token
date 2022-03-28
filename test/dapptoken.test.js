
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
    it("should approves tokens for delegated transfer", async () => {
        try {
            let approve = await instance.approve.call(account[1], 100) //call does not write to the blockchain in this case it should fail
            let success = await approve
            assert.equal(success, true, "it return true")
            assert.fail()
        } catch (err) {
            let token = await instance.approve(account[1], 100, {from:account[0]})
            let receipt = await token
            assert.equal(receipt.logs.length, 1, "trigger one event")
            assert.equal(receipt.logs[0].event, 'Approval', "should be the 'Transfer' event")
            assert.equal(receipt.logs[0].args._owner, account[0], 'sender')
            assert.equal(receipt.logs[0].args._spender, account[1], 'from')
            //assert.equal(receipt.logs[0].args._value, 250000,'sent amount')
            let allowance = await instance.allowance(account[0], account[1])
            let allow = await allowance
            assert.equal(allow.toNumber(), 100, 'store the allowance for delegated transfer')
        }
    })
    it('should handle delegated token transfer', async () => {
        try {
            fromAccount = account[2]
            toAccount = account[3]
            spendingAccount = account[4]
            let transfer = await instance.transfer(fromAccount, 100, {from: account[0]})
            let res = await transfer
            let receipt = await instance.approve(spendingAccount, 10, {from: fromAccount})
            let res2 = await receipt
            let payload = await instance.transferFrom(fromAccount, toAccount, 999, {from: spendingAccount})
            let result = await payload
            assert.fail()
        } catch (e) {
            try {
                assert(e.message.indexOf('revert') >= 0, "cannot transfer value larger than balance")
                let payload = await instance.transferFrom(fromAccount, toAccount, 20, {from: spendingAccount})
                let result = await payload
                assert.fail()
            } catch (e) {
                assert(e.message.indexOf('revert') >= 0, "cannot transfer value larger than approved amount")
            }
        }
    });
})