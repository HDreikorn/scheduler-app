import React, {Component} from 'react';
import axios from 'axios';
import { Form, Button, Card, ListGroup, Spinner } from 'react-bootstrap';
import './modifyCourseForm.styles.scss'

class ModifyRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courseRequest: [],
      modifyCore: false,
      modifyElective: false,
      courseToChange: '',
      courseSelected: '',
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
      coreCount: '',
      courseRequestMap: new Map(),
      isLoading: true
    }
  }

  componentDidMount() {
     // Get info of students who have registered for their courses
     fetch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/' + this.props.studentId + '/courserequest')
     .then( response => response.json())
     .then(data => {
        this.setState({courseRequest: data.courseRequest});
        this.mapCourseRequest();
     })
     .catch( error => {
        console.log(error);
     })
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
        this.setState({isLoading: false});
     })
     .catch( error => {
        console.log(error);
     })
}

mapCourseRequest = () => {
  const {courseRequest, courseRequestMap} = this.state;
  var count = 1;
  courseRequest.forEach(course=> {
    courseRequestMap.set(course.courseId, count);
    count++;
  });
}

validateChosenSubjectCredit = (courseSubject, courseCredit) => {
  const {mathCredits, englishCredits, socialScienceCredits,
          scienceCredits, physEdCredits, healthCredits, 
          electiveCredits, languageCredits} = this.state;
  if (courseSubject === "Fine Arts") {
      if (courseCredit > electiveCredits) {
          alert("Not a valid choice. You have fulfilled all credits in this subject.");
          return false;
      }
  }
  if (courseSubject === "Language") {
      if (courseCredit > languageCredits) {
          alert("Not a valid choice. You have fulfilled all credits in this subject.");
          return false;
      }
  }
  if (courseSubject === "Electives") {
      if (courseCredit > electiveCredits) {
          alert("Not a valid choice. You have fulfilled all credits in this subject.");
          return false;
      }
  }
  if (courseSubject === "Math") {
      if (courseCredit > mathCredits) {
          alert("Not a valid choice. You have fulfilled all credits in this subject.");
          return false;
      }
  }
  if (courseSubject === "Physical Education") {
      if (courseCredit > physEdCredits) {
          alert("Not a valid choice. You have fulfilled all credits in this subject.");
          return false;
      }
  }
  if (courseSubject === "Science") {
      if (courseCredit > scienceCredits) {
          alert("Not a valid choice. You have fulfilled all credits in this subject.");
          return false;
      }
  }
  if (courseSubject === "Social Science") {
      if (courseCredit > socialScienceCredits) {
          alert("Not a valid choice. You have fulfilled all credits in this subject.");
          return false;
      }
  }
  if (courseSubject === "English") {
      if (courseCredit > englishCredits) {
          alert("Not a valid choice. You have fulfilled all credits in this subject.");
          return false;
      }
  }
  if (courseSubject === "Health") {
      if (courseCredit > healthCredits) {
          alert("Not a valid choice. You have fulfilled all credits in this subject.");
          return false;
      }
  }
}

getCourseSubjectFulfillment = (courseId) => {
  const coursePicked = this.props.courses.filter(course => { 
    return (course.courseId === courseId);
  });
  return coursePicked[0].gradRequirementsThisCourseFulfills.subjectName;
}

subjectExistsInRequest = (courseId) => {
  var subject = this.getCourseSubjectFulfillment(courseId);
  const subjectFound = this.state.courseRequest.filter(course => {
    return (course.gradRequirementsThisCourseFulfills.subjectName === subject);
  })
  if(subjectFound.length > 0) {
    return true;
  }
  return false;
}

courseToChangeIsSameSubject = (courseId) => {
  var courseSelectedSubject = this.getCourseSubjectFulfillment(courseId);
  var courseToChangeSubject = this.getCourseSubjectFulfillment(parseInt(this.state.courseToChange));
  return (courseSelectedSubject === courseToChangeSubject);
}

enoughSubjectCredits = (courseId) => {
  var courseSelectedSubject = this.getCourseSubjectFulfillment(courseId);
  this.validateChosenSubjectCredit(courseSelectedSubject, 1);
}

