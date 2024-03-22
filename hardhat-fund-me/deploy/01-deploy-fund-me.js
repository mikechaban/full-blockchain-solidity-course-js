// imports

const { networkConfig } = require("../helper-hardhat-config")
const { network } = require("hardhat")

//
//
// function deployFunc() {
//     // this is the default function for our hardhat deploy to look for
// }

// module.exports.default = deployFunc
//
//
module.exports = async ({ getNamedAccounts, deployments }) => {
    // hre.getNamedAccounts
    // hre.deployments

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [],
        log: true,
    })
}

module.exports.tags = ["all"]
