const NFTToken = artifacts.require("NFTToken");
module.exports = function (deployer) {
    deployer.deploy(NFTToken);
};

// CA = 0x3735C3a3163C2B6f8d6fD85F1769b73A91704df3