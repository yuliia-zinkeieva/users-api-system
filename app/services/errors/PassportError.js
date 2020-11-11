module.exports = class PassportError extends Error{
    constructor(message, notification) {
        super(message);
        this.status = 422;
        this.errorMessage = notification;
    }
}