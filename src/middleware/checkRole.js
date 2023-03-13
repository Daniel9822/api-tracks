const { handleHttpError } = require("../utils/handleError");

const checkRole = (roleRequired) => (req, res, next) => {
    const { user } = req;
    const { role } = user;

    const verifyRole = roleRequired.some((rol) => rol.includes(role));

    if (verifyRole) {
        next();
        return;
    }
    handleHttpError(res, "Permission denied");
};

module.exports = { checkRole };
