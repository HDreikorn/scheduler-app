import React from 'react';
import axios from 'axios';
import {Button, Card, ProgressBar, Accordion, Modal, Spinner} from 'react-bootstrap';
import NaviBar from '../../components/navbar/navbar.component';
import './adminDash.styles.scss';
import RegistrationList from '../../components/registrationList/registrationList.component';
import CourseCatalog from '../../components/courseCatalog/courseCatalog.component';
import MasterSchedule from '../../components/masterSchedule/masterSchedule.component';
import NewStudentForm from '../../components/newStudentForm/newStudentForm.component';

class AdminDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params.username,
            firstName: '',
            lastName: '', 
            percentStatus: '',
            totalStudents: '',
            totalSubmitted: '',
            show: false,
            isLoading: true
        }
    }

    componentDidMount() {
         this.getAdminData();
         this.getPercentStatus();
         this.handleLoading();
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
            this.setState({percentStatus: ((totalSubmitted/totalStudents)*100).toFixed(2)});
            this.setState({totalStudents: totalStudents});
            this.setState({totalSubmitted: totalSubmitted});
        })
        .catch( error => {
            console.log(error);
        })
    }

    handleDelete = () => {
        axios.delete('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/schedule')
        .then(response => {
            alert("All classes successfully deleted.");
            window.location.reload(false);
          })
        .catch(error => {
        console.log(error);
            alert("Delete was unsuccessful, try again.");
        })
    }

    handleBuild = () => {
        this.setState({show: true});
        axios.post('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/schedule?build=true')
        .then(response => {
            this.handleClose();
            alert("All classes successfully built.");
            window.location.reload(false);
          })
        .catch(error => {
            this.handleClose();
            console.log(error.response.status);
            if(error.response.status === 400) {
                alert("All student course requests have already been built into schedules. Please submit a new course request..");
            }
            else {
                alert("Something went wrong in building, please try again.");
            }
        })
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleLoading = () => {
        this.setState({isLoading: false});
    }

    render() {
        const { username, firstName, lastName, percentStatus, totalStudents, totalSubmitted, show, isLoading } = this.state;
        var user = firstName + " " + lastName;
        var now = percentStatus;
        if(isLoading) {
            return(
                <div className="adminBody">
                    <div className="centerContent">
                        <p>Loading...</p>
                        <Spinner animation="border" variant="info" />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className='adminDash'>
                    <NaviBar username= {username} grade="administrator"/>
                    <h1>{ user }, let's help your students get their schedule planning started!
                        <Button variant="info" onClick={() => this.props.history.push('/')} className="logOut">Logout</Button>
                    </h1>
                    <div className="statusCard">
                        <Card className="text-center">
                            <Card.Header>Current Progress of Submitted Course Requests</Card.Header>
                            <Card.Body>
                                <Card.Title>{totalSubmitted} out of {totalStudents} students.</Card.Title>
                                    <ProgressBar animated now={now} label={`${now}%`}/>
                                    <div className="actionButtons">
                                        <Button variant="outline-danger" onClick={this.handleDelete}>Delete All Schedules</Button>
                                        <Button variant="outline-success" onClick={this.handleBuild}>Build All Schedules</Button>
                                    </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="registrationBoxes">
                        <RegistrationList/>
                    </div>
                    <Accordion>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                View Course Catalog
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <CourseCatalog/>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                View Master Schedule
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <MasterSchedule />
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                Create a New Student
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <NewStudentForm getPercentStatus= { this.getPercentStatus}/>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>

                    <Modal show={show} onHide={this.handleClose}>
                        <Modal.Header>
                            <Modal.Title>Building Schedules<Spinner animation="border" /></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Please wait while the schedules build...</p>
                        </Modal.Body>
                    </Modal>

                </div>
            );
        }
    }
}

export default AdminDash;