import React from 'react';
import { Card, Button } from 'react-bootstrap';

class RegistrationCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            openRegistration: this.props.openRegistration,
            closeRegistration: this.props.closeRegistration,
            grade: this.props.grade
        }
    }

    render() {
        const { openRegistration, closeRegistration, grade} = this.state;
        return (
            <Card style={{ width: '18rem', margin: '15px' }}>
            <Card.Header>Current Registration Window</Card.Header>
            <Card.Body>
                <Card.Title>Registration times for grade { grade }.</Card.Title>
                <Card.Text>
                {openRegistration} to { closeRegistration }
                </Card.Text>
                <Button variant="info">Modify</Button>
            </Card.Body>
            </Card>
        );
    }

}

export default RegistrationCard;