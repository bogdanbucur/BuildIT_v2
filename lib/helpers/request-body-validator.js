function setRequestErrorIfValidationFails(req, fn, fieldName, message = null, isOptional = false) {
    if (typeof fn !== 'function') {
        throw new Error('The "fn" argument must be a function');
    }

    if (typeof req.isValid !== 'boolean') {
        req.isValid = true;
    }

    if (!Array.isArray(req.validationErrors)) {
        req.validationErrors = [];
    }

    if (!req.body || typeof req.body[fieldName] !== 'string') {
        if (isOptional) {
            return true;
        }

        // Maybe we should throw here
        return false;
    }

    if (!fn(req.body[fieldName])) {
        if (req.session.flash) {
            req.session.flash.messages.push({
                type: 'error',
                field: fieldName,
                message: message || `Validation failed for field ${fieldName}`,
            });
        }
        req.validationErrors.push(message || `Validation failed for field ${fieldName}`);
        req.isValid = false;

        return false;
    }

    return true;
}

module.exports = {
    setRequestErrorIfValidationFails,
};