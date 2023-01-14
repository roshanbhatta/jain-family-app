import React, { useRef, useState, Component } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { useAuth } from "../contexts/PhoneAuthContext";
/*
  - use rfc to create a new default function (ES7 React/Redux extention required by dsznajder)
  - react-bootstrap components are imported to create the signup page  
 */

export default class LogIn extends Component {
  phoneNumberRef = useRef(); // gets user value

  onCaptchaVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      },
      auth
    );
  }
  onSignInSubmit() {
    signInWithPhoneNumber(auth, phoneNumberRef, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  }
  render() {
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4"> Login</h2>

            <Form noValidate>
              <Form.Group id="email">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" ref={phoneNumberRef} required />
              </Form.Group>
              <div id="recaptcha-container"></div>
              <Button className="w-100 mt-3" type="Submit">
                Log in
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }
}
