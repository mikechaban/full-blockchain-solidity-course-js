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

    it("Should work correctly with the people struct and array", async function () {
        const expectedPersonName = "Mike"
        const expectedFavoriteNumber = "27"
        const transactionResponse = await simpleStorage.addPerson(
            expectedPersonName,
            expectedFavoriteNumber,
        )
        await transactionResponse.wait(1)
        const { favoriteNumber, name } = await simpleStorage.people(0)
        // We could also do it like this:
        // const person = await simpleStorage.people(0)
        // const favNumber = person.favoriteNumber
        // const pName = person.name

        assert.equal(name, expectedPersonName)
        assert.equal(favoriteNumber, expectedFavoriteNumber)
    })
})
