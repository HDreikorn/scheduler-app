import React from 'react';
import { Table } from 'react-bootstrap';
import './courseHistory.styles.scss';

class CourseHistoryTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseHistory: [],
            title: props.title
        }
    }

    componentDidMount() {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/'
         + this.props.studentId + '/coursehistory')
         .then( response => response.json())
         .then(data => {
            this.setState({courseHistory: data.courseHistory});
         })
         .catch( error => {
            console.log(error);
         })
    }

    getLetterGrade = (courseGrade) => {
        if(courseGrade === 4) {
            return 'A';
        }
        else if(courseGrade === 3) {
            return 'B';
        }
        else if(courseGrade === 2) {
            return 'C';
        }
        else if(courseGrade === 1) {
            return 'D';
        }
        else if(courseGrade === 0) {
            return 'F';
        }
        else {
            return 'Grade Not Found';
        }
    }

    renderTableData() {
        return this.state.courseHistory.map((course, index) => {
           const { courseId, courseName, courseSubject, schoolYear, credit, courseGrade } = course //destructuring
           return (
              <tr key={courseId}>
                 <td>{courseName}</td>
                 <td>{courseSubject}</td>
                 <td>{schoolYear}</td>
                 <td>{this.getLetterGrade(courseGrade)}</td>
              </tr>
           )
        })
     }

    render() {
        const { title, courseHistory } = this.state;
        if (courseHistory.length === 0){
            return (
            <div className='courseHistoryTable'>
                <p>No course history on your account.</p>
            </div>
            );
        }
        else {
            return (
                <div className='courseHistoryTable'>
                <h1>{ title }</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Subject</th>
                                <th>School Year</th>
                                <th>Grade</th>
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

export default CourseHistoryTable;