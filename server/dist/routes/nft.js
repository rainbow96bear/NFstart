"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /api/nft
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const sdk_1 = __importDefault(require("@pinata/sdk"));
const fs_1 = __importDefault(require("fs"));
const web3_1 = __importDefault(require("web3"));
const index_1 = __importDefault(require("../models/index"));
const bignumber_1 = require("@ethersproject/bignumber");
const sequelize_1 = require("sequelize");
// import { abi as NFTAbi } from "../contracts/artifacts/NFTToken.json";
const LetMeDoItForYou_json_1 = require("../contracts/artifacts/LetMeDoItForYou.json");
const BuySell_json_1 = require("../contracts/artifacts/BuySell.json");
dotenv_1.default.config();
const web3 = new web3_1.default(`wss://goerli.infura.io/ws/v3/${process.env.GOERLI_API_KEY}`);
const router = express_1.default.Router();
const pinata = new sdk_1.default(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
const storage = multer_1.default.diskStorage({
    // 업로드 경로
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    // 파일 이름
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fieldSize: 25 * 1024 * 1024 },
});
// ai 이미지 생성
// const { generateImage } = require('../controllers/openaiController')
router.post("/generateimage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    res.end();
}));
// 기본 이미지 nft 등록 부분
router.post("/regist", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.send({ data: "파일 업로드 실패" });
        return;
    }
    const imgfile = req.file;
    const name = req.body.name;
    const desc = req.body.desc;
    const volume = req.body.num;
    const account = req.body.account;
    const imageData = fs_1.default.createReadStream(`./uploads/${imgfile.filename}`);
    // 0. 배포된 컨트랙트를 불러온다.
    const deployed = new web3.eth.Contract(LetMeDoItForYou_json_1.abi, 
    // process.env.NFT_TOKEN_CA
    process.env.LETMEDOITFORYOU_CA);
    const tokenId = yield deployed.methods.getTokenId().call();
    try {
        // 1. Pinata에 Image 등록
        const imgResult = yield pinata.pinFileToIPFS(imageData, {
            pinataMetadata: {
                name: imgfile.filename,
            },
            pinataOptions: {
                cidVersion: 0,
            },
        });
        if (imgResult.isDuplicate)
            console.log("이미 Pinata에 등록된 이미지");
        const IpfsHash = imgResult.IpfsHash;
        // 2. Pinata에 JSON 형식으로 NFT Data 등록
        const jsonResult = yield pinata.pinJSONToIPFS({
            name: `${name} #${tokenId}`,
            desc,
            volume,
            publisher: account,
            image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,
        }, {
            pinataMetadata: {
                name: imgfile.filename.split(".")[0] + ".json",
            },
            pinataOptions: {
                cidVersion: 0,
            },
        });
        const JsonIpfsHash = jsonResult.IpfsHash;
        // 3. 배포된 컨트랙트의 메서드를 활용하여 NFT 등록 데이터 생성
        const jsonData = yield deployed.methods.NFTMint(JsonIpfsHash).encodeABI();
        // 4. 해당 Contract에 Transaction을 보내기 위한 객체 생성
        const obj = {
            nonce: tokenId,
            // to: process.env.NFT_TOKEN_CA,
            to: process.env.LETMEDOITFORYOU_CA,
            from: account,
            data: jsonData,
        };
        // Database에 저장하기 위한 객체 생성
        const saveData = {
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
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
}));
// 배포된 NFT 정보를 DB에 저장
router.post("/save", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdNFT = yield index_1.default.NFT.create({
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
        const user = yield index_1.default.User.findOne({
            while: { account: req.body.owner },
        });
        yield user.addUserNFTs(createdNFT);
        res.send("성공");
    }
    catch (error) {
        console.error(error);
        res.send("실패");
    }
}));
//------------------------------------------------------ Main , myPage---------------
// NFT 메인페이지에 최신 4개 출력
router.post("/tomain", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nftList = yield index_1.default.NFT.findAll({
            where: {
                owner: req.body.account,
            },
            order: [["id", "DESC"]],
            limit: 4,
        });
        res.send(nftList);
    }
    catch (error) {
        res.send(error);
    }
}));
// Main에 아이디 전체
router.post("/tomainAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userList = yield index_1.default.User.findAll({
            order: [["id", "DESC"]],
        });
        res.send(userList);
    }
    catch (error) {
        res.send(error);
    }
}));
// NFT 마이페이지에 가지고 있는거 띄움
router.post("/toMypage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.path == index_1.default.User.account) {
        res.send({ data: "회원 정보가 없습니다." });
        return;
    }
    else {
        try {
            const nftAccount = yield index_1.default.User.findAll({
                where: {
                    account: req.body.path,
                },
            });
            res.send(nftAccount);
        }
        catch (error) {
            res.send(error);
        }
    }
}));
// 해당 페이지 아이디에 NFT 가져오기
router.post("/myNFT", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.path == index_1.default.NFT.owner) {
        res.send({ data: "연결오류" });
        return;
    }
    else {
        try {
            const myNFTList = yield index_1.default.NFT.findAll({
                where: {
                    owner: req.body.path,
                },
            });
            res.send(myNFTList);
        }
        catch (error) {
            res.send(error);
        }
    }
}));
// 판매신청된  NFT 목록
router.post("/mySellNft", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.path == index_1.default.NFT.owner) {
        res.send({ data: "연결오류" });
        return;
    }
    else {
        try {
            const mySellNFTList = yield index_1.default.NFT.findAll({
                where: {
                    price: { [sequelize_1.Op.gte]: 1 },
                    owner: req.body.path,
                },
            });
            res.send(mySellNFTList);
        }
        catch (error) {
            res.send(error);
        }
    }
}));
router.post("/sellData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nonce = yield web3.eth.getTransactionCount(req.body.user.account);
        const LMDIFYdeployed = new web3.eth.Contract(LetMeDoItForYou_json_1.abi, process.env.LETMEDOITFORYOU_CA);
        const APPID = LMDIFYdeployed.methods
            .setApprovalForAll(process.env.BuySell_CA, true)
            .encodeABI();
        const objAproval = {
            nonce: nonce,
            from: req.body.user.account,
            to: process.env.LETMEDOITFORYOU_CA,
            data: APPID,
        };
        const deployed = new web3.eth.Contract(BuySell_json_1.abi, process.env.BuySell_CA);
        const bigNumberValue = bignumber_1.BigNumber.from(Math.floor(req.body.priceValue * Math.pow(10, 18)).toString());
        const SellData = deployed.methods
            .SalesToken(req.body.hash, bigNumberValue)
            .encodeABI();
        const BuyObj = {
            nonce: nonce,
            from: req.body.user.account,
            to: process.env.BuySell_CA,
            data: SellData,
        };
        yield index_1.default.NFT.update({ price: req.body.priceValue }, { where: { hash: req.body.hash } });
        res.send({ BuyObj, objAproval });
    }
    catch (error) {
        console.log(error);
        res.send("판매등록 실패");
    }
}));
router.post("/buybuy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const deployed = new web3.eth.Contract(BuySell_json_1.abi, process.env.BuySell_CA);
        const buyData = deployed.methods.PurchaseToken(req.body.data).encodeABI();
        const BuyObjPrice = yield index_1.default.NFT.findOne({
            where: { hash: req.body.data },
        });
        const BuyObj = {
            from: req.body.account,
            to: process.env.BuySell_CA,
            data: buyData,
            value: BuyObjPrice.price * Math.pow(10, 18), //디비에 저장되어 있는 값
        };
        res.send({ BuyObj });
    }
    catch (error) {
        res.status(500).send("Error occurred.");
    }
}));
router.post("/favorite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.count);
        // const updateCount = await db.User.update(
        //   { favorite: req.body.count },
        //   { where: { owner: req.body.account } }
        // );
        // res.send({ updateCount });
    }
    catch (error) {
        console.log(error);
        res.send("좋아하는거 실패");
    }
}));
router.post("/explore", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.body;
    console.log(keyword);
    let searchResult;
    if (keyword == "") {
        searchResult = yield index_1.default.NFT.findAll({
            include: [
                {
                    model: index_1.default.User,
                },
            ],
            order: [["id", "DESC"]],
        });
    }
    else {
        searchResult = yield index_1.default.NFT.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { name: { [sequelize_1.Op.like]: "%" + keyword + "%" } },
                    { owner: { [sequelize_1.Op.like]: "%" + keyword + "%" } },
                    { "$User.nickName$": { [sequelize_1.Op.like]: "%" + keyword + "%" } },
                ],
            },
            include: [{ model: index_1.default.User }],
            order: [["id", "DESC"]],
        });
    }
    res.send({ searchResult });
}));
router.post("/render", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.default.NFT.update({ price: 0, owner: req.body.account }, { where: { hash: req.body.data } });
}));
exports.default = router;
