const supertest = require("supertest");
const app = require("../app");
const { storageModel } = require("../models");
const { userModel } = require("../models");
const { sing } = require("../utils/handleToken");
const { authRegisterSuccess } = require("./helper/helperData");
const PATH = `${__dirname}/upload/node.webp`;

let token = "";

beforeAll(async () => {
    await storageModel.deleteMany();
    await userModel.deleteMany();
    const user = await userModel.create(authRegisterSuccess);
    token = sing(user);
});

afterAll((done) => {
    done();
});

describe("[STORAGE] Routes storage", () => {
    test("It should create an item successfully when the parameters are passed correctly", async () => {
        const response = await supertest(app)
            .post("/api/storage")
            .set("Authorization", `Bearer ${token}`)
            .attach("myfile", PATH);

        const { body } = response;

        expect(response.statusCode).toEqual(201);
        expect(body).toHaveProperty("data");
        expect(body).toHaveProperty("data.url");
    });

    test("should get all created items", async () => {
        const response = await supertest(app).get("/api/storage").set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("data");
    });

    test("should return the detail of an item through the id", async () => {
        const { _id } = await storageModel.findOne();
        const id = _id.toString();

        const response = await supertest(app)
            .get(`/api/storage/${id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("data._id", id);
    });

    test("should return a 404 status code when the item is not found", async () => {
        const id = "641494d1dffb8b31b82fba2";
        const response = await supertest(app)
            .get(`/api/storage/${id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toEqual(404);
    });

    test("should delete an item by id", async () => {
        const { _id } = await storageModel.findOne();
        const id = _id.toString();

        const response = await supertest(app)
            .delete(`/api/storage/${id}`)
            .set("Authorization", `Bearer ${token}`)

        expect(response.statusCode).toEqual(200);    
    });
});
