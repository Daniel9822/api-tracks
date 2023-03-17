const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const mongoConnect = () => {
    mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
};

module.exports = mongoConnect;
