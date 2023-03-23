import express from "express";
import dotenv from "dotenv";
import db from "../models/index";
dotenv.config();
const router = express.Router();

router.post("/chart", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body) {
      res.send({ data: "아이디를 확인해주세요" });
      return;
    }
    const createChart = await db.Chart.create({
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
