import React from 'react';
import RegistrationCard from '../registrationCard/registrationCard.component';


class RegistrationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registrations: []
        }
    }
    componentDidMount() {
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/registration')
        .then( response => response.json())
        .then(data => {
           this.setState({registrations: data});
        })
        .catch( error => {
           console.log(error);
        })  
    }

    render() {
        const {registrations} = this.state;
        return (
            <div style={{display: 'flex', margin: '25px' }}>
            {
                registrations.map((reg, i) => {
                    return (
                        <div key={i}>
                            <RegistrationCard
                                key={i}
                                openRegistration= {registrations[i].openRegistration}
                                closeRegistration= {registrations[i].closeRegistration}
                                grade= {registrations[i].gradeLevelInt}
                            />
                        </div>
                    );
                   
                })
            }    
            </div>
        );
    }

}

export default RegistrationList;