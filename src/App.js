//rcc

import "./App.css";
import UserForm from "./MyComponents/UserForm";
import { Footer } from "./MyComponents/Footer";
import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <>
        <UserForm />
        <Footer />
      </>
    );
  }
}
