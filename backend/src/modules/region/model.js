const db = require("../../config/db-config");

const findAll = () => {
  return db.query("SELECT * FROM region_cepages").then((data) => {
    return data;
  });
};

module.exports = {
  findAll,
};
