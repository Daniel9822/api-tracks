const supertest = require("supertest");
const app = require("../app");
const { userNotExist } = require("../middleware/userExist");
const { userModel } = require("../models");
const {
    authRegister,
    authRegisterSuccess,
    loginUser,
    userNotExistLogin,
} = require("./helper/helperData");

beforeAll(async () => {
    await userModel.deleteMany();
});

afterAll((done) => {
    done();
});

describe("[AUTH] Routes auth", () => {
    test("should return a status code 403 when parameters are missing to register a user", async () => {
        const response = await supertest(app)
            .post("/api/auth/register")
            .send(authRegister);

        expect(response.statusCode).toEqual(403);
    });

    test("should return a status code 201 when the parameters are complete", async () => {
        const register = await supertest(app)
            .post("/api/auth/register")
            .send(authRegisterSuccess);

        expect(register.statusCode).toEqual(201);
        expect(register.body).toHaveProperty("name");
        expect(register.body).toHaveProperty("age");
        expect(register.body).toHaveProperty("createdAt");
    });

    test("If the user exists, it must be logged in correctly", async () => {
        const login = await supertest(app)
            .post("/api/auth/login")
            .send(loginUser);

        expect(login.statusCode).toEqual(200);
        expect(login.body).toHaveProperty("data");
        expect(login.body).toHaveProperty("data.token");
    });

    test("if it does not exist the user must send a status code 404", async () => {
        const notExist = await supertest(app)
            .post("/api/auth/login")
            .send(userNotExistLogin);

        expect(notExist.statusCode).toEqual(404);
    });

    test("should return 401 when password is invalid", async () => {
        const passwordInvalid = { ...loginUser, password: "dddd3" };

        const response = await supertest(app)
            .post("/api/auth/login")
            .send(passwordInvalid);

        expect(response.statusCode).toEqual(401)
    });

    // test('the user should have a valid token', async() => {
    //     const 
    // })
});
