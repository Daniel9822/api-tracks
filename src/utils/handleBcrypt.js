const bcrypt = require("bcrypt");

const hash = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw new Error("opps something went wrong");
    }
};

const compare = async (passwordPlain, passwordHash) => {
    try {
        return await bcrypt.compare(passwordPlain, passwordHash);
    } catch (error) {
        throw new Error("opps something went wrong");
    }
};

module.exports = { hash, compare };
