import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { nameToAddress } from "../../src/utils/tokenConfig";
import { setupTokenTests } from "./utils";

describe("SafeToken - Deployment", async () => {

    describe("state", async () => {

        it.skip('should be deployed deterministically', async () => {
            const { token } = await setupTokenTests()
            expect(
                token.address
            ).to.be.eq("0x164FF0341AC389F4989FB4F22Fae4401BceA547D")
        })

        it('should be paused by default', async () => {
            const { token } = await setupTokenTests()
            expect(
                await token.paused()
            ).to.be.true
        })

        it('should be owner by SafeDao', async () => {
            const { token } = await setupTokenTests()
            expect(
                await token.owner()
            ).to.be.eq(nameToAddress("Safe Foundation"))
        })

        it('should have 1 billion tokens', async () => {
            const { token } = await setupTokenTests()
            expect(
                await token.totalSupply()
            ).to.be.eq(ethers.utils.parseUnits("1000000000", 18))
        })

        it('balances', async () => {
            const { token } = await setupTokenTests()
            expect(
                await token.balanceOf(nameToAddress("Safe Foundation"))
            ).to.be.eq(ethers.utils.parseUnits("1000000000", 18))
        })
    })
})