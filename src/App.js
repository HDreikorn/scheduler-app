import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';
import StudentDash from './pages/studentDash/studentDash.component';
import StudentLogin from './pages/studentLogin/studentLogin.component';
import AdminLogin from './pages/adminLogin/adminLogin.component';
import AdminDash from './pages/adminDash/adminDash.component';
import StudentCourseCatalog from './pages/courseCatalog/courseCatalog.component';
import RegistrationForm from './pages/registration/registrationForm.components';
import StudentSchedule from './pages/studentSchedule/studentSchedule.component'


function App() {
  return(
    <div>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/students/login' component={StudentLogin} />
        <Route path='/schoolAdmin/login' component={AdminLogin} />
        <Route exact path='/students/:studentId' component={StudentDash} />
        <Route exact path='/students/:studentId/register' component={RegistrationForm} />
        <Route exact path='/students/:studentId/courseCatalog' component={StudentCourseCatalog} />
        <Route exact path='/students/:studentId/schedule' component={StudentSchedule} />
        <Route path='/schoolAdmin/:username' component={AdminDash} />
      </Switch>
    </div>
  );
}

export default App;
