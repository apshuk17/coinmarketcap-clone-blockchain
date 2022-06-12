require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const rinkebyUrl = (process.env.SPEEDY_NODE).toString().trim();
const rinkebyAccount = (process.env.ACCOUNT).toString().trim();

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: rinkebyUrl,
      accounts: [rinkebyAccount]
    }
  }
};
