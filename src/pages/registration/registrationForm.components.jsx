import React from 'react';
import {Button} from 'react-bootstrap';
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
            hasCompletedCourseRequest: false
        }
    }

    componentDidMount() {
         this.getStudentData();
    }

    getStudentData = () => {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/'
        + this.props.match.params.studentId)
        .then( response => response.json())
        .then(data => {
           this.setState({firstName: data.firstName})
           this.setState({lastName: data.lastName})
           this.setState({grade: data.gradeLevelString})
           this.setState({gradeInt: data.gradeLevelInt})
           this.setState({hasCompletedCourseRequest: data.hasCompletedCourseRequest})
           
        })
        .catch( error => {
           console.log(error);
        })  
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
    }

    render() {
        const { studentId, firstName, lastName,
                grade, hasCompletedCourseRequest} = this.state;
        var user = firstName + " " + lastName;
        return (
            <div className='studentDash'>
                <NaviBar username= {user} grade= {grade} studentId={ studentId }/>
                <h1>Hello, { firstName}! Let's get you're schedule planning started.
                    <Button variant="info" onClick={() => this.props.history.push('/')}>Logout</Button>
                </h1>
                <NavTab studentId={ studentId }/>
                <RegistrationTable studentId={ studentId } hasSubmited= {hasCompletedCourseRequest}/>
            </div>
        );
    }
}           

export default RegistrationForm;