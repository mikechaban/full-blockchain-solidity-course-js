const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    // let simpleStorageFactory
    // let simpleStorage
    // Same, as:

    let simpleStorageFactory, simpleStorage

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // We can use
        // assert
        // or
        // expect
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update when we call store", async () => {
        // Same as saying async function () {}
        const expectedValue = "7"
        const txResponse = await simpleStorage.store(expectedValue)
        await txResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
})
