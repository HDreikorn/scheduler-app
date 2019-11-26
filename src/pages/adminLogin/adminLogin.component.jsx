import React, { Component } from "react";
import { Button, Form, Card, Spinner } from "react-bootstrap";
import axios from 'axios';
import './adminLogin.styles.scss';

class AdminLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      adminPassword: '',
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
    axios.post('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/schoolAdmin/login', this.state)
    .then(response => {
        var location = '/schoolAdmin/'+ response.data.userId;
        this.props.history.push(location);
    })
    .catch(error => {
      this.setState({username:''});
      this.setState({adminPassword:''});
      alert("Invalid login. Try again.")
      window.location.reload(false);
      this.setState({submitedLogin: false});
    })
  }

  render() {
    const { username, adminPassword, submitedLogin } = this.state;
    if(submitedLogin){
      return (
        <div className="adminLogin">
            <h1>Log in to your administrator account</h1>
            <div className="loginCard">
                <Card body style={{ width: '18rem' }}>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group>
                        <Form.Label>Administrator Username</Form.Label>
                        <Form.Control 
                        type="text"
                        name = "username"
                        placeholder="Enter username" 
                        value={ username } 
                        onChange={this.changeHandler}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        name="adminPassword"
                        placeholder="Password" 
                        value={ adminPassword }
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
        <div className="adminLogin">
            <h1>Log in to your administrator account</h1>
            <div className="loginCard">
                <Card body style={{ width: '18rem' }}>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group>
                        <Form.Label>Administrator Username</Form.Label>
                        <Form.Control 
                        type="text"
                        name = "username"
                        placeholder="Enter username" 
                        value={ username } 
                        onChange={this.changeHandler}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        name="adminPassword"
                        placeholder="Password" 
                        value={ adminPassword }
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

export default AdminLogin;