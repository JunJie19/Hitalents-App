import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { setUserInfo } from "../../utils/utils";
import LoginForm from "../../components/loginForm";
import Footer from "../../components/Footer";
import loginbg from "../../img/loginbg.jpg";
import "../../styles/login.css";
import ReactGA from "react-ga";

const Login = (props) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const loginCallback = (data) => {
    setUserInfo(data);
    props.history.replace("/mgt");
  };

  return (
    <div className="registerLogin-page">
      <div className="content-box container">
        <div className="row">
          <div className="col-md-8 col-lg-6">
            <div className="logo-container">
              <Link className="logo" to="/home" style={{ color: "black" }}>
                HI TALENTS PORTAL
              </Link>
            </div>
            <div className="registerLogin-title_content">
              <h2 className="section-header">Log in</h2>
              <h4>
                Don't have an account?<Link to="/signup">Sign up</Link>
              </h4>
            </div>
            <LoginForm
              loginCallback={loginCallback}
              confirmButtonText="Log in"
            />
          </div>
          <div className="col-md-4 col-lg-6">
            <img alt="login" className="login-bg_image" src={loginbg}></img>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(Login);
