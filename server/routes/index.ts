// /api
import express from "express";

import user from "./user";
import nft from "./nft";
import chat from "./chat";

const router = express.Router();

router.use("/user", user);
router.use("/nft", nft);
router.use("/chat", chat);

export default router;
