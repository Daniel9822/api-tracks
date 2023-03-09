const express = require("express");
const fs = require("fs");

const router = express.Router();

const PATH = __dirname;

const removeExtension = (filename) => {
    return filename.split(".").shift();
};
fs.readdirSync(PATH).filter((filename) => {
    const name = removeExtension(filename);

    if (name !== "index") {
        router.use(`/${name}`, require(`./${filename}`));
    }
});

module.exports = router;

