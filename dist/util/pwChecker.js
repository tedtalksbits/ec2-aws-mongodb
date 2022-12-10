"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pwCheck = void 0;
const pwCheck = (pw) => {
    if (pw.length < 8) {
        return {
            error: true,
            message: 'Password must be at least 8 characters long',
        };
    }
    if (!/\d/.test(pw)) {
        return {
            error: true,
            message: 'Password must contain at least one number',
        };
    }
    if (!/[a-z]/.test(pw)) {
        return {
            error: true,
            message: 'Password must contain at least one lowercase letter',
        };
    }
    if (!/[A-Z]/.test(pw)) {
        return {
            error: true,
            message: 'Password must contain at least one uppercase letter',
        };
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)) {
        return {
            error: true,
            message: 'Password must have at least one special character',
        };
    }
    return {
        error: false,
        message: 'Password is valid',
    };
};
exports.pwCheck = pwCheck;
//# sourceMappingURL=pwChecker.js.map