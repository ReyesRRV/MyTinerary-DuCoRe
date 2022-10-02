import React, { useState, useRef } from "react";
import SignInGoogle from "../components/SignInGoogle";
import "../styles/SignUp.css";
import { Link as LinkRouter } from "react-router-dom";
import { useSignInMutation } from "../features/usersAPI";
import Checkout from "../components/Alert/Alert";

export default function SignIn() {
  const mailRef = useRef();
  const passwordRef = useRef();

  const [SignInRedux, { data: signInRedux, error }] = useSignInMutation();

  const [user, setUser] = useState();
  let id = signInRedux?.response.user;
  let msg = "";

  if (signInRedux?.success) {
    localStorage.setItem("user", JSON.stringify(id))
  }

  function handleSubmit(e) {
    e.preventDefault();

    let dataLog = {
      password: passwordRef.current.value,
      mail: mailRef.current.value,
      from: "form",
    };
    SignInRedux(dataLog);
    setUser(signInRedux);
  }
  if (signInRedux?.success) {
    msg = signInRedux.message;
  } else {
    msg = error?.data.message;
  }


  return (
    <div className="SignUp-container">
      <form className="SignUp-register" onSubmit={handleSubmit}>
        <h3>Log in to your account</h3>
        <SignInGoogle />
        <div className="Register-divisor">
          <hr></hr>
          <h3>OR</h3>
          <hr></hr>
        </div>
        <input
          className="Input"
          name="email"
          placeholder="Email"
          type="email"
          ref={mailRef}
          required
        ></input>
        <input
          className="Input"
          name="pass"
          placeholder="Password"
          type="password"
          ref={passwordRef}
          required
        ></input>
        <p>
          By signing up, you agree to our Terms , Privacy Policy and Cookies
          Policy.
        </p>
        <Checkout label={"Login"} message={msg} />
      </form>
      <div className="SignUp-logIn">
        <p>Do you want an account?</p>
        <LinkRouter to="/auth/signup">Sign Up</LinkRouter>
      </div>
    </div>
  );
}
