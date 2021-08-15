import React from "react";
import { Link } from "react-router-dom";

import "../styles/jobtitlecard.css";

const JobTitleCard = (props) => {
  return (
    <Link className="job-card" to={props.link}>
      <div className="job-card-header">
        <ul className="header-list">
          <li className="header-item">
            <h5>
              <i className="fa fa-suitcase"></i>&nbsp;{props.data.job_title}
            </h5>
          </li>
        </ul>
        <div className="job-card-sec-1">
          <div className=".col-6 col-m-12 .col-sm-12">
            <ul>
              <li className="posted">Salary</li>
              <li className="date">
                {props.data.currency} {props.data.salary}
              </li>
            </ul>
          </div>
          <div className=".col-6 col-m-12 .col-sm-12">
            <ul>
              <li className="posted">Job Type</li>
              <li className="date">{props.data.job_type}</li>
            </ul>
          </div>
        </div>
        <div className="job-card-sec-1">
          <div className=".col-6 col-m-12 .col-sm-12">
            <ul>
              <li className="posted">Start Date</li>
              <li className="date">{props.data.start_date} </li>
            </ul>
          </div>
          <div className=".col-6 col-m-12 .col-sm-12">
            <ul>
              <li className="posted">Close Date</li>
              <li className="date">{props.data.close_date}</li>
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobTitleCard;
