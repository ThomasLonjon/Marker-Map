import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.scss";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function Map({ markers, isActivated, setNewMarker, newMarkerPosted }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popupRef = useRef(
    new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    })
  );
  const [isMounted, setIsMounted] = useState(false);

  // ---------------------------------------- Add map----------------------------------------
  useEffect(() => {
    if (map.current) {
      map.current.remove();
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/thomaslonjon/clju773kn000l01pjdhq65qhy",
      center: [2.9, 46.5],
      zoom: 5.1,
      antialias: true,
    });

    map.current.on("load", () => {
      //  --------------create empty source markers --------------
      map.current.addSource("locations", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
      map.current.addLayer({
        id: "locations",
        type: "circle",
        source: "locations",
        paint: {
          "circle-radius": 6,
          "circle-color": "#404040",
          "circle-opacity": 1,
        },
      });
      setIsMounted(true);
    });

    // ---------------------------------------- popups----------------------------------------

    map.current.on("mouseenter", "locations", (e) => {
      map.current.getCanvas().style.cursor = "pointer";
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.name;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      const popupContent = document.createElement("div");
      popupContent.innerHTML = description;

      // Populate the popup and set its coordinates
      // based on the feature found.
      popupRef.current.setLngLat(coordinates).setDOMContent(popupContent).addTo(map.current);
    });

    map.current.on("mouseleave", "locations", () => {
      map.current.getCanvas().style.cursor = "default";
      popupRef.current.remove();
    });

    map.current.on("click", "locations", (e) => {
      const id = e.features[0].properties.location_id;
      const name = e.features[0].properties.name;
      const image = e.features[0].properties.image;
      setClickedLocation({ id: parseInt(id), name: name, image: image });
    });
  }, []);

  // -------------------------------- Get locations markers----------------------------------------

  const getData = () => {
    map.current.getSource("locations").setData(markers);
  };

  useEffect(() => {
    if (isMounted) {
      getData();
    }
  }, [isMounted, newMarkerPosted]);

  useEffect(() => {
    map.current.on("click", handleAddMarker);
  }, [isActivated]);

  // -------------------------------- Add locations markers----------------------------------------

  // Add a new marker
  const handleAddMarker = (event) => {
    if (isActivated) {
      console.log("hello");
      const { lng, lat } = event.lngLat;
      const marker = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
      };
      setNewMarker(marker);
    }
  };

  // ---------------------------------------- RETURN----------------------------------------
  return (
    <div className="map-container">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
export default Map;
Map.propTypes = {};
