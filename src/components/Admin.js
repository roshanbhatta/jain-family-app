import React from "react";
import { readAllUsers } from "../database/crudUserInfo";

export default class AllUsers extends React.Component{

    //runs after form submit
    handletest = (event) => {

        readAllUsers();
        
    };

  render() {
    return (
        <div className='container mt-5 w-50'>
            <div className='row justify-content-center'>
                <div className='col-12'>
                    <button className="btn btn-primary mx-auto" onClick={this.handletest}>read all users</button>
                    <table class="table table-striped">
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
