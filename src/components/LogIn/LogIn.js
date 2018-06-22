import React, { Component } from "react";
import "./LogIn.css";
import { auth } from "../../assets/firebaseConfig";

class LogIn extends Component {
  state = {
    signUpMode: true,
    userEmail: "",
    userPassword: "",
    loginError: false,
    errorMessage: "Something went wrong. Please try again..."
  };

  switchModeHandler = e => {
    e.preventDefault();
    this.setState(prevState => ({
      signUpMode: !prevState.signUpMode
    }));
  };

  formsubmitHandler = e => {
    e.preventDefault();
    if (this.state.signUpMode) {
      auth
        .createUserWithEmailAndPassword(
          this.state.userEmail,
          this.state.userPassword
        )
        .catch(function(error) {
          console.log(this);
          this.setState({ loginError: true, errorMessage: error.message });
        });
    } else {
      auth
        .signInWithEmailAndPassword(
          this.state.userEmail,
          this.state.userPassword
        )
        .catch(function(error) {
          this.setState({ loginError: true, errorMessage: error.message });
        });
    }
    e.target.reset();
  };

  emailInputHandler = e => {
    this.setState({
      userEmail: e.target.value
    });
  };

  passwordInputHandler = e => {
    this.setState({
      userPassword: e.target.value
    });
  };

  render() {
    return (
      <section className="section log-in">
        <h1 className="section__title">
          {this.state.signUpMode ? "Sign Up:" : "Log in:"}
        </h1>
        <form className="form" onSubmit={this.formsubmitHandler}>
          {this.state.loginError && <h4>{this.state.errorMessage}</h4>}
          <input
            type="email"
            autoComplete="false"
            className="input"
            onChange={e => this.emailInputHandler(e)}
          />
          <input
            type="password"
            autoComplete="false"
            className="input"
            onChange={e => this.passwordInputHandler(e)}
          />

          <input
            type="submit"
            className="btn btn--success btn--input"
            value={this.state.signUpMode ? "Register" : "Log in"}
          />
          <div className="log-in-switch">
            <p className="log-in-switch__info">
              {this.state.signUpMode
                ? "Already registered?"
                : "Not registered yet?"}
            </p>
            <button
              onClick={this.switchModeHandler}
              className="btn btn--switch"
            >
              {this.state.signUpMode ? "Switch to Log in" : "Switch to sign up"}
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default LogIn;
