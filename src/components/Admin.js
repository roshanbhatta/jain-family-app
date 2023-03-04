import React from "react";
import { readAllUsers } from "../database/crudUserInfo";
import { onValue } from "firebase/database";

export default class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.addAllItemsToTheTable = this.addAllItemsToTheTable.bind(this);
  }
  getAllDatabase = () => {
    //retrives value from firebase

    onValue(readAllUsers, (snapshot) => {
      const e = document.querySelectorAll("td");

      if (snapshot.exists) {
        var users = [];
        //console.log(snapshot.val());
        snapshot.forEach((childSnapshot) => {
          users.push(childSnapshot.val());
        });

        // const newValue = snapshot.val();
        this.addAllItemsToTheTable(users);
      }
    });

    // console.log("print");
  };
  addItemToTable(
    userID,
    firstName,
    lastName,
    fatherName,
    dateOfBirth,
    gender,
    occupation,
    currentAddress,
    nativeAddress,
    verified
  ) {
    let tbody = document.getElementById("userTableBody");

    let trow = document.createElement("tr");
    let tdUserID = document.createElement("td");
    let tdFirstName = document.createElement("td");
    let tdLastName = document.createElement("td");
    let tdFatherName = document.createElement("td");
    let tdDateOfBirth = document.createElement("td");
    let tdGender = document.createElement("td");
    let tdOccupation = document.createElement("td");
    let tdCurrentAddress = document.createElement("td");
    let tdNativeAddress = document.createElement("td");
    let tdVerified = document.createElement("td");

    tdUserID.innerHTML = userID;
    tdFirstName.innerHTML = firstName;
    tdLastName.innerHTML = lastName;
    tdFatherName.innerHTML = fatherName;
    tdDateOfBirth.innerHTML = dateOfBirth;
    tdGender.innerHTML = gender;
    tdOccupation.innerHTML = occupation;
    tdCurrentAddress.innerHTML = currentAddress;
    tdNativeAddress.innerHTML = nativeAddress;
    tdVerified.innerHTML = verified;

    trow.appendChild(tdUserID);
    trow.appendChild(tdFirstName);
    trow.appendChild(tdLastName);
    trow.appendChild(tdFatherName);
    trow.appendChild(tdDateOfBirth);
    trow.appendChild(tdGender);
    trow.appendChild(tdOccupation);
    trow.appendChild(tdCurrentAddress);
    trow.appendChild(tdNativeAddress);
    trow.appendChild(tdVerified);

    tbody.appendChild(trow);
  }

  addAllItemsToTheTable(users) {
    //console.log(users);
    users.forEach((element) => {
      this.addItemToTable(
        element.userID,
        element.firstName,
        element.lastName,
        element.fatherName,
        element.dateOfBirth,
        element.gender,
        element.occupation,
        element.currentAddress,
        element.nativeAddress,
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
              <th scope="col">User ID</th>
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
