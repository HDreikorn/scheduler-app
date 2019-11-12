import React from 'react';
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
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/courses/filtered?grade=' + grade)
         .then( response => response.json())
         .then(data => {
            this.setState({filterFetchedCourses : data});
         })
         .catch( error => {
            console.log(error);
         })
    }

    getCoursesBySubject(subject) {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/courses/filtered?subject='  + subject)
        .then( response => response.json())
        .then(data => {
           this.setState({filterFetchedCourses: data});
        })
        .catch( error => {
           console.log(error);
        })
    }

    getCoursesByGradeAndSubject(grade, subject) {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/courses/filtered?grade=' + grade + '&subject=' + subject)
        .then( response => response.json())
        .then(data => {
           this.setState({filterFetchedCourses: data});
        })
        .catch( error => {
           console.log(error);
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
        if(filterGrade !== '' && filterSubject !== '') {
            this.getCoursesByGradeAndSubject(filterGrade, filterSubject);
            this.setState({isFilterFetched:true});
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
        this.setState({isFilterFetched: false});
        this.setState({filterSubject: ''});
        this.setState({filterGrade: ''});
    }

    render() {
        const {courses, searchfield, isFilterFetched, filterFetchedCourses } = this.state;

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
        else if (isFilterFetched) {
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
                    <h1>Course Catalog</h1>
                    <Button variant="danger" onClick={this.onBackToUnfilter}>Go Back to Full List</Button>
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
                                <SearchBox searchChange={this.onSearchChange} searchBy='Search by Name'/>
                                <SearchBox searchChange={this.onSearchChange} searchBy='Search by Grade'/>
                            </div>
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