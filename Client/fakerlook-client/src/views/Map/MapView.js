import React, { useEffect, useState } from "react";
import { InfoWindow, useLoadScript, GoogleMap, Marker, } from "@react-google-maps/api";
import './MapView.css';
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })
    const isAuthorazied = () => {
        if (!localStorage.getItem("authToken"))
            navigate('/login');
    }


    useEffect(() => {
        isAuthorazied();
    }, [])

    const [markers, setMarkers] = useState([]);

    if (loadError) return "Error Loading Maps";
    if (!isLoaded) return "Loadng Maps";
    return (
        <div>
            {isAuthorazied()}
            <h1>FakeLook</h1>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={11}
                center={center}
                options={options}
                onClick={(event) => {
                    console.log('click')
                    // setMarkers(current => [...current, {
                    //     lat: 
                    // }])
                }}
            ></GoogleMap>
        </div>
    );
}