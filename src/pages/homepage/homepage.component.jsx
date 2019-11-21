import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import './homepage.styles.scss';
import kids from './66209.jpg';

class Homepage extends Component {
   componentDidMount(){
      fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/healthcheck');
   }

   render(props) {
      return (
         <div className= 'homepage'>
         <h1 className='title'>High School Scheduler</h1>
         <span className= 'subtitle'>A course scheduling system for the future.</span>
         <div>
         <img alt='school-kids' src={kids}></img>
         </div>
         <div className="login-buttons">
            <Button variant="info" onClick={() => this.props.history.push('/students/login')}>STUDENT LOGIN</Button>
            <Button variant="secondary" onClick={() => this.props.history.push('/schoolAdmin/login')}>ADMINISTRATOR LOGIN</Button>
         </div>
      </div>
      );
   }
}

export default Homepage;