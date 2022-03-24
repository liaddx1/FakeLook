import React, { useCallback, useEffect, useRef, useState } from "react";
import { InfoWindow, useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import MapNavigator from "../../components/MapNavigator";
import { formatRelative } from "date-fns";
import Options from "./Options";
import "@reach/combobox/styles.css";
import './MapView.css';

const libraries = ["places"];
const mapContainerStyle = {
    width: `70vw`,
    height: `94vh`,
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
    const [selected, setSelected] = useState(null);
    const [pages, setPages] = useState(0);

    //refs
    const mapRef = useRef();

    //handlers
    const isAuthorazied = useCallback(() => {
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
    }, [navigate]);

    const onMapClick = useCallback((event) => {
        setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date()
        }]);
    }, []);

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const logOutHandler = () => {
        localStorage.clear();
        isAuthorazied();
    }

    const changePageHandler = (pageNumber) => setPages(pageNumber);

    const updateLocationHandler = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(12);
    }, []);

    //side effects
    useEffect(() => {
        isAuthorazied();
    }, [isAuthorazied])

    //renders
    const renderMap = () => {
        return (<div className="mt-5">

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={9}
                center={center}
                scrollWheelZoom={true}
                onClick={onMapClick}
                onLoad={onMapLoad}
                className="fixed-left"
            >
                {markers.map(marker =>
                    <Marker
                        key={Math.random().toString()}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />)}

                {selected ?
                    (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => { setSelected(null); }}>
                        <div>
                            <h2>Post Something Here?</h2>
                            <p>Post Time: {formatRelative(selected.time, new Date())}</p>
                        </div>
                    </InfoWindow>) : null}
            </GoogleMap>

        </div>);
    }

    if (loadError) return "Error Loading Maps";
    if (!isLoaded) return "Loading Maps";
    return (
        <div className="grid-container">
            <MapNavigator updateLocation={updateLocationHandler} onChangePage={changePageHandler} logOut={logOutHandler} />
            <div className="grid-item">
                <Options />
            </div>
            <div className="grid-item">
                {pages === 0 && renderMap()}
            </div>
        </div>
    );
}

