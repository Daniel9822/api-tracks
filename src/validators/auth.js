const { check } = require("express-validator");
const validateResult = require("../utils/handlerValidate");

const registerValidator = [
    check("name", "name property is required").exists().notEmpty(),
    check("age", "age property is required")
        .exists()
        .notEmpty()
        .isInt()
        .isNumeric(),
    check("email", "email property is required and have email format")
        .exists()
        .notEmpty()
        .isEmail(),
    check("password", "password property is required").exists().notEmpty(),
    (req, res, next) => validateResult(req, res, next),
];

const loginValidator = [
    check("email", "email property is required").exists().notEmpty().isEmail(),
    check("password", "password property is required").exists().notEmpty(),
    (req, res, next) => validateResult(req, res, next),
];

module.exports = { registerValidator, loginValidator };
