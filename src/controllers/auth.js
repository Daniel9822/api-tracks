const { matchedData } = require("express-validator");
const user = require("../models/nosql/user");
const { handleHttpError } = require("../utils/handleError");
const { hash, compare } = require("../utils/handleBcrypt");
const { sing } = require("../utils/handleToken");

const registerController = async (req, res) => {
    try {
        const body = matchedData(req);
        const { password } = body;
        const passwordHash = await hash(password);
        const register = await user.create({ ...body, password: passwordHash });
        return res.status(201).send(register);
    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_REGISTER_CONTROLLER", 400);
    }
};

const loginController = async (req, res) => {
    try {
        const { password: passwordPlain, email } = matchedData(req);
        const { password: passwordHash, name, _id } = req.userInfo;
        const comparePassword = await compare(passwordPlain, passwordHash);
        if (!comparePassword) {
            return res.status(401).send("Invalid password or email");
        }
        const token = sing(req.userInfo);
        const data = { _id, name, email, token };
        return res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_LOGIN_USER", 500);
    }
};

module.exports = {
    registerController,
    loginController,
};
