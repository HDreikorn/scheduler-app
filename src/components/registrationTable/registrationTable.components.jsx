import React from 'react';
import axios from 'axios';
import { Table, ListGroup, Card, Button, Alert } from 'react-bootstrap';
import SearchBox from '../searchBox/searchBox.component';
import ModifyRequest from '../modifyCourseForm/modifyCourseForm.component';
import './registrationTable.styles.scss';

class RegistrationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            searchfield: '',
            count: 0,
            gradeLevel: '',
            hasSubmited: this.props.hasSubmited,
            choseCourseMap: new Map(),
            mathCredits: "",
            englishCredits: "",
            socialScienceCredits: "",
            scienceCredits: "",
            physEdCredits: "",
            healthCredits: "",
            electiveCredits: "",
            fineArtsCredits: "",
            languageCredits: "",
            classSet: this.props.classSet
        }
    }

    componentDidMount() {
        // Get course data
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/' + this.props.studentId + '/coursehistory')
         .then( response => response.json())
         .then(data => {
            this.setState({gradeLevel: data.gradeLevelInt});
            this.setState({courses: data.eligibleCourses});
            this.setState({mathCredits: data.mathSummary.creditsNeeded});
            this.setState({englishCredits: data.englishSummary.creditsNeeded});
            this.setState({socialScienceCredits: data.socialScienceSummary.creditsNeeded});
            this.setState({scienceCredits: data.scienceSummary.creditsNeeded});
            this.setState({physEdCredits: data.physicalEducationSummary.creditsNeeded});
            this.setState({healthCredits: data.healthSummary.creditsNeeded});
            this.setState({fineArtsCredits: data.fineArtsSummary.creditsNeeded});
            this.setState({electiveCredits: data.electiveSummary.creditsNeeded});
            this.setState({languageCredits: data.languageSummary.creditsNeeded});
            this.getClassSet(this.state.gradeLevel);
         })
         .catch( error => {
            console.log(error);
         })
         // Get info of students who have registered for their courses
         fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/' + this.props.studentId + '/courserequest')
         .then( response => response.json())
         .then(data => {
            this.setState({eligibleCourses: data.eligibleCourses});
            this.setState({hasSubmited: true});
         })
         .catch( error => {
            console.log(error);
         })
    }

    getClassSet = (gradeInt) => {
        var freshmanSet = new Map([["English", 1], ["Math", 1], ["Science", 1], ["Language", 1], ["Physical Education", 1], ["Health", 1], ["Fine Arts", 2], ["Electives", 2]]);
        var sophmoreSet = new Map([["English", 1], ["Math", 1], ["Science", 1], ["Language", 1], ["Social Science", 1], ["Physical Education", 1], ["Health", 1], ["Fine Arts", 2], ["Electives", 2]]);
        var juniorSet = new Map([["English", 1], ["Math", 1], ["Science", 1], ["Language", 1], ["Social Science", 1], ["Physical Education", 1], ["Health", 1], ["Fine Arts", 2], ["Electives", 2]]);
        var seniorSet = new Map([["English", 1], ["Math", 1], ["Science", 2], ["Social Science", 1], ["Physical Education", 1], ["Health", 1], ["Fine Arts", 1], ["Electives", 2]]);
        if (gradeInt === 9 ) {
            this.setState({classSet:freshmanSet});
        }
        else if (gradeInt === 10) {
            this.setState({classSet:sophmoreSet});
        }
        else if (gradeInt === 11) {
            this.setState({classSet:juniorSet});
        }
        else if (gradeInt === 12) {
            this.setState({classSet:seniorSet});
        }
    }


    renderTableData(coursesToRender) {
        return coursesToRender.map((course, index) => {
           const { courseId, courseCode, courseName, courseCredit, gradRequirementsThisCourseFulfills} = course; //destructuring
           return (
              <tr key={courseId}>
                 <td>{courseCode}</td>
                 <td>{courseName}</td>
                 <td>{courseCredit}</td>
                 <td>{gradRequirementsThisCourseFulfills.subjectName}</td>
                 <td><Button variant="info" onClick={() => this.addClassToList(courseId, courseName, gradRequirementsThisCourseFulfills.subjectName, courseCredit)}>+</Button></td>
              </tr>
           )
        })
     }

     validateCourseChoice = (courseSubject) => {
         const {classSet} = this.state;
         var isValid = false;
         // Go through class set if in there and greater than zero, it is valid.
        classSet.forEach(function(value, key) {
            if(key === courseSubject && value > 0) {
                // Deacrese the value by 1, so if 1 cannot be added again.
                classSet.set(key, value-1);
                isValid = true;
                return;
            }
        });
         return isValid;
     }

    validateChosenSubjectCredit = (courseSubject, courseCredit) => {
        const {mathCredits, englishCredits, socialScienceCredits,
                scienceCredits, physEdCredits, healthCredits, 
                electiveCredits, fineArtsCredits, languageCredits} = this.state;

        if (courseSubject === "Fine Arts") {
            if (courseCredit > fineArtsCredits) {
                alert("Not a valid choice. You have fulfilled all credits in this subject.");
                return false;
            }
            else {
                if(this.validateCourseChoice(courseSubject)) {
                    this.setState({fineArtsCredits: fineArtsCredits - courseCredit});
                    return true;
                }
                else{
                    alert("Choose another course to add. Make sure to add all core courses.");
                    return false;
                }
            }
        }
        if (courseSubject === "Language") {
            if (courseCredit > languageCredits) {
                alert("Not a valid choice. You have fulfilled all credits in this subject.");
                return false;
            }
            else {
                if(this.validateCourseChoice(courseSubject)) {
                    this.setState({languageCredits: languageCredits - courseCredit});
                    return true;
                }
                else{
                    alert("Choose another course to add. Make sure to add all core courses.");
                    return false;
                }
            }
        }
        if (courseSubject === "Electives") {
            if (courseCredit > electiveCredits) {
                alert("Not a valid choice. You have fulfilled all credits in this subject.");
                return false;
            }
            else {
                if(this.validateCourseChoice(courseSubject)) {
                    this.setState({electiveCredits: electiveCredits - courseCredit});
                    return true;
                }
                else{
                    alert("Choose another course to add. Make sure to add all core courses.");
                    return false;
                }
            }
        }
        if (courseSubject === "Math") {
            if (courseCredit > mathCredits) {
                alert("Not a valid choice. You have fulfilled all credits in this subject.");
                return false;
            }
            else {
                if(this.validateCourseChoice(courseSubject)) {
                    this.setState({mathCredits: mathCredits - courseCredit});
                    return true;
                }
                else{
                    alert("Choose another course to add. Make sure to add all core courses.");
                    return false;
                }
            }    
        }
        if (courseSubject === "Physical Education") {
            if (courseCredit > physEdCredits) {
                alert("Not a valid choice. You have fulfilled all credits in this subject.");
                return false;
            }
            else {
                if(this.validateCourseChoice(courseSubject)) {
                    this.setState({physEdCredits: physEdCredits - courseCredit});
                    return true;
                }
                else{
                    alert("Choose another course to add. Make sure to add all core courses.");
                    return false;
                }
            }
        }
        if (courseSubject === "Science") {
            if (courseCredit > scienceCredits) {
                alert("Not a valid choice. You have fulfilled all credits in this subject.");
                return false;
            }
            else {
                if(this.validateCourseChoice(courseSubject)) {
                    this.setState({scienceCredits: scienceCredits - courseCredit});
                    return true;
                }
                else{
                    alert("Choose another course to add. Make sure to add all core courses.");
                    return false;
                }
            }
        }
        if (courseSubject === "Social Science") {
            if (courseCredit > socialScienceCredits) {
                alert("Not a valid choice. You have fulfilled all credits in this subject.");
                return false;
            }
            else {
                if(this.validateCourseChoice(courseSubject)) {
                    this.setState({socialScienceCredits: socialScienceCredits - courseCredit});
                    return true;
                }
                else{
                    alert("Choose another course to add. Make sure to add all core courses.");
                    return false;
                }
            }
        }
        if (courseSubject === "English") {
            if (courseCredit > englishCredits) {
                alert("Not a valid choice. You have fulfilled all credits in this subject.");
                return false;
            }
            else {
                if(this.validateCourseChoice(courseSubject)) {
                    this.setState({englishCredits: englishCredits - courseCredit});
                    return true;
                }
                else{
                    alert("Choose another course to add. Make sure to add all core courses.");
                    return false;
                }
            }
        }
        if (courseSubject === "Health") {
            if (courseCredit > healthCredits) {
                alert("Not a valid choice. You have fulfilled all credits in this subject.");
                return false;
            }
            else {
                if(this.validateCourseChoice(courseSubject)) {
                    this.setState({healthCredits: healthCredits - courseCredit});
                    return true;
                }
                else{
                    alert("Choose another course to add. Make sure to add all core courses.");
                    return false;
                }
            }
        }
     }

    addClassToList(courseId, courseName, courseSubject, courseCredit) {
        const { count, choseCourseMap} = this.state;

        // Check for duplicate selection
        var isDuplicate = choseCourseMap.has(courseId);
        var canAdd = !isDuplicate;

        if(count > 6) {
            canAdd = true;
        }
        else if (!isDuplicate){
            canAdd = this.validateChosenSubjectCredit(courseSubject, courseCredit);
        }

        if(canAdd) {
            choseCourseMap.set(courseId, courseName);
            // set count state
            var newCount = count + 1;
            this.setState({count:newCount})
            }
        else {
            // Set state to show badge with message.
            if(isDuplicate){
                alert("Cannot add a duplicate course. Choose another.");
            }
            console.log("course was not validated, not adding.");
        }
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    handleModify = (event) => {
        event.preventDefault();
    }

    turnMapIntoObjectofIds = () => {
        var courseIds ={}
        var count = 1;
        this.state.choseCourseMap.forEach((value, key) => {
            var courseName = 'course' + count;
            courseIds[courseName] = key;
            count++;
        });
        console.log(courseIds);
        return courseIds;
    }

    submitCourses = (event) => {
        event.preventDefault();
        // Convert chosen course ids in JSON object
        var jsonIds = JSON.stringify(this.turnMapIntoObjectofIds());

        //Axios call to send choseCourseIds state object
        axios.post('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/' + this.props.studentId + '/courseRequest', jsonIds)
        .then(response => {
            alert("Successfully submited.");
            this.setState({hasSubmited: true});
        })
        .catch(error => {
            if(error.response.status === 400) {
                alert("Request already made. Please go to modify your current request.");
                this.setState({hasSubmited: true});
            }
            else {
                alert("Something went wrong.");
            }
        });
    }

    increaseCreditCount = (deletedSubject, courseCredit) => {
        const {mathCredits, englishCredits, socialScienceCredits,
            scienceCredits, physEdCredits, healthCredits, 
            electiveCredits, fineArtsCredits, languageCredits, classSet} = this.state;
        if (deletedSubject === "Fine Arts") {
            this.setState({fineArtsCredits: fineArtsCredits + courseCredit});
        }
        if (deletedSubject === "Language") {
            this.setState({languageCredits: languageCredits + courseCredit});

        }
        if (deletedSubject === "Electives") {
            this.setState({electiveCredits: electiveCredits + courseCredit});
        }
        if (deletedSubject === "Math") {
            this.setState({mathCredits: mathCredits + courseCredit});
        }
        if (deletedSubject === "Physical Education") {
            this.setState({physEdCredits: physEdCredits + courseCredit});
        }
        if (deletedSubject === "Science") {
            this.setState({scienceCredits: scienceCredits + courseCredit});
        }
        if (deletedSubject === "Social Science") {
            this.setState({socialScienceCredits: socialScienceCredits + courseCredit});
        }
        if (deletedSubject === "English") {
            this.setState({englishCredits: englishCredits + courseCredit});
        }
        if (deletedSubject === "Health") {
            this.setState({healthCredits: healthCredits + courseCredit});
        }

        //Increase class set count too
        classSet.forEach(function(value, key) {
            if(key === deletedSubject) {
                classSet.set(key, value+1);
                return;
            }
        });
    }

    removeClass = (key) => {
        const { choseCourseMap, courses } = this.state;
        choseCourseMap.delete(key);
        this.setState({choseCourseMap: choseCourseMap});
        // Find the course and put back the credit
        const deletedCourse = courses.filter(course => { 
            return course.courseId === key;
        })
        this.increaseCreditCount(deletedCourse[0].gradRequirementsThisCourseFulfills.subjectName, deletedCourse[0].courseCredit);
    }

    renderListGroup = (chosenCourseNames) => {
        var listItems = [];
        chosenCourseNames.forEach((value, key) => {
            listItems.push(<ListGroup.Item key={key}>{value}
            <Button className="removeButton" variant="outline-danger" onClick={() => this.removeClass(key)}>Remove</Button>
            </ListGroup.Item>)
        }); 
        return listItems;
    }

    render() {
        const {courses, searchfield, count, hasSubmited, choseCourseMap} = this.state;
        const filteredCourses = courses.filter(course => { 
            return course.courseName.toLowerCase().includes(searchfield.toLocaleLowerCase());
        })
        if (courses.length === 0){
            return (
            <div className=''>
                <p>Registration form is not available.</p>
            </div>
            );
        }
        else if (hasSubmited) {
            return (
                <div className='registrationTable'>
                    <div className='centerContent'>
                        <p>Courses submitted click below to modify.</p>
                        <ModifyRequest courses={courses} studentId={this.props.studentId}/>
                    </div>
                </div>
                );
        }
        else if (count >= 8) {
            return (
                <div>
                    <div>
                        <Alert variant="success">
                            All courses selected. Please submit now. You can modify at any point after submission.
                        </Alert>
                    </div>
                    <Card style={{ width: '18rem', margin: '25px' }}>
                        <Card.Header>Selected Courses</Card.Header>
                        <ListGroup variant="flush">
                            { this.renderListGroup(choseCourseMap) }
                        </ListGroup>
                    </Card>
                    <Button variant="info" onClick={this.submitCourses}>Submit Request</Button>
                </div>   
            );
        }
        else {
            return (
                <div className=''>
                <p>You must select <b>8</b> courses to register for the next school year.
                        The course options you are allowed to pick are based on your credits completed
                        versus how much you need to graduate. You can see that information in the <b>My Information </b> 
                        tab under the <b>Graduation Credits</b> table. We encourage you to look at the course catalog for more 
                        information on the courses offered. Happy pickings!</p>
                <SearchBox searchChange={this.onSearchChange} searchBy='Search by Name'/>
                <Card style={{ width: '18rem', margin: '15px' }}>
                    <Card.Header>Selected Courses</Card.Header>
                    <ListGroup variant="flush">
                        { this.renderListGroup(choseCourseMap) }
                    </ListGroup>
                </Card>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Credit</th>
                            <th>Subject Fulfillment</th>
                            <th>Add To Worksheet</th>
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

export default RegistrationTable;