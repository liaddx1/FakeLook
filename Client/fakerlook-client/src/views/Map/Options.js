import { Button } from "react-bootstrap";

const Options = props => {
    return (
        <div className="d-grid gap-2 mt-2">
            <Button variant="dark" size="lg" onClick={() => props.onChangePage(0)}>Show Map</Button>
            <Button variant="dark" size="lg" onClick={() => props.onChangePage(1)}>Post Feed</Button>
            <Button variant="dark" size="lg" onClick={() => props.onChangePage(2)}>Add Post</Button>
        </div>
    );
}

export default Options;