changeHandler = (e) => {
  this.setState({[e.target.name]: e.target.value});
}

  submitHandler = (e) => {
    e.preventDefault();
    const {courseRequestMap, courseSelected, courseToChange, modifyCore} = this.state;
    // Check that both items have been selected 
    if(!(courseSelected && courseToChange)) {
      alert("Please select make sure both items have a selected choice.");
      return;
    }
    // Check for duplicate in the course request list
    if(courseRequestMap.has(parseInt(courseSelected))) {
      alert("Cannot add duplicate courses. Please pick another.");
      return;
    }
    if(modifyCore){
      // Check if subject is in the request first
      if(this.subjectExistsInRequest(parseInt(courseSelected))){
        // Check if course is in request and same subject
        if(!this.courseToChangeIsSameSubject(parseInt(courseSelected))){
          alert("Cannot modify. You must swap a course subject with the same subject.");
          return;
        }
      }
      else{
        // Check if course not in request and enough credits
        console.log(this.enoughSubjectCredits(parseInt(courseSelected)));
      }
    }

    var courseChangeObjectField = `course${courseRequestMap.get(parseInt(courseToChange))}`;
    var changeObject = {};
    changeObject[courseChangeObjectField] = parseInt(courseSelected);

    // Patch in newly selected course
    axios.patch('https://highschoolschedulingsystemapi20191019043201.azurewebsites.net/api/students/' + this.props.studentId + '/courseRequest', JSON.stringify(changeObject))
    .then(response => {
      window.location.reload(false);
    })
    .catch(error => {
      console.log(error);
      alert("Something went wrong.");
    })  
  }

  modifyCore = () => {
    this.setState({modifyCore: true});
  }

  modifyElective = () => {
    this.setState({modifyElective: true});
  }

  backToChoices = () => {
    this.setState({modifyCore: false});
    this.setState({modifyElective: false});
  }

  renderCoreCourseOptions = (courses) => {
    const coreCourses = courses.filter(course => { 
      return ((course.gradRequirementsThisCourseFulfills.subjectName === "Physical Education") 
      || (course.gradRequirementsThisCourseFulfills.subjectName === "Math")
      || (course.gradRequirementsThisCourseFulfills.subjectName === "Language")
      || (course.gradRequirementsThisCourseFulfills.subjectName === "Science")
      || (course.gradRequirementsThisCourseFulfills.subjectName === "Social Science")
      || (course.gradRequirementsThisCourseFulfills.subjectName === "English")
      || (course.gradRequirementsThisCourseFulfills.subjectName === "Health"))
  });
    var courseOptions = [];
    coreCourses.forEach(element => {
        courseOptions.push(<option value={element.courseId}>{element.courseName} ({element.gradRequirementsThisCourseFulfills.subjectName}) </option>)
    }); 
    return courseOptions;
      
  }

  renderElectiveCourseOptions = (courses) => {
    const coreCourses = courses.filter(course => { 
      return ((course.gradRequirementsThisCourseFulfills.subjectName === "Fine Arts") 
      || (course.gradRequirementsThisCourseFulfills.subjectName === "Electives"))
  });
    var courseOptions = [];
        coreCourses.forEach(element => {
            courseOptions.push(<option value={element.courseId}>{element.courseName} ({element.gradRequirementsThisCourseFulfills.subjectName})</option>)
        }); 
        return courseOptions;
  }

  renderFromSelectedListGroup = (chosenCourseNames) => {
    var listItems = [];
    var counter = 1;
    chosenCourseNames.forEach(element => {
        listItems.push(<ListGroup.Item key={element}>{counter}: {element.courseName}</ListGroup.Item>)
        counter++;
    }); 
    return listItems;
}

  renderCoreNumberOptions = (courseRequest) => {
    const coreCourses = courseRequest.filter(course => { 
      return ((course.gradRequirementsThisCourseFulfills.subjectName === "Physical Education") 
      || (course.gradRequirementsThisCourseFulfills.subjectName === "Math")
      || (course.gradRequirementsThisCourseFulfills.subjectName === "Language")
      || (course.gradRequirementsThisCourseFulfills.subjectName === "Science")
      || (course.gradRequirementsThisCourseFulfills.subjectName === "Social Science")
      || (course.gradRequirementsThisCourseFulfills.subjectName === "English")
      || (course.gradRequirementsThisCourseFulfills.subjectName === "Health"))
    });
    var courseOptions = [];
    coreCourses.forEach(element => {
        courseOptions.push(<option value={element.courseId}>{element.courseName} ({element.gradRequirementsThisCourseFulfills.subjectName})</option>)
    });
    return courseOptions;
  }

  renderElectiveNumberOptions = (courseRequest) => {
    const coreCourses = courseRequest.filter(course => { 
      return ((course.gradRequirementsThisCourseFulfills.subjectName === "Fine Arts") 
      || (course.gradRequirementsThisCourseFulfills.subjectName === "Electives"))
  });
    var courseOptions = [];
    coreCourses.forEach(element => {
        courseOptions.push(<option value={element.courseId}>{element.courseName} ({element.gradRequirementsThisCourseFulfills.subjectName})</option>)
    }); 
    return courseOptions;
  }

  render() {
    const {courseRequest, modifyCore, modifyElective, isLoading} = this.state;
    if(isLoading) {
      return (
        <div className="modifyBody">
          <div className="centerContent">
            <p>Loading...</p>
            <Spinner animation="border" variant="info" />
          </div>
        </div>
      );
    }
    else{
      if(!modifyCore && !modifyElective) {
        return (
            <div className="modifyBody">
              <div className="centerContent">
                <Card style={{ width: '25rem', margin: '15px', textAlign: "left" }}>
                  <Card.Header>Selected Courses</Card.Header>
                  <ListGroup variant="flush">
                      { this.renderFromSelectedListGroup(courseRequest) }
                  </ListGroup>
                </Card>
                <div>
                  <Button variant="info" onClick={this.modifyCore}>Modify <b>Core</b> Course</Button>
                  <Button variant="primary" onClick={this.modifyElective}>Modify <b>Elective/Fine Arts</b> Course</Button>
                </div>
              </div>
            </div>
        );
      }
      else if(modifyCore){
        return(
        <div className="modifyBody"> 
        <div className="centerContent">
        <Card style={{ width: '25rem', margin: '15px', textAlign: "left" }}>
            <Card.Header>Selected Courses</Card.Header>
            <ListGroup variant="flush">
                { this.renderFromSelectedListGroup(courseRequest) }
            </ListGroup>
        </Card>
            <Card body>
                <Form onSubmit={this.submitHandler}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Course to change:</Form.Label>
                  <Form.Control as="select" onChange={this.changeHandler} name="courseToChange">
                    <option>-Select Course Number-</option>
                    { this.renderCoreNumberOptions(courseRequest) }
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>New Course:</Form.Label>
                  <Form.Control as="select" onChange={this.changeHandler} name="courseSelected">
                    <option>-Select Course-</option>
                    {this.renderCoreCourseOptions(this.props.courses)}
                  </Form.Control>
                </Form.Group>
                <Button variant="info" type="submit">Make Change</Button>
              </Form>
            </Card>
            <Button variant="secondary" onClick={this.backToChoices}>Back to choices</Button>
          </div>
        </div>        
        );
      }
      else if (modifyElective){
        return(
          <div className="modifyBody"> 
          <div className="centerContent">
          <Card style={{ width: '25rem', margin: '15px', textAlign: "left" }}>
              <Card.Header>Selected Courses</Card.Header>
              <ListGroup variant="flush">
                  { this.renderFromSelectedListGroup(courseRequest) }
              </ListGroup>
          </Card>
              <Card body>
              <Form onSubmit={this.submitHandler}>
                <Form.Group controlId="exampleForm.ControlSelect2">
                  <Form.Label>Course to change:</Form.Label>
                  <Form.Control as="select" onChange={this.changeHandler} name="courseToChange">
                    <option>-Select Course Number-</option>
                    { this.renderElectiveNumberOptions(courseRequest) }
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>New Course:</Form.Label>
                  <Form.Control as="select" onChange={this.changeHandler} name="courseSelected">
                    <option>-Select Course-</option>
                    {this.renderElectiveCourseOptions(this.props.courses)}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Make Change</Button>
              </Form>
              </Card>
              <Button variant="secondary" onClick={this.backToChoices}>Back to choices</Button>
            </div>
          </div>
        );
      }
    }
  }
}

export default ModifyRequest;


