// /api/nft
import express from "express";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import pinataSDK from "@pinata/sdk";
import fs from "fs";
import Web3 from "web3";
import db from "../models/index";
import NFTAbi from "../build/contracts/NFTToken.json";
import { AbiItem } from "web3-utils";

dotenv.config();

const web3 = new Web3("http://ganache.test.errorcode.help:8545");

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

    const imageData = fs.createReadStream(`./uploads/${file.filename}`);

    try {
        // Pinata에 해당 Image 등록
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

        console.log(file);

        // NFT Database에 등록
        const createdNFT = await db.NFT.create({
            hash: "임시HASH값",
            name,
            desc,
            filename: file.filename,
            IpfsHash,
            JsonIpfsHash,
            publisher: account,
            owner: account,
        });

        // // NFT 컨트랙트에 등록
        // // 코드 작성
        // // NFTAbi : 배포된 토큰 json
        // const deployed = new web3.eth.Contract(NFTAbi as any, process.env.NFTTOKEN_CA);
        // // await web3.eth.getTransactionCount();
        // const data = deployed.methods.NFTMint(JsonIpfsHash).encodeABI();
        // console.log(data);

        // const obj = {
        //     nonce: 0,
        //     to: process.env.NFT_TOKEN_CA,
        //     from: req.body.from,
        //     data: "",
        // }
        // obj.nonce = await web3.eth.getTransactionCount(req.body.from);
        // obj.data = deployed.methods.safeMint(jsonResult.IpfsHash).encodeABI();

        res.end();
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});
// NFT 메인페이지 출력
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

export default router;
