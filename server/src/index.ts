import express, { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "../models/index";
import routes from "../routes/index";
import Web3 from "web3";

dotenv.config();

// 일단 테스트 넷 가나슈에서 진행
const web3 = new Web3("http://ganache.test.errorcode.help:8545");

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

app.use("/api", routes);

app.post("/regist", async (req: Request, res: Response) => {
  try {
    const tempUser = await db.User.findOne({
      where: { account: req.body.account },
    });
    if (tempUser) {
      res.send({ message: "account is exist" });
      return;
    } else {
      console.log(req.body);
      // await db.User.create({
      //   account: req.body.account,
      //   nickName: "req.body.nickName",
      //   chainId: req.body.chainId,
      //   balance: req.body.balance,
      // });
      res.send({ isError: false });
    }
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
