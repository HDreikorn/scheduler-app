import React from 'react';
import axios from 'axios';
import MasterTableCard from '../masterTableCard/masterTableCard.compnent';
import './masterSchedule.styles.scss';
import { Accordion, Spinner } from 'react-bootstrap';

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
            classSections: [],
            isLoaded: false,
            noClassesBuilt: false
        }
    }

    componentDidMount() {
        axios.get('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/schedule/master')
         .then(response => {
            this.setState({period1: response.data.period1.classSections});
            this.setState({period2: response.data.period2.classSections});
            this.setState({period3: response.data.period3.classSections});
            this.setState({period4: response.data.period4.classSections});
            this.setState({period5: response.data.period5.classSections});
            this.setState({period6: response.data.period6.classSections});
            this.setState({period7: response.data.period7.classSections});
            this.setClassSections();
         })
         .catch( error => {
            if (error.response.status === 404 ){
                this.setState({noClassesBuilt: true});
                this.setState({isLoaded: true});
            }
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
        this.setState({isLoaded: true});
     }

    render() {
        const { classSections, isLoaded, noClassesBuilt } = this.state;
        
        if(isLoaded) {
            if(noClassesBuilt){
                return (
                    <div>
                        <p>No classes built.</p>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <h1>Master Schedule</h1>
                        <div className="tableGrid">
                            {
                                classSections.map((classSectionsArr, i) => {
                                    return (
                                        <div key={i}>
                                            <Accordion className='baseCenter'>
                                            <MasterTableCard
                                                    key = {i}
                                                    period = {i+1}
                                                    classSet = {classSectionsArr}
                                                    className="centerItems"
                                                />
                                            </Accordion>  
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                );
            }
        }
        else {
            return (
                <div className="baseCenter">
                    <p className="centerItems">Loading <Spinner animation="grow" /></p>
                </div>
            )
        }
    }
}

export default MasterSchedule;