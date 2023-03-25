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
// const web3 = new Web3("http://ganache.test.errorcode.help:8545");
const web3 = new Web3(
  `wss://goerli.infura.io/ws/v3/${process.env.GOERLI_API_KEY}`
);

const app: Express = express();
app.set("port", process.env.PORT || 8080);
app.use((req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV == "production") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});
// app.use(cors({ origin: "http://localhost:3000" }));
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
app.use("/uploads", express.static("uploads"));

db.sequelize.sync({ force: false }).then(() => {
  console.log("db connected");
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")} Server Open`);
});
