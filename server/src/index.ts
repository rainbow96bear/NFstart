import express, { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import pinataSDK from '@pinata/sdk';
import db from "../models/index";

dotenv.config();

const app: Express = express();
app.set("port", process.env.PORT || 8080);
app.use((req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV == "production") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "build")));
app.use(cookieParser(process.env.COOKIE_SECRET));

// IPFS
const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

// 이미지 업로드
const storage = multer.diskStorage({
  // 업로드 경로 설정
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  // 파일 이름 설정
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },

});
const upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } });

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    secret: String(process.env.COOKIE_SECRET),
    name: "session",
  })
);

app.post("/api/nft/regist", upload.single("file"), (req: Request, res: Response) => {
  const file = req.file;
  const name = req.body.name;
  const desc = req.body.desc;
  const num = req.body.num;
  const account = req.body.account;
  console.log("add uploads image : " + file?.filename);
  console.log(name, desc, num);
  console.log(account);

  res.end();
}
);

app.post("/userInfo", async (req: Request, res: Response) => {
  try {
    const hi = await db.User.create({
      account: req.body.account,
      nickName: "req.body.nickName",
      chainId: req.body.chainId,
      balance: req.body.balance,
    });
    res.send(hi);
  } catch (err) {
    console.log(err);
    res.send({ isError: true });
  }
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("db connected");
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")} Server Open`);
});
