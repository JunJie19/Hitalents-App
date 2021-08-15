import React, { useRef, useState } from 'react';
import { fetchReq } from '../utils/utils';

const ForgotPasswordForm = (props) => {
    const email = useRef();
    const [showSpinner, setShowSpinner] = useState(false);

    const forgotPassword = (e) => {
        e.preventDefault();
        setShowSpinner(true);
        
        fetchReq('/api/forgotPassword', {
            body: JSON.stringify({
                email: email.current.value
            })
        }).then(data => {
            setShowSpinner(false);
            alert(data);
        }).catch(msg => {
            setShowSpinner(false);
            alert(msg);
        });
    }

    return (
        <form className="registerLogin-form" onSubmit={forgotPassword}>
            <div className="form-group centered">
                <input type="email" className="form-control" placeholder="Please enter your registered email" ref={email} required />
            </div>
            <div className="form-group">
                <button type="submit" className="apply-btn">Submit</button>
            </div>
            <div className={showSpinner ? "spinner" : null}></div>
        </form>
    )
}

export default ForgotPasswordForm;