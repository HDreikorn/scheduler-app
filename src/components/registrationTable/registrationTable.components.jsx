import React from 'react';
import axios from 'axios';
import { Table, ListGroup, Card, Button, Alert, Badge } from 'react-bootstrap';
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
            classSet: this.props.classSet,
            confirmedCore: false,
            confirmedElective: false,
        }
    }

    componentDidMount() {
        this.getCourseRequestData();
        this.getCourseHistoryData();
    }

    getCourseRequestData = () => {
        // Get info of students who have registered for their courses
        fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/' + this.props.studentId + '/courserequest')
        .then( response => response.json())
        .then(data => {
        this.setState({hasSubmited: true});
        })
        .catch( error => {
        console.log(error);
        })
    }

    getCourseHistoryData = () => {
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
    }

    getClassSet = (gradeInt) => {
        var freshmanSet = new Map([["English", 1], ["Math", 1], ["Science", 1], ["Language", 1], ["Physical Education", 1], ["Health", 1], ["Fine Arts", 4], ["Electives", 4]]);
        var sophmoreSet = new Map([["English", 1], ["Math", 1], ["Science", 1], ["Language", 1], ["Social Science", 1], ["Physical Education", 1], ["Health", 1], ["Fine Arts", 4], ["Electives", 4]]);
        var juniorSet = new Map([["English", 1], ["Math", 1], ["Science", 1], ["Language", 1], ["Social Science", 1], ["Physical Education", 1], ["Health", 1], ["Fine Arts", 4], ["Electives", 4]]);
        var seniorSet = new Map([["English", 1], ["Math", 1], ["Science", 2], ["Social Science", 1], ["Physical Education", 1], ["Health", 1], ["Fine Arts", 4], ["Electives", 4]]);
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
            if (courseCredit > electiveCredits) {
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
        const { choseCourseMap, courses, count } = this.state;
        choseCourseMap.delete(key);
        this.setState({choseCourseMap: choseCourseMap});
        // Find the course and put back the credit
        const deletedCourse = courses.filter(course => { 
            return course.courseId === key;
        })
        this.increaseCreditCount(deletedCourse[0].gradRequirementsThisCourseFulfills.subjectName, deletedCourse[0].courseCredit);
        var countSubtract = count - 1;
        this.setState({count: countSubtract})
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

    renderConfirmedListGroup = (chosenCourseNames) => {
        var listItems = [];
        var itemCount = 0;
        chosenCourseNames.forEach((value, key) => {
            if(itemCount <= 3){
                listItems.push(<ListGroup.Item key={key}>{value}
                <Badge pill variant="primary">Confirmed</Badge>
                </ListGroup.Item>)
            }
            else if(itemCount > 3){
                listItems.push(<ListGroup.Item key={key}>{value}
                <Button className="removeButton" variant="outline-danger" onClick={() => this.removeClass(key)}>Remove</Button>
                </ListGroup.Item>)
            }
            itemCount++;
        }); 
        return listItems;
    }

    renderFinalListGroup = (chosenCourseNames) => {
        var listItems = [];
        var itemCount = 0;
        chosenCourseNames.forEach((value, key) => {
            if(itemCount <= 3){
                listItems.push(<ListGroup.Item key={key}>{value}
                <Badge pill variant="primary">Confirmed</Badge>
                </ListGroup.Item>)
            }
            else if(itemCount > 3){
                listItems.push(<ListGroup.Item key={key}>{value}
                </ListGroup.Item>)
            }
            itemCount++;
        }); 
        return listItems;
    }

    confirmCoreSelection = () => {
        this.setState({confirmedCore: true});
    }

    render() {
        const {courses, count, hasSubmited, choseCourseMap, confirmedCore, classSet} = this.state;
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
                        <h5>Courses submitted click below to modify.</h5>
                        <p>If a course subject is already in your selection list then that course must be swapped with
                        another course of the same subject.
                        For example, if you have a Science course and a Language course in your selection list already, Chemistry can switch with Physics,
                         but Physics cannot switch with Spanish. 
                        Please keep this in mind when making your selections. However, this restriction does not apply for Fine Arts or Elective courses.</p>
                        <ModifyRequest courses={courses} studentId={this.props.studentId} classSet={classSet}/>
                    </div>
                </div>
                );
        }
        else if (count >= 8) {
            return (
                <div >
                    <div>
                        <Alert variant="success">
                            All courses selected. Please submit now confirm all your course selections. You can modify at any point after submission.
                        </Alert>
                    </div>
                    <div className='registrationTable'>
                        <div className='centerContent'>
                            <Card style={{ width: '25rem', margin: '15px', textAlign: "left" }}>
                                <Card.Header>Selected Courses</Card.Header>
                                <ListGroup variant="flush">
                                    { this.renderFinalListGroup(choseCourseMap) }
                                </ListGroup>
                            </Card>
                            <Button variant="info" onClick={this.submitCourses}>Submit Request</Button>
                        </div>
                    </div>
                </div>   
            );
        }
        else if (count > 3 && confirmedCore) {
            const fineArtsOrElectives = courses.filter(course => { 
                return ((course.gradRequirementsThisCourseFulfills.subjectName === "Fine Arts") 
                || (course.gradRequirementsThisCourseFulfills.subjectName === "Electives"))
            })
            return (
                <div>
                <p>You must select <b>8</b> courses to register for the next school year.
                        The course options you are allowed to pick are based on your credits completed
                        versus how much you need to graduate. You can see that information in the <b>My Information </b> 
                        tab under the <b>Graduation Credits</b> table. We encourage you to look at the course catalog for more 
                        information on the courses offered. Happy pickings!</p>
                <h4>Next, choose 4 Fine Arts or Elective classes.</h4>
                <div className="selectionSection">
                    <Card style={{ width: '25rem', margin: '15px', textAlign: "left" }}>
                        <Card.Header>Selected Courses</Card.Header>
                        <ListGroup variant="flush">
                            { this.renderConfirmedListGroup(choseCourseMap) }
                        </ListGroup>
                    </Card>
                    <Card body>
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
                                { this.renderTableData(fineArtsOrElectives) }
                            </tbody>
                        </Table>
                    </Card>
                </div>
                </div>
            );
        }
        else if(!confirmedCore && (count > 3)) {
            return (
                <div>
                    <h4>Confirm this selection and move on to select elective and fine arts?</h4>
                    <Card style={{ width: '25rem', margin: '15px', textAlign: "left" }}>
                        <Card.Header>Selected Courses</Card.Header>
                        <ListGroup variant="flush">
                            { this.renderListGroup(choseCourseMap) }
                        </ListGroup>
                    </Card>
                    <Button variant="outline-success" onClick={this.confirmCoreSelection}>Proceed</Button>
                </div>
            );
        }
        else {
            const notFineArtsOrElectives = courses.filter(course => { 
                return ((course.gradRequirementsThisCourseFulfills.subjectName === "Physical Education") 
                || (course.gradRequirementsThisCourseFulfills.subjectName === "Math")
                || (course.gradRequirementsThisCourseFulfills.subjectName === "Language")
                || (course.gradRequirementsThisCourseFulfills.subjectName === "Science")
                || (course.gradRequirementsThisCourseFulfills.subjectName === "Social Science")
                || (course.gradRequirementsThisCourseFulfills.subjectName === "English")
                || (course.gradRequirementsThisCourseFulfills.subjectName === "Health"))
            });
            return (
                <div>
                <p>You must select <b>8</b> courses to register for the next school year.
                        The course options you are allowed to pick are based on your credits completed
                        versus how much you need to graduate. You can see that information in the <b>My Information </b> 
                        tab under the <b>Graduation Credits</b> table. We encourage you to look at the course catalog for more 
                        information on the courses offered. Happy pickings!</p>
                <h4>First, choose 4 core classes first.</h4>
                <div className="selectionSection">
                    <Card style={{ width: '25rem', margin: '15px', textAlign: "left" }}>
                        <Card.Header>Selected Courses</Card.Header>
                        <ListGroup variant="flush">
                            { this.renderListGroup(choseCourseMap) }
                        </ListGroup>
                    </Card>
                    <Card body>
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
                                { this.renderTableData(notFineArtsOrElectives) }
                            </tbody>
                        </Table>
                    </Card>
                </div>
                </div>
            );
        }
    }
}

export default RegistrationTable;