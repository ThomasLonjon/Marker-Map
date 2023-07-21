const router = require("express").Router();

const { getAll, postNewPlace } = require("./controller");

router.get("/", getAll);

router.post("/newplace", postNewPlace);


module.exports = router;
