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
let trackId = "";

beforeAll(async () => {
    await storageModel.deleteMany();
    await userModel.deleteMany();
    await tracksModel.deleteMany();
    const user = await userModel.create(authRegisterSuccess);
    const storage = await storageModel.create(testStorageRegister);
    mediaId = storage._id;
    const createTack = await tracksModel.create({ ...testDataTrack, mediaId });
    trackId = createTack._id;
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
            .send(createTrack);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("data.name", "Ejemplo");
        expect(response.body).toHaveProperty("data._id");
        expect(response.body).toHaveProperty("data.artist");
    });

    test("should send a 403 status code when the information needed to create a track is not given", async () => {
        const createTrack = { name: "test", cover: "test" };
        const response = await supertest(app)
            .post("/api/tracks")
            .set("Authorization", `Bearer ${token}`)
            .send(createTrack);

        expect(response.statusCode).toEqual(403);
    });

    test("should search and return all tracks", async () => {
        const response = await supertest(app)
            .get("/api/tracks")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("data");
    });

    test("should search one track by id", async () => {
        const response = await supertest(app)
            .get(`/api/tracks/${trackId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("data");
    });

    test("I should update an item correctly", async () => {
        const updateTrack = {
            ...testDataTrack,
            mediaId,
            name: "Test03",
            cover: "http://test.test",
        };
        const response = await supertest(app)
            .put(`/api/tracks/${trackId}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updateTrack);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("data.name", "Test03");
        expect(response.body).toHaveProperty("data.cover", "http://test.test");
    });

    test("I should correctly delete a track by means of the id", async () => {
        const response = await supertest(app)
            .delete(`/api/tracks/${trackId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("data.matchedCount", 1);
    });

    test("I should be able to restore the deleted track", async () => {
        const response = await supertest(app)
            .patch(`/api/tracks/restore/${trackId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("data.matchedCount", 1);
    });
});
