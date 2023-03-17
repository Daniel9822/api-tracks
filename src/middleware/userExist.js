const user = require("../models/nosql/user");

const userNotExist = async (req, res, next) => {
    try {
        const { email } = req.body;
        const searchUser = await user.findOne({ email });
        if (!searchUser) {
            next();
            return;
        }
        res.status(400).send("Email already exist");
    } catch (error) {
        res.status(500).send("oppps something went wrong");
    }
};

const userExist = async (req, res, next) => {
    try {
        const { email } = req.body;
        const searchUser = await user.findOne({ email });
        if (!searchUser) {
            res.status(404).send("user not exist");
            return;
        }
        req.userInfo = searchUser;
        next();
    } catch (error) {
        res.status(500).send("oppps something went wrong");
    }
};

module.exports = { userNotExist, userExist };
