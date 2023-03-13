const { userModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { verify } = require("../utils/handleToken");

const checkSession = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        if (!authorization) {
            handleHttpError(res, "Unauthorized user", 401);
        }
        const token = authorization.split(" ").pop();
        const verifyToken = verify(token);

        if (!verifyToken) {
            handleHttpError(res, "Unauthorized user", 401);
        }

        const findUser = await userModel.findById(verifyToken._id);
        req.user = findUser;
        next();
    } catch (error) {
        handleHttpError(res, error.message, 401);
    }
};

module.exports = { checkSession };
