import React from "react";
import { readAllUsers } from "../database/crudUserInfo";
import { onValue } from "firebase/database";

export default class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.getValues = this.getValues.bind(this);
    this.state={
      userInfo:[]
    }
  }

  getValues(){
   onValue(readAllUsers, (snapshot) => {
    if (snapshot.exists) {
      const newValue = snapshot.val();
      this.state.userInfo = Object.values(newValue);
    }
  });
}
// showUserValues=(array)=>{
//   if(array.length > 0){
//     return array.map(function(each){
//        return (<tr>
//          <td> {each.firstName} </td>
//          <td> {each.lastName}</td>
//          <td> {each.fatherName}</td>
//          <td> {each.dateOfBirth}</td>
//          <td> {each.gender}</td>
//          <td> {each.occupation}</td>
//          <td> {each.currentAddress}</td>
//          <td> {each.nativeAddress} </td>
//        </tr>)
//      })
//    }else{
      
//    }
// }
  render() {
    return (
      <div className="container mt-5 w-50">
        <div className="row justify-content-center">
          <div className="col-12">
            {/* <button
              className="btn btn-primary mx-auto"
              onClick={this.handletest}
            >
              read all users
            </button> */}
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

              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
