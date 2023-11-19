const ethers = require("ethers");
const fs = require("fs");

async function main() {
  // http://127.0.0.1:7545

  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );

  const wallet = new ethers.Wallet(
    "4ceb3d6eefb6fb9bb177a24e7d0a864f49478e7b72ade016cb2960098e48f26e",
    provider
  );

  const abi = fs.readFileSync(
    "./contracts_SimpleStorage_sol_SimpleStorage.abi",
    "utf8"
  );
  const binary = fs.readFileSync(
    "./contracts_SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");

  const contract = await contractFactory.deploy(); // We're telling our code to stop here, wait for the contract to deploy

  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
