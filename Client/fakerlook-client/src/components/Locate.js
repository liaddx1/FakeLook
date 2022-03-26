import "./Locate.css";

const Locate = (props) => {
    return (
        <button className="locate" onClick={(e) => {
            e.preventDefault();
            navigator.geolocation.getCurrentPosition((position) => {
                props.updateLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }, () => null);
        }}>
            <img src="compass.png" alt="Compass - Locate Me" />
        </button>
    );
}

export default Locate;