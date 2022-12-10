"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../../controllers/auth.js");
const router = express_1.default.Router();
router.post('/auth/register', auth_js_1.register);
router.post('/auth/login', auth_js_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map