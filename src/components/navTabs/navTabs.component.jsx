import React from 'react';
import { Nav} from 'react-bootstrap';

const NavTab = () => {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link href="/home">My Information</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Course Catalog</Nav.Link>
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

export default NavTab;