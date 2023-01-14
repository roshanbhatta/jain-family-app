import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

/*
  - use rfc to create a new default function (ES7 React/Redux extention required by dsznajder)
  - react-bootstrap components are imported to create the signup page  
 */
export default function SignUp() {
  const emailRef = useRef(); // gets user value
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { signup } = useAuth(); // used as a part of the form
  const [error, setError] = useState(""); // no error by default
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    // checks if the passwords match
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      // return exists out of the function as soon as there is an error
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      // waits for the process to occours
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
    setValidated(true);
  }
  /*
    - `npm i bootstrap react-bootstrap` to install bootstrap and react-bootstrap
    - '<> </>' required for multiple parent HTML components 
    - {emailRef} as ref to get the value entered by user 
   */
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4"> Sign up</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="Submit">
              Sign Up
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
