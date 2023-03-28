const ZombieToken = artifacts.require("ZombieToken.sol");
const Swap = artifacts.require("Swap");

function toEther(n) {
  return web3.utils.toWei(n, "ether");
}
// 단위 변환 함수는 여러 번 사용할 것이므로 따로 빼준다.

contract("eth swap", ([deployer, account1, account2]) => {
  let token, swap;

  describe("ethSwap deployment", async () => {
    console.log(deployer, account1, account2);
    // 0, 1, 2번 지갑 주소 (in ganache 네트워크)

    it("deployed", async () => {
      token = await ZombieToken.deployed();
      swap = await Swap.deployed();
      console.log(token.address, swap.address);
      // ZombieToken 컨트랙트의 ca, Swap 컨트랙트의 ca
      // 테스트 할 때마다 새로 배포되므로 일정한 값이 아니다.
    });

    it(" token 배포자의 초기값", async () => {
      const balance = await token.balanceOf(deployer);
      assert.equal(balance.toString(), "100000000000000000000000");
    });
    // 초기 배포자의 token이 지정한 양만큼 있는지 확인
    // true가 나와야 한다.

    it("ethSwap-Migration", async () => {
      const address = await swap.getToken();
      assert.equal(address, token.address);
      // swap 함수에서 토큰의 주소를 불러오면
      // ZombieToken 토큰의 컨트랙트의 ca를 준다.
      // 두 값이 같으므로 true가 나와야 한다.
    });

    it("swap-getMsgSender, getThisAddress", async () => {
      const thisaddress = await swap.getThisAddress();
      assert.equal(thisaddress, swap.address);
      // 둘 모두 etherswap의 address를 반환
    });

    it("token - owner", async () => {
      const owner = await token._owner();
      assert.equal(owner, deployer);
      // 우리가 정한 owner가 곧 배포자이므로 true
    });

    it("etherswap - getTokenOwner", async () => {
      const owner = await swap.getTokenOwner();
      assert.equal(owner, deployer);
      // 스왑 컨트랙트도 위와 동일하다.
    });

    it("token - balanceOf()", async () => {
      await token.transfer(swap.address, toEther("1000"));
      // 스왑 컨트랙트에게 ZombieToken 1000개를 준다.
      const balance = await token.balanceOf(swap.address);
      console.log(balance.toString());
      // 잔고를 출력한다.
    });

    it("swap - buyToken()", async () => {
      let balance = await token.balanceOf(account1);
      assert.equal(balance.toString(), "0");
      // abcToken이 0개인지 확인

      await swap.buyToken({
        from: account1,
        value: toEther("1"),
      });
      // 스왑 컨트랙트에 이더리움을 보내면서 butToken 함수를 실행시킨다.

      balance = await token.balanceOf(account1);
      console.log(web3.utils.fromWei(balance.toString(), "ether"));
      // 우리가 정한 비율만큼 ZombieToken 갯수를 맞춰 잘 들어왔는지 확인한다.

      const eth = await web3.eth.getBalance(account1);
      console.log(eth);
      // account1의 이더리움의 잔량을 확인한다.

      const swapBalance = await web3.eth.getBalance(swap.address);
      console.log(web3.utils.fromWei(swapBalance));
      // 스왑 컨트랙트가 가진 이더리움의 수를 확인한다.
      // account1이 보낸만큼의 이더리움이 있어야 한다.
    });
  });
});
