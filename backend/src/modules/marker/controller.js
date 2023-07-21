const { findAll, addOne } = require("./model");
const wkx = require("wkx");

// --------------------------------------------------------------------------
const getAll = (req, res) => {
  findAll()
    .then((markers) => {
      // Convertir les valeurs WKB en GeoJSON
      const geoJSONMarkers = markers.map((marker) => {
        const wkbBuffer = Buffer.from(marker.geom, "hex");
        const geometry = wkx.Geometry.parse(wkbBuffer);
        return {
          type: "Feature",
          properties: {
            id: marker.id,
            name: marker.name.trim(),
            photo_url: marker.photo_url.trim(),
          },
          geometry: geometry.toGeoJSON(),
        };
      });

      // Créer l'objet GeoJSON contenant les features
      const geoJSONResult = {
        type: "FeatureCollection",
        features: geoJSONMarkers,
      };

      res.status(200).json(geoJSONResult);
    })
    .catch((err) => console.error(err));
};

// --------------------------------------------------------------------------
const postNewPlace = (req, res) => {
  const markerData = JSON.parse(req.body.markerData);
  const { properties, geometry } = markerData;
  console.log("markerData", markerData);
  console.log("geometry", geometry);
  console.log("properties", properties);
  const geom = wkx.Geometry.parseGeoJSON(geometry).toWkb();
  const { name } = properties;

  if (!req.file) {
    return res.status(400).json({ error: "Veuillez télécharger une image." });
  }
  const { filename } = req.file;
  console.log("filename", filename);
  const photo_url = `../../../public/upload/${filename}`;

  const markerToInsert = {
    geometry: geom.toString("hex"),
    photo_url: photo_url,
    name: name,
  };

  addOne(markerToInsert)
    .then((insertedMarker) => {
      res.status(200).json(insertedMarker);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de l'insertion du marqueur." });
    });
};

// --------------------------------------------------------------------------
module.exports = {
  getAll,
  postNewPlace,
};
