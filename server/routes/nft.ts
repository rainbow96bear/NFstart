// /api/nft
import express from "express";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import pinataSDK from "@pinata/sdk";
import fs from "fs";
import db from "../models/index";
dotenv.config();

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
  const filename = file.filename.split(".")[0];
  const name = req.body.name;
  const desc = req.body.desc;
  const volume = req.body.num;
  const account = req.body.account;

  const imageData = fs.createReadStream(`./uploads/${filename}.png`);

  console.log(file);

  try {
    // Pinata에 해당 Image 등록
    const imgResult: {
      IpfsHash: string;
      PinSize: number;
      Timestamp: string;
      isDuplicate?: boolean;
    } = await pinata.pinFileToIPFS(imageData, {
      pinataMetadata: {
        name: filename + "png",
      },
      pinataOptions: {
        cidVersion: 0,
      },
    });
    if (imgResult.isDuplicate) console.log("같은 이미지!");
    console.log(imgResult);
    const IpfsHash = imgResult.IpfsHash;

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
    console.log(jsonResult);
    const JsonIpfsHash = jsonResult.IpfsHash;

    // NFT Database에 등록
    const createdNFT = await db.NFT.create({
      hash: "임시HASH값",
      name,
      desc,
      filename,
      IpfsHash,
      JsonIpfsHash,
      publisher: "임시ACCOUNT값",
      owner: "임시ACCOUNT값",
    });

    // NFT 컨트랙트에 등록
    // 코드 작성

    res.end();
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

export default router;
