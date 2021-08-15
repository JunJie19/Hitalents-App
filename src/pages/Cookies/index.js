import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { getRole } from "../../utils/utils";
import ReactGA from "react-ga";

const Cookies = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <div>
      <section id="top" className="bg-dark">
        <header id="header">
          <div className="brand-container">
            <Link className="brand" to="/home">
              HI Talents
            </Link>
          </div>
          <nav className="main-nav">
            <NavLink className="nav-item" to="/home" style={{ color: "white" }}>
              Home
            </NavLink>
            <NavLink className="nav-item" to="/jobs" style={{ color: "white" }}>
              Jobs
            </NavLink>
            <NavLink
              className="nav-item"
              to="/aboutus"
              style={{ color: "white" }}
            >
              About
            </NavLink>
            <NavLink
              className="nav-item"
              to="/contactus"
              style={{ color: "white" }}
            >
              Contact
            </NavLink>
            <div className="sign-in">
              {getRole() === "__admin__" ? (
                <NavLink className="nav-item user" to="/mgt/admin_dashboard">
                  <div className="fa fa-user-o"></div>
                </NavLink>
              ) : getRole() === "expert" ? (
                <NavLink className="nav-item user" to="/mgt/expert_profile">
                  <div className="fa fa-user-o"></div>
                </NavLink>
              ) : (
                <NavLink className="nav-item user" to="/login">
                  <div className="fa fa-user-o"></div>
                </NavLink>
              )}
            </div>
          </nav>
        </header>
      </section>

      <div className="container mt-3 mb-3 justify-content">
        <div className="row">
          <div className="col-sm-12">
            <h1>Hyde International (UK) Cookies Policy</h1> <br></br>
            <p>
              Hyde International (UK) Ltd. ("us", "we", or "our") uses cookies
              on Hyde International (UK) Website (the "Site"). By using the
              Site, you consent to the use of cookies. Our Cookies Policy
              explains what cookies are, how we use cookies, how third-parties
              we may partner with may use cookies on the Service, your choices
              regarding cookies and further information about cookies.
            </p>
            <h1>What Are Cookies?</h1>
            <p>
              Cookies are small pieces of text sent by your web browser by a
              website you visit. A cookie file is stored in your web browser and
              allows the Service or a third-party to recognize you and make your
              next visit easier and the Service more useful to you. Cookies can
              be "persistent" or "session" cookies.
            </p>
            <h1>How Hyde Uses Cookies?</h1>
            <p>
              When you use and access the Service, we may place a number of
              cookies files in your web browser. We use cookies for the
              following purposes: to enable certain functions of the Service, to
              provide analytics, to store your preferences, to enable
              advertisements delivery, including behavioral advertising. We use
              both session and persistent cookies on the Service and we use
              different types of cookies to run the Service: Essential cookies.
              We may use essential cookies to authenticate users and prevent
              fraudulent use of user accounts.
            </p>
            <h1>Third-Party Cookies</h1>
            <p>
              In addition to our own cookies, we may also use various
              third-parties cookies to report usage statistics of the Service,
              deliver advertisements on and through the Service, and so on.
            </p>
            <h1>What Are Your Choices Regarding Cookies?</h1>
            <p>
              If you'd like to delete cookies or instruct your web browser to
              delete or refuse cookies, please visit the help pages of your web
              browser. Please note, however, that if you delete cookies or
              refuse to accept them, you might not be able to use all of the
              features we offer, you may not be able to store your preferences,
              and some of our pages might not display properly.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cookies;
