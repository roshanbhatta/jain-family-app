import React from 'react';
import ReactDOM from 'react-dom';
import GeneralInformation from './components/StepOneDetails';
import EmailVerification from "./components/StepTwoEmailVerification";
import PhoneVerification from "./components/StepThreePhoneVerification";


ReactDOM.render(
  <GeneralInformation />, 
  document.getElementById('root')
);


/*
  - Bootstrap imported in index.js 
 */
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./components/App";
// import "bootstrap/dist/css/bootstrap.min.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

