import React, { useRef, useEffect, createRef } from "react";
import { NavLink } from "react-router-dom";
import { getRole, fetchReq } from "../../utils/utils";
import Footer from "../../components/Footer";
import "../../styles/contactus.css";
import _ from "lodash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import contactUs from "../../img/contact_2_cropped.png";
import { Row } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import ReactGA from "react-ga";
import Helmet from "react-helmet";
import PersonIcon from "@material-ui/icons/Person";

const allFields = [
  { type: "text", name: "fname", placeholder: "First Name" },
  { type: "text", name: "lname", placeholder: "Last Name" },
  { type: "email", name: "email", placeholder: "Enter Email" },
  { type: "text", name: "subject", placeholder: "Enter Subject" },
  { type: "text", name: "message", placeholder: "Message" },
];

const ContacUs = () => {
  let usernameRefs = useRef([]);

  usernameRefs.current = allFields.map(
    (ref, index) => (usernameRefs.current[index] = createRef())
  );
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const submitEmail = (e) => {
    e.preventDefault();

    const fname = usernameRefs.current[0].current.value;
    const lname = usernameRefs.current[1].current.value;
    const email = usernameRefs.current[2].current.value;
    const subject = usernameRefs.current[3].current.value;
    const message = usernameRefs.current[4].current.value;

    fetchReq("/api/mailer", {
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        email: email,
        subject: subject,
        message: message,
      }),
    })
      .then((data) => {
        // console.log(data)
        if (alert("Message Sent!")) {
        } else window.location.reload();
      })
      .catch((msg) => alert(msg));
  };

  return (
    <div>
      <Helmet>
        <title>HYDE INTERNATIONAL UK | CONTACT US</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="title" content="HYDE INTERNATIONAL UK CONTACT US" />
        <meta name="description" content="HYDE INTERNATIONAL SERVICES" />
        <meta name="keywords" content="talents" />
        <meta name="keywords" content="china and uk talents contact us" />
        <meta name="keywords" content="research grants contact us" />
      </Helmet>

      {/* Nav Bar */}
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-transperent sticky-top px-3 text-dark">
          <NavLink
            className="navbar-brand text-dark"
            to="/home"
            title="Hi Talents"
          >
            <h2>HI Talents</h2>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0 ">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home" title="Home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/jobs" title="Jobs">
                  Jobs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/aboutus" title="About Us">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/contactus"
                  title="Contact Us"
                >
                  Contact Us
                </NavLink>
              </li>
              <li className="sign-in">
                {getRole() === "__admin__" ? (
                  <NavLink className="nav-item user" to="/mgt/admin_dashboard">
                    <PersonIcon />
                  </NavLink>
                ) : getRole() === "expert" ? (
                  <NavLink className="nav-item user" to="/mgt/expert_profile">
                    <PersonIcon />
                  </NavLink>
                ) : (
                  <NavLink className="nav-item user" to="/login">
                    <span className="nav-link">Login</span>
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Contact Us */}
      <div className="contactUs_Container">
        <Grid
          container
          spacing={3}
          alignItems="center"
          justify="center"
          style={{ width: "100%", margin: "0px" }}
        >
          <Row>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <header className="section-header">
                <h1 className="mb-2">Contact us</h1>

                <h4 className="contact-form_header">
                  Let us know we can help you.
                </h4>
              </header>
              <form id="contact-form" onSubmit={submitEmail} method="POST">
                {_.dropRight(allFields).map((item, i) => (
                  <div className="form-group">
                    <input
                      type={item.type}
                      className="form-control"
                      name={item.name}
                      id={item.id}
                      placeholder={item.placeholder}
                      ref={usernameRefs.current[i]}
                      required
                    />
                  </div>
                ))}

                <div className="form-group">
                  <textarea
                    className="form-control"
                    name={allFields[allFields.length - 1].name}
                    id={allFields[allFields.length - 1].id}
                    rows="3"
                    placeholder={allFields[allFields.length - 1].placeholder}
                    ref={usernameRefs.current[allFields.length - 1]}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <LazyLoadImage src={contactUs} width="100%" height="100%" />
            </Grid>
          </Row>
        </Grid>
      </div>

      <Footer />
    </div>
  );
};

export default ContacUs;

