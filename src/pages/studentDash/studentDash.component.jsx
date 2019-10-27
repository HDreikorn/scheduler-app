import React from 'react';
import {Button} from 'react-bootstrap';
import NaviBar from '../../components/navbar/navbar.component';
import NavTab from '../../components/navTabs/navTabs.component';
import InfoTable from '../../components/infoTable/infoTable.component';
import './studentDash.styles.scss';

class StudentDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId: props.match.params.studentId,
            firstName: '',
            lastName: '',
            grade: '',
            showInfo: true,
            showCatalog: false
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
                grade, showInfo, showCatalog} = this.state;
        var user = firstName + " " + lastName;
        if (showInfo) {
            return (
                <div className='studentDash'>
                    <NaviBar username= {user} grade= {grade}/>
                    <h1>Hello, { firstName}! Let's get you're schedule planning started.</h1>
                    <Button variant="info" onClick={() => this.props.history.push('/')}>Logout</Button>
                    <NavTab />
                    <InfoTable studentId={ studentId }/>
                </div>
            );
        }
        else if (showCatalog) {
            return (
                <div className='studentDash'>
                <NaviBar username= {user} grade= {grade}/>
                <h1>Hello, { firstName}! Let's get you're schedule planning started.</h1>
                <Button variant="info" onClick={() => this.props.history.push('/')}>Logout</Button>
                <NavTab />
                <h1>course catalog</h1>
            </div>
            );
        }
    }
}

export default StudentDash;