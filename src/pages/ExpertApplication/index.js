import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import JobCard from '../../components/jobCard';
import { fetchReq } from '../../utils/utils';
import ReactGA from 'react-ga'

const lessHeader = ['ID', 'Job Title', 'Job Type', 'Employer', 'Location', 'Salary', 'Start Date', 'Close Date']
const lessField = ['project_id', 'job_title', 'job_type', 'employer', 'location', 'salary', 'start_date', 'close_date']
const moreHeader = ['Currency', 'Organization Infomation', 'Professional Field', 'Job Description', 'Required Expertise', 'Responsibility', 'Essential skills']
const moreField = [ 'currency', 'organization_info', 'professional_field', 'job_description', 'required_expertise', 'responsibility', 'essential_skills']

const ExpertApplication = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
        const url = `/api/fetchExpertProject/${props.id}`
        fetchReq(url).then(data => {
            this.setState({
                data
            })
        }).catch(err => alert(err));
    }, []);

    const renderJobcards = () => {
        const { role } = props;
        let rows = []
        let jobcards = []

        if(data.length > 0){
            _.forEach(data, (item, index) => {    
            
                jobcards.push(<JobCard key={`jobcards-${index}`}
                                        role={role}
                                        cancalApplicationHandler={cancalApplicationHandler}
                                        moreField={lessField.concat(moreField)}
                                        moreHeader={lessHeader.concat(moreHeader)}
                                        data={item}/>)
                if ((index % 4 === 3) || (data.length === index + 1)){
                    rows.push(<div key={`jobcardrows-${index}`} className="row">
                            {[...jobcards]}
                        </div>)
                    jobcards = []          
                }
            });
    
            return rows;
        } else {
            return <div style={{color: 'darkgrey', fontSize: '1rem'}}>You haven't applied to any jobs yet.</div>
        }
        
    }

    const cancalApplicationHandler = (expert_id, project_id) => {
        const { role } = props;
        
        if(role === 'expert'){   
            fetchReq('/api/deleteProjectMatching', {
                body: JSON.stringify({
                    expertid: expert_id,
                    projectid: project_id
                })
            })
            .then(feedback => {

                _.remove(data, (item, index) => {
                    return item.expert_id === expert_id && item.project_id === project_id;
                });
                setData(data);

            }).catch(err => alert(err));
        } else {
            alert('You should be the expert to cancel your application')
        }   
    }

    return (
        <div className="expert-application-container">
            { renderJobcards() }
        </div>
    )
}

export default ExpertApplication;