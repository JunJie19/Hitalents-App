import React, { useState } from 'react';
import InfoEditModal from './infoEditModal';

const JobCard = (props) => {
    const [data, setData] = useState(props.data);
    const [showInfo, setShowInfo] = useState(false);

    const showMore = () => {
        setShowInfo(true);
    }

    const closeInfoHandler = (hide) => {
        setShowInfo(hide);
    }

    const handleDataChange = (data) => {
        setData(data);
    }

    const calculateDayDiff = (startDate) => {
        const today = new Date();
        const date_to_reply = new Date(startDate);
        const timeinmilisec = today.getTime() - date_to_reply.getTime();
        return Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24))
    }

    const cancalApplication = () => {
        const { cancalApplicationHandler } = props;
        cancalApplicationHandler(data.expert_id, data.project_id);
    }

    return (
        <div className="col-m-6 col-sm-6">
            <div className="job-card">
                {data.application_complete === 'N' ? <span className="warning-text">Incomplete application</span> : null}
                <div className="job-card-header">
                    <ul className="header-list">
                        <li className="header-item">
                            <h3>{data.job_title}</h3>
                        </li>
                        {/* <li className="posted">Posted By</li>
                        <li className="company">{show_employer_name === 'Y' ? employer : 'admin'}</li> */}
                    </ul>
                    <div className="job-card-sec-1">
                        <div className=".col-6 col-m-12 .col-sm-12">
                            <ul>
                                <li className="posted">Salary</li>
                                <li className="date">{data.currency} {data.salary}</li>
                            </ul>
                        </div>
                        <div className=".col-6 col-m-12 .col-sm-12">
                            <ul>
                                <li className="posted">Job Type</li>
                                <li className="date">{data.job_type}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="job-card-sec-1">
                        <div className=".col-6 col-m-12 .col-sm-12">
                            <ul>
                                <li className="posted">Start Date</li>
                                <li className="date">{data.start_date} </li>
                            </ul>
                        </div>
                        <div className=".col-6 col-m-12 .col-sm-12">
                            <ul>
                                <li className="posted">Close Date</li>
                                <li className="date">{data.close_date}</li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="job-card-sec-1">
                        <div className=".col-6 col-m-12 .col-sm-12">
                            <ul>
                                <button className="see-more" onClick={showMore}>See More</button>
                            </ul>
                        </div>
                        <div className=".col-6 col-m-12 .col-sm-12">
                            <ul>
                                <button className="see-more" onClick={cancalApplication}>Cancel Application</button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <InfoEditModal
                show={showInfo}
                close={closeInfoHandler}
                allowEdit={props.role === '__admin__' ? true : false}
                onDataChange={props.role === '__admin__' ? handleDataChange : null}
                modalHeader='Project Info'
                headers={props.moreHeader}
                fileds={props.moreField}
                data={data}
            />
        </div>
    )
}

export default JobCard;