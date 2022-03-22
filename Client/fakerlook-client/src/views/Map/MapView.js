import React, { useEffect, useState } from "react";
import { InfoWindow, useLoadScript, GoogleMap, Marker, } from "@react-google-maps/api";
import './MapView.css';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import MapNavigator from "../../components/MapNavigator";

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
    const navigate = useNavigate();
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    //states
    const [markers, setMarkers] = useState([]);

    //handlers
    const isAuthorazied = () => {
        const token = localStorage.getItem("authToken");
        const facebookExp = localStorage.getItem('facebookExp')
        if (!token && !facebookExp) {
            navigate('/login');
            return;
        }

        let currentDate = new Date();
        if (token) {
            let decodedToken = jwtDecode(token);
            if (decodedToken) {
                // console.log(decodedToken.exp * 1000, "<", currentDate.getTime());
                if (decodedToken.exp * 1000 < currentDate.getTime()) {
                    localStorage.clear();
                    navigate('/login');
                }
            }
        }

        if (facebookExp) {
            if (facebookExp * 1000 < currentDate.getTime()) {
                localStorage.clear();
                navigate('/login');
            }
        }
    }

    const logOutHandler = () => {
        localStorage.clear();
        isAuthorazied();
    }

    //side effects
    useEffect(() => {
        isAuthorazied();
    }, [])


    if (loadError) return "Error Loading Maps";
    if (!isLoaded) return "Loadng Maps";
    return (
        <>
            <MapNavigator logOut={logOutHandler}/>
            <div className="mt-5">
                {isAuthorazied()}
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={10}
                    center={center}
                    scrollWheelZoom={true}
                    onClick={(event) => {
                        setMarkers(current => [...current, {
                            lat: event.latLng.lat(),
                            lng: event.latLng.lng(),
                            time: new Date()
                        }])
                    }}
                >

                    {markers.map(marker => <Marker key={Math.random().toString()} position={{ lat: marker.lat, lng: marker.lng }}></Marker>)}

                </GoogleMap>

            </div>
        </>
    );
}