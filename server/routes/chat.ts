import express from "express";
import dotenv from "dotenv";
import db from "../models/index";
import { Socket } from "socket.io";

dotenv.config();
const router = express.Router();
// const io = Socket(server);

router.post("/chat", async (req, res) => {
  // const io = socket();
  try {
    if (!req.body) {
      res.send({ data: "아이디를 확인해주세요" });
      return;
    }
    const createChat = await db.Chat.create({
      userId: req.body.userId,
      partnerId: req.body.partnerId,
      text: req.body.text,
      time: req.body.time,
    });
    res.end();
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

export default router;
