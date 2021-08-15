import React from 'react';
import { NavLink } from 'react-router-dom';

const Tab = (props) => {
    return (
        <li className="sidebar-nav-item">
            <NavLink to={props.path} className="sidebar-nav-link">
                <span className="fa-stack" style={{width: 'auto'}}>
                    <i className={`fa ${props.icon}`} aria-hidden="true"> </i>
                    {props.showWarning ? <i className="fa fa-exclamation top-right-badge" aria-hidden="true"> </i> : null}
                </span>
                <span className="link-text"> {props.name}</span>
            </NavLink>
        </li>
    )
}

export default Tab;