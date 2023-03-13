const user = require("../models/nosql/user");
const { verify } = require("../utils/handleToken");

const checkSession = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        if (!authorization) {
            return res.status(401).send("Unauthorized user");
        }
        const token = authorization.split(" ").pop();
        const verifyToken = verify(token);

        if (!verifyToken) {
            return res.status(401).send("Unauthorized user");
        }

        const findUser = await user.findById(verifyToken._id)
        req.user = findUser
        next();
    } catch (error) {
        res.status(401).send(error.message)
    }
};

module.exports = { checkSession };
