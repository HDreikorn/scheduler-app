import React from 'react';
import { Table } from 'react-bootstrap';

class CreditTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectCreditSummaries: [],
            title: props.title
        }
    }

    componentDidMount() {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/'
         + this.props.studentId + '/coursehistory')
         .then( response => response.json())
         .then(data => {
            this.setState({subjectCreditSummaries: data.subjectCreditSummaries});
         })
         .catch( error => {
            console.log(error);
         })
    }


    renderTableData() {
        return this.state.subjectCreditSummaries.map((subjectSummary, index) => {
           const { subject, creditsCompleted, creditsNeeded } = subjectSummary //destructuring
           return (
              <tr key={subject}>
                 <td>{subject}</td>
                 <td>{creditsCompleted}</td>
                 <td>{creditsNeeded}</td>
              </tr>
           )
        })
     }

    render() {
        const { title, subjectCreditSummaries } = this.state;
        if (subjectCreditSummaries.length === 0){
            return (
            <div className='subjectSummaries'>
                <p>No credit summary on your account.</p>
            </div>
            );
        }
        else {
            return (
                <div className='subjectSummaries'>
                <h1>{ title }</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Completed</th>
                                <th>Needed</th>
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

export default CreditTable;