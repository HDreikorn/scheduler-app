import React from 'react';
import {Button} from 'react-bootstrap';
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
            lastName: ''
        }
    }

    componentDidMount() {
         this.getAdminData();
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

    render() {
        const { username, firstName, lastName } = this.state;
        var user = firstName + " " + lastName;
            return (
                <div className='adminDash'>
                    <NaviBar username= {username} grade="administrator"/>
                    <h1>{ user }, let's help your students get their schedule planning started!</h1>
                    <Button variant="info" onClick={() => this.props.history.push('/')}>Logout</Button>
                    <div className="registrationBoxes">
                        <RegistrationList />
                    </div>
                    <CourseCatalog/>
                </div>
            );
    }
}

export default AdminDash;