export const getAppConfig = () => {
    const localDbUri = process.env.MONGO_URI_LOCAL;
    const prodDbUri = process.env.MONGO_URI;
    const appConfig = {
        development: {
            apiBaseUrl: 'http://localhost:3000',
            dbUri: localDbUri,
        },
        production: {
            apiBaseUrl: 'https://api.example.com',
            dbUri: prodDbUri,
        },
    };

    return process.env.NODE_ENV === 'production'
        ? appConfig.production
        : appConfig.development;
};
