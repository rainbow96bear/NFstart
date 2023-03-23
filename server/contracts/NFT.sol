// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721 {
    using Counters for Counters.Counter;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    // NFT 발행 함수 : tokenId를 만들고 to로 전송한다.
    // 누구나 이 컨트랙트에 접근하여 새로운 NFT를 발행할 수 있다. (public)
    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }
}
