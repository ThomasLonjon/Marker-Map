const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Instanciate your app (http server)
const app = express();

// apply global middlewares (!important: before any routes !)
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "../../public/upload")));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const region_rooter = require("../modules/region");
const marker_rooter = require("../modules/marker");

app.use("/regions", region_rooter);
app.use("/markers", marker_rooter);

module.exports = app;
