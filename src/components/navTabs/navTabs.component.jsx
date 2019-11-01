import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

class NavTab extends Component {
    render() {
        var info = "/students/" + this.props.studentId;
        var catalog = "/students/" + this.props.studentId + "/courseCatalog";
        var register = "/students/" + this.props.studentId + "/register"
        return (
            <Nav fill variant="tabs" defaultActiveKey="link-1">
                <Nav.Item>
                    <Link to={ info }>My Information</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to={ catalog }>Course Catalog</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to={ register }>Registration</Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3">My Schedule</Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }
}

export default NavTab;