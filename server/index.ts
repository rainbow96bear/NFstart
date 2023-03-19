import express, { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app: Express = express();
app.use(cors({ origin: true, credentials: true }));
app.set("port", process.env.PORT || 8080);
app.use("/", express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use((req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV == "production") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});
app.get("/theme", (req, res) => {
  console.log(req.cookies.theme);
  let theme: string;
  if (req.cookies.theme) {
    theme = req.cookies.theme;
  } else {
    theme = "light";
  }
  res.cookie("theme", theme, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });
  res.send({ theme });
});

app.get("/change/theme", (req, res) => {
  let theme = "light";
  if (req.cookies.theme == "dark") {
    theme = "light";
  } else if (req.cookies.theme == "light") {
    theme = "dark";
  }
  res.cookie("theme", theme, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });
  res.send({ theme });
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
app.listen(app.get("port"), () => {
  console.log("서버 열음");
});
