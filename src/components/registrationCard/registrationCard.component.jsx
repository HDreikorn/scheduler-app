import React from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

class RegistrationCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            openRegistration: this.props.openRegistration,
            closeRegistration: this.props.closeRegistration,
            newStart: this.props.openRegistration,
            newEnd: this.props.closeRegistration,
            grade: this.props.grade,
            startChanged: false,
            endChanged: false
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        if(e.target.name === "newStart") {
            this.setState({startChanged: true});
        }
        if (e.target.name === "newEnd") {
            this.setState({endChanged: true});
        }
    }

    endDateIsLaterThanStart = (start, end) => {
        var splitStart = start.split('-');
        var splitEnd = end.split('-');
        var startMonth;
        var startDay;
        var startYear;
        var endMonth;
        var endDay;
        var endYear;
        if(this.state.startChanged){
            startMonth = parseInt(splitStart[1]);
            startDay = parseInt(splitStart[2]);
            startYear = parseInt(splitStart[0]);
        }
        else{
            startMonth = parseInt(splitStart[0]);
            startDay = parseInt(splitStart[1]);
            startYear = parseInt(splitStart[2]);
        }

        if(this.state.endChanged) {
            endMonth = parseInt(splitEnd[1]);
            endDay = parseInt(splitEnd[2]);
            endYear = parseInt(splitEnd[0]);
        }
        else {
            endMonth = parseInt(splitEnd[0]);
            endDay = parseInt(splitEnd[1]);
            endYear = parseInt(splitEnd[2]);
        }

        console.log(endYear + " " + startYear);

        if((endMonth < startMonth) && (endYear === startYear)){
            return false;
        }
        else if ((endMonth === startMonth) && (endYear === startYear) && (endDay <= startDay)) {
            return false;
        }
        else if (endYear < startYear) {
            return false;
        }
        else {
            return true;
        }
    }

    handleModify = () => {
        const {newStart, newEnd, grade} = this.state;
        var newDateObject = {}
        if(!this.endDateIsLaterThanStart(newStart, newEnd)) {
            alert("Invalid Entry: End date must be after start date.");
            return;
        }

        // Set up new date object based on the grade state
        if(grade === 12) {
            newDateObject.seniorWindowOpen = newStart;
            newDateObject.seniorWindowClose = newEnd;
        } 
        else if(grade === 11) {
            newDateObject.juniorWindowOpen = newStart;
            newDateObject.juniorWindowClose = newEnd;
        } 
        else if(grade === 10) {
            newDateObject.sophomoreWindowOpen = newStart;
            newDateObject.sophomoreWindowClose = newEnd;
        } 
        else if(grade === 9) {
            newDateObject.freshmanWindowOpen = newStart;
            newDateObject.freshmanWindowClose = newEnd;
        } 

        // Send axios patch request to change appropriate registration date.
        axios.patch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/registration', JSON.stringify(newDateObject))
        .then(response => {
            console.log("success");
            window.location.reload(false);
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
                <Form onSubmit={this.handleModify} id="modify-date">
                    <Form.Group >
                        <Form.Label>New Start:</Form.Label>
                        <Form.Control autoFocus type="date" name="newStart" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group >
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