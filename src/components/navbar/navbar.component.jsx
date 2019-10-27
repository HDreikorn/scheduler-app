import React from 'react';
import { Navbar } from 'react-bootstrap';
import './navbar.styles.scss';

class NaviBar extends React.Component {
    render(){
        return (
            <Navbar className="navi">
                <Navbar.Brand >High School Scheduling System</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    Signed in as: {this.props.username} ({this.props.grade}) 
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NaviBar;