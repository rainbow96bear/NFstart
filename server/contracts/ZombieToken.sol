// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZombieToken is ERC20 {
  uint public rate = 700;

  constructor(
    string memory _name,
    string memory _symbol,
    uint256 _amount
  ) ERC20(_name, _symbol) {
    _mint(msg.sender, _amount * 10 ** 18);
  }

  function mint(uint256 _amount) public {
    _mint(msg.sender, _amount);
  }

  // 권한 위임 대상
  // function approve(
  //   address spender,
  //   uint amount
  // ) external override returns (bool) {
  //   allowance[msg.sender][spender] = amount;
  //   emit Approval(msg.sender, spender, amount);
  //   return true;
  // }
}
