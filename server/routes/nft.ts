// /api/nft
import express from "express";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import pinataSDK from "@pinata/sdk";
import fs from "fs";
import Web3 from "web3";
import db from "../models/index";
// import NFTAbi from "../build/contracts/NFTToken.json";
import { abi as NFTAbi } from "../contracts/artifacts/NFTToken.json";
import { AbiItem } from "web3-utils";
import { Readable } from "stream";

dotenv.config();

// const web3 = new Web3("http://ganache.test.errorcode.help:8545");
// https://app.infura.io/login
// wss://goerli.infura.io/ws/v3/YOUR-API-KEY
const web3 = new Web3(
  `wss://goerli.infura.io/ws/v3/${process.env.GOERLI_API_KEY}`
);

const router = express.Router();

// IPFS
const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);

// 이미지 업로드
const storage = multer.diskStorage({
  // 업로드 경로 설정
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  // 파일 이름 설정
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

// NFT 등록
router.post("/regist", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.send({ data: "파일 업로드 실패" });
    return;
  }

  const file = req.file;
  const files = req.files;
  const filename = file.filename.split(".")[0];
  const name = req.body.name;
  const desc = req.body.desc;
  const volume = req.body.num;
  const account = req.body.account;

  // 이미지가 제대로 안 들어가는 듯
  const imageData = fs.createReadStream(`./uploads/${file.filename}`);

  console.log(file);

  try {
    // Pinata에 해당 Image 등록
    const imgResult: {
      IpfsHash: string;
      PinSize: number;
      Timestamp: string;
      isDuplicate?: boolean;
      // } = await pinata.pinFileToIPFS(Readable.from(req.file.buffer), {
    } = await pinata.pinFileToIPFS(imageData, {
      pinataMetadata: {
        name: file.filename,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    });
    if (imgResult.isDuplicate) console.log("같은 이미지!");
    const IpfsHash = imgResult.IpfsHash;
    console.log(IpfsHash);

    // Pinata에 JSON 형식으로 NFT Data(.json) 등록
    const jsonResult = await pinata.pinJSONToIPFS(
      {
        name,
        desc,
        volume,
        publisher: account,
        image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,
      },
      {
        pinataMetadata: {
          name: filename + ".json",
        },
        pinataOptions: {
          cidVersion: 0,
        },
      }
    );
    const JsonIpfsHash = jsonResult.IpfsHash;
    console.log(JsonIpfsHash);

    // NFT 컨트랙트에 등록
    const deployed = new web3.eth.Contract(
      NFTAbi as AbiItem[],
      process.env.NFT_TOKEN_CA
    );
    const nonce = await web3.eth.getTransactionCount(account);
    const jsonData = deployed.methods.NFTMint(JsonIpfsHash).encodeABI();
    const imgData = deployed.methods.NFTMint(IpfsHash).encodeABI();

    // NFT Database에 등록 -> 밖으로 빼기
    const createdNFT = await db.NFT.create({
      hash: nonce,
      name,
      desc,
      filename: file.filename,
      IpfsHash,
      JsonIpfsHash,
      publisher: account,
      owner: account,
    });
    const user = await db.User.findOne({
      while: { account: account },
    });
    await user.addUserNFTs(createdNFT);

    // transaction 보낼 객체 생성
    const obj: {
      nonce: number;
      to: string | undefined;
      from: string;
      data: string;
    } = {
      nonce: nonce,
      to: process.env.NFT_TOKEN_CA,
      from: account,
      data: jsonData,
    };
    console.log("보낼 객체");
    console.log(obj);

    res.send(obj);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

// NFT 메인페이지에 최신 4개 출력
router.post("/tomain", async (req, res) => {
  try {
    const nftList = await db.NFT.findAll({
      order: ["id", "DESC"],
      limit: 4,
    });

    res.send(nftList);
  } catch (error) {
    res.send(error);
  }
});
//  NFT 마이페이지에 가지고 있는거 띄움
router.post("/toMypage", async (req, res) => {
  // console.log(req.body);
  // console.log("999", req.body.account);

  if (!req.body.account == db.User.account) {
    res.send({ data: "회원 정보가 없습니다." });
    return;
  } else {
    try {
      const nftAccount = await db.User.findAll({
        where: {
          account: req.body.account,
        },
      });
      res.send(nftAccount);
    } catch (error) {
      res.send(error);
    }
  }
  res.send();
  // 1차 유저랑 관계를 맺어야함
  // 2차 해당하는 유저의 정보를 가져와야함
});

router.post("/modalBt", async (req, res) => {
  console.log(req.body);
  try {
    const MPmodalAc = await db.User.findAll({
      where: { account: req.body },
    });
    console.log("모달어카", MPmodalAc);
    const MPmodalNF = await db.NFT.findAll({
      where: {
        name: req.body.name,
      },
    });
    console.log("NF", MPmodalNF);
  } catch (error) {
    console.log(error);
  }

  if (req.body.account == db.User.account) {
    res.send({ data: "판매자 입니다" });
  } else {
    res.send({ data: "판매자가 아닙니다" });
  }
});

export default router;
