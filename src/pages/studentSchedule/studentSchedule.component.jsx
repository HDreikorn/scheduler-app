import React from 'react';
import {Button, Card} from 'react-bootstrap';
import NaviBar from '../../components/navbar/navbar.component';
import NavTab from '../../components/navTabs/navTabs.component';
import FinalScheduleTable from '../../components/finalSchedule/finalSchedule.component';
import './studentSchedule.styles.scss'

class StudentSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId: props.match.params.studentId,
            firstName: '',
            lastName: '',
            grade: ''
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
           this.setState({firstName: data.firstName});
           this.setState({lastName: data.lastName});
           this.setState({grade: data.gradeLevelString})
        })
        .catch( error => {
           console.log(error);
        })  
    }

    render() {
        const { studentId, firstName, lastName,
                grade} = this.state;
        var user = firstName + " " + lastName;
            return (
                <div className="studentDash">
                    <NaviBar username= {user} grade= {grade} studentId={ studentId }/>
                    <h1>Hello, { firstName}! Let's get your schedule planning started.</h1>
                    <Button variant="info" onClick={() => this.props.history.push('/')}>Logout</Button>
                    <NavTab studentId={ studentId }/>
                    <div className="finalSchedule">  
                        <div className="centerSchedule"> 
                            <Card style={{ width: '50rem'}} body>
                                <FinalScheduleTable studentId={ studentId }/>
                            </Card>
                        </div>
                    </div>
                    
                </div>
            );
    }
}

export default StudentSchedule;