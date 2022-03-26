import { Button } from "react-bootstrap";

const Options = props => {
    return (
        <div className="d-grid gap-2 mt-2">
            <Button variant="dark" size="lg">Show Map</Button>
            <Button variant="dark" size="lg">Post Feed</Button>
            <Button variant="dark" size="lg">Add Post</Button>
        </div>
    );
}

export default Options;