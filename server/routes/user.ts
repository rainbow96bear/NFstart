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
      await db.User.create({
        account: req.body.account,
        nickName: req.body.nickName,
        chainId: req.body.chainId,
        balance: req.body.balance,
      });
      res.send({ isError: false });
    }
  } catch (err) {
    res.send({ isError: true });
  }
});

router.post("/info", async (req, res) => {
  try {
    const nickData = await db.User.findOne({
      where: { account: req.body.account },
    });

    res.send({ isError: false, nickData });
  } catch (err) {
    res.send({ isError: true });
  }
});

router.post("/login", async (req, res) => {
  const account = await db.User.findOne({
    where: { account: req.body.account },
  });
  if (account) {
    res.cookie("logout", false, {
      expires: new Date(Date.now() + 10 * 60 * 1000),
    });
  }
  res.send({ isError: false });
});

router.post("/logout", async (req, res) => {
  res.cookie("logout", true, {
    expires: new Date(Date.now() + 10 * 60 * 1000),
  });
  res.end();
});

router.post("/mypageCheck", async (req, res) => {
  try {
    const MpCheck = await db.User.findAll({
      where: {
        account: req.body.account,
      },
    });
    res.send(MpCheck);
  } catch (error) {
    console.log(error);
    res.send({ isError: true });
  }
});
router.post("/mypageCheck", async (req, res) => {
  try {
    const MpCheck = await db.User.findAll({
      where: {
        account: req.body.account,
      },
    });
    res.send(MpCheck);
  } catch (error) {
    console.log(error);
    res.send({ isError: true });
  }
});
export default router;
