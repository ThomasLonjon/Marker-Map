const db = require("../../config/db-config");

const findAll = () => {
  return db.query("SELECT * FROM picture_markers").then((data) => {
    return data;
  });
};

module.exports = {
  findAll,
};
