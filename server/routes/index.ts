// /api
import express from "express";

import user from "./user";
import nft from "./nft";
import chat from "./chat";
import theme from "./theme";

const router = express.Router();

router.use("/user", user);
router.use("/nft", nft);
router.use("/chat", chat);
router.use("/theme", theme);

export default router;
