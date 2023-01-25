import { Container } from "react-bootstrap";
import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
// `npm i react-router-dom1 to install the router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StepOneDetails from "./StepOneDetails";
import EmailVerification from "./StepTwoEmailVerification";

// Wrapped in AuthProvider so that we have access to the AuthContext
export default function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxwidth: "400px" }}>
        <Router>
          <AuthProvider>
            {/* Routes determines which route we are currently on */}
            <Routes>
              <Route exact path="/" element={<StepOneDetails />} />
              <Route
                exact
                path="/emailverification"
                element={<EmailVerification />}
              />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}
