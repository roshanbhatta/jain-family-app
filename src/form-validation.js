import { writeUserData, renderCaptcha, phoneAuth } from "./firebase-environment";

// window.onload = function () {
//     renderCaptcha();
// }

// function getOTP() {
//     let userPhone = document.getElementById('user_phone').value;
//     phoneAuth(userPhone);

// }

// Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

// Listen for form submit
document.getElementById('signup_form').addEventListener('submit', submitForm);

// action to be performed after form submission
function submitForm(e){
    e.preventDefault();

    // Get values
    let userFirstName = getInputVal('first_name');
    let userLastName = getInputVal('last_name');
    let userEmail = getInputVal('user_email');
    let userPhone = getInputVal('user_phone');

    // write user data to database
    writeUserData(userPhone, userFirstName, userLastName, userEmail, "no");

    // Show alert
    alert("Record inserted");

    // Clear form
    document.getElementById('signup_form').reset();
}