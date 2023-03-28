// /api/user
import express from "express";
import db from "../models/index";
import multer from "multer";
import path from "path";
import fs from "fs";

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
        profile: "",
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
  try {
    const account = await db.User.findOne({
      where: { account: req.body.account },
    });
    if (account) {
      res.cookie("logout", false, {
        expires: new Date(Date.now() + 10 * 60 * 1000),
      });
    }
    res.send({ isError: false });
  } catch (error) {
    console.log(error);
    res.send({ isError: true });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.cookie("logout", true, {
      expires: new Date(Date.now() + 10 * 60 * 1000),
    });
    res.send({ isError: false });
  } catch (error) {
    console.log(error);
    res.send({ isError: true });
  }
});

router.get("/logoutState", (req, res) => {
  if (req.cookies.logout) {
    res.send(req.cookies.logout);
  } else {
    res.cookie("logout", true, {
      expires: new Date(Date.now() + 10 * 60 * 1000),
    });
    res.send("true");
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

const storage = multer.diskStorage({
  // 업로드 경로
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  // 파일 이름
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});
// 프로필 사진 업로드
router.post("/change", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.send({ data: "파일 업로드 실패" });
    return;
  }
  console.log(req.body);
  const file = req.file;
  console.log(file);
  const filename = file.filename.split(".")[0];
  const name = req.body.name;
  const desc = req.body.desc;
  const volume = req.body.num;
  const account = req.body.account;

  const imageData = fs.createReadStream(`./uploads/${file.filename}`);

  // try {
  //   await db.User.update({
  //     profile: req.file.filename,
  //   });
  //   res.send("성공");
  // } catch (error) {
  //   console.error(error);
  //   res.send("실패");
  // }
});

//프로필 사진 변경하기 위한 router
router.post("/replace", async (req, res) => {
  try {
    const user = localStorage.getItem("account");
    console.log(user);

    // const curProfile = await db.User.update(
    //   { profile: req.body.profile },
    //   { where: { account: req.body.account } }
    // );
    res.send();
  } catch (error) {
    console.log(error);
    res.send({ isError: true });
  }
});

export default router;
