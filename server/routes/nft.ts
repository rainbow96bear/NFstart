// /api/nft
import express from "express";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import pinataSDK from "@pinata/sdk";
import fs from "fs";
import Web3 from "web3";
import db from "../models/index";
import { abi as NFTAbi } from "../contracts/artifacts/NFTToken.json";
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

router.post("/regist", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.send({ data: "파일 업로드 실패" });
    return;
  }

  const file = req.file;
  const filename = file.filename.split(".")[0];
  const name = req.body.name;
  const desc = req.body.desc;
  const volume = req.body.num;
  const account = req.body.account;

  const imageData = fs.createReadStream(`./uploads/${file.filename}`);
  const nonce = await web3.eth.getTransactionCount(account);
  console.log(file);

  try {
    // 1. Pinata에 Image 등록
    const imgResult: {
      IpfsHash: string;
      PinSize: number;
      Timestamp: string;
      isDuplicate?: boolean;
    } = await pinata.pinFileToIPFS(imageData, {
      pinataMetadata: {
        name: file.filename,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    });
    if (imgResult.isDuplicate) console.log("이미 Pinata에 등록된 이미지");
    const IpfsHash = imgResult.IpfsHash;
    console.log(IpfsHash);

    // 2. Pinata에 JSON 형식으로 NFT Data 등록
    const jsonResult = await pinata.pinJSONToIPFS({
      name: `${name} #${nonce}`,
      desc,
      volume,
      publisher: account,
      image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,
    }, {
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

    // 3. 배포된 컨트랙트의 메서드를 활용하여 NFT 등록 데이터 생성
    const deployed = new web3.eth.Contract(
      NFTAbi as AbiItem[],
      process.env.NFT_TOKEN_CA
    );
    const jsonData = deployed.methods.NFTMint(JsonIpfsHash).encodeABI();
    console.log(jsonData);

    // NFT를 Database에 등록 -> 해당 데이터를 컨트랙트에 배포하겠다는 서명 이후 진행(밖으로 빼기)
    // const createdNFT = await db.NFT.create({
    //   hash: nonce,
    //   name: `${name} #${nonce}`,
    //   desc,
    //   filename: file.filename,
    //   IpfsHash,
    //   JsonIpfsHash,
    //   publisher: account,
    //   owner: account,
    // });
    // const user = await db.User.findOne({
    //   while: { account: account },
    // });
    // await user.addUserNFTs(createdNFT);

    // 해당 Contract에 Transaction을 보내기 위한 객체 생성
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
      hash: nonce,
      name: `${name} #${nonce}`,
      desc,
      filename: file.filename,
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
