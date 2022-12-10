import fs from 'fs';
import { Request, Response } from 'express';
const reqInfo = {
    deviceInfo: '',
    ip: '',
    port: 0 as number | undefined,
    host: '' as string | undefined,
    method: '',
    url: '',
    date: new Date(),
    time: '',
    status: 0 as number | undefined,
};

export const fsLogger = (req: Request, res: Response) => {
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

    fs.appendFile('log.txt', `\n${logFormat}`, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('api log file updated successfully');
    });
};
