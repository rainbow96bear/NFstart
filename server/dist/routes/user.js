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
// /api/user
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../models/index"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.post("/regist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tempUser = yield index_1.default.User.findOne({
            where: { account: req.body.account },
        });
        if (tempUser) {
            res.send({ message: "account is exist" });
            return;
        }
        else {
            yield index_1.default.User.create({
                account: req.body.account,
                nickName: req.body.nickName,
                chainId: req.body.chainId,
                balance: req.body.balance,
                profile: "",
            });
            res.send({ isError: false });
        }
    }
    catch (err) {
        res.send({ isError: true });
    }
}));
router.post("/info", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nickData = yield index_1.default.User.findOne({
            where: { account: req.body.account },
        });
        res.send({ isError: false, nickData });
    }
    catch (err) {
        res.send({ isError: true });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield index_1.default.User.findOne({
            where: { account: req.body.account },
        });
        if (account) {
            res.cookie("logout", false, {
                expires: new Date(Date.now() + 10 * 60 * 1000),
            });
        }
        res.send({ isError: false });
    }
    catch (error) {
        console.log(error);
        res.send({ isError: true });
    }
}));
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("logout", true, {
            expires: new Date(Date.now() + 10 * 60 * 1000),
        });
        res.send({ isError: false });
    }
    catch (error) {
        console.log(error);
        res.send({ isError: true });
    }
}));
router.get("/logoutState", (req, res) => {
    if (req.cookies.logout) {
        res.send(req.cookies.logout);
    }
    else {
        res.cookie("logout", true, {
            expires: new Date(Date.now() + 10 * 60 * 1000),
        });
        res.send("true");
    }
});
router.post("/mypageCheck", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MpCheck = yield index_1.default.User.findAll({
            where: {
                account: req.body.account,
            },
        });
        res.send(MpCheck);
    }
    catch (error) {
        console.log(error);
        res.send({ isError: true });
    }
}));
router.post("/mypageCheck", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MpCheck = yield index_1.default.User.findAll({
            where: {
                account: req.body.account,
            },
        });
        res.send(MpCheck);
    }
    catch (error) {
        console.log(error);
        res.send({ isError: true });
    }
}));
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
// 프로필 사진 업로드
router.post("/imgUpload", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.send({ data: "파일 업로드 실패" });
            return;
        }
        const file = req.file;
        yield index_1.default.User.update({ profile: req.file.filename }, { where: { account: req.body.account } });
        res.send("성공");
    }
    catch (error) {
        console.error(error);
        res.send({ data: "파일 업로드 실패" });
    }
}));
//프로필 사진 변경하기 위한 router
router.post("/findProfile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield index_1.default.User.findAll({
            where: { account: req.body.account },
        });
        res.send(userData);
    }
    catch (error) {
        res.send({ isError: true });
    }
}));
router.post("/replace", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        index_1.default.User.update({ nickName: req.body.nickName }, { where: { account: req.body.account } });
        res.send({ nickName: req.body.nickName });
    }
    catch (error) {
        res.send({ isError: true });
    }
}));
exports.default = router;
