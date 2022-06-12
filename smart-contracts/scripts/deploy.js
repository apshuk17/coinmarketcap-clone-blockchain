const { ethers } = require("hardhat");

const main = async () => {
  const LinkFactory = await ethers.getContractFactory("Link");
  const LinkContract = await LinkFactory.deploy();
  await LinkContract.deployed();
  console.log("Link Address", LinkContract.address);

  const DaiFactory = await ethers.getContractFactory("Dai");
  const DaiContract = await DaiFactory.deploy();
  await DaiContract.deployed();
  console.log("Dai Address", DaiContract.address);

  const DogeCoinFactory = await ethers.getContractFactory("DogeCoin");
  const DogeCoinContract = await DogeCoinFactory.deploy();
  await DogeCoinContract.deployed();
  console.log("DogeCoin Address", DogeCoinContract.address);

  const UsdcFactory = await ethers.getContractFactory("Usdc");
  const UsdcCoinContract = await UsdcFactory.deploy();
  await UsdcCoinContract.deployed();
  console.log("UsdcCoin Address", UsdcCoinContract.address);
};

// main()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.err(err);
//     process.exit(1);
//   });

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.err(err);
    process.exit(1);
  }
})();
