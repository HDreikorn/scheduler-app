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
        else {
            this.setState({endChanged: true});
        }
    }

    endDateIsLaterThanStart = (start, end) => {
        var splitStart = start.split('-');
        var splitEnd = end.split('-');
        var startMonth = parseInt(splitStart[1]);
        var startDay = parseInt(splitStart[2]);
        var startYear = parseInt(splitStart[0]);
        var endMonth = parseInt(splitEnd[0]);
        var endDay = parseInt(splitEnd[1]);
        var endYear = parseInt(splitEnd[2]);

        if((endMonth <= startMonth) && (endYear < startYear)){
            console.log( "1 "+ splitStart + "start month: "+ startMonth + endMonth + endYear + startYear);
            return false;
        }
        else if ((endMonth < startMonth) && (endYear < startYear) && (endDay < startDay)) {
            console.log("2" +startMonth + endMonth + endYear + startYear);
            return false;
        }
        else if (endYear < startYear) {
            console.log("3"+startMonth);
            return false;
        }
        else {
            console.log("4"+startMonth);
            return true;
        }
    }

    handleModify = () => {
        document.getElementById("modify-date").reset();
        const {newStart, newEnd, grade, startChanged, endChanged} = this.state;
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
            newDateObject.sophmoreWindowOpen = newStart;
            newDateObject.sophmoreWindowClose = newEnd;
        } 
        else if(grade === 9) {
            newDateObject.freshmanWindowOpen = newStart;
            newDateObject.freshmanWindowClose = newEnd;
        } 

        // Send axios patch request to change appropriate registration date.
        axios.patch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/registration', JSON.stringify(newDateObject))
        .then(response => {
            console.log("success");
            if(startChanged) {
                this.setState({openRegistration: this.formatDate(this.state.newStart)});
            }
            if (endChanged) {
                this.setState({closeRegistration: this.formatDate(this.state.newEnd)});
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    formatDate = (date) => {
        var splitDate = date.split('-');
        var newDateFormat = splitDate[1] + "-" + splitDate[2] + "-" + splitDate[0]
        return newDateFormat;
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