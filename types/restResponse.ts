import { Request } from 'express';
export type RestResponse = {
    error: boolean;
    status: number;
    errorMsg?: string;
    token?: string;
    data?: {
        _id: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        middleName?: string;
        avatar: string;
    };
};
export interface ExtendedRequest extends Request {
    session?: any;
}
