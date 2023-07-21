import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Map from "./components/Map/Map";
import "./App.scss";

function App() {
  const [markers, setMarkers] = useState({});
  const [newMarker, setNewMarker] = useState({});
  const [isActivated, setIsActivated] = useState(false);
  const [placeName, setPlaceName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMarkerWithName = {
      ...newMarker,
      properties: { ...newMarker.properties, name: placeName },
    };

    setNewMarker(newMarkerWithName);
  };

  const handleChange = (event) => {
    setPlaceName(event.target.value);
  };

  const handleImageChange = (event) => {
    // const selectedImage = event.target.files[0];
    // setNewMarker({ ...newMarker, photo: selectedImage });
  };

  useEffect(() => {
    axios.get(`http://localhost:8090/markers/`).then((result) => setMarkers(result.data));
  }, []);

  useEffect(() => {
    console.log("markers", markers);
  }, [markers]);

  useEffect(() => {
    console.log("newMarker", newMarker);
  }, [newMarker]);

  // Activate the addition of new marker when click on map
  const handleActivateNewMarker = () => {
    setIsActivated(true);
  };

  // Add the name to the marker and post it on DB
  const handlePostMarker = async () => {
    try {
      const response = await axios.post("http://localhost:8090/markers/newplace", newMarker);
      console.log("Nouveau marqueur ajouté à la base de données :", response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout du nouveau marqueur :", error);
    }
  };

  return (
    <div className="page-container">
      <Map markers={markers} isActivated={isActivated} setNewMarker={setNewMarker} />
      <div className="place-section-container">
        <button onClick={handleActivateNewMarker}> Ajouter un nouveau lieu </button>
        <form className="QuoteForm" onSubmit={handleSubmit}>
          <label htmlFor="character">Nom du lieu</label>
          <input id="name" name="character" type="text" value={placeName} onChange={handleChange} />
          <button type="submit">Valider le nom du lieu</button>
        </form>
        <input type="file" name="monfichier" onChange={handleImageChange} />
        <button onClick={handlePostMarker}> Poster le lieu </button>
      </div>
    </div>
  );
}

export default App;
