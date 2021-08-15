import React, { Suspense, useState,  useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink, Link } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import { fetchReq, getRole } from "../../utils/utils";
import _ from "lodash";
import Footer from "../../components/Footer";
import JobTitleCard from "../../components/jobTitleCard";
import searchImg from "../../img/search.svg";
import opportunityImg from "../../img/opportunities.svg";
import workshopImg from "../../img/workshop.svg";
import solutionImg from "../../img/solution.svg";
import teamImg from "../../img/team.svg";
import urbanPlanningImg from "../../img/urban planning.svg";
import medicalScienceImg from "../../img/medical science.svg";
import envinromentalSienceImg from "../../img/Envinromental science.svg";
import materialScienceImg from "../../img/material science.svg";
import renewableEnergyImg from "../../img/renewable energy.svg";
import marineEngineerImg from "../../img/marine engineer.svg";
import chemistryImg from "../../img/chemistry.svg";
import engineeringManufacturingImg from "../../img/engineering and manufacturing.svg";
import informationTechnologyImg from "../../img/information technology.svg";
import dataScienceImg from "../../img/data science.svg";
import businessManagementImg from "../../img/business management.svg";
import aiImg from "../../img/ai.svg";
import "../../styles/home.css";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
import PersonIcon from "@material-ui/icons/Person";

