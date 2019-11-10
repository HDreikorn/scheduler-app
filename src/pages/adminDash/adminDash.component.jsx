import React from 'react';
import {Button, Card, ProgressBar} from 'react-bootstrap';
import NaviBar from '../../components/navbar/navbar.component';
import './adminDash.styles.scss';
import RegistrationList from '../../components/registrationList/registrationList.component';
import CourseCatalog from '../../components/courseCatalog/courseCatalog.component';

class AdminDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params.username,
            firstName: '',
            lastName: '', 
            percentStatus: ''
        }
    }

    componentDidMount() {
         this.getAdminData();
         this.getPercentStatus();
    }

    getAdminData = () => {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/schoolAdmin/'
        + this.props.match.params.username)
        .then( response => response.json())
        .then(data => {
           this.setState({firstName: data.firstName});
           this.setState({lastName: data.lastName});
        })
        .catch( error => {
           console.log(error);
        })  
    }

    getPercentStatus = () => {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/registration/status')
        .then( response => response.json())
        .then(data => {
            var totalStudents = data.totalNumberOfStudents;
            var totalSubmitted = data.totalNumberOfCourseRequests;
            this.setState({percentStatus: (totalSubmitted/totalStudents)*100});
        })
        .catch( error => {
            console.log(error);
        })
    }

    render() {
        const { username, firstName, lastName, percentStatus } = this.state;
        var user = firstName + " " + lastName;
        var now = percentStatus;
            return (
                <div className='adminDash'>
                    <NaviBar username= {username} grade="administrator"/>
                    <h1>{ user }, let's help your students get their schedule planning started!</h1>
                    <Button variant="info" onClick={() => this.props.history.push('/')}>Logout</Button>
                    <div className="statusCard">
                        <Card className="text-center">
                            <Card.Header>Registration Status</Card.Header>
                            <Card.Body>
                                <Card.Title>Current Progress of Submitted Course Requests</Card.Title>
                                <Card.Text>
                                    <ProgressBar now={now} label={`${now}%`}/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="registrationBoxes">
                        <RegistrationList />
                    </div>
                    <CourseCatalog/>
                </div>
            );
    }
}

export default AdminDash;