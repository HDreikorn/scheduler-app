import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import './infoTable.styles.scss';
import CourseHistoryTable from '../courseHistoryTable/courseHistoryTable.component';
import CreditTable from '../creditTable/creditTable.component';

class InfoTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId: props.studentId,
            totalCreditsEarned: '',
            totalCreditsNeeded: '',
            gpa: ''
        }
    }

    componentDidMount() {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/'
         + this.props.studentId + '/coursehistory')
         .then( response => response.json())
         .then(data => {
            this.setState({totalCreditsEarned: data.totalCreditsEarned});
            this.setState({totalCreditsNeeded: data.totalCreditsNeeded});
            this.setState({gpa: data.gpa});
         })
         .catch( error => {
            console.log(error);
         })
    }

    render() {
        const { studentId, totalCreditsEarned, totalCreditsNeeded, gpa} = this.state;
        return (
            <div>
                <div className='infoTable'>
                    <Card className='smallCard'>
                        <Card.Header>Academic Profile</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Credits Earned: { totalCreditsEarned }</ListGroup.Item>
                            <ListGroup.Item>Credits Needed: { totalCreditsNeeded }</ListGroup.Item>
                            <ListGroup.Item>GPA: { gpa }</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
                <div className='infoTables'>
                    <Card className='bigCard scrollTable'>
                            <Card.Body>
                                <CreditTable studentId={ studentId } title="Current Course Credit Report"/>
                            </Card.Body>
                    </Card>
                    <Card className='bigCard scrollTable'>
                            <Card.Body>
                            <CourseHistoryTable studentId={ studentId } title="Course History"/>
                            </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default InfoTable;