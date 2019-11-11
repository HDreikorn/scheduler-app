import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './filterForm.styles.scss';

class FilterForm extends React.Component{
    render() {
        return (
            <div className='filterForm'>
                <Form>
                    <Form.Group controlId="formGridState">
                        <Form.Label>Filter by Subject</Form.Label>
                        <Form.Control as="select" onChange={this.props.selectChange}>
                            <option>-- select a subject --</option>
                            <option value="ln">Language</option>
                            <option value="pe">Physical Education</option>
                            <option value="he">Health</option>
                            <option value="ss">Social Science</option>
                            <option value="sc">Science</option>
                            <option value="mth">Math</option>
                            <option value="fna">Fine Arts</option>
                            <option value="en">Englilsh</option>
                            <option value="el">Elective</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Label>Filter by Grade: </Form.Label>
                    <Form.Group id="formGridCheckbox">
                        <Form.Check inline name="gradeToFilter" type="radio" label="9" value='9' onChange={this.props.radioChange}/>
                        <Form.Check inline name="gradeToFilter" type="radio" label="10" value='10' onChange={this.props.radioChange}/>
                        <Form.Check inline name="gradeToFilter" type="radio" label="11" value='11' onChange={this.props.radioChange}/>
                        <Form.Check inline name="gradeToFilter" type="radio" label="12" value='12' onChange={this.props.radioChange}/>
                    </Form.Group>
                    <Button onClick={this.props.onSubmitFilter}>Filter</Button>
                </Form>
            </div>
        );
    }
}

export default FilterForm;