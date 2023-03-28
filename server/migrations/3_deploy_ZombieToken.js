const ZombieToken = artifacts.require("ZombieToken");

module.exports = function (deployer) {
  deployer.deploy(ZombieToken, "NF_star TOKEN", "ZBT", 1000);
};
