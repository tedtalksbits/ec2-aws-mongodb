interface UsernameChecker {
    error: boolean;
    message: string;
}

export const usernameChecker = (username: string): UsernameChecker => {
    // valid username regex
    const validUsernameRegex = /^[a-zA-Z0-9]+$/;
    console.log(username, validUsernameRegex.test(username));

    // check if username is valid
    if (!validUsernameRegex.test(username)) {
        return {
            error: true,
            message: 'Username must be between 3 and 20 characters long',
        };
    }
    return {
        error: false,
        message: 'Username is valid',
    };
};
