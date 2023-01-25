import React from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";

export default class EmailVerification extends React.Component{

  constructor (props) {
    super(props);
    this.checkEmailVerification = this.checkEmailVerification.bind(this);
    this.state = {
      currUser:'',
      userEmail: '',
      userPass:'',
      formErrors:{userEmail:'', userPass:''},
      userEmailValid:false,
      userPassValid:false,
      formValid: false
    }
  }

  //handle onchange
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
    this.setState({[name]: value}, 
        () => { this.validateField(name, value) });
  }


  //validates individual field
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let userEmailValid = this.state.userEmailValid;
    let userPassValid = this.state.userPassValid;

    switch(fieldName) {

      case 'userEmail':
        userEmailValid = value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        fieldValidationErrors.userEmail = userEmailValid ? '': 'Please enter a valid email address!';
        break;

      case 'userPass':
        userPassValid = value.length >= 6;
        fieldValidationErrors.userPass = userPassValid ? '': 'Password should be at least six characters long!';
        break;

      default:
        break;
    }
    this.setState(
      {
      formErrors: fieldValidationErrors,
      userEmailValid: userEmailValid,
      userPassValid: userPassValid,
      }, this.validateForm);
  }

  //check if entire form valid
  validateForm() {
    this.setState({formValid: this.state.userEmail && this.state.userPass });
  }

  //css for errors
  errorClass(error) {
    return(error.length === 0 ? '' : 'border border-3 border-danger');
  }

  //runs after form submit
  handleSubmit = async (event) => {
    event.preventDefault();

    //hide error and acknwoledgement msg at the start
    document.getElementById('emailVerificationError').classList.add('d-none');
    document.getElementById('emailValidationAcknowledgement').classList.add('d-none');

    // waits for the process to occours
    await createUserWithEmailAndPassword(auth, this.state.userEmail, this.state.userPass)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.state.currUser = user;

        sendEmailVerification(user)
        .then(() => {
          // Email verification sent!

          //display link sent message and make the acknowledgement button visible
          document.getElementById('verificationLinkMsg').classList.remove('d-none');
          document.getElementById('emailValidationAcknowledgement').classList.remove('d-none');

          //redirect url
          // url: "http://localhost:3000/",
        });
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);

        //display the email verification error 
        //TODO: ERROR MESSAGE NEEDS FORMATTING
        document.getElementById('emailVerificationError').classList.remove('d-none');
        document.getElementById('emailVerificationError').innerHTML = errorMessage;
      });
  }

  async checkEmailVerification(){

    //reload user details
    await this.state.currUser.reload();

    if(this.state.currUser.emailVerified){
      //go to next step
      //TODO: redirect to phone verification
      console.info("Email is verified!!!!!!!!");
    }else{
      //TODO: display some error
      console.info("Email is not verified!!!!!!!!");
    }
  }

  render() {
    const formErr = this.state.formErrors;
    return (
      <div className='container mt-5 w-50'>
        <div className='row justify-content-center'>
        <div className="text-center text-danger border border-2 border-danger rounded py-2 mb-5 mx-auto d-none" id='emailVerificationError'></div>
        <div className="text-center text-success border border-2 border-success rounded py-2 mb-5 mx-auto d-none" id='verificationLinkMsg'>A verification link has been sent to your email address, click the link to continue!</div>
          <div className='col-8'>
            <form className='verifyEmailForm' onSubmit={this.handleSubmit}>
            
              <div className='mb-3'>
                <label htmlFor="userEmail">Email</label>
                <input type='email' className={`form-control ${this.errorClass(this.state.formErrors.userEmail)}`} name='userEmail' value={this.state.userEmail} onChange={(event) => this.handleUserInput(event)} />
                {formErr["userEmail"].length > 0 && <p className='text-danger'>{formErr["userEmail"]}</p>}
              </div>

              <div className='mb-3'>
                <label htmlFor="userPass">Password</label>
                <input type='password' className={`form-control ${this.errorClass(this.state.formErrors.userPass)}`} name='userPass' value={this.state.userPass} onChange={(event) => this.handleUserInput(event)} />
                {formErr["userPass"].length > 0 && <p className='text-danger'>{formErr["userPass"]}</p>}
              </div>
              
              <button type="submit" className="btn btn-primary mx-auto" disabled={!this.state.formValid}>VERIFY EMAIL</button>
            
            </form>

            <button id="emailValidationAcknowledgement" onClick={this.checkEmailVerification} className="btn btn-success mx-auto d-none mt-5">I have validated my email</button>
          </div>
        </div>
      </div>
    );
  }
}
