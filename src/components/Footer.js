import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PhoneEnabledIcon from "@material-ui/icons/PhoneEnabled";
import MailIcon from "@material-ui/icons/Mail";
import { Row } from "react-bootstrap";
import "../styles/footer.css";
import { Grid } from "@material-ui/core";

const Footer = () => {
  return (
    <div className="footer_Container">
      <Grid
        container
        spacing={3}
        alignItems="center"
        justify="center"
        style={{ width: "100%", margin: "0px" }}
      >
        <Row>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <div className="footerCard">
              <h4>Contact Us</h4>
              <h6>HYDE INTERNATIONAL TALENTS (UK)</h6>
              <address>
                37th Floor, One Canada Square, Canary Wharf, London, United
                Kingdom, E14 5AA
              </address>
              <strong>
                <PhoneEnabledIcon /> +44 (0) 207 038 7865
              </strong>
              <br />
              <strong>
                <MailIcon /> contact@hyde-china.com
              </strong>
            </div>
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <div className="footerCard">
              <h4>Help</h4>
              <Link to="/cookies-policy" className="footerLink">
                {" "}
                <ArrowForwardIosIcon />
                Cookies policy
              </Link>
              <br />
              <Link to="/terms-of-service" className="footerLink">
                <ArrowForwardIosIcon />
                Terms of service
              </Link>
              <br />
              <Link to="/privacy-policy" className="footerLink">
                <ArrowForwardIosIcon />
                Privacy policy
              </Link>
            </div>
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <div className="footerCard">
              <h4>Follow Us</h4>
              <a
                href="https://www.linkedin.com/company/hyde-international-uk/?originalSubdomain=uk"
                className="footerLink"
              >
                <LinkedInIcon title="LinkedIn" />
              </a>
            </div>
          </Grid>
        </Row>
        <Row>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className="footerbottom">
              &copy; Copyright <strong>HYDE INTERNATIONAL TALENTS (UK)</strong>.
              All Rights Reserved
            </div>
          </Grid>
        </Row>
      </Grid>
    </div>
  );
};

export default Footer;
