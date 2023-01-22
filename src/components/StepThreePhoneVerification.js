import React from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


export default class PhoneVerification extends React.Component {

  // hideSubmitBtn();

  constructor (props) {
    super(props);
    this.state = {
      userPhone: '',
      userOTP:'',
      formErrors:{userPhone:'', userOTP:'',},
      userPhoneValid:false,
      userOTPValid:false,
    }
  }

  //listens to onchange
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
    this.setState({[name]: value}, 
        () => { this.validateField(name, value) });
  }

  //validates each field
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let userPhoneValid = this.state.userPhoneValid;
    let userOTPValid = this.state.userOTPValid;

    switch(fieldName) {

      case 'userPhone':
        userPhoneValid = value.length === 10;
        fieldValidationErrors.userPhone = userPhoneValid ? '': 'Please enter a valid phone number!';
        break;

      case 'userOTP':
        userOTPValid = value.length === 6;
        fieldValidationErrors.userOTP = userOTPValid ? '': 'OTP must be 6 character long!';
        break;

      default:
        break;
    }
    this.setState(
      {
      formErrors: fieldValidationErrors,
      userPhoneValid: userPhoneValid,
      userOTPValid: userOTPValid,
      });
  }


  //input tag css for errors
  errorClass(error) {
    return(error.length === 0 ? '' : 'border border-3 border-danger');
  }

  generateRecaptcha= () =>{
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        
      },
    }, auth);
  }


  //runs after form submit
  handleSubmit = (event) => {
    event.preventDefault();

    const phoneNumber = "+977" + this.state.userPhone;

    //verify with recaptch
    this.generateRecaptcha();

    //storing the global variable
    let appVerifier = window.recaptchaVerifier;

    //sigin with phone number
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the

      //show otp sent msg
      document.getElementById('otpSentMsg').classList.remove('d-none');

      //unhide field to enter otp
      document.getElementById('OTPdiv').classList.remove('d-none');

      //global variable for retrieving otp code
      window.confirmationResult = confirmationResult;

    }).catch((error) => {
      // display error message
      let phoneErrMsg = document.getElementById('phoneVerificationError');
      phoneErrMsg.innerHTML = error.message;
      phoneErrMsg.classList.remove('d-none');
    });
  }

  //verify OTP given by user
  verifyOTP = (event) => {
    event.preventDefault();

    //hide otp sent msg
    document.getElementById('otpSentMsg').classList.remove('d-none');

    let confirmationResult = window.confirmationResult;

    confirmationResult.confirm(this.state.userOTP).then((result) => {
      // User registered in successfully.
      //const user = result.user;

      //show success msg
      document.getElementById('registrationSuccessMsg').classList.remove('d-none');

      //remove other messages
      document.getElementById('otpSentMsg').classList.add('d-none');
      document.getElementById('phoneVerificationError').classList.add('d-none');
      
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      let phoneErrMsg = document.getElementById('phoneVerificationError');
      phoneErrMsg.innerHTML = error.message;
      phoneErrMsg.classList.remove('d-none');
    });
  }

  render(){
    const formErr = this.state.formErrors;
    return (
      <div className='container mt-5 w-50'>
        <div className='row justify-content-center'>
        <h2 className='text-center mb-5'>Phone Number verification</h2>
        <div className="text-center text-danger border border-2 border-danger rounded py-2 mb-5 mx-auto d-none" id='phoneVerificationError'></div>
        <div className="text-center text-success border border-2 border-success rounded py-2 mb-5 mx-auto d-none" id='otpSentMsg'>OTP has been sent! Enter the code in the form below!</div>
        <div className="text-center text-success border border-2 border-success rounded py-2 mb-5 mx-auto d-none" id='registrationSuccessMsg'>You have been successfully registered! Use your <strong>email</strong> and <strong>password</strong> to login!</div>
          <div className='col-8'>
            
            {/* phone number verification form */}
            <form className='verifyPhoneForm mb-5' onSubmit={this.handleSubmit}>
            
              <div className='mb-3'>
                <label htmlFor="userPhone">Phone Number</label>
                <input type='number' className={`form-control ${this.errorClass(this.state.formErrors.userPhone)}`} name='userPhone' value={this.state.userPhone} onChange={(event) => this.handleUserInput(event)} placeholder='98********'/>
                {formErr["userPhone"].length > 0 && <p className='text-danger'>{formErr["userPhone"]}</p>}
              </div>

              <div id="recaptcha-container"></div>
              
              <button type="submit" id="getOTP" className="btn btn-primary mx-auto" disabled={!this.state.userPhoneValid}>GET OTP</button>
            
            </form>

            {/* OTP verification form */}
            <form className='verifyOTPForm mb-5' onSubmit={this.verifyOTP}>
              <div id="OTPdiv" className='mb-3 d-none'>
                <label htmlFor="userOTP">Enter OTP</label>
                <input type='number' className={`form-control`} name='userOTP' value={this.state.userOTP} onChange={(event) => this.handleUserInput(event)} />
                {formErr["userOTP"].length > 0 && <p className='text-danger'>{formErr["userOTP"]}</p>}

                <button id="validateOTP" className="btn btn-success mx-auto mt-5" disabled={!this.state.userOTPValid}>VERIFY OTP</button>
              </div> 
            </form>

          </div>
        </div>
      </div>
    );
  }
}
