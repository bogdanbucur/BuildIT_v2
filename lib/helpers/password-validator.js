function isProperPassword(input) {
    if (!input || typeof input !== 'string') {
        throw new Error('Only strings can be validated');
    }

    if (!/^[a-zA-Z0-9!@#$%^&*()_\-+=[\];:?,.]{8,}$/.test(input)) {
        return false;
    }

    if (!/[a-z]/.test(input)) {
        return false;
    }

    if (!/[A-Z]/.test(input)) {
        return false;
    }

    if (!/[0-9]/.test(input)) {
        return false;
    }

    if (!/[!@#$%^&*()_\-+=[\];:?,.]/.test(input)) {
        return false;
    }

    return true;
}

function isPasswordMatch(first, second) {
    return typeof first === 'string' && typeof second === 'string' && first === second;
}

module.exports = {
    isProperPassword,
    isPasswordMatch,
};