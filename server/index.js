"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.set("port", process.env.PORT || 8080);
app.use("/", express_1.default.static(path_1.default.join(__dirname, "build")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use((req, res, next) => {
    if (process.env.NODE_ENV == "production") {
        (0, morgan_1.default)("combined")(req, res, next);
    }
    else {
        (0, morgan_1.default)("dev")(req, res, next);
    }
});
app.get("/theme", (req, res) => {
    console.log(req.cookies.theme);
    let theme;
    if (req.cookies.theme) {
        theme = req.cookies.theme;
    }
    else {
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
    }
    else if (req.cookies.theme == "light") {
        theme = "dark";
    }
    res.cookie("theme", theme, {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });
    res.send({ theme });
});
app.use((0, express_session_1.default)({
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    secret: String(process.env.COOKIE_SECRET),
    name: "session",
}));
app.listen(app.get("port"), () => {
    console.log("서버 열음");
});
