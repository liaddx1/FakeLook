import { Button, FormGroup, InputGroup, InputGroupText, Input, Form } from "reactstrap";
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { applyFilter } from "../../Store/actions/post";

const Options = props => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    fontawesome.library.add(faCalendar, faCircleDot);

    const filterApplyHandler = useCallback((e) => {
        e.preventDefault();

        const { from, until, radius } = e.target.elements;
        const tempPosts = posts;

        // const tempPosts.filter(post => )

        dispatch(applyFilter(tempPosts));
    }, [])

    return (
        <div className="d-grid gap-2 mt-2">
            <h5 className="text-center">Date Range</h5>
            <div>
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
            <Button color="dark" size="lg" onClick={() => props.onChangePage(0)}>Show Map</Button>
            <Button color="dark" size="lg" onClick={() => props.onChangePage(1)}>Post Feed</Button>
            <Button color="dark" size="lg" onClick={() => props.onChangePage(2)}>Add Post</Button>
        </div>
    );
}

export default Options;