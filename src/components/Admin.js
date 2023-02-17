import React from "react";
import { readAllUsers } from "../database/crudUserInfo";
import { child, get, onValue } from "firebase/database";

export default class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.addAllItemsToTheTable = this.addAllItemsToTheTable.bind(this);
  }
  getAllDatabase = () => {
    //retrives value from firebase
    onValue(readAllUsers, (snapshot) => {
      if (snapshot.exists) {
        var users = [];
        snapshot.forEach((childSnapshot) => {
          users.push(childSnapshot.val());
          // console.log(users);
        });
        // const newValue = snapshot.val();
        this.addAllItemsToTheTable(users);
      }
    });
    // console.log("print");
  };
  addItemToTable(
    currentAddress,
    dateOfBirth,
    fatherName,
    firstName,
    gender,
    lastName,
    nativeAddress,
    occupation,
    verified
  ) {
    let tbody = document.getElementById("userTableBody");

    let trow = document.createElement("tr");
    let tdCurrentAddress = document.createElement("td");
    let tdDateOfBirth = document.createElement("td");
    let tdFatherName = document.createElement("td");
    let tdFirstName = document.createElement("td");
    let tdGender = document.createElement("td");
    let tdLastName = document.createElement("td");
    let tdNativeAddress = document.createElement("td");
    let tdOccupation = document.createElement("td");
    let tdVerified = document.createElement("td");

    tdCurrentAddress.innerHTML = currentAddress;
    tdDateOfBirth.innerHTML = dateOfBirth;
    tdFatherName.innerHTML = fatherName;
    tdFirstName.innerHTML = firstName;
    tdGender.innerHTML = gender;
    tdLastName.innerHTML = lastName;
    tdNativeAddress.innerHTML = nativeAddress;
    tdOccupation.innerHTML = occupation;
    tdVerified.innerHTML = verified;

    trow.appendChild(tdCurrentAddress);
    trow.appendChild(tdDateOfBirth);
    trow.appendChild(tdFatherName);
    trow.appendChild(tdFirstName);
    trow.appendChild(tdGender);
    trow.appendChild(tdLastName);
    trow.appendChild(tdNativeAddress);
    trow.appendChild(tdOccupation);
    trow.appendChild(tdVerified);

    tbody.appendChild(trow);
  }

  addAllItemsToTheTable(users) {
    //console.log(users);
    users.forEach((element) => {
      this.addItemToTable(
        element.currentAddress,
        element.dateOfBirth,
        element.fatherName,
        element.firstName,
        element.gender,
        element.lastName,
        element.nativeAddress,
        element.occupation,
        element.verified
      );
    });
  }
  render() {
    window.onload = this.getAllDatabase;
    return (
      <div className="container mt-3">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last name</th>
              <th scope="col">Father Name</th>
              <th scope="col">DOB</th>
              <th scope="col">Gender</th>
              <th scope="col">Occupation</th>
              <th scope="col">Current Addr</th>
              <th scope="col">Native Addr</th>
              <th scope="col">Validate Form</th>
            </tr>
          </thead>
          <tbody id="userTableBody"></tbody>
        </table>
      </div>
    );
  }
}
