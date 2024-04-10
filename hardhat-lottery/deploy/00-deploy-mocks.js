const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium. It costs 0.25 LINK per request
const GAS_PRICE_LINK = 1e9 // calculated value based on the gas price of the chain

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.name.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    // When using object destructuring, you enclose the variables you're extracting in curly brackets {}.
    // When accessing nested properties directly, without destructuring, you don't need curly brackets.

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")

        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks deployed!")
        log("------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
