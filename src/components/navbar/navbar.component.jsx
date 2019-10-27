import React from 'react';
import {Navbar} from 'react-bootstrap';
import './navbar.styles.scss';

const NaviBar = (props)  => {
    return (
        <Navbar className="navi">
            <Navbar.Brand >High School Scheduling System</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                Signed in as: {props.username} ({props.grade})
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NaviBar;