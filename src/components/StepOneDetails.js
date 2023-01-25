import React from "react";
import { writeUserData } from "../database/WriteUserData";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import EmailVerification from "./StepTwoEmailVerification";

// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom';



//returns formatted current date (2022-11-03) (yyyy-mm-dd)
function currentDateFun() {
  var today = new Date();
  let day = today.getDate();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let year = today.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  return currentDate;
}

//returns age from dob
function getAge(dateString) {
  const todaysDate = new Date(currentDateFun());
  var birthDate = new Date(dateString);
  var age = todaysDate.getFullYear() - birthDate.getFullYear();
  var m = todaysDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && todaysDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default class GeneralInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      firstName: "",
      lastName: "",
      fatherName: "",
      dob: "",
      gender: "male",
      occupation: "",
      currentAddress: "",
      nativeAddress: "",
      formErrors: {
        firstName: "",
        lastName: "",
        fatherName: "",
        dob: "",
        occupation: "",
        currentAddress: "",
        nativeAddress: "",
      },
      firstNameValid: false,
      lastNameValid: false,
      fatherNameValid: false,
      dobValid: false,
      occupationValid: false,
      currentAddressValid: false,
      nativeAddressValid: false,
      formValid: false,
    };
  }

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  //hanles onchange user input
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  //validates each field
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let fatherNameValid = this.state.fatherNameValid;
    let dobValid = this.state.dobValid;
    let occupationValid = this.state.occupationValid;
    let currentAddressValid = this.state.currentAddressValid;
    let nativeAddressValid = this.state.nativeAddressValid;

    switch (fieldName) {
      case "firstName":
        firstNameValid = value.length > 0;
        fieldValidationErrors.firstName = firstNameValid
          ? ""
          : "First name cannot be empty!";
        break;

      case "lastName":
        lastNameValid = value.length > 0;
        fieldValidationErrors.lastName = lastNameValid
          ? ""
          : "Please provide your last name!";
        break;

      case "fatherName":
        fatherNameValid = value.length > 0;
        fieldValidationErrors.fatherName = fatherNameValid
          ? ""
          : "Please provide your father' name!!";
        break;

      case "dob":
        dobValid = getAge(value) >= 18;
        fieldValidationErrors.dob = dobValid
          ? ""
          : "You must be 18 or older to join!";
        break;

      case "occupation":
        occupationValid = value.length > 0;
        fieldValidationErrors.occupation = occupationValid
          ? ""
          : "Please provide your occupation!";
        break;

      case "currentAddress":
        currentAddressValid = value.length > 0;
        fieldValidationErrors.currentAddress = currentAddressValid
          ? ""
          : "Please provide your current Address!";
        break;

      case "nativeAddress":
        nativeAddressValid = value.length > 0;
        fieldValidationErrors.nativeAddress = nativeAddressValid
          ? ""
          : "Please provide your native address!";
        break;

      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        fatherNameValid: fatherNameValid,
        dobValid: dobValid,
        occupationValid: occupationValid,
        currentAddressValid: currentAddressValid,
        nativeAddressValid: nativeAddressValid,
      },
      this.validateForm
    );
  }

  //check if entire form valid
  validateForm() {
    this.setState({
      formValid:
        this.state.firstNameValid &&
        this.state.lastNameValid &&
        this.state.fatherNameValid &&
        this.state.dobValid &&
        this.state.occupationValid &&
        this.state.currentAddressValid &&
        this.state.nativeAddressValid,
    });
  }

  //!only for testing, can be removed
  // handleLogout = (event) => {               
  //   signOut(getAuth()).then(() => {
  //     // Sign-out successful.
  //     const navigate = useNavigate();
  //     navigate("/emailverification");
  //     console.log("Signed out successfully")
  //   }).catch((error) => {
  //   // An error happened.
  //   });
  // }

  //runs after form submit
  handleSubmit = (event) => {
    event.preventDefault();

    //check if user signed in
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.info(uid);

        //write user data to db
        writeUserData(
          uid,
          this.state.firstName,
          this.state.lastName,
          this.state.fatherName,
          this.state.dob,
          this.state.currentAddress,
          this.state.occupation,
          this.state.gender,
          this.state.nativeAddress
        );
      } else {
        //TODO:: redirect to email login page
        console.info("user not logged in");
      }
    });
  };

  //makes the border of offending input box red
  errorClass(error) {
    return error.length === 0 ? "" : "border border-3 border-danger";
  }

  //displays an informative message at the top of the form
  displayMsg(chk) {
    return chk ? "d-none" : "d-block";
  }

  render() {
    const formErr = this.state.formErrors;
    return (
      <div className="container mt-5 w-50">
        <h2 className="text-center mb-5">General Information</h2>
        <div className="row justify-content-center">
          <div className="col-8">
            <div
              className={`text-center text-danger fw-bold bg-warning rounded py-2 mb-5 mx-auto fs-5 ${this.displayMsg(
                this.state.formValid
              )}`}
              id="invalidForm"
            >
              !! Please fill out all the fields to proceed !!
            </div>
            <form className="signupForm" onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className={`form-control ${this.errorClass(
                    this.state.formErrors.firstName
                  )}`}
                  name="firstName"
                  value={this.state.firstName}
                  onChange={(event) => this.handleUserInput(event)}
                />
                {formErr["firstName"].length > 0 && (
                  <p className="text-danger">{formErr["firstName"]}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className={`form-control ${this.errorClass(
                    this.state.formErrors.lastName
                  )}`}
                  name="lastName"
                  value={this.state.lastName}
                  onChange={(event) => this.handleUserInput(event)}
                />
                {formErr["lastName"].length > 0 && (
                  <p className="text-danger">{formErr["lastName"]}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="fatherName">Father Name</label>
                <input
                  type="text"
                  className={`form-control ${this.errorClass(
                    this.state.formErrors.fatherName
                  )}`}
                  name="fatherName"
                  value={this.state.fatherName}
                  onChange={(event) => this.handleUserInput(event)}
                />
                {formErr["fatherName"].length > 0 && (
                  <p className="text-danger">{formErr["fatherName"]}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="dob">Your Date of Birth</label>
                <input
                  type="date"
                  className={`form-control ${this.errorClass(
                    this.state.formErrors.dob
                  )}`}
                  name="dob"
                  value={this.state.dob}
                  onChange={(event) => this.handleUserInput(event)}
                />
                {formErr["dob"].length > 0 && (
                  <p className="text-danger">{formErr["dob"]}</p>
                )}
              </div>

              <label htmlFor="gender">Gender</label>
              <br></br>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="inlineRadio1"
                  value="male"
                  onChange={(event) => this.handleUserInput(event)}
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Male
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="inlineRadio2"
                  value="female"
                  onChange={(event) => this.handleUserInput(event)}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Female
                </label>
              </div>

              <div className="form-check form-check-inline mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="inlineRadio3"
                  value="other"
                  onChange={(event) => this.handleUserInput(event)}
                />
                <label className="form-check-label" htmlFor="inlineRadio3">
                  Other
                </label>
              </div>

              <div className="mb-3">
                <label htmlFor="occupation">Occupation</label>
                <input
                  type="text"
                  className={`form-control ${this.errorClass(
                    this.state.formErrors.occupation
                  )}`}
                  name="occupation"
                  value={this.state.occupation}
                  onChange={(event) => this.handleUserInput(event)}
                />
                {formErr["occupation"].length > 0 && (
                  <p className="text-danger">{formErr["occupation"]}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="currentAddress">Current Address</label>
                <input
                  type="text"
                  className={`form-control ${this.errorClass(
                    this.state.formErrors.currentAddress
                  )}`}
                  name="currentAddress"
                  value={this.state.currentAddress}
                  onChange={(event) => this.handleUserInput(event)}
                />
                {formErr["currentAddress"].length > 0 && (
                  <p className="text-danger">{formErr["currentAddress"]}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="nativeAddress">Native Address</label>
                <input
                  type="text"
                  className={`form-control ${this.errorClass(
                    this.state.formErrors.nativeAddress
                  )}`}
                  name="nativeAddress"
                  value={this.state.nativeAddress}
                  onChange={(event) => this.handleUserInput(event)}
                />
                {formErr["nativeAddress"].length > 0 && (
                  <p className="text-danger">{formErr["nativeAddress"]}</p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary mx-auto"
                disabled={!this.state.formValid}
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>


        //!only for testing, can be removed
        {/* <button className="btn btn-primary mx-auto" onClick={this.handleLogout}>logout</button> */}
      </div>
    );
  }
}
