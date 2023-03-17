const supertest = require("supertest");
const app = require("../app");
const { storageModel, userModel, tracksModel } = require("../models");
const { sing } = require("../utils/handleToken");
const {
    authRegisterSuccess,
    testStorageRegister,
    testDataTrack,
} = require("./helper/helperData");

let mediaId = "";
let token = "";

beforeAll(async () => {
    await storageModel.deleteMany();
    await userModel.deleteMany();
    const user = await userModel.create(authRegisterSuccess);
    const storage = await storageModel.create(testStorageRegister);

    mediaId = storage._id;
    token = sing(user);
});

afterAll((done) => {
    done();
});

describe("[TRACKS] routes tracks", () => {
    test("should create a track correctly", async () => {
        const createTrack = { ...testDataTrack, mediaId };

        const response = await supertest(app)
            .post("/api/tracks")
            .set("Authorization", `Bearer ${token}`)
            .send(createTrack)

        expect(response.statusCode).toEqual(201)
        expect(response.body).toHaveProperty('data')
        expect(response.body).toHaveProperty('data.name', 'Ejemplo')
        expect(response.body).toHaveProperty('data._id')
        expect(response.body).toHaveProperty('data.artist')
    });

    test("should search and return all tracks", async () => {
        const response = await supertest(app).get("/api/tracks");

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("data");
    });

    test("should search one track by id", async () => {
        const { _id } = await tracksModel.findOne();
        const id = _id.toString();

        const response = await supertest(app).get(`/api/tracks/${id}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("data");
    });
});
