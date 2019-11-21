import React from 'react';
import axios from 'axios';
import { Table, Card, Button } from 'react-bootstrap';
import SearchBox from '../searchBox/searchBox.component';
import FilterForm from '../filterForm/filterForm.component';
import './courseCatalog.styles.scss';

class CourseCatalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [], 
            searchfield: '',
            filterGrade: '',
            filterSubject: '',
            isFilterFetched: false,
            filterFetchedCourses: ''
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

    getCoursesByGrade(grade) {
        axios.get('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/courses/filtered?grade=' + grade)
         .then(response => {
            this.setState({filterFetchedCourses : response.data});
         })
         .catch( error => {
            if (error.response.status === 404 ){
                this.setState({filterFetchedCourses: []});
            }
            else {
                alert(error.response.data);
            }
         })
    }

    getCoursesBySubject(subject) {
        axios.get('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/courses/filtered?subject='  + subject)
        .then(response => {
           this.setState({filterFetchedCourses: response.data});
        })
        .catch( error => {
            if (error.response.status === 404 ){
                this.setState({filterFetchedCourses: []});
            }
            else {
                alert(error.response.data);
            }
        })
    }

    getCoursesByGradeAndSubject(grade, subject) {
        axios.get('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/courses/filtered?grade=' + grade + '&subject=' + subject)
        .then(response => {
           this.setState({filterFetchedCourses: response.data});
        })
        .catch( error => {
            if(error.response.status === 404){
                this.setState({filterFetchedCourses: []});
            }
            else {
                alert("Something went wrong. Try filter again.");
            }
        })
    }

    renderTableData(coursesToRender) {
        return coursesToRender.map((course) => {
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

     renderFilteredTableData() {
        var data = Array.from(this.state.filterFetchedCourses);
        return data.map((course) => {
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
        });
     }

     onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    selectChange = (event) => {
        this.setState({filterSubject: event.target.value});
    }

    radioChange = (event) => {
        this.setState({filterGrade: event.target.value});
    }

    onSubmitFilter = () => {
        const { filterGrade, filterSubject} = this.state;
        document.getElementById("filter-form").reset();
        if(filterGrade !== '' && filterSubject !== '') {
            this.getCoursesByGradeAndSubject(filterGrade, filterSubject);
            this.setState({isFilterFetched:true});
            this.setState({filterSubject: ''});
            this.setState({filterGrade: ''});
        }
        else if(filterSubject !== '') {
            this.getCoursesBySubject(filterSubject);
            this.setState({isFilterFetched:true});
        }
        else if(filterGrade !== '') {
            this.getCoursesByGrade(filterGrade);
            this.setState({isFilterFetched:true});
        }
    }

    onBackToUnfilter = () => {
        document.getElementById("filter-form").reset();
        this.setState({filterSubject: ''});
        this.setState({filterGrade: ''});
        this.setState({isFilterFetched: false});
    }

    render() {
        const {courses, searchfield, isFilterFetched, filterFetchedCourses } = this.state;

        const filteredCourses = courses.filter(course => { 
        if (searchfield.includes("9") || searchfield.includes("10") || searchfield.includes("11") || searchfield.includes("12")) {
            return course.gradesAllowedToRegister.includes(searchfield);
        }
        return course.courseName.toLowerCase().includes(searchfield.toLocaleLowerCase());
        })
        if (isFilterFetched) {
            return (
                <div>
                    <div className='courseCatalog'>
                        <div className='inputArea'>
                            <Card body>
                                <FilterForm selectChange={this.selectChange} radioChange={this.radioChange} onSubmitFilter={this.onSubmitFilter}/>
                            </Card>
                        </div>
                    </div>
                    <div className="searchBoxes">
                        <SearchBox searchChange={this.onSearchChange} searchBy='Search by Name'/>
                        <SearchBox searchChange={this.onSearchChange} searchBy='Search by Grade'/>
                    </div>
                    <Card className="catalogBox">
                        <Card.Header as="h5">Course Catalog</Card.Header>
                        <Card.Body>
                            <Button className="backButton" variant="danger" onClick={this.onBackToUnfilter}>Go Back to Full List</Button>
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
                                    { this.renderFilteredTableData(filterFetchedCourses) }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className='courseCatalog'>
                        <div className='inputArea'>
                            <Card body>
                                <FilterForm selectChange={this.selectChange} radioChange={this.radioChange} onSubmitFilter={this.onSubmitFilter}/>
                            </Card>
                        </div>
                    </div>
                    <div className="searchBoxes">
                                <SearchBox searchChange={this.onSearchChange} searchBy='Search by Name' className="searchBox"/>
                                <SearchBox searchChange={this.onSearchChange} searchBy='Search by Grade' className="searchBox"/>
                            </div>
                    <Card className="catalogBox">
                        <Card.Header as="h5">Course Catalog</Card.Header>
                        <Card.Body>
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
                        </Card.Body>
                    </Card>
                </div>
            );
        }
    }
}

export default CourseCatalog;