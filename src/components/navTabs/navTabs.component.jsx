import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';

class NavTab extends Component {

    render() {
        var info = "/students/" + this.props.studentId;
        var catalog = "/students/" + this.props.studentId + "/courseCatalog";
        return (
            <Nav fill variant="tabs" defaultActiveKey={info}>
                <Nav.Item>
                    <Nav.Link href={info}>My Information</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={catalog}>Course Catalog</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Four Year Plan</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3">My Schedule</Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }
}

export default NavTab;