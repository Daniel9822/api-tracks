require("dotenv").config();
const express = require("express");
const morgan = require("morgan-body");
const { loggerStream } = require("./utils/handleLogs");
const path = require("path");
const cors = require("cors");
const mongoConnect = require("./config/mongo");

const app = express();

app.use(express.static(path.join(__dirname, "storage")));
app.use(express.json());
app.use(cors());

morgan(app, {
    noColors: true,
    stream: loggerStream,
    skip: (req, res) => {
        return res.statusCode < 400;
    },
    filterParameters: ["password"],
});
app.use("/api", require("./routes"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

mongoConnect();
