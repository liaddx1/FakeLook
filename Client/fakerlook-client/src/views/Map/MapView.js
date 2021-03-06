import React, { useCallback, useRef, useState } from "react";
import { InfoWindow, useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import MapNavigator from "../../components/MapNavigator";
import { formatRelative } from "date-fns";
import Options from "./Options";
import "@reach/combobox/styles.css";
import PostFeed from "./PostFeedView";
import AddPost from "./AddPostView";
import { Button, Card } from "reactstrap";
import { useSelector } from "react-redux";
import './MapView.css';

const libraries = ["places"];
const mapContainerStyle = {
    height: `calc(100vh - 59px)`,
    width: "100%",
}
const center = {
    lat: 31.726870,
    lng: 34.992470,
}

export default function MapView() {
    const navigate = useNavigate();
    const postsData = useSelector(state => state.posts.filteredPosts);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    //states
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [lastLocationClicked, setLastLocationClicked] = useState(null);
    const [pages, setPages] = useState(0);
    const [myLocation, setMyLocation] = useState(null);
    const [toShowMyLocation, setToShowMyLocation] = useState(false);

    //refs
    const mapRef = useRef();

    //handlers

    const onMapClick = useCallback((event) => {
        setLastLocationClicked({ lat: event.latLng.lat(), lng: event.latLng.lng() });
        setMarkers([{
            lat: event.latLng.lat(),
            long: event.latLng.lng(),
            timePosted: new Date()
        }]);
    }, []);

    const loadPosts = useCallback(() => {
        return postsData.map(post =>
            <Marker
                key={post.postId}
                position={{ lat: post.lat, lng: post.long }}
                icon={{
                    url: post.picture,
                    scaledSize: new window.google.maps.Size(45, 45),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15)
                }}

                onClick={() => setSelected(post)}
            />)
    }, [postsData]);

    const loadMyLocation = useCallback(() => {
        if (myLocation)
            return (
                <Marker
                    key={localStorage.getItem('userId')}
                    position={{ lat: myLocation.lat, lng: myLocation.long }}
                    icon={{ url: "https://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png" }}
                    onClick={() => { setToShowMyLocation(!toShowMyLocation) }}
                />
            );
    }, [myLocation, toShowMyLocation])

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;

        navigator.geolocation.getCurrentPosition((position) => {
            setMyLocation({
                lat: position.coords.latitude,
                long: position.coords.longitude
            })
        }, () => null);
    }, []);

    const logOutHandler = () => {
        localStorage.clear();
        navigate('/login');
    }

    const changePageHandler = (pageNumber) => setPages(pageNumber);

    const updateLocationHandler = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(15);
    }, []);


    //renders
    const renderMap = () => {
        return (
            <div>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={9}
                    center={center}
                    scrollWheelZoom={true}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                >
                    {markers.map(marker =>
                        <Marker
                            key={Math.random().toString()}
                            position={{ lat: marker.lat, lng: marker.long }}
                            icon={{
                                url: marker.picture ? marker.picture : 'https://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png',
                            }}
                            onClick={() => { setSelected(marker); setLastLocationClicked(marker); }}
                        />)}

                    {loadPosts()}
                    {loadMyLocation()}

                    {selected &&
                        (<InfoWindow position={{ lat: selected.lat, lng: selected.long }} onCloseClick={() => { setSelected(null); }}>
                            {selected.picture ?
                                <Card className="border-0">
                                    <h3 className="text-center">Post Made By {`${selected.firstName} ${selected.lastName}`}</h3>
                                    <img className="m-1" height={"200px"} src={selected.picture} alt="preview" />
                                    <h4 className="text-center">Content: {selected.description}</h4>
                                    <p className="text-center">Post Time: {formatRelative(new Date(selected.timePosted), new Date())}</p>
                                </Card>
                                :
                                <Card className="border-0">
                                    <h3 className="text-center">Post Something Here?</h3>
                                    <p className="text-center">Post Time: {formatRelative(new Date(selected.timePosted), new Date())}</p>
                                    <Button className="text-center" onClick={() => { changePageHandler(2) }}>Post Here</Button>
                                </Card>}
                        </InfoWindow>)}

                    {toShowMyLocation && <InfoWindow position={{ lat: myLocation.lat, lng: myLocation.long }} onCloseClick={() => { setToShowMyLocation(!toShowMyLocation) }}><h6>My Location</h6></InfoWindow>}
                </GoogleMap>
            </div>);
    }

    if (loadError) return "Error Loading Maps";
    if (!isLoaded) return "Loading Maps";
    return (
        <div>
            <MapNavigator updateLocation={updateLocationHandler} onChangePage={changePageHandler} logOut={logOutHandler} />
            <div name="grid-container" className="grid-container">
                <div>
                    <Options myLocation={myLocation} onChangePage={changePageHandler} />
                </div>
                <div>
                    {pages === 0 && renderMap()}
                    {pages === 1 && <PostFeed />}
                    {pages === 2 && <AddPost location={lastLocationClicked} onChangePage={changePageHandler} />}
                </div>
            </div>
        </div>
    );
}

