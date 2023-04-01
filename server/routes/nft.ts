// /api/nft
import express from "express";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import pinataSDK from "@pinata/sdk";
import fs from "fs";
import Web3 from "web3";
import db from "../models/index";
import { BigNumber } from "@ethersproject/bignumber";

import { Op } from "sequelize";
// import { abi as NFTAbi } from "../contracts/artifacts/NFTToken.json";
import { abi as NFTAbi } from "../contracts/artifacts/LetMeDoItForYou.json";
import { abi as BuySellAbi } from "../contracts/artifacts/BuySell.json";

import { AbiItem } from "web3-utils";
import { Readable } from "stream";

dotenv.config();

const web3 = new Web3(
  `wss://goerli.infura.io/ws/v3/${process.env.GOERLI_API_KEY}`
);

const router = express.Router();

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);

const storage = multer.diskStorage({
  // 업로드 경로
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  // 파일 이름
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

// ai 이미지 생성
// const { generateImage } = require('../controllers/openaiController')
router.post("/generateimage", async (req, res) => {
  console.log(req.body);
  res.end();
});

// 기본 이미지 nft 등록 부분
router.post("/regist", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.send({ data: "파일 업로드 실패" });
    return;
  }

  const imgfile = req.file;
  const name = req.body.name;
  const desc = req.body.desc;
  const volume = req.body.num;
  const account = req.body.account;

  const imageData = fs.createReadStream(`./uploads/${imgfile.filename}`);

  // 0. 배포된 컨트랙트를 불러온다.
  const deployed = new web3.eth.Contract(
    NFTAbi as AbiItem[],
    // process.env.NFT_TOKEN_CA
    process.env.LETMEDOITFORYOU_CA
  );
  const tokenId = await deployed.methods.getTokenId().call();

  try {
    // 1. Pinata에 Image 등록
    const imgResult: {
      IpfsHash: string;
      PinSize: number;
      Timestamp: string;
      isDuplicate?: boolean;
    } = await pinata.pinFileToIPFS(imageData, {
      pinataMetadata: {
        name: imgfile.filename,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    });
    if (imgResult.isDuplicate) console.log("이미 Pinata에 등록된 이미지");
    const IpfsHash = imgResult.IpfsHash;

    // 2. Pinata에 JSON 형식으로 NFT Data 등록
    const jsonResult = await pinata.pinJSONToIPFS(
      {
        name: `${name} #${tokenId}`,
        desc,
        volume,
        publisher: account,
        image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,
      },
      {
        pinataMetadata: {
          name: imgfile.filename.split(".")[0] + ".json",
        },
        pinataOptions: {
          cidVersion: 0,
        },
      }
    );
    const JsonIpfsHash = jsonResult.IpfsHash;

    // 3. 배포된 컨트랙트의 메서드를 활용하여 NFT 등록 데이터 생성
    const jsonData = await deployed.methods.NFTMint(JsonIpfsHash).encodeABI();

    // 4. 해당 Contract에 Transaction을 보내기 위한 객체 생성
    const obj: {
      nonce: number;
      to: string | undefined;
      from: string;
      data: string;
    } = {
      nonce: tokenId,
      // to: process.env.NFT_TOKEN_CA,
      to: process.env.LETMEDOITFORYOU_CA,
      from: account,
      data: jsonData,
    };

    // Database에 저장하기 위한 객체 생성
    const saveData: {
      hash: number;
      name: string;
      desc: string;
      filename: string;
      IpfsHash: string;
      JsonIpfsHash: string;
      publisher: string;
      owner: string;
    } = {
      hash: tokenId,
      name: `${name} #${tokenId}`,
      desc,
      filename: imgfile.filename,
      IpfsHash,
      JsonIpfsHash,
      publisher: account,
      owner: account,
    };
    console.log("Transaction 보낼 객체");
    console.log(obj);
    console.log("Database에 등록할 객체");
    console.log(saveData);

    // 다르게 바꾸기
    res.send({ obj, saveData });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

// 배포된 NFT 정보를 DB에 저장
router.post("/save", async (req, res) => {
  try {
    const createdNFT = await db.NFT.create({
      hash: req.body.hash,
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.sellPrice,
      fees: req.body.sellFees,
      filename: req.body.filename,
      IpfsHash: req.body.IpfsHash,
      JsonIpfsHash: req.body.JsonIpfsHash,
      publisher: req.body.publisher,
      owner: req.body.owner,
    });
    const user = await db.User.findOne({
      while: { account: req.body.owner },
    });
    await user.addUserNFTs(createdNFT);
    res.send("성공");
  } catch (error) {
    console.error(error);
    res.send("실패");
  }
});


router.post("/createAi", async (req, res) => {
  console.log(req.body);
  res.end();
});








//------------------------------------------------------ Main , myPage---------------
// NFT 메인페이지에 최신 4개 출력
router.post("/tomain", async (req, res) => {
  try {
    const nftList = await db.NFT.findAll({
      where: {
        owner: req.body.account,
      },
      order: [["id", "DESC"]],
      limit: 4,
    });

    res.send(nftList);
  } catch (error) {
    res.send(error);
  }
});
// Main에 아이디 전체
router.post("/tomainAll", async (req, res) => {
  try {
    const userList = await db.User.findAll({
      order: [["id", "DESC"]],
    });

    res.send(userList);
  } catch (error) {
    res.send(error);
  }
});
// NFT 마이페이지에 가지고 있는거 띄움
router.post("/toMypage", async (req, res) => {
  if (!req.body.path == db.User.account) {
    res.send({ data: "회원 정보가 없습니다." });
    return;
  } else {
    try {
      const nftAccount = await db.User.findAll({
        where: {
          account: req.body.path,
        },
      });

      res.send(nftAccount);
    } catch (error) {
      res.send(error);
    }
  }
});

// 해당 페이지 아이디에 NFT 가져오기
router.post("/myNFT", async (req, res) => {
  if (!req.body.path == db.NFT.owner) {
    res.send({ data: "연결오류" });
    return;
  } else {
    try {
      const myNFTList = await db.NFT.findAll({
        where: {
          owner: req.body.path,
        },
      });
      res.send(myNFTList);
    } catch (error) {
      res.send(error);
    }
  }
});
// 판매신청된  NFT 목록
router.post("/mySellNft", async (req, res) => {
  if (!req.body.path == db.NFT.owner) {
    res.send({ data: "연결오류" });
    return;
  } else {
    try {
      const mySellNFTList = await db.NFT.findAll({
        where: {
          price: { [Op.gte]: 1 },
          owner: req.body.path,
        },
      });
      res.send(mySellNFTList);
    } catch (error) {
      res.send(error);
    }
  }
});

router.post("/sellData", async (req, res) => {
  try {
    const nonce = await web3.eth.getTransactionCount(req.body.user.account);

    const LMDIFYdeployed = new web3.eth.Contract(
      NFTAbi as AbiItem[],
      process.env.LETMEDOITFORYOU_CA
    );
    const APPID = LMDIFYdeployed.methods
      .setApprovalForAll(process.env.BuySell_CA, true)
      .encodeABI();
    const objAproval: {
      nonce: number;
      from: string;
      to: string | undefined;
      data: string;
    } = {
      nonce: nonce,
      from: req.body.user.account,
      to: process.env.LETMEDOITFORYOU_CA,
      data: APPID,
    };

    const deployed = new web3.eth.Contract(
      BuySellAbi as AbiItem[],
      process.env.BuySell_CA
    );
    const bigNumberValue = BigNumber.from(
      Math.floor(req.body.priceValue * 10 ** 18).toString()
    );
    const SellData = deployed.methods
      .SalesToken(req.body.hash, bigNumberValue)
      .encodeABI();
    const BuyObj: {
      nonce: number;
      from: string;
      to: string | undefined;
      data: string;
    } = {
      nonce: nonce,
      from: req.body.user.account,
      to: process.env.BuySell_CA,
      data: SellData,
    };

    await db.NFT.update(
      { price: req.body.priceValue },
      { where: { hash: req.body.hash } }
    );

    res.send({ BuyObj, objAproval });
  } catch (error) {
    console.log(error);
    res.send("판매등록 실패");
  }
});

router.post("/buybuy", async (req, res) => {
  try {
    // const Appdeployed = new web3.eth.Contract(
    //   NFTAbi as AbiItem[],
    //   process.env.LETMEDOITFORYOU_CA
    // );
    // const APPID = Appdeployed.methods
    //   .setApprovalForAll(req.body.account, true)
    //   .encodeABI();

    // const objAproval: {
    //   from: string | undefined;
    //   to: string | undefined;
    //   data: string;
    // } = {
    //   from: process.env.LETMEDOITFORYOU_CA, // 현 메타마스크와 연결된 주소
    //   to: req.body.account, //
    //   data: APPID,
    // };
    //
    const deployed = new web3.eth.Contract(
      BuySellAbi as AbiItem[],
      process.env.BuySell_CA
    );
    const buyData = deployed.methods.PurchaseToken(req.body.data).encodeABI();
    const BuyObjPrice = await db.NFT.findOne({
      where: { hash: req.body.data },
    });
    const BuyObj: {
      from: string | undefined;
      to: string | undefined;
      data: string;
      value: number | undefined;
    } = {
      from: req.body.account,
      to: process.env.BuySell_CA,
      data: buyData,
      value: BuyObjPrice.price * 10 ** 18, //디비에 저장되어 있는 값
    };

    res.send({ BuyObj });
  } catch (error) {
    res.status(500).send("Error occurred.");
  }
});

router.post("/favorite", async (req, res) => {
  try {
    console.log(req.body.count);
    // const updateCount = await db.User.update(
    //   { favorite: req.body.count },
    //   { where: { owner: req.body.account } }
    // );
    // res.send({ updateCount });
  } catch (error) {
    console.log(error);
    res.send("좋아하는거 실패");
  }
});

router.post("/explore", async (req, res) => {
  const { keyword } = req.body;
  console.log(keyword);
  let searchResult;
  if (keyword == "") {
    searchResult = await db.NFT.findAll({
      include: [
        {
          model: db.User,
        },
      ],
      order: [["id", "DESC"]],
    });
  } else {
    searchResult = await db.NFT.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: "%" + keyword + "%" } },
          { owner: { [Op.like]: "%" + keyword + "%" } },
          { "$User.nickName$": { [Op.like]: "%" + keyword + "%" } },
        ],
      },
      include: [{ model: db.User }],
      order: [["id", "DESC"]],
    });
  }
  res.send({ searchResult });
});
router.post("/render", async (req, res) => {
  await db.NFT.update(
    { price: 0, owner: req.body.account },
    { where: { hash: req.body.data } }
  );
});

export default router;
