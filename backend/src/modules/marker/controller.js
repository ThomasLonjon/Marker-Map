const { findAll } = require("./model");
const wkx = require("wkx");

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
            nom: marker.nom.trim(),
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

module.exports = {
  getAll,
};
