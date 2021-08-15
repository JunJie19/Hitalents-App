import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import { getRole } from '../../utils/utils';
import ReactGA from 'react-ga';

const TermsOfService = () => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    },[])
    return (
        <div>
            <section id="top" className="bg-dark">
                <header id="header">
                    <div className="brand-container">
                        <Link className="brand" to="/home">
                            HI Talents
                        </Link>
                    </div>
                    <nav className="main-nav">
                        <NavLink className="nav-item" to="/home" style={{ color: 'white' }}>Home</NavLink>
                        <NavLink className="nav-item" to="/jobs" style={{ color: 'white' }}>Jobs</NavLink>
                        <NavLink className="nav-item" to="/aboutus" style={{ color: 'white' }}>About</NavLink>
                        <NavLink className="nav-item" to="/contactus" style={{ color: 'white' }}>Contact</NavLink>
                        <div className="sign-in">
                            {getRole() === '__admin__' ?
                                <NavLink className="nav-item user" to="/mgt/admin_dashboard">
                                    <div className="fa fa-user-o"></div>
                                </NavLink>
                                :
                                (getRole() === 'expert' ?
                                    <NavLink className="nav-item user" to="/mgt/expert_profile">
                                        <div className="fa fa-user-o"></div>
                                    </NavLink>
                                    : <NavLink className="nav-item user" to="/login">
                                        <div className="fa fa-user-o"></div>
                                    </NavLink>)
                            }
                        </div>
                    </nav>
                </header>
            </section>

            <section className="container mt-3 mb-3 justify-content">
                <div className="row">       
                    <div className="col">
                        <h1>Terms Of Service For Hyde International (UK) Website</h1><br/>
                        <p>Hyde International (UK) Ltd. (“Hyde”, “we” or “us”) provides you access to the Hyde International (UK) Website (the “Site”) in order to help you at every stage of the business partner matching service and offer you other help and advice. Please read these Terms of Service carefully before using the Site. Using the site indicates that you accept these Terms of Service regardless of whether or not you choose to register with us. If you do not want to adhere to these terms, do not use the Site.</p>

                        <h1>Your Use Of This Site</h1>
                        <p>All users of the Hyde International (UK) Website are responsible to provide accurate, correct and legitimate information to Hyde International (UK) and they will not use the Site for any of the below purposes:
                        <ul>
                                <li>To post or transmit any material for which you have not obtained all necessary licences and/or approvals</li>
                                <li>To post or transmit on the Site inaccurate, incomplete or false information (including in the case of users’ biographical information about yourself and/or information about your ability to work in the China or elsewhere)</li>
                                <li>To post or transmit on the Site any libellous, abusive, threatening, harmful, vulgar, obscene or otherwise objectionable material</li>
                                <li>To post or transmit on the Site any material which contains any virus or other disabling devices which interferes or may interfere with the operation of the Site; or which alters or deletes any information which you have no authority to alter or delete; or which overloads the Site by spamming or flooding it</li>
                                <li>To use any device, routine or software to crash, delay, or otherwise damage the operation of this Site</li>
                                <li>To take any action that affects Hyde’s reputation or that defames, abuses, harasses or threatens others</li>
                                <li>To encourage conduct that would be considered a criminal offence, give rise to civil liability, or otherwise be contrary to the law; or carry out such conduct yourself</li>
                            </ul>


                            Hyde International (UK) Ltd. at its own discretion has the right to stop you from using the Site and/or to delete from the Site immediately and without prior notice any material that it deems not to comply with these above terms. Hyde International (UK) Ltd. shall co-operate fully with any law enforcement authorities or court order requesting or directing Hyde International (UK) Ltd. to disclose the identity or locate anyone posting any material in breach of the above.</p>

                        <h1>Security And Passwords</h1>
                        <p>When you register with this site or log in when you visit the Site, you will need to use a user name and password. You are solely responsible for the security and proper use of the password, which should be kept confidential at all times and not disclosed to anybody else. You should notify us immediately if you believe that your password is in the possession of somebody that is trying to use it in an unauthorized way. Hyde International (UK) Ltd. accepts no liability for any unauthorized or improper use of disclosure of any password.</p>

                        <h1>Intellectual Property Rights</h1>
                        <p>Unless otherwise stated, the copyright and other intellectual property rights in all material on this Site (including without limitation photographs and graphical images) are owned by Hyde International (UK) Ltd. or its licensors. You may not download copy or print any of the pages of the Site except for your own personal use, and provided you keep intact all copyright and proprietary notices. No copying or distribution for any business or commercial use is allowed. No framing, harvesting, “scraping” or other manipulation of the content of the Site is permitted. You will not attempt to decipher, disassemble, reverse engineer or modify any of the software, coding or information comprised in the Site; nor will you post to the Site any material which infringes any intellectual property rights of any third party.</p>

                        <h1>Changes To Or Temporary Unavailability Of This Site</h1>
                        <p>Every effort is made to keep the Site up and running smoothly and fault-free. However, Hyde takes no responsibility for, and will not be liable for, the Site being temporarily unavailable for reasons of maintenance / improvement, or due to technical issues beyond our control.  We may change, suspend or discontinue any aspect of the Site at any time, including the availability of any of the Site features or content. Hyde may amend these Terms of Service at any time by posting amended Terms of Service to the Site. You will be deemed to have agreed to the amended Terms of Service when you next use this Site following any amendment.</p>

                        <h1>Liability And Disclaimer</h1>
                        <p>The information contained on this Site including any given collaboration opportunities and possible research funding are given in good faith and Hyde uses all reasonable efforts to ensure that it is accurate. However, Hyde gives no representation or warranty in respect of such information and all such representations and warranties, whether express or implied, are excluded.

                        No liability is accepted by Hyde for any loss or damage which may arise out of any person relying on or using any information on this Site. Hyde shall not be liable to any person relying on or using any such information for
            <ol type="a">
                                <li>loss of revenue, loss of actual or anticipated salary; loss of actual or anticipated profits whether arising in the normal course of business or otherwise (including, without limitation, loss of profits on contracts); loss of or damage to employment prospects; loss of opportunity; loss of the use of money; loss of anticipated savings; loss of business; loss of goodwill; loss of or damage to reputation; loss of or corruption to data; loss of management or administration time, legal and other professional fees and expenses; or</li>
                                <li>any indirect or consequential loss or damages however caused (including without limitation by reason of misrepresentation, negligence, other tort, breach of contract or breach of statutory duty) which arise directly or indirectly from the subject matter of this Site.  However, nothing in the above shall limit or exclude Hyde’s liability for fraud or for death or personal injury caused by negligence, or to the extent otherwise not permitted by law.</li>
                            </ol>
                        You agree fully to indemnity us and keep us fully indemnified against all costs, expenses, claims, losses, liabilities or proceedings arising from use or misuse by you of this Site.
                        We do not guarantee that any business partner will ask for a user’s information, or will interview or hire an user, or that any user will be available or will meet the needs of any business partner. We make no representation or warranty as to the final terms and duration of any appointment obtained through this Site. Whilst we take all reasonable steps to ensure it is the case, we do not guarantee that any business partner will keep confidential any of the user’s information or data provided to them.</p>

                    </div>
                </div>

            </section>

            <Footer />
        </div>
    )
}

export default TermsOfService;