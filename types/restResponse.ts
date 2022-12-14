import { Request } from 'express';
export type RestResponse = {
    error: boolean;
    status: number;
    errorMsg?: string;
    token?: string;
    data?: any;
};
export interface ExtendedRequest extends Request {
    session?: any;
}
