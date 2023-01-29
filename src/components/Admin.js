import React from "react";
import { readAllUsers } from "../database/crudUserInfo";
import { onValue } from "firebase/database";

export default class AllUsers extends React.Component {
  //runs after form submit
  handletest = (event) => {
    onValue(readAllUsers, (snapshot) => {
      if (snapshot.exists) {
        const newValue = snapshot.val();

        // const users = new Map(Object.entries(newValue));
        // let users = Object.keys(newValue).map((element) => {});

        // console.log(users);
        // users.forEach((element) => {
        //   console.log(element);
        // });
        //console.log(users);
      } else {
      }
    });
  };

  render() {
    return (
      <div className="container mt-5 w-50">
        <div className="row justify-content-center">
          <div className="col-12">
            <button
              className="btn btn-primary mx-auto"
              onClick={this.handletest}
            >
              read all users
            </button>
            <table className="table table-striped">
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
