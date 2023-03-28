// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./LetMeDoItForYou.sol";

contract BuySell {
  LetMeDoItForYou public Token;

  constructor(address _tokenAddress) {
    Token = LetMeDoItForYou(_tokenAddress);
  }

  struct TokenInfo {
    uint tokenId;
    uint price;
    string tokenURI;
  }
  mapping(uint => uint) public tokenPrices;
  uint[] public SaleTokenList;

  function SalesToken(uint _tokenId, uint _price) public {
    address tokenOwner = Token.ownerOf(_tokenId);
    require(tokenOwner == msg.sender);
    require(_price > 0);
    // require(Token.isApprovedForAll(msg.sender, address(this)));
    tokenPrices[_tokenId] = _price;
    SaleTokenList.push(_tokenId);
  }

  // 구매 할때
  function PurchaseToken(uint _tokenId) public payable {
    address tokenOwner = Token.ownerOf(_tokenId);
    //  nft 소유자를 가져옴

    require(tokenOwner != msg.sender);
    // 본인이 본인 nft 를 사지 않게함
    require(tokenPrices[_tokenId] > 0);
    // nft 가격이 있을경우 판매중으로 확인
    require(tokenPrices[_tokenId] <= msg.value);
    // 구매자 지갑에 돈이 nft의 가격보다 많이 있어야함

    payable(tokenOwner).transfer(msg.value);
    // CA에서 받은 계정으로 받은 ETH를 Contract의 배포자에게 EOA에게 보내줍니다.

    Token.transferFrom(tokenOwner, msg.sender, _tokenId);
    // 판매 완료된 NFT를 대리인이 구매자 에게 보내줍니다

    tokenPrices[_tokenId] = 0;
    // 판매중지합니다.

    popSaleToken(_tokenId);
    // 상품을 삭제합니다.
  }

  function cancelSaleToken(uint _tokenId) public {
    address tokenOwner = Token.ownerOf(_tokenId);
    require(tokenOwner == msg.sender);
    require(tokenPrices[_tokenId] > 0);
    tokenPrices[_tokenId] = 0;
    popSaleToken(_tokenId);
  }

  function popSaleToken(uint _tokenId) private returns (bool) {
    for (uint i = 0; i < SaleTokenList.length; i++) {
      if (SaleTokenList[i] == _tokenId) {
        SaleTokenList[i] = SaleTokenList[SaleTokenList.length - 1];
        SaleTokenList.pop();
        return true;
      }
    }
    return false;
  }
}

// is ERC721Enumerable, ERC721URIStorage, Ownable {
//   mapping(address => uint) public BStransaction;
//   using Counters for Counters.Counter;
//   Counters.Counter private _tokenId;

//   function buy(uint tokenId) public payable {
//     uint price = 10 ** 18;
//     require(msg.value >= price, "insufficient payment");
//     address seller = ownerOf(tokenId);
//     require(seller != address(0), "invaild token");
//     transferFrom((seller), msg.sender, tokenId);
//     payable(seller).transfer(price);
//   }

//   function sell(uint tokenId) public payable {
//     require(ownerOf(tokenId) == msg.sender, "you dont own this token ");
//     uint price = 10 ** 18;
//     require(msg.value >= price, "Insufficient payment");
//     // BStransaction[msg.sender] -= 입력한값
//     payable(owner()).transfer(price); // msg.sender
//     _burn(tokenId);
//   }

//   constructor() ERC721("BuySell - Goerli", "LMDIFY") {}

//   function _beforeTokenTransfer(
//     address from,
//     address to,
//     uint256 firstTokenId,
//     uint256 batchSize
//   ) internal override(ERC721, ERC721Enumerable) {
//     super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
//   }

//   function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
//     super._burn(tokenId);
//   }

//   function supportsInterface(
//     bytes4 interfaceId
//   ) public view override(ERC721, ERC721Enumerable) returns (bool) {
//     return super.supportsInterface(interfaceId);
//   }

//   function tokenURI(
//     uint256 tokenId
//   ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
//     return super.tokenURI(tokenId); // ERC721URIStorage의 super를 가져온다.
//   }
// }
