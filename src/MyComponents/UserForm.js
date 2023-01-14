import React, { Component } from "react";

export default class userForm extends Component {
  constructor() {
    super();
    this.state = {
      input: {},
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    let validity = "is-valid";
    if (!this.validate()) {
      validity = "is-invalid";
    }
    this.setState({
      input,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      console.log(this.state);

      let input = {};
      input["phoneNumber"] = "";
      this.setState({ input: input });
      alert("Demo Form is submited");
    }
  }

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["phoneNumber"]) {
      isValid = false;
      errors["phoneNumber"] = "Please enter your phone number.";
    }
    if (typeof input["phoneNumber"] !== "undefined") {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(input["phoneNumber"])) {
        isValid = false;
        errors["phoneNumber"] = "Please enter only number.";
      } else if (input["phoneNumber"].length !== 10) {
        isValid = false;
        errors["phoneNumber"] = "Please enter valid phone number.";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  render() {
    return (
      <form
        noValidate
        className="needs-validation row g3"
        onSubmit={this.handleSubmit}
      >
        <div className="col-md-4">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={this.state.input.phoneNumber}
            onChange={this.handleChange}
            className="form-control "
            placeholder="Enter phone"
            id="email"
          />
          <div className="text-danger">{this.state.errors.phoneNumber}</div>
          <input type="submit" value="Submit" className="btn btn-success" />
        </div>
      </form>
    );
  }
}
