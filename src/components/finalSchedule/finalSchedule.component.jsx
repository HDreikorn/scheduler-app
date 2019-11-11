import React from 'react';
import { Table } from 'react-bootstrap';

class FinalScheduleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullList: [],
        }
    }

    componentDidMount() {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/'
         + this.props.studentId + '/schedule')
         .then( response => response.json())
         .then(data => {
            this.setState({fullList: data.currentSchedule.fullList});
         })
         .catch( error => {
            console.log(error);
         })
    }


    renderTableData() {
        return this.state.fullList.map((course, index) => {
           const { classPeriod, sectionId, courseDetails } = course //destructuring
           return (
              <tr key={classPeriod}>
                <td>{classPeriod + 1}</td>
                <td>{sectionId}</td>
                <td>{courseDetails.courseName}</td>
              </tr>
           )
        })
     }

    render() {
        const { fullList } = this.state;
        let result = fullList.map(a => a.classPeriod + 1);
        console.log(result);
        if (fullList.length === 0){
            return (
            <div>
                <p>No course has been built for your account yet. Make sure you have submitted your course request form.</p>
            </div>
            );
        }
        else {
            return (
                <div >
                <h1>Current Schedule</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Period</th>
                                <th>Section</th>
                                <th>Course Name</th>
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

export default FinalScheduleTable;