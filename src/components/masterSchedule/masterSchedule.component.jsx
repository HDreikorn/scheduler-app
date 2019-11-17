import React from 'react';
import MasterTableCard from '../masterTableCard/masterTableCard.compnent';
import './masterSchedule.styles.scss';

class MasterSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            period1: '',
            period2: '',
            period3: '',
            period4: '',
            period5: '',
            period6: '',
            period7: '', 
            classSections: []
        }
    }

    componentDidMount() {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/schedule/master')
         .then( response => response.json())
         .then(data => {
            this.setState({period1: data.period1.classSections});
            this.setState({period2: data.period2.classSections});
            this.setState({period3: data.period3.classSections});
            this.setState({period4: data.period4.classSections});
            this.setState({period5: data.period5.classSections});
            this.setState({period6: data.period6.classSections});
            this.setState({period7: data.period7.classSections});
            this.setClassSections();
         })
         .catch( error => {
            console.log(error);
         })
    }

     setClassSections = () => {
        const { classSections, period1, period2, period3, period4, period5, period6, period7 } = this.state;
        classSections.push(period1);
        classSections.push(period2);
        classSections.push(period3);
        classSections.push(period4);
        classSections.push(period5);
        classSections.push(period6);
        classSections.push(period7);
     }

    render() {
        const { classSections } = this.state;
        
        return (
            <div>
                <h1>Master Schedule</h1>
                <div className="tableGrid">
                    {
                        classSections.map((classSectionsArr, i) => {
                            return (
                                <div key={i}>
                                    <MasterTableCard
                                        key = {i}
                                        period = {i+1}
                                        classSet = {classSectionsArr}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default MasterSchedule;