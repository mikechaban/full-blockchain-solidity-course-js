const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert } = require("chai")

describe("FundMe", function () {
    let fundMe
    let deployer
    let mockV3Aggregator
    beforeEach(async function () {
        // deploy our fundMe contract using Hardhat-deploy

        // const accounts = await ethers.getSigners()
        // const accountZero = accounts[0]
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])

        const myContract = await deployments.get("FundMe")
        fundMe = await ethers.getContractAt(myContract.abi, myContract.address)

        const mymockV3Aggregator = await deployments.get("MockV3Aggregator")
        mockV3Aggregator = await ethers.getContractAt(
            mymockV3Aggregator.abi,
            mymockV3Aggregator.address
        )
    })

    describe("constructor", async function () {
        it("Sets the aggregator addresses correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.target)
        })
    })
})
