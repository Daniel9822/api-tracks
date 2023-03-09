require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoConnect = require("./config/mongo");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", require("./routes"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

mongoConnect();
