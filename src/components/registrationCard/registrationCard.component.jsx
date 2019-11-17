import React from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

class RegistrationCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            openRegistration: this.props.openRegistration,
            closeRegistration: this.props.closeRegistration,
            newStart: null,
            newEnd: null,
            grade: this.props.grade
        }
    }

    handleChange = (e) => {
        console.log(e.target.name);
        this.setState({[e.target.name]: e.target.value});
    }

    handleModify = () => {
        const {grade} = this.state;
        var newDateObject = {}
        // Set up new date object based on the grade state
        if(grade === 12) {
            newDateObject.seniorWindowOpen = this.state.newStart;
            newDateObject.seniorWindowClose = this.state.newEnd;
        } 
        else if(grade === 11) {
            newDateObject.juniorWindowOpen = this.state.newStart;
            newDateObject.juniorWindowClose = this.state.newEnd;
        } 
        else if(grade === 10) {
            newDateObject.sophmoreWindowOpen = this.state.newStart;
            newDateObject.sophmoreWindowClose = this.state.newEnd;
        } 
        else if(grade === 9) {
            newDateObject.freshmanWindowOpen = this.state.newStart;
            newDateObject.freshmanWindowClose = this.state.newEnd;
        } 

        // Send axios patch request to change appropriate registration date.
        axios.patch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/registration', JSON.stringify(newDateObject))
        .then(response => {
            console.log("success");
            this.setState({openRegistration: this.state.newStart});
            this.setState({closeRegistration: this.state.newEnd});
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        const { openRegistration, closeRegistration, grade} = this.state;
        return (
            <Card style={{ width: '18rem', margin: '15px' }}>
            <Card.Header>Current Registration Window</Card.Header>
            <Card.Body>
                <Card.Title>Registration times for { grade }th grade.</Card.Title>
                <Card.Text>
                {openRegistration} to { closeRegistration }
                </Card.Text>
                <Form onSubmit={this.handleModify}>
                    <Form.Group controlId="newStartDate">
                        <Form.Label>New Start:</Form.Label>
                        <Form.Control autoFocus type="date" name="newStart" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="newEndDate">
                        <Form.Label>New End:</Form.Label>
                        <Form.Control autoFocus type="date" name="newEnd" onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="info" onClick={this.handleModify}>Modify</Button>
                </Form>
            </Card.Body>
            </Card>
        );
    }

}

export default RegistrationCard;