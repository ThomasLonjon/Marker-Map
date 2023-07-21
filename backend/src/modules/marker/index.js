const router = require("express").Router();
const fileUpload = require("../../middlewares/fileUpload");

const { getAll, postNewPlace } = require("./controller");

router.get("/", getAll);

router.post("/newplace", fileUpload.single("photo"), postNewPlace);

module.exports = router;
