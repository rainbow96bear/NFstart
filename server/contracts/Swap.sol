// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ZombieToken.sol";

contract Swap {
  ZombieToken public token;
  uint public rate = 100;

  constructor(ZombieToken _token) {
    token = _token;
  }

  function getThisAddress() public view returns (address) {
    return address(token);
  }

  // 이 컨트랙트의 ca

  function getMsgSender() public view returns (address) {
    return msg.sender;
  }

  // 이 컨트랙트에 요청을 보낸 address

  function getToken() public view returns (address) {
    return address(token);
  }

  // token contract의 ca를 가져옴

  function getSwapBalance() public view returns (uint256) {
    return token.balanceOf(msg.sender);
  }

  // 요청을 보낸 사람이 요청한 토큰의 잔액을 보여주는 함수

  //   function getTokenOwner() public view returns (address) {
  //     return token._owner();
  //   }

  // 토큰 최초발행자를 리턴

  function buyToken() public payable {
    uint256 tokenAmount = msg.value * rate;
    require(token.balanceOf(address(this)) >= tokenAmount, "error[1]");
    token.transfer(msg.sender, tokenAmount);
  }

  function sellToken(uint256 _amount) public payable {
    require(token.balanceOf(msg.sender) >= _amount, "error[1]");
    uint256 etherAmount = _amount / rate;

    require(address(this).balance >= etherAmount);
    token.transferFrom(msg.sender, address(this), _amount);
    payable(msg.sender).transfer(etherAmount);
  }
  // 사용자가 보낸 이더리움 갯수의 일정 배율을 곱해 그 만큼의 토큰을 사용자에게 준다.
}
