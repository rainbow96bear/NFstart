// /api/user
import express from "express";
import db from "../models/index";

const router = express.Router();

router.post("/regist", async (req, res) => {
  try {
    const tempUser = await db.User.findOne({
      where: { account: req.body.account },
    });
    if (tempUser) {
      res.send({ message: "account is exist" });
      return;
    } else {
      console.log(req.body);
      await db.User.create({
        account: req.body.account,
        nickName: req.body.nickName,
        chainId: req.body.chainId,
        balance: req.body.balance,
      });
      res.send({ isError: false });
    }
  } catch (err) {
    console.log(err);
    res.send({ isError: true });
  }
});
export default router;
