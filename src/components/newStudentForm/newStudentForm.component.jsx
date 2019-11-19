import React, { Component } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from 'axios';
import './newStudentForm.styles.scss';

class NewStudentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studentID: '',
      studentPassword: '',
      firstName: '',
      lastName: '',
      grade: ''
    }
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  submitHandler = (e) => {
    e.preventDefault();
    axios.post('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students', this.state)
    .then(response => {
        alert("Successful submission. New student was added.");
        this.props.getPercentStatus();
    })
    .catch(error => {
      if (error.response.status === 409 ){
        alert("Duplicate student. Try again.");
      }
      else if (error.response.status === 400 ) {
        alert(error.response.data);
      }
    })
  }

  render() {
    const { studentID, studentPassword, firstName, lastName, grade } = this.state;

    return (
        <div className="newStudentForm">
            <h1>Fill Out New Student Information:</h1>
            <div className="loginCard">
                <Card body style={{ width: '18rem' }}>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group>
                        <Form.Label>Student ID</Form.Label>
                        <Form.Control 
                        type="text"
                        name = "studentID"
                        placeholder="Assign student ID" 
                        value={ studentID }
                        autoComplete="new-ID"
                        onChange={this.changeHandler}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        name="studentPassword"
                        placeholder="Assign Password" 
                        value={ studentPassword }
                        autoComplete="new-password"
                        onChange={this.changeHandler}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Student First Name</Form.Label>
                        <Form.Control 
                        type="text"
                        name = "firstName"
                        placeholder="First Name" 
                        value={ firstName } 
                        onChange={this.changeHandler}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Student Last Name</Form.Label>
                        <Form.Control 
                        type="text"
                        name = "lastName"
                        placeholder="Last Name" 
                        value={ lastName } 
                        onChange={this.changeHandler}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Student Grade</Form.Label>
                        <Form.Control 
                        type="number"
                        name = "grade"
                        placeholder="Assign Grade" 
                        value={ grade } 
                        onChange={this.changeHandler}
                        />
                    </Form.Group>
                    <Button variant="info" type="submit">
                        Submit
                    </Button>
                </Form>
                </Card> 
            </div>
        </div>
    )
  }
}

export default NewStudentForm;