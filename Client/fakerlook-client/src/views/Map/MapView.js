import React from "react";
import { InfoWindow, useLoadScript, GoogleMap, Marker, } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
    width: `100vw`,
    height: `100vh`,
}
const center = {
    lat: 31.726870,
    lng: 34.992470,
}

export default function MapView() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAj0XIcENjviv-vfhvA1slF3mpdrARUAic',
        libraries,
    })

    if (loadError) return "Error Loading Maps";
    if (!isLoaded) return "Loadng Maps";
    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={center}
        ></GoogleMap>
    );
}