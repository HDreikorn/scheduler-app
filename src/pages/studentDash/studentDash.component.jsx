import React from 'react';
import NaviBar from '../../components/navbar/navbar.component';
import NavTab from '../../components/navTabs/navTabs.component';
import './studentDash.styles.scss';

class StudentDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            grade: ''
        }
    }

    componentDidMount() {
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
        const { firstName, lastName, grade} = this.state;
        var user = firstName + " " + lastName;
        return (
            <div className='studentDash'>
                <NaviBar username= {user} grade= {grade}/>
                <h1>Hello, { firstName}! Let's get you're schedule planning started.</h1>
                <NavTab />
            </div>
        );
    }
}

export default StudentDash;