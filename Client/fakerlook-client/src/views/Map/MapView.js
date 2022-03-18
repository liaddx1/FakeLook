import React, { useState } from "react";
import { InfoWindow, useLoadScript, GoogleMap, Marker, } from "@react-google-maps/api";
import './MapView.css';

const libraries = ["places"];
const mapContainerStyle = {
    width: `100vw`,
    height: `100vh`,
}
const center = {
    lat: 31.726870,
    lng: 34.992470,
}
const options = {

}

export default function MapView() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAj0XIcENjviv-vfhvA1slF3mpdrARUAic',
        libraries,
    })

    const [markers, setMarkers] = useState([]);

    if (loadError) return "Error Loading Maps";
    if (!isLoaded) return "Loadng Maps";
    return (
        <div>
            <h1>FakeLook</h1>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onClick={(event) => {
                    setMarkers(current => [...current, {
                        lat: 
                    }])
                }}
            ></GoogleMap>
        </div>
    );
}