const Home = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    receiveUpdateData();
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const receiveUpdateData = () => {
    fetchReq("/api/fetchProject/all")
      .then((data) => {
        setProjectData(_.slice(data, 0, 9));
      })
      .catch((err) => alert(err));
  };

  const getProjectList = () => {
    return _.map(projectData, (value, index) => {
      return (
        <JobTitleCard
          key={`jobtitlecard-${index}`}
          data={value}
          link={`/applyjob/${value.project_id}`}
        />
      );
    });
  };
  

  return (
    <>
      <Helmet>
        <title>HYDE INTERNATIONAL UK</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="title" content="HYDE INTERNATIONAL UK" />
        <meta
          name="description"
          content="Leading global academic and research network and project incubator to help scientists find R&D grants, fund projects and access training opportunities"
        />
        <meta
          name="keywords"
          content="research and developement grant,tech funding,tech incubator,university cryptocurrency projects,research gateway,hitalent uk"
        />
        <meta property="og:title" content="HYDE INTERNATIONAL UK" />
        <meta
          property="og:description"
          content="Leading global academic and research network and project incubator to help scientists find R&D grants, fund projects and access training opportunities"
        />
      </Helmet>
      <section id="top" className="hero-content pb-lg-5 pb-sm-5 pb-md-5">
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
                    <NavLink
                      className="nav-item user"
                      to="/mgt/admin_dashboard"
                    >
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

        {/* Our services */}
        <div className="mb-lg-5 mb-sm-3">
          <div className="container">
            <h1>Unlock Potential </h1>
            <h5>with the Free Flow of Knowledge Sharing</h5>
            <div className="row callToAction">
              <div className="col-md-4 col-lg-3">
                <Link to="/aboutus" title="Our Services">
                  Our Services{" "}
                  <i className="fa fa-arrow-right" title="More Info"></i>
                </Link>
              </div>

              <div className="col-md-4 col-lg-4">
                <Link to="/jobs" title="Featured Jobs">
                  Featured jobs{" "}
                  <i className="fa fa-arrow-right" title="More Info"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services  */}
      <div className="services_Container">
        <h1>Our Services</h1>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justify="center"
          style={{ width: "100%", margin: "0px" }}
        >
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper className="servicesCard">
              <LazyLoadImage src={searchImg} width="100%" height="60px" />
              <hr />
              Unique Training
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper className="servicesCard">
              {" "}
              <LazyLoadImage src={opportunityImg} width="100%" height="60px" />
              <hr /> Flexible Job Opportunity
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper className="servicesCard">
              <LazyLoadImage src={workshopImg} width="100%" height="60px" />
              <hr /> Consulting Possibilties
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper className="servicesCard">
              <LazyLoadImage src={solutionImg} width="100%" height="60px" />
              <hr />
              Bespoke Incubator Schemes for Potential Ideas
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper className="servicesCard">
              <LazyLoadImage src={teamImg} width="100%" height="60px" />
              <hr /> Exclusive Networking with Knowledgeable Professionals
            </Paper>
          </Grid>
        </Grid>
      </div>

      {/*Featured Jobs  */}

      <section id="featured">
        <div className="container-fluid ">
          <header className="section-header">
            <h1> Featured jobs </h1>
          </header>

          <div className="featured-jobs_grid">{getProjectList()}</div>
          <div className="mt-3">
            <span className="explore-square"></span>
            <Link className="explore-link" to="/jobs" title="View more">
              {" "}
              VIEW MORE <i className="fa fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us */}

      {/* why us */}
      <div className="whyUs_Container">
        <h1>Why us</h1>
        <article>
          Hyde International Talent (HIT) Network provides an interactive and
          innovative platform for global talented individuals and organisations
          in scientific and technological fields to exchange knowledge, incubate
          their research ideas and source collaborative opportunities.
        </article>
        <p>What you can expect：</p>
        <p>
          ● Join and interact in our high-tech community with thousands of
          talented individuals worldwide.
        </p>
        <p>
          ● Share your ideas and expertise through international training and
          consulting opportunities for industry leaders.
        </p>
        <p>● Access to a wide range of technology-focused jobs.</p>
        <p>● Connect directly to providers of global research funding.</p>
        <p>● Participate in world-leading scientific projects.</p>
      </div>

      {/* industry */}
      <Suspense fallback={<div>Loading ...</div>}>
        <div className="industry_Container">
          <h1>Main industry</h1>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justify="center"
            style={{ width: "100%", margin: "0px" }}
          >
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper className="industryCard">
                <Link to={`category/Urban-Planning`}>
                  <LazyLoadImage
                    src={urbanPlanningImg}
                    width="100%"
                    height="100px"
                  />
                </Link>
                <hr />
                Urban Planning
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper className="industryCard">
                <Link to={`category/Medical-Science`}>
                  <LazyLoadImage
                    src={medicalScienceImg}
                    width="100%"
                    height="100px"
                  />
                </Link>
                <hr />
                Medical Science
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper className="industryCard">
                <Link to={`category/Envinronmental-Science`}>
                  <LazyLoadImage
                    src={envinromentalSienceImg}
                    width="100%"
                    height="100px"
                  />
                </Link>
                <hr />
                Envinronmental Science
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper className="industryCard">
                <Link to={`category/Material-Science`}>
                  <LazyLoadImage
                    src={materialScienceImg}
                    width="100%"
                    height="100px"
                  />
                </Link>
                <hr />
                Material Science
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper className="industryCard">
                <Link to={`category/Renewable-Energy`}>
                  <LazyLoadImage
                    src={renewableEnergyImg}
                    width="100%"
                    height="100px"
                  />
                </Link>
                <hr />
                Renewable Energy
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper className="industryCard">
                <Link to={`category/Marine-Engineering`}>
                  <LazyLoadImage
                    src={marineEngineerImg}
                    width="100%"
                    height="100px"
                  />
                </Link>
                <hr />
                Marine Engineering
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper className="industryCard">
                <Link to={`category/Chemistry`}>
                  <LazyLoadImage
                    src={chemistryImg}
                    width="100%"
                    height="100px"
                  />
                </Link>
                <hr />
                Chemistry
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper className="industryCard">
                <Link to={`category/Engineering-Manufacturing`}>
                  <LazyLoadImage
                    src={engineeringManufacturingImg}
                    width="100%"
                    height="100px"
                  />
                </Link>
                <hr />
                Engineering & Manufacturing
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper className="industryCard">
                <Link to={`category/Information-Technology`}>
                  <LazyLoadImage
                    src={informationTechnologyImg}
                    width="100%"
                    height="100px"
                  />
                </Link>
                <hr />
                Information Technology
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper className="industryCard">
                <Link to={`category/Data-Science`}>
                  <LazyLoadImage
                    src={dataScienceImg}
                    width="100%"
                    height="100px"
                  />
                </Link>
                <hr />
                Data Science
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper className="industryCard">
                <Link to={`category/Business-Management`}>
                  <LazyLoadImage
                    src={businessManagementImg}
                    width="100%"
                    height="100px"
                  />
                </Link>
                <hr />
                Business & Management
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper className="industryCard">
                <Link to={`category/Artifical-Robotics`}>
                  <LazyLoadImage src={aiImg} width="100%" height="100px" />
                </Link>
                <hr />
                Artificial & Robotics
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Suspense>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
