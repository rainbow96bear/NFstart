"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /api
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const nft_1 = __importDefault(require("./nft"));
const chat_1 = __importDefault(require("./chat"));
const theme_1 = __importDefault(require("./theme"));
const router = express_1.default.Router();
router.use("/user", user_1.default);
router.use("/nft", nft_1.default);
router.use("/chat", chat_1.default);
router.use("/theme", theme_1.default);
exports.default = router;
