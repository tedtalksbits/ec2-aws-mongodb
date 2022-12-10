interface PwChecker {
    error: boolean;
    message: string;
}

export const pwCheck = (pw: string): PwChecker => {
    // check if pw is at least 8 characters long
    if (pw.length < 8) {
        return {
            error: true,
            message: 'Password must be at least 8 characters long',
        };
    }

    // check if pw contains at least one number
    if (!/\d/.test(pw)) {
        return {
            error: true,
            message: 'Password must contain at least one number',
        };
    }

    // check if pw contains at least one lowercase letter
    if (!/[a-z]/.test(pw)) {
        return {
            error: true,
            message: 'Password must contain at least one lowercase letter',
        };
    }

    // check if pw contains at least one uppercase letter

    if (!/[A-Z]/.test(pw)) {
        return {
            error: true,
            message: 'Password must contain at least one uppercase letter',
        };
    }

    // Check if password has at least one special character
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
