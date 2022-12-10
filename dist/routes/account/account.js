"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_js_1 = require("../../controllers/account.js");
const verifyToken_js_1 = require("../../controllers/verifyToken.js");
const router = express_1.default.Router();
router.get('/account', verifyToken_js_1.verifyToken, account_js_1.account);
exports.default = router;
//# sourceMappingURL=account.js.map