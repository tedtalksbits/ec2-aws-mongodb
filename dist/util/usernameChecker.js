"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usernameChecker = void 0;
const usernameChecker = (username) => {
    const validUsernameRegex = /^[a-zA-Z0-9]+$/;
    console.log(username, validUsernameRegex.test(username));
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
exports.usernameChecker = usernameChecker;
//# sourceMappingURL=usernameChecker.js.map