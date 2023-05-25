"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/get", (req, res) => {
    let theme;
    if (req.cookies.theme) {
        theme = req.cookies.theme;
    }
    else {
        theme = "light";
    }
    res.cookie("theme", theme, {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });
    res.send({ theme });
});
router.put("/set", (req, res) => {
    let theme = "light";
    if (req.cookies.theme == "dark") {
        theme = "light";
    }
    else if (req.cookies.theme == "light") {
        theme = "dark";
    }
    res.cookie("theme", theme, {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });
    res.send({ theme });
});
exports.default = router;
