const { findAll } = require("./model");

const getAll = ({ req, res }) => {
  findAll()
    .then((regions) => {
      res.status(200).json(regions);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  getAll,
};
