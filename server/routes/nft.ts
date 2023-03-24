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

dotenv.config();

// const web3 = new Web3("http://ganache.test.errorcode.help:8545");
// https://app.infura.io/login
// wss://goerli.infura.io/ws/v3/YOUR-API-KEY
const web3 = new Web3(`wss://goerli.infura.io/ws/v3/${process.env.GOERLI_API_KEY}`);

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


        // NFT 컨트랙트에 등록
        const deployed = new web3.eth.Contract(NFTAbi as AbiItem[], process.env.NFT_TOKEN_CA);
        console.log(deployed.methods);

        console.log(await web3.eth.getTransactionCount(account));

        const data = deployed.methods.NFTMint(JsonIpfsHash).encodeABI();

        // 프론트에서 sendTransaction 을 해줘야 함

        // NFT Database에 등록
        const createdNFT = await db.NFT.create({
            hash: data,
            name,
            desc,
            filename: file.filename,
            IpfsHash,
            JsonIpfsHash,
            publisher: account,
            owner: account,
        });
        const user = await db.User.findOne({
            while: { account: account }
        });
        await user.addUserNFTs(createdNFT);

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
