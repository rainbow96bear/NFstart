import express, { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";

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
const upload = multer({ storage: storage });

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

app.post(
  "/api/nft/imageAdd",
  upload.single("file"),
  (req: Request, res: Response) => {
    const file = req.file;

    // 스토리지 설정(어디에 저장하겠다라는 설정 해줘야 함)
    console.log(file?.filename);

    res.end();
  }
);

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")} Server Open`);
});
