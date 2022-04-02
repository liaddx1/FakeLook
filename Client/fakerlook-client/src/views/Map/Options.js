import { useCallback } from "react";
import { Button, FormGroup, InputGroup, InputGroupText, Input, Form } from "reactstrap";
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { applyFilter } from "../../Store/actions/post";

const Options = props => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    fontawesome.library.add(faCalendar, faCircleDot);

    const degreeIntoRadius = (degree) => degree * (Math.PI / 180);

    const isInRadius = useCallback((location, myLocation, radius) => {
        const radiusOfEarth = 6371;
        const degreeLat = degreeIntoRadius(location.lat - myLocation.lat);
        const degreeLong = degreeIntoRadius(location.long - myLocation.long);

        const first = Math.sin(degreeLat / 2) * Math.sin(degreeLat / 2) +
            Math.cos(degreeIntoRadius(location.lat)) * Math.cos(degreeIntoRadius(myLocation.lat)) *
            Math.sin(degreeLong / 2) * Math.sin(degreeLong / 2);

        const second = 2 * Math.atan2(Math.sqrt(first), Math.sqrt(1 - first));
        const circleRadius = Math.abs(radiusOfEarth * second);
        return radius ? circleRadius < radius : true;
    }, [])

    const filterApplyHandler = useCallback((e) => {
        e.preventDefault();

        const { from, until, radius } = e.target.elements;
        const tempPosts = [...posts];
        console.log(tempPosts);

        let fromDate = new Date(from.value.toString());
        let untilDate = new Date(until.value.toString());
        let radiusValue = radius.value;

        if (!fromDate || fromDate.toString() === 'Invalid Date') {
            let tempDate = new Date();
            tempDate.setMonth(tempDate.getMonth() - 1);
            fromDate = tempDate;
        }
        if (!untilDate || untilDate.toString() === 'Invalid Date') untilDate = new Date();
        if (!radiusValue) radiusValue = 6371;

        const newList = tempPosts.filter(post => (new Date(post.timePosted) > fromDate && new Date(post.timePosted) < untilDate && isInRadius({ lat: post.lat, long: post.long }, props.myLocation, radiusValue)));

        dispatch(applyFilter(newList));
    }, [dispatch, posts, isInRadius, props.myLocation])

    return (
        <div className="d-grid gap-2 mt-2">
            <h5 className="text-center">Date Range</h5>
            <div className="col text-center">
                <Form onSubmit={filterApplyHandler}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText className='col-3'>
                                <FontAwesomeIcon icon={faCalendar} />
                                &nbsp;From
                            </InputGroupText>
                            <Input id="from" type="date" placeholder="From" className="form-control text-center" />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <InputGroup>
                            <InputGroupText className='col-3'>
                                <FontAwesomeIcon icon={faCalendar} />
                                &nbsp;Until
                            </InputGroupText>
                            <Input id="until" type="date" placeholder="Until" className="form-control text-center" />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <InputGroup>
                            <InputGroupText className='col-3'>
                                <FontAwesomeIcon icon={faCircleDot} />
                                &nbsp;Radius
                            </InputGroupText>
                            <Input id="radius" type="number" min="0" max={6371} placeholder="Radius" className="form-control text-center" />
                        </InputGroup>
                    </FormGroup>
                    <Button type="submit" color="primary" >Apply Filters</Button>
                </Form>
            </div>
            <Button className="center" color="dark" size="lg" onClick={() => props.onChangePage(0)}>Show Map</Button>
            <Button color="dark" size="lg" onClick={() => props.onChangePage(1)}>Post Feed</Button>
            <Button color="dark" size="lg" onClick={() => props.onChangePage(2)}>Add Post</Button>
        </div>
    );
}

export default Options;