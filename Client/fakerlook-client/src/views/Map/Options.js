import { Button, FormGroup, InputGroup, InputGroupText, Input } from "reactstrap";
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const Options = props => {

    fontawesome.library.add(faCalendar,);

    return (
        <div className="d-grid gap-2 mt-2">
            <h5 className="text-center"> Date Range</h5>
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
                            <FontAwesomeIcon icon={faCalendar} />
                            &nbsp;Radius
                        </InputGroupText>
                        <Input id="radius" type="number" placeholder="Radius" className="form-control text-center" />
                    </InputGroup>
                </FormGroup>
            <Button color="dark" size="lg" onClick={() => props.onChangePage(0)}>Show Map</Button>
            <Button color="dark" size="lg" onClick={() => props.onChangePage(1)}>Post Feed</Button>
            <Button color="dark" size="lg" onClick={() => props.onChangePage(2)}>Add Post</Button>
        </div>
    );
}

export default Options;