import { useCallback, useEffect } from "react";
import { Button, FormGroup, InputGroup, InputGroupText, Input, Form } from "reactstrap";
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { applyFilter } from "../../Store/actions/post";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Options = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const posts = useSelector(state => state.posts.posts);
    fontawesome.library.add(faCalendar, faCircleDot);

    const filterApplyHandler = useCallback((e) => {
        e.preventDefault();

        const { from, until, /*radius*/ } = e.target.elements;
        const tempPosts = [...posts];
        console.log(tempPosts);

        let fromDate = from.value;
        let untilDate = until.value;

        if (!fromDate) fromDate = new Date();
        if (!untilDate) untilDate = new Date() + 20;

        const newList = tempPosts.filter(post => (post.timePosted > fromDate && post.timePosted < untilDate));

        dispatch(applyFilter(newList));
    }, [dispatch, posts])

    const isAuthorazied = useCallback(() => {
        const token = localStorage.getItem("authToken");
        const facebookExp = localStorage.getItem('facebookExp');
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

    //side effects
    useEffect(() => {
        isAuthorazied();
    }, [isAuthorazied])

    useEffect(() => {
        setTimeout(() => {
            isAuthorazied();
        }, 60000);
    }, [isAuthorazied])

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
                            <Input id="radius" type="number" placeholder="Radius" className="form-control text-center" />
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