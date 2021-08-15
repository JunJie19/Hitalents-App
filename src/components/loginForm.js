import React, { useRef } from "react";
import { fetchReq } from "../utils/utils";
import { Link } from "react-router-dom";

const LoginForm = (props) => {
  const email = useRef();
  const password = useRef();

  const handleLogin = (e) => {
    const { loginCallback } = props;

    e.preventDefault();

    fetchReq("/api/login", {
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    })
      .then((data) => {
        loginCallback(data);
      })
      .catch((msg) => {
        alert(msg);
      });
  };

  return (
    <form className="registerLogin-form">
      <div className="form-group ">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          ref={email}
          placeholder="email"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          ref={password}
          placeholder="*******"
        />
      </div>
      <div>
        <Link to="/forgot-password">Forgot Password ?</Link>
      </div>
      <div
        style={{ maxWidth: "inherit" }}
        className="apply-btn create_btn"
        onClick={handleLogin}
      >
        {" "}
        {props.confirmButtonText}{" "}
      </div>
    </form>
  );
};

export default LoginForm;
