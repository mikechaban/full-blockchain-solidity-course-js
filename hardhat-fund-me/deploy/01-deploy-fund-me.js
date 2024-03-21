// imports

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
}
