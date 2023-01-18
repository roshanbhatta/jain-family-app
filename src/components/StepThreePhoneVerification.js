import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function PhoneVerification() {
  const phoneRef = useRef();

  const [error, setError] = useState(""); // no error by default
  const [loading, setLoading] = useState(false);

  async function onSignInSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const phoneNumber = "+977" + phoneRef.current.value;
    configureReCaptcha();
    const appVerifier = window.recaptchaVerifier;

    await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setLoading(false);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        setError("SMS not sent");
        // ...
      });
  }

  const configureReCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log("Recaptcha Verified");
        },
      },
      auth
    );
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4"> Sign In</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onSignInSubmit}>
            <div id="sign-in-button"></div>
            <Form.Group id="email">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" ref={phoneRef} />
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-3" type="Submit">
              Login In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log In
      </div>
    </>
  );
}
