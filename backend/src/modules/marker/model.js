const db = require("../../config/db-config");

const findAll = () => {
  return db.query("SELECT * FROM picture_markers").then((data) => {
    return data;
  });
};

const addOne = (newMarker) => {
  const { geometry, photo_url, name } = newMarker;
  console.log("geometry", geometry);
  console.log("name", name);
  console.log("photo", photo_url);
  return db
    .query(`INSERT INTO public.picture_markers(geom, photo_url, name ) VALUES ($1, $2, $3) RETURNING id;`, [
      geometry,
      photo_url,
      name,
    ])
    .then((data) => {
      return data;
    });
};

module.exports = {
  findAll,
  addOne,
};
