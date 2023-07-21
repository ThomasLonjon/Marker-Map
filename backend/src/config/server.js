const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const region_rooter = require("../modules/region");
const marker_rooter = require("../modules/marker");

app.use("/regions", region_rooter);
app.use("/markers", marker_rooter);

module.exports = app;
