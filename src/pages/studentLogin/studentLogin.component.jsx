import React, { Component } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from 'axios';
import './studentLogin.styles.scss';

class StudentLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studentId: '',
      studentPassword: ''
    }
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  submitHandler = (e) => {
    e.preventDefault();
    axios.post('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/login', this.state)
    .then(response => {
      var location = '/students/'+ response.data.userId;
      this.props.history.push(location);
    })
    .catch(error => {
      console.log(error);
      alert("Invalid login. Try again.");
      var location = '/'
      this.props.history.push(location);
    })
  }

  render() {
    const { studentId, studentPassword } = this.state;
    return (
        <div className="studentLogin">
            <h1>Log in to your student account</h1>
            <div className="loginCard">
                <Card body style={{ width: '18rem' }}>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group>
                        <Form.Label>Student ID</Form.Label>
                        <Form.Control 
                        type="text"
                        name = "studentId"
                        placeholder="Enter student ID" 
                        value={ studentId } 
                        onChange={this.changeHandler}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        name="studentPassword"
                        placeholder="Password" 
                        value={ studentPassword }
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

export default StudentLogin;