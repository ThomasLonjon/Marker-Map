import { useState, useEffect } from "react";
import axios from "axios";
import Map from "./components/Map/Map";
import QuoteForm from "./components/QuoteForm/QuoteForm";
import "./App.scss";

function App() {
  const [markers, setMarkers] = useState({});
  const [newMarker, setNewMarker] = useState({});
  const [isActivated, setIsActivated] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [newMarkerPosted, setNewMarkerPosted] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8090/markers/`).then((result) => setMarkers(result.data));
  }, [newMarkerPosted]);

  useEffect(() => {
    console.log("markers", markers);
  }, [markers]);

  useEffect(() => {
    console.log("newMarker", newMarker);
  }, [newMarker]);

  useEffect(() => {
    console.log("isActivated", isActivated);
  }, [isActivated]);

  // Activate the addition of new marker when click on map
  const handleActivateNewMarker = () => {
    setIsActivated(true);
  };

  // Add the name to the marker and post it on DB
  const handlePostMarker = async () => {
    try {
      const newMarkerWithName = {
        ...newMarker,
        properties: { ...newMarker.properties, name: placeName, photo_url: "test" },
      };

      const response = await axios.post("http://localhost:8090/markers/newplace", newMarkerWithName);
      console.log("Nouveau marqueur ajouté à la base de données :", response.data);

      setNewMarkerPosted(newMarkerWithName);
    } catch (error) {
      console.error("Erreur lors de l'ajout du nouveau marqueur :", error);
    }
  };

  useEffect(() => {
    console.log(newMarkerPosted);
  }, [newMarkerPosted]);

  return (
    <div className="page-container">
      <Map markers={markers} isActivated={isActivated} setNewMarker={setNewMarker} newMarkerPosted={newMarkerPosted} />
      <div className="place-section-container">
        <button onClick={handleActivateNewMarker}> Ajouter un nouveau lieu </button>
        <button onClick={handlePostMarker}> Poster le lieu </button>
      </div>
      <div>
        <QuoteForm placeName={placeName} setPlaceName={setPlaceName} />
      </div>
    </div>
  );
}

export default App;
