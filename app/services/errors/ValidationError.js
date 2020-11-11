module.exports = class ValidationError extends Error{
    constructor(message, data) {
        super(message);
        this.field = data.field;
        this.status = 422;
        this.errorMessage = `Validation: Incorrect ${data.field}`
    }
}