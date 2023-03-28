const ZombieToken = artifacts.require("ZombieToken");
const Swap = artifacts.require("Swap");
// 2개의 컨트랙트를 다 가져온다

module.exports = async function (deployer) {
  try {
    await deployer.deploy(ZombieToken);
    const token = await ZombieToken.deployed();
    // ZombieToken을 먼저 배포한 후, 변수에 담는다.

    await deployer.deploy(Swap, token.address);
    const swap = await Swap.deployed();
    // 다음으로 EthSwap을 배포하는데, 이 때 인자값으로
    // 먼저 배포한 abcToken 컨트랙트의 ca를 같이 준다.
  } catch (e) {
    console.log(e.message);
  }
};
