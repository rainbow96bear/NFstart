// /api
import express from "express";

import user from "./user";
import nft from "./nft";

const router = express.Router();

router.use("/user", user);
router.use("/nft", nft);

export default router;
