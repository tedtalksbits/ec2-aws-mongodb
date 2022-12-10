"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsLogger = void 0;
const fs_1 = __importDefault(require("fs"));
const reqInfo = {
    deviceInfo: '',
    ip: '',
    port: 0,
    host: '',
    method: '',
    url: '',
    date: new Date(),
    time: '',
    status: 0,
};
const fsLogger = (req, res) => {
    reqInfo.deviceInfo = req.headers['user-agent'] || '';
    reqInfo.ip =
        req.header('x-forwarded-for') || req.socket.remoteAddress || '';
    reqInfo.port = req.socket.remotePort;
    reqInfo.host = req.headers.host;
    reqInfo.method = req.method;
    reqInfo.url = req.url;
    reqInfo.date = new Date();
    reqInfo.time = reqInfo.date.toLocaleTimeString();
    reqInfo.status = res.statusCode;
    const logFormat = `${reqInfo.date} ${reqInfo.time} ${reqInfo.deviceInfo} ${reqInfo.ip} ${reqInfo.port} ${reqInfo.host} ${reqInfo.method} ${reqInfo.url} ${reqInfo.status}`;
    fs_1.default.appendFile('log.txt', `\n${logFormat}`, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('api log file updated successfully');
    });
};
exports.fsLogger = fsLogger;
//# sourceMappingURL=index.js.map