const express = require("express");
const { registerController, loginController } = require("../controllers/auth");
const { userExist, userNotExist } = require("../middleware/userExist");
const { registerValidator, loginValidator } = require("../validators/auth");

const router = express.Router();


/**
 * http://localhost:3001/api
 * 
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Register a new user"
 *          description: "register"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: the user registers successfully
 *                  '403':
 *                      description: validation error
 */
router.post("/register", registerValidator, userNotExist, registerController);

/**
 * Login user
 * @openapi
 * /auth/login:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Login user"
 *          description: "login with an existing user"
 *          responses:
 *              '200':
 *                  description: returns the object inserted in the collection
 *              '422':
 *                  description: validation error
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authLogin"
 *      responses:
 *          '201':
 *              description: returns the object inserted in the collection
 *          '404':
 *              description: user not found
 *          '401':
 *              description: Invalid user or password
 */
router.post("/login", loginValidator, userExist, loginController);

module.exports = router;
