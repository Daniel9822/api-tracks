const express = require("express");
const { registerController, loginController } = require("../controllers/auth");
const { userExist, userNotExist } = require("../middleware/userExist");
const { registerValidator, loginValidator } = require("../validators/auth");

const router = express.Router();

router.post("/register", registerValidator, userNotExist, registerController);
router.post("/login", loginValidator, userExist, loginController);

module.exports = router;
