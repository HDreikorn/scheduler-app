import React, {Component} from 'react';
import axios from 'axios';
import { Form, Button, Card, ListGroup } from 'react-bootstrap';

class ModifyRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courseRequest: [],
      courseToChange: '',
      courseSelected: ''
    }
  }

  componentDidMount() {
     // Get info of students who have registered for their courses
     fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/' + this.props.studentId + '/courserequest')
     .then( response => response.json())
     .then(data => {
        this.setState({courseRequest: data.courseRequest});
     })
     .catch( error => {
        console.log(error);
     })
     // Get info of students who have registered for their courses
     fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/' + this.props.studentId + '/courserequest')
     .then( response => response.json())
     .then(data => {
        this.setState({courseRequest: data.courseRequest});
        this.setState({hasSubmited: true});
     })
     .catch( error => {
        console.log(error);
     })
}

  renderCourseOptions = (courses) => {
    var courseOptions = [];
        courses.forEach(element => {
            courseOptions.push(<option value={element.courseId}>{element.courseName}</option>)
        }); 
        return courseOptions;
  }

  renderFromSelectedListGroup = (chosenCourseNames) => {
    var listItems = [];
    var counter = 1;
    chosenCourseNames.forEach(element => {
        listItems.push(<ListGroup.Item key={element}>{counter}: {element.courseName}</ListGroup.Item>)
        counter++;
    }); 
    return listItems;
}

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  submitHandler = (e) => {
    e.preventDefault();
    const {courseToChange, courseSelected} = this.state;
    var courseChangeObjectField = `course${courseToChange}`;
    var changeObject = {};
    changeObject[courseChangeObjectField] = parseInt(courseSelected);
    // Patch in newly selected course
    axios.patch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/' + this.props.studentId + '/courseRequest', changeObject)
    .then(response => {
      alert("success");
      console.log(response);
      // Get new schedule to display
      fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/' + this.props.studentId + '/courserequest')
      .then( response => response.json())
      .then(data => {
        console.log(this.state);
        this.setState({courseRequest: data.courseRequest});
      })
      .catch( error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
      alert("Something went wrong.");
    })
    
  }

  render() {
    const {courseRequest} = this.state;
    return (
        <div > 
            <div className="loginCard" style={{ display: 'flex' }}>
            <Card style={{ width: '18rem' }}>
                            <Card.Header>Selected Courses</Card.Header>
                            <ListGroup variant="flush">
                                { this.renderFromSelectedListGroup(courseRequest) }
                            </ListGroup>
                        </Card>
                <Card body style={{ width: '18rem' }}>
                <Form onSubmit={this.submitHandler}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Course to change:</Form.Label>
                    <Form.Control as="select" onChange={this.changeHandler} name="courseToChange">
                      <option>-Select Course Number-</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>New Course:</Form.Label>
                    <Form.Control as="select" onChange={this.changeHandler} name="courseSelected">
                      <option>-Select Course-</option>
                      {this.renderCourseOptions(this.props.courses)}
                    </Form.Control>
                  </Form.Group>
                  <Button variant="info" type="submit">Modify Courses</Button>
                </Form>
                </Card> 
            </div>
        </div>
    )
  }
}

export default ModifyRequest;
