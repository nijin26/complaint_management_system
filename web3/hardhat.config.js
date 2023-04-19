require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  settings: {
    optimizer: {
      runs: 200,
      enabled: true,
    },
    metadata: {
      bytecodeHash: "none",
    },
  },
  // networks: {
  //   hardhat: {
  //     accounts: [
  //       {
  //         privateKey:
  //           "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
  //         balance: "1000000000000000000000", // 1000 ETH
  //       },
  //     ],
  //   },
  // },
};
