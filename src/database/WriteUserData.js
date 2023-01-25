import { database } from "../firebase";
import { ref, set } from "firebase/database";


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