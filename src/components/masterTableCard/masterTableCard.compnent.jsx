import React from 'react';
import { Card, Table, Accordion } from 'react-bootstrap';

class MasterTableCard extends React.Component {

    renderTable = (classSet) => {
        return classSet.map((course) => {
            const { sectionId, courseCode, seatCapacity, studentsEnrolled, schoolYear } = course //destructuring
            return (
               <tr key={sectionId}>
                  <td>{courseCode}</td>
                  <td>{seatCapacity}</td>
                  <td>{studentsEnrolled}</td>
                  <td>{schoolYear}</td>
               </tr>
            )
         })
    }

    render() {
        return (
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={this.props.period}>
                    Period {this.props.period}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={this.props.period}>
                    <Card style={{ width: '30rem', height:'500px', overflow: 'scroll' }}>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Course Code</th>
                                        <th>Seats Available</th>
                                        <th>Students Enrolled</th>
                                        <th>School Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.renderTable(this.props.classSet) }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    </Accordion.Collapse>
                </Card>
        );
    }

}

export default MasterTableCard;