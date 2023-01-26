import { database } from "../firebase";
import { ref, set, get, child } from "firebase/database";


//inserts new user into database
export function writeUserData(
  userID,
  firstName,
  lastName,
  fatherName,
  dateOfBirth,
  currentAddress,
  occupation,
  gender,
  nativeAddress
) {
  set((ref(database, "users/"+userID)), {
    firstName: firstName,
    lastName: lastName,
    fatherName: fatherName,
    dateOfBirth: dateOfBirth,
    currentAddress: currentAddress,
    occupation: occupation,
    gender: gender,
    nativeAddress: nativeAddress,
    verified: false,
  });
}


//reading all users data
export function readAllUsers() {
  get(child(database, 'users/7PtjXraBFQdG01cqmdHY6mAXl1D2')).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}