export type RestResponse = {
    error: boolean;
    status: number;
    errorMsg?: string;
    token?: string;
    data?: any;
};
