// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract RandomAiNFT is ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    uint256 public size;
    string public animal;

    event NFTMinted(
        uint256 _balance,
        uint256 _tokenId,
        address _msgSender,
        string _tokenURI,
        address _tokenOwner
    );

    constructor() ERC721("RanAI NFT - GOERLI", "RAI") {}

    function getTokenId() public view returns (uint256) {
        return _tokenId.current();
    }

    function NFTMint(
        string memory _data,
        uint256 _randomSize,
        string memory _randomAnimal
    ) public {
        size = _randomSize;
        animal = _randomAnimal;

        uint256 tokenId = _tokenId.current();
        _tokenId.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _data);
    }

    // getter
    function getRandomSize() public view returns (uint256) {
        return size;
    }

    function getRandomAnimal() public view returns (string memory) {
        return animal;
    }

    // override
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
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
