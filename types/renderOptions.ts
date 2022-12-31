export type RenderOptions = {
    title: string;
    data?: {
        _id: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        middleName?: string;
        avatar: string;
    };
    bills?: [];
    layout?: string;
    showAlert?: boolean;
    alertMsg?: string;
    isAlertError?: boolean;
};
