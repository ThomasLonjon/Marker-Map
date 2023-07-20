const express = require("express");
const app = express();

const region_rooter = require("../modules/region");
const marker_rooter = require("../modules/marker");

app.use("/regions", region_rooter);
app.use("/markers", marker_rooter);

module.exports = app;
