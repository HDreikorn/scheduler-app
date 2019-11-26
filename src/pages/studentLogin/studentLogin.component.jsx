import React, { Component } from "react";
import { Button, Form, Card, Spinner } from "react-bootstrap";
import axios from 'axios';
import './studentLogin.styles.scss';

class StudentLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studentId: '',
      studentPassword: '',
      submitedLogin: false
    }
  }

  componentDidMount() {
    fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/healthcheck');
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.setState({submitedLogin: true});
    axios.post('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/login', this.state)
    .then(response => {
      var location = '/students/'+ response.data.userId;
      this.props.history.push(location);
    })
    .catch(error => {
      this.setState({studentId:''});
      this.setState({studentPassword:''});
      alert("Invalid login. Try again.");
      console.log(error.response);
      this.setState({submitedLogin: false});
    })
  }

  render() {
    const { studentId, studentPassword, submitedLogin } = this.state;
    if (submitedLogin){
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
                    <Button variant="primary" disabled>
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Loading...
                    </Button>
                </Form>
                </Card> 
            </div>
        </div>
    )
    }
    else {
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
}

export default StudentLogin;