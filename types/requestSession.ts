type RequestSession = {
    user: {
        data: {
            _id: string;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
            middleName: string;
            avatar: string;
        };
    };
    token: string;
    state: {
        setShowAlert?: boolean;
        alertMsg?: string;
        isAlertError?: boolean;
    };
};

declare namespace Express {
    export interface Request {
        session?: RequestSession | null;
    }
}
