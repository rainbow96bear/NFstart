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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("../models/index"));
dotenv_1.default.config();
const router = express_1.default.Router();
// const io = Socket(server);
router.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const io = socket();
    try {
        if (!req.body) {
            res.send({ data: "아이디를 확인해주세요" });
            return;
        }
        const createChat = yield index_1.default.Chat.create({
            userId: req.body.userId,
            partnerId: req.body.partnerId,
            text: req.body.text,
            time: req.body.time,
        });
        res.end();
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
}));
exports.default = router;
