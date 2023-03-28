// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract BuySell is ERC721Enumerable, ERC721URIStorage, Ownable {
  mapping(address => uint) public BStransaction;
  using Counters for Counters.Counter;
  Counters.Counter private _tokenId;

  function buy(uint tokenId) public payable {
    uint price = 10 ** 18;
    require(msg.value >= price, "insufficient payment");
    address seller = ownerOf(tokenId);
    require(seller != address(0), "invaild token");
    transferFrom((seller), msg.sender, tokenId);
    payable(seller).transfer(price);
  }

  function sell(uint tokenId) public payable {
    require(ownerOf(tokenId) == msg.sender, "you dont own this token ");
    uint price = 10 ** 18;
    require(msg.value >= price, "Insufficient payment");
    // BStransaction[msg.sender] -= 입력한값
    payable(owner()).transfer(price); // msg.sender
    _burn(tokenId);
  }

  constructor() ERC721("BuySell - Goerli", "LMDIFY") {}

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 firstTokenId,
    uint256 batchSize
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function tokenURI(
    uint256 tokenId
  ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId); // ERC721URIStorage의 super를 가져온다.
  }
}
