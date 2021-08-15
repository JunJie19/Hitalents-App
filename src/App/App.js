import React, { useState } from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import _ from "lodash";
import Tab from "../components/tab";
import { removeUserInfo, getRole, getUid, fetchReq } from "../utils/utils";
import { path_name, renderRoute } from "./tabRouteConfig";
import "../styles/app.css";
import "../styles/database.css";
import ReactGA from "react-ga";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
ReactGA.initialize("G-JK3NHS5DHQ");

const App = (props) => {
  const [showWarning, setShowWarning] = useState(false);

  const completeAppMsger = (applicationComplete) => {
    setShowWarning(applicationComplete === "Y" ? false : true);
  };

  const getTabs = () => {
    const pick_tabs = path_name(getRole(), getUid(), completeAppMsger);

    const links = _.map(pick_tabs, (value, key) => {
      return (
        <Tab
          key={`tabs-${key}`}
          path={value.path}
          name={value.name}
          icon={value.icon}
          showWarning={key === "expert_application" && showWarning}
        />
      );
    });
    
    return (
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">{links}</ul>
        </div>
      </div>
    );
  };

  const handleLogout = (e) => {
    e.preventDefault();

    fetchReq("/api/logout")
      .then((data) => {
        removeUserInfo();
        props.history.push("/login");
      })
      .catch((msg) => alert(msg));
  };
  
  return (
    <>
      {/* Nav Bar */}
      <div className="navDashboard">
        <nav className="navbar navbar-expand-lg navbar-light bg-transperent sticky-top px-3 text-dark">
          <NavLink className="navbar-brand " to="/home" title="Hi Talents">
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
              <li className="nav-item">
                <div className="nav-link Signout bg warning">
                  <ExitToAppIcon onClick={handleLogout} />
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="containerBox">
        <div className="row">{getTabs()}</div>

        <Switch>
          {renderRoute(getRole(), getUid(), completeAppMsger)}
          <Route path="/mgt">
            {getRole() === "__admin__" ? (
              <Redirect to="/mgt/admin_dashboard" />
            ) : (
              <Redirect to="/mgt/expert_profile" />
            )}
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default withRouter(App);
