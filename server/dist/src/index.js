'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const express_session_1 = __importDefault(require('express-session'));
const path_1 = __importDefault(require('path'));
const dotenv_1 = __importDefault(require('dotenv'));
const morgan_1 = __importDefault(require('morgan'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const cors_1 = __importDefault(require('cors'));
const index_1 = __importDefault(require('../models/index'));
const index_2 = __importDefault(require('../routes/index'));
const web3_1 = __importDefault(require('web3'));
dotenv_1.default.config();
// 일단 테스트 넷 가나슈에서 진행
// const web3 = new Web3("http://ganache.test.errorcode.help:8545");
const web3 = new web3_1.default(`wss://goerli.infura.io/ws/v3/${process.env.GOERLI_API_KEY}`);
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 8080);
app.use((req, res, next) => {
    if (process.env.NODE_ENV == 'production') {
        (0, morgan_1.default)('combined')(req, res, next);
    } else {
        (0, morgan_1.default)('dev')(req, res, next);
    }
});
// app.use(cors({ origin: "http://localhost:3000" }));
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', express_1.default.static(path_1.default.join(__dirname, 'build')));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use(
    (0, express_session_1.default)({
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
        },
        secret: String(process.env.COOKIE_SECRET),
        name: 'session',
    })
);
app.use('/api', index_2.default);
app.use('/uploads', express_1.default.static('uploads'));
index_1.default.sequelize.sync({ force: false }).then(() => {
    console.log('db connected');
});
app.listen(app.get('port'), () => {
    console.log(`${app.get('port')} Server Open`);
});
