// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract NFTToken is ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    event NFTMinted(
        uint256 _balance,
        uint256 _tokenId,
        address _msgSender,
        string _tokenURI,
        address _tokenOwner
    );

    // constructor(
    //     string memory _name,
    //     string memory _symbol
    // ) ERC721(_name, _symbol) {}

    constructor() ERC721("NFStart", "NFS") {}

    // 어떤 data를 받아서 넣어야 하는지 잘 모르겠다.
    function NFTMint(bytes memory data) public {
        uint256 tokenId = _tokenId.current();
        _tokenId.increment();
        _safeMint(msg.sender, tokenId, data);
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
}
