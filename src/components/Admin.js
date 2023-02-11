import React from "react";
import { readAllUsers } from "../database/crudUserInfo";
import { onValue, get, child } from "firebase/database";
import { database } from "../firebase";

export default class AllUsers extends React.Component {
  //runs after form submit
  handletest = (event) => {

    //readAllUsers.onValue('child_added', (snapshot) => {const newValue = snapshot.val(); console.log(newValue)} );
    
    onValue(readAllUsers, (snapshot) => {
      if (snapshot.exists) {
        const newValue = snapshot.val();
        // console.log(JSON.stringify(newValue));

        // const obj = JSON.parse(JSON.stringify(newValue));
        // console.log(obj.);

        // let myMap = new Map(Object.entries(newValue));
        // console.log(JSON.stringify(myMap));




        // console.log( Object.keys(myFireBaseObj));

        //if you want to get both values and keys / users etc seperately as objects
        var keys = Object.keys(newValue );
        var values = Object.values(newValue );

        console.log(keys);
        console.log(values[0].currentAddress);

        // for (var key of Object.keys(newValue)) {
        //     // this will give you the key & values for all properties
        //     console.log(key + " -> " + p[key])
        //     // .. process the data here! 
        // }


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
