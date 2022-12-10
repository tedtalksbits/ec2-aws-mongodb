"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth/auth"));
const account_1 = __importDefault(require("./routes/account/account"));
const mongoose_1 = __importDefault(require("mongoose"));
const appConfig_1 = require("./config/appConfig");
const app = (0, express_1.default)();
dotenv_1.default.config();
const appConfig = (0, appConfig_1.getAppConfig)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
console.log(process.env.SECRET_KEY);
app.use('/api/v1', auth_1.default);
app.use('/api/v1', account_1.default);
app.use(express_1.default.static('public'));
console.log(appConfig.dbUri);
mongoose_1.default.connect(appConfig.dbUri || '', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Connected to MongoDB');
});
mongoose_1.default.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose_1.default.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map