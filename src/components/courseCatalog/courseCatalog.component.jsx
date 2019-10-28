import React from 'react';
import { Table } from 'react-bootstrap';

class CourseCatalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/courses')
         .then( response => response.json())
         .then(data => {
            this.setState({courses: data});
         })
         .catch( error => {
            console.log(error);
         })
    }


    renderTableData() {
        return this.state.courses.map((course, index) => {
           const { courseId, courseCode, courseName, courseSubject, courseDescription, courseCredit } = course //destructuring
           return (
              <tr key={courseId}>
                 <td>{courseCode}</td>
                 <td>{courseName}</td>
                 <td>{courseSubject}</td>
                 <td>{courseDescription}</td>
                 <td>{courseCredit}</td>
              </tr>
           )
        })
     }

    render() {
        const {courses } = this.state;
        if (courses.length === 0){
            return (
            <div className='courseCatalog'>
                <p>Course catalog is not available.</p>
            </div>
            );
        }
        else {
            return (
                <div className='courseCatalog'>
                <h1>Course Catalog</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Subject</th>
                                <th>Description</th>
                                <th>Credit</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderTableData() }
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

export default CourseCatalog;