import React from 'react';
import { Card, Table } from 'react-bootstrap';

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
            <Card style={{ width: '30rem', height:'500px', overflow: 'scroll' }}>
                <Card.Header>Period {this.props.period}</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Seat Capacity</th>
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
        );
    }

}

export default MasterTableCard;