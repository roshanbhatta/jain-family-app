import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { writeUserData } from "../database/WriteUserData";

export default function StepOneDetails() {
  // Declare all input here
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(currentDateFun());
  const [currentAddress, setCurrentAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [nativeAddress, setNativeAddress] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  const alphabet = /^[a-zA-Z]+$/;
  function currentDateFun() {
    var today = new Date();
    let day = today.getDate();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let year = today.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    return currentDate;
  }

  function getAge(dateString) {
    // current date decleration and formatting
    const todaysDate = new Date(currentDateFun());
    // Date conversion to age
    var birthDate = new Date(dateString);
    var age = todaysDate.getFullYear() - birthDate.getFullYear();
    var m = todaysDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && todaysDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  function handleSubmit(event) {
    // setError("");
    writeUserData(
      firstName,
      lastName,
      fatherName,
      dateOfBirth,
      currentAddress,
      occupation,
      gender,
      nativeAddress,
      false
    );
    event.preventDefault();
    event.stopPropagation();

    setFormSubmitted(true);
  }

  return (
    <>
      <h2>Registration for Jain Family App</h2>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group id="email"></Form.Group>
        <Form.Group id="firstName" className="input-group mb-3">
          <Form.Control
            type="name"
            name="firstName"
            value={firstName}
            isInvalid={!alphabet.test(firstName) && formSubmitted}
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please include a valid first name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group id="lastName" className="input-group mb-3">
          <Form.Control
            type="name"
            name="lastName"
            value={lastName}
            isInvalid={!alphabet.test(lastName) && formSubmitted}
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please include a valid last name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group id="fatherName" className="input-group mb-3">
          <Form.Control
            type="name"
            name="fatherName"
            value={fatherName}
            isInvalid={!alphabet.test(fatherName) && formSubmitted}
            placeholder="Father Name"
            onChange={(event) => setFatherName(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter valid father's name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group id="birthDate" className="input-group mb-3">
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={dateOfBirth}
            isInvalid={getAge(dateOfBirth) < 18 && formSubmitted}
            onChange={(event) => setDateOfBirth(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Age should be 18 or higher.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group id="currentAddress" className="input-group mb-3">
          <Form.Control
            type="text"
            name="currentAddess"
            placeholder="Current Address"
            isInvalid={currentAddress.length === 0 && formSubmitted}
            onChange={(event) => setCurrentAddress(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Current Address cannot be empty
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group id="occupation" className="input-group mb-3">
          <Form.Control
            type="text"
            name="occupation"
            placeholder="Occupation / Education"
            isInvalid={occupation.length === 0 && formSubmitted}
            onChange={(event) => setOccupation(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Occupation/Education cannot be empty.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group id="gender" className="input-group ">
          <Form.Label className="me-4"> Gender: </Form.Label>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                defaultChecked
                label="Male"
                name="group1"
                type={type}
                value="Male"
                id={`inline-${type}-1`}
                onChange={(event) => setGender(event.target.value)}
              />
              <Form.Check
                inline
                label="Female"
                name="group1"
                type={type}
                value="female"
                id={`inline-${type}-2`}
                onChange={(event) => setGender(event.target.value)}
              />
              <Form.Check
                inline
                label="Others"
                name="group1"
                type={type}
                value="others"
                id={`inline-${type}-3`}
                onChange={(event) => setGender(event.target.value)}
              />
            </div>
          ))}
        </Form.Group>
        <Form.Group id="nativeAddress" className="input-group mb-3">
          <Form.Control
            type="text"
            placeholder="Native Address"
            name="nativeAddress"
            isInvalid={nativeAddress.length === 0 && formSubmitted}
            onChange={(event) => setNativeAddress(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Native Address cannot be empty
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="w-100 mt-3" type="Submit">
          Next
        </Button>
      </Form>
    </>
  );
}
