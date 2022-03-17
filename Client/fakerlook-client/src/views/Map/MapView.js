import React from "react";
import { GoogleMap } from "react-google-maps";
const MapView = props => {
    return (
        <GoogleMap defaultZoom={10} defaultCenter={{ lat: 31.726870, lng: 34.992470 }} />
    );
}

export default MapView;