import React, {useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router';
import { fetchReq } from '../utils/utils';

const ResetPasswordForm = (props) => {
    const passwordRef = useRef();
    const [token, setToken] = useState(props.match.params.token);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const url = `/api/resetPassword/${token}`
        fetchReq(url).then(data => {
            setEmail(data.account_name);
            setRole(data.permission_role);
        }).catch(msg => {
            alert(msg);
        });
    }, []);

    const updatePassword = (e) => {
        e.preventDefault();
        setShowSpinner(true);
        const password = passwordRef.current.value;
        fetchReq('/api/updatePassword', {
            body: JSON.stringify({
                email,
                password
            })
        }).then(data => {
            setShowSpinner(false);
            alert(data);

            props.history.replace('/login');
        }).catch(msg => {
            setShowSpinner(false);
            alert(msg);
        });
    }

    return (
        <form className="registerLogin-form" onSubmit={updatePassword}>
            <div className="form-group">
                <label> Your email: </label>
                <label> {email} </label>
            </div>
            <div className="form-group">
                <label> Reset password: </label>
                <input type="password" className="form-control" placeholder="Reset password"
                    ref={passwordRef}
                 required />
            </div>
            <div className="form-group">
                <button type="submit" className="apply-btn">Submit</button>
            </div>
            <div className={showSpinner ? "spinner" : null}></div>
        </form>
    )
}

export default withRouter(ResetPasswordForm);