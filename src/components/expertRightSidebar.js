import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { countryList } from '../asset/countryList';

const editContactField = ['phone_no', 'email'];
const editSocialMediaField = ['linkedin', 'skype', 'twitter'];

const ExpertRightSidebar = (props) => {
    const [data, setData] = useState(
        { first_name: '', expertise: '' }
    );
    const [showInput, setShowInput] = useState(props.showInput);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);
    useEffect(() => {
        setShowInput(props.showInput);
    }, [props.showInput]);

    const clickEdit = (e) => {
        e.preventDefault();
        const { handleEdit } = props;

        handleEdit({ showInput: true })
    }

    const clickConfirm = () => {
        const { handleConfirm } = props;

        handleConfirm(data)
    }

    return (
        <div className="right-sidebar">
            <div className="right-sidebar-wrapper">
                
                    <div className="d-flex-column text-center">
                        <div className="avatar"> <i className="fa fa-user-circle"></i></div>
                        {showInput ?
                            <button className='btn' onClick={clickConfirm}>Save</button>
                            : <button className="btn" onClick={clickEdit}>Edit</button>
                        }
                    </div>


                    <div className="d-flex-column">
                    
                            <h4>Hello,</h4>
                        
                        <h5 className="text-primary"><b>{data.first_name}</b></h5>
                    </div>
                

                <div className="d-flex mt-3">
                    <h5 className="pr-2">Nationality: </h5>
                    {showInput ? <select name="nationality" className="form-control_profileEdit" required
                        defaultValue={data.nationality}
                        onChange={(e) => props.handleInputChange(e, 'nationality')}>
                        <option value=''>Please Select</option>
                        {_.map(countryList, (item, index) => {
                            return <option key={`country-${index}`} value={item}>{item}</option>
                        })}
                    </select> : <h5>{data.nationality}</h5>}
                </div>
                
                <div className="contact-details mt-2">
                    <ul className="contact-details-list">
                        <li className="text-primary ">
                            <h4>Contact Details </h4>
                        </li>
                        {
                            showInput ?
                                _.map(_.pick(data, editContactField), (value, key) => {
                                    return (
                                        <li key={`expertinfo-${key}`} className="contact-details-link">
                                            {key === 'phone_no' ? <i className="fas fa-phone"></i> : <i className="fas fa-envelope"></i>}
                                            <input className="ml-2 mb-2 form-control_profileEdit" defaultValue={value}
                                                onChange={(e) => props.handleInputChange(e, key)} />
                                        </li>
                                    )
                                }) :
                                _.map(_.pick(data, editContactField), (value, key) => {
                                    return (
                                        <li key={`expertinfo-${key}`} className="contact-details-link">
                                            {key === 'phone_no' ? <i className="fas fa-phone"></i> : <i className="fas fa-envelope"></i>}
                                            <span>{value}</span>
                                        </li>
                                    )
                                })
                        }
                    </ul>
                </div>

                <div className="follow-me mt-2">
                    <ul className="follow-me-list">
                        {
                            Object.keys(_.pick(data, editSocialMediaField)).length !== 0 ?
                                <li className="follow-me-head">
                                    <h4>Social Media Platforms </h4>
                                </li>
                                : null
                        }
                        {
                            showInput ?
                                _.map(_.pick(data, editSocialMediaField), (value, key) => {
                                    return (
                                        <li key={`expertinfo-${key}`} className="follow-me-link">
                                            {key === 'linkedin' ? <i className="fa fa-linkedin"></i> :
                                                (key === 'skype' ? <i className="fab fa-skype"></i> :
                                                    <i className="fab fa-twitter"></i>)}
                                            <input className="ml-2 mb-2 form-control_profileEdit" defaultValue={value}
                                                onChange={(e) => props.handleInputChange(e, key)} />
                                        </li>
                                    )
                                }) :
                                _.map(_.pick(data, editSocialMediaField), (value, key) => {
                                    return (
                                        <li key={`expertinfo-${key}`} className="follow-me-link">
                                            {key === 'linkedin' ? <i className="fa fa-linkedin"></i> :
                                                (key === 'skype' ? <i className="fab fa-skype"></i> :
                                                    <i className="fab fa-twitter"></i>)}
                                            <span>{value}</span>
                                        </li>
                                    )
                                })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ExpertRightSidebar;