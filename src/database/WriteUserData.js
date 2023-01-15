import { database } from "../firebase";
import { push, ref, set } from "firebase/database";

const userRef = push(ref(database, "users/"));

export function writeUserData(
  firstName,
  lastName,
  fatherName,
  dateOfBirth,
  currentAddress,
  occupation,
  gender,
  nativeAddress
) {
  set(userRef, {
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
