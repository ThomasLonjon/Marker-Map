require("dotenv").config();
const app = require("./config/server");
const db = require("./config/db-config.js");

db.query("SELECT 1")
  .then(() => {
    console.log("database connected");
    app.listen(process.env.APP_PORT, (err) => {
      err ? console.error(err) : console.log(" 🚀 application started on port :" + process.env.APP_PORT);
    });
  })
  .catch((err) => console.error(err));
