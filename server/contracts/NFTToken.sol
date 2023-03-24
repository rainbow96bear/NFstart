// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract NFTToken is ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    event NFTMinted(
        uint256 _balance,
        uint256 _tokenId,
        address _msgSender,
        string _tokenURI,
        address _tokenOwner
    );

    constructor() ERC721("NFStart", "NFS") {}

    // 어떤 data를 받아서 넣어야 하는지 잘 모르겠다. -> ipfs cid 값 이라고 한다.
    function NFTMint(string memory data) public {
        uint256 tokenId = _tokenId.current();
        _tokenId.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, data);
    }

    function testMint() public {
        uint256 tokenId = _tokenId.current(); // 현재 토큰 숫자
        _tokenId.increment(); // 토큰 숫자 증가
        balanceOf(msg.sender); // 가진 토큰 개수 조회
        _safeMint(msg.sender, tokenId); // 테스트 민팅
        tokenURI(tokenId); // 토큰 URI 출력 -> 출력 X
        ownerOf(tokenId); // 토큰 주인 출력
        emit NFTMinted(
            balanceOf(msg.sender),
            tokenId,
            msg.sender,
            tokenURI(tokenId),
            ownerOf(tokenId)
        );
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
