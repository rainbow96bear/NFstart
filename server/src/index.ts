import express, { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import pinataSDK from "@pinata/sdk";
import fs from "fs";
import { Readable } from 'stream';
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
const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);

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
const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

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


// NFT 등록
app.post("/api/nft/regist", upload.single("file"), async (req: Request, res: Response) => {
  if (!req.file) {
    res.send({ data: "파일 업로드 실패" });
    return;
  }

  const file = req.file;
  const NFTName = req.body.name;
  const NFTDesc = req.body.desc;
  const publishNum = req.body.num;
  const account = req.body.account;

  const imageData = fs.createReadStream(`./uploads/${file.filename}`);

  console.log(file);

  try {
    // Pinata에 해당 Image 등록
    const imgResult: {
      IpfsHash: string;
      PinSize: number;
      Timestamp: string;
      isDuplicate?: boolean;
    } = await pinata.pinFileToIPFS(imageData, {
      pinataMetadata: {
        name: file.filename,
      },
      pinataOptions: {
        cidVersion: 0,
      }
    });
    if (imgResult.isDuplicate) console.log("같은 이미지!");
    console.log(imgResult);

    // Pinata에 JSON 형식으로 NFT Data(.json) 등록
    const jsonResult = await pinata.pinJSONToIPFS({
      NFTName,
      NFTDesc,
      publishNum,
      publishAccount: account,
      image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,
    }, {
      pinataMetadata: {
        // .json : 이름이 같을 수 있기 때문에 추가
        name: file.filename.split(".")[0] + ".json",
      },
      pinataOptions: {
        cidVersion: 0,
      }
    });
    console.log(jsonResult);

    // NFT Database에 등록
    // 코드 작성

    // NFT 컨트랙트에 등록
    // 코드 작성

    res.end();
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});


app.post("/regist", async (req: Request, res: Response) => {
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
        nickName: "req.body.nickName",
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

app.post("/logined", async (req: Request, res: Response) => {
  try {
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
