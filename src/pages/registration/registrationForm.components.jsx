import React from 'react';
import axios from 'axios';
import {Button, Spinner, Alert} from 'react-bootstrap';
import NaviBar from '../../components/navbar/navbar.component';
import NavTab from '../../components/navTabs/navTabs.component';
import RegistrationTable from '../../components/registrationTable/registrationTable.components';

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId: props.match.params.studentId,
            firstName: '',
            lastName: '',
            grade: '', 
            gradeInt: '',
            registrations: [],
            isLoading: true,
            isValidRegistrationTime: '',
            openRegistration: '',
            closeRegistration: '',
            hasScheduleBuild: false
        }
    }

    componentDidMount() {
         this.getStudentData(); 
         this.getFinalScheduleData();
    }

    getStudentData = () => {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/'
        + this.props.match.params.studentId)
        .then( response => response.json())
        .then(data => {
           this.setState({firstName: data.firstName});
           this.setState({lastName: data.lastName});
           this.setState({grade: data.gradeLevelString});
           this.setState({gradeInt: data.gradeLevelInt});
           this.getRegistrationData(data.gradeLevelInt);
        })
        .catch( error => {
           console.log(error);
        })  
    }

    getFinalScheduleData = () => {
        axios.get('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/'
         + this.props.match.params.studentId + '/schedule')
         .then(response => {
            this.setState({hasScheduleBuild: true});
         })
         .catch( error => {
            console.log(error);
         })
    }

    getCurrentStudentRegistrationWindow = (registrations, gradeInt) => {
        if(gradeInt === 9) {
            this.setState({openRegistration: registrations[0].openRegistration});
            this.setState({closeRegistration: registrations[0].closeRegistration});
            this.validateRegistrationWindow(registrations[0].openRegistration, registrations[0].closeRegistration);
        }
        else if(gradeInt === 10) {
            this.setState({openRegistration: registrations[1].openRegistration});
            this.setState({closeRegistration: registrations[1].closeRegistration});
            this.validateRegistrationWindow(registrations[1].openRegistration, registrations[1].closeRegistration);
        }
        else if(gradeInt === 11) {
            this.setState({openRegistration: registrations[2].openRegistration});
            this.setState({closeRegistration: registrations[2].closeRegistration});
            this.validateRegistrationWindow(registrations[2].openRegistration, registrations[2].closeRegistration);
        }
        else if(gradeInt === 12) {
            this.setState({openRegistration: registrations[3].openRegistration});
            this.setState({closeRegistration: registrations[3].closeRegistration});
            this.validateRegistrationWindow(registrations[3].openRegistration, registrations[3].closeRegistration);
        }
    }

    validateRegistrationWindow = (openRegistration, closeRegistration) => {
        var currentDate = new Date();
        var openRegParts = openRegistration.split("-");
        var openMonth = parseInt(openRegParts[0]);
        var openDay = parseInt(openRegParts[1]);
        var openYear = parseInt(openRegParts[2]);
        var closeRegParts = closeRegistration.split("-");
        var closeMonth = parseInt(closeRegParts[0]);
        var closeDay = parseInt(closeRegParts[1]);
        var closeYear = parseInt(closeRegParts[2]);
        var currentMonth = currentDate.getMonth() + 1;
        var currentDay = currentDate.getDate();
        var currentYear = currentDate.getFullYear();
        
        if(((currentMonth >= openMonth) && (currentMonth <= closeMonth))
            && ((currentYear >= openYear) && (currentYear >= closeYear))
        ){
            if((openMonth === closeMonth) && ((currentDay > closeDay) || (currentDay < openDay))){
                this.setState({isValidRegistrationTime: false});
            }
            else if((currentMonth === closeMonth) && (currentDay > closeDay)) {
                this.setState({isValidRegistrationTime: false});
            }
            else{
                this.setState({isValidRegistrationTime: true});
            }
        }
        else {
            this.setState({isValidRegistrationTime: false});
        }
        this.setState({isLoading: false});
    }

    getRegistrationData = (gradeInt) => {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/registration')
        .then( response => response.json())
        .then(data => {
           this.setState({registrations: data});
           this.getCurrentStudentRegistrationWindow(data, gradeInt);
        })
        .catch( error => {
           console.log(error);
        }) 
    }

    submitHandler = (e) => {
        e.preventDefault();
    }

    render() {
        const { studentId, firstName, lastName,
                grade, hasCompletedCourseRequest, isLoading, isValidRegistrationTime, hasScheduleBuild} = this.state;
        var user = firstName + " " + lastName;
        
        if(isLoading) {
            return(
                <p>Loading<Spinner animation="grow" /></p>
            );
        }
        else if (hasScheduleBuild) {
            return (
                <div>
                    <div className='studentDash'>
                        <NaviBar username= {user} grade= {grade} studentId={ studentId }/>
                        <h1>Hello, { firstName}! Let's get your schedule planning started.
                            <Button variant="info" onClick={() => this.props.history.push('/')}>Logout</Button>
                        </h1>
                        <NavTab studentId={ studentId }/>
                        <Alert variant="info" style={{ margin: '5rem' }}>
                            Schedule has already been built. Click on the <b>My Schedule</b> tab to view it!
                        </Alert>
                    </div>
                </div>
            );
        }
        else {
            if(!isValidRegistrationTime) {
                return (
                    <div className='studentDash'>
                        <NaviBar username= {user} grade= {grade} studentId={ studentId }/>
                        <h1>Hello, { firstName}! Let's get your schedule planning started.
                            <Button variant="info" onClick={() => this.props.history.push('/')}>Logout</Button>
                        </h1>
                        <NavTab studentId={ studentId }/>
                        <h4>Registration Window closed</h4>
                    </div>
                );
            }
            else if(isValidRegistrationTime) {
                return (
                    <div className='studentDash'>
                        <NaviBar username= {user} grade= {grade} studentId={ studentId }/>
                        <h1>Hello, { firstName}! Let's get your schedule planning started.
                            <Button variant="info" onClick={() => this.props.history.push('/')}>Logout</Button>
                        </h1>
                        <NavTab studentId={ studentId }/>
                        <RegistrationTable studentId={ studentId } hasSubmited= {hasCompletedCourseRequest}/>
                    </div>
                );
            }  
        }
    }
}           

export default RegistrationForm;