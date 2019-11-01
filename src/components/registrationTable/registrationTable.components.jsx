import React from 'react';
import axios from 'axios';
import { Table, ListGroup, Card, Button, Alert } from 'react-bootstrap';
import SearchBox from '../searchBox/searchBox.component';
import { continueStatement } from '@babel/types';

class RegistrationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [], 
            searchfield: '',
            count: 0,
            chosenCourseNames: [],
            chosenCourseIds: {
                course1: "",
                course2: "",
                course3: "",
                course4: "", 
                course5: "",
                course6: "",
                course7: "",
                course8: ""
            }
        }
    }

    componentDidMount() {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/courses/registration')
         .then( response => response.json())
         .then(data => {
            this.setState({courses: data});
         })
         .catch( error => {
            console.log(error);
         })
    }


    renderTableData(coursesToRender) {
        return coursesToRender.map((course, index) => {
           const { courseId, courseCode, courseName, courseSubject, courseCredit, courseCapacity, slotsAvailable } = course; //destructuring
           return (
              <tr key={courseId}>
                 <td>{courseCode}</td>
                 <td>{courseName}</td>
                 <td>{courseSubject}</td>
                 <td>{courseCredit}</td>
                 <td>{courseCapacity}</td>
                 <td>{slotsAvailable}</td>
                 <td><Button variant="info" onClick={() => this.addClassToList(courseId, courseName)}>+</Button></td>
              </tr>
           )
        })
     }

    addClassToList(courseId, courseName) {
        const {chosenCourseIds, count, chosenCourseNames} = this.state;
        // Get the course ids state to modify
        var courseIds = chosenCourseIds;
        // Check what count is at, then modify the course based on the count
        if(count === 0){
            courseIds.course1 = courseId;
            this.setState({chosenCourseIds: courseIds});
            this.setState({chosenCourseNames: [...chosenCourseNames, courseName]});
        }
        else if(count === 1){
            courseIds.course2 = courseId;
            this.setState({chosenCourseIds: courseIds});
            this.setState({chosenCourseNames: [...chosenCourseNames, courseName]});
        }
        else if(count === 2){
            courseIds.course3 = courseId;
            this.setState({chosenCourseIds: courseIds});
            this.setState({chosenCourseNames: [...chosenCourseNames, courseName]});
        }
        else if(count === 3){
            courseIds.course4 = courseId;
            this.setState({chosenCourseIds: courseIds});
            this.setState({chosenCourseNames: [...chosenCourseNames, courseName]});
        }
        else if(count === 4){
            courseIds.course5 = courseId;
            this.setState({chosenCourseIds: courseIds});
            this.setState({chosenCourseNames: [...chosenCourseNames, courseName]});
        }
        else if(count === 5){
            courseIds.course6 = courseId;
            this.setState({chosenCourseIds: courseIds});
            this.setState({chosenCourseNames: [...chosenCourseNames, courseName]});
        }
        else if(count === 6){
            courseIds.course7 = courseId;
            this.setState({chosenCourseIds: courseIds});
            this.setState({chosenCourseNames: [...chosenCourseNames, courseName]});
        }
        else if(count === 7){
            courseIds.course8 = courseId;
            this.setState({chosenCourseIds: courseIds});
            this.setState({chosenCourseNames: [...chosenCourseNames, courseName]});
        }
        else {
            return null;
        }
        // set count state
        var newCount = count + 1;
        this.setState({count:newCount})
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    submitCourses = (event) => {
        event.preventDefault();
        // Convert chosen course ids in JSON object
        var jsonIds = JSON.stringify(this.state.chosenCourseIds);
        console.log(jsonIds);
        // Axios call to send choseCourseIds state object
        axios.post('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/' + this.props.studentId + '/courseRequest', jsonIds)
    .then(response => {
        alert("Successfully submited.");
        //var location = '/students/'+ response.data.studentId;
        //this.props.history.push(location);
    })
    .catch(error => {
        console.log(error.response);
        if(error.response.status === 400) {
            alert("Request already made. Please go to modify your current request.");
        }
        else {
            alert("Something went wrong.");
        }
        //var location = '/students/' + this.props.studentId;
        //this.props.history.push(location);
    })
    }

    renderListGroup = (chosenCourseNames) => {
        var listItems = [];
        const { count } = this.state;
        chosenCourseNames.forEach(element => {
            listItems.push(<ListGroup.Item key={element}>{element}</ListGroup.Item>)
        }); 
        return listItems;
    }

    render() {
        const {courses, searchfield, chosenCourseNames, count } = this.state;
        const filteredCourses = courses.filter(course => { 
            return course.courseName.toLowerCase().includes(searchfield.toLocaleLowerCase());
        })
        if (courses.length === 0){
            return (
            <div className='courseCatalog'>
                <p>Registration form is not available.</p>
            </div>
            );
        }
        else if (count >= 8) {
            return (
                <div>
                    <div>
                        <Alert variant="success">
                            All courses selected. Please submit now. You can modify at any point after submission.
                        </Alert>
                    </div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Selected Courses</Card.Header>
                        <ListGroup variant="flush">
                            { this.renderListGroup(chosenCourseNames) }
                        </ListGroup>
                    </Card>
                    <Button variant="info" onClick={this.submitCourses}>Submit</Button>
                </div>   
            );
        }
        else {
            return (
                <div className='courseCatalog'>
                <SearchBox searchChange={this.onSearchChange} searchBy='Search by Name'/>
                <Card style={{ width: '18rem' }}>
                    <Card.Header>Selected Courses</Card.Header>
                    <ListGroup variant="flush">
                        { this.renderListGroup(chosenCourseNames) }
                    </ListGroup>
                </Card>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Subject</th>
                            <th>Credit</th>
                            <th>Capacity</th>
                            <th>Seats Available</th>
                            <th>Add To Worksheet</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderTableData(filteredCourses) }
                    </tbody>
                </Table>
                </div>
            );
        }
    }
}

export default RegistrationTable;