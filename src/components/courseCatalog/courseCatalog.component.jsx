import React from 'react';
import { Table } from 'react-bootstrap';
import SearchBox from '../searchBox/searchBox.component';

class CourseCatalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [], 
            searchfield: ''
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


    renderTableData(coursesToRender) {
        return coursesToRender.map((course, index) => {
           const { courseId, courseCode, courseName, courseSubject, courseDescription, courseCredit, gradesAllowedToRegister } = course //destructuring
           return (
              <tr key={courseId}>
                 <td>{courseCode}</td>
                 <td>{courseName}</td>
                 <td>{courseSubject}</td>
                 <td>{courseDescription}</td>
                 <td>{courseCredit}</td>
                 <td>{gradesAllowedToRegister}</td>
              </tr>
           )
        })
     }

     onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    render() {
        const {courses, searchfield } = this.state;
        const filteredCourses = courses.filter(course => { 
            if (searchfield.includes("9") || searchfield.includes("10") || searchfield.includes("11") || searchfield.includes("12")) {
                return course.gradesAllowedToRegister.includes(searchfield);
            }
            return course.courseName.toLowerCase().includes(searchfield.toLocaleLowerCase());
        })
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
                <SearchBox searchChange={this.onSearchChange} searchBy='Search by Name'/>
                <SearchBox searchChange={this.onSearchChange} searchBy='Search by Grade'/>
                <h1>Course Catalog</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Subject</th>
                                <th>Description</th>
                                <th>Credit</th>
                                <th>Available For Grades</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderTableData(filteredCourses) }
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

export default CourseCatalog;