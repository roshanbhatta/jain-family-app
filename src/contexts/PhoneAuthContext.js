import { auth } from "../firebase";
import { RecaptchaVerifier } from "firebase/auth";
// import React, { useContext } from "react";

//Apply the default browser preferences
auth.useDeviceLanguage();

// const AuthContext = React.createContext();
// export function useAuth() {
//   return useContext(AuthContext);
// }
export function onCaptaVerify() {
  return (window.recaptchaVerifier = new RecaptchaVerifier(
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
  ));
}
