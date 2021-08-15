import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import { getRole } from '../../utils/utils';
import ReactGA from 'react-ga';

const Privacy = () => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])
    return(
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

                <div className="container mt-3 mb-3 justify-content">
                    <div className="row">
                        <div className="col-sm-12">
                         <h1>Privacy Policy For Hyde International (UK)</h1>   <br></br>    
                         <p>Hyde International (UK) Ltd. ("we", "us" or "our") is committed to protecting the privacy of our users, business partners and 
                             users of our website. We want to provide a secure user experience. We will ensure that the information you submit to us, or which we collect, 
                             via various channels, for example in email correspondence, is only used for the purposes mentioned in this policy.</p>
                         <p>Through this Privacy Policy we aim to inform you about the types of personal data we collect from users, the purposes for which we use the data and the ways in which the data is handled.
                                  We also aim to satisfy the obligation of transparency under the UK General Data Protection Regulation Act.</p>

                        <h1>The Information We Collect</h1><br></br>

                        <p>We will collect your personal details, including but not limited to your name and contact details as well as 
                            your email address and other relevant information from the document you upload or send to us.</p>

                        <h1>How We Use Your Personal Information</h1><br></br>

                        <p>We will hold, use and disclose your personal information, for our legitimate business purposes including: </p> 

                  <ol type="1">
                    <li>to provide our services to you;</li>
                    <li>to maintain our business relationship, where you are an user of our website, a business partner or an user;</li>
                    <li>to match your details with job and research opportunities, to assist us in finding a position that best suits you and to send your personal information (including sensitive personal information) to our business partners in order to apply for opportunities;</li>
                    <li>to retain your details and to notify you about future job and research that should arise;</li>
                    <li>to answer your enquiries;</li>
                    <li>to fulfil contractual obligations with our business partners;</li>
                    <li>to release personal information to regulatory or law enforcement agencies, if we are required or permitted to do so;</li>
                  </ol> 
               

              <p>We may process, in accordance with local regulations, certain sensitive personal data (known as special category data in GDPR) where you include it in information you send to us e.g. if you include information about your health, religion or ethnic origin in the document you send to us. We may also be required to conduct a criminal records check against your details.  We have processes in place to limit our use and disclosure of such sensitive data other than where permitted by law.</p>
               
              <h1>The Legal Basis For Processing Your Personal Information</h1><br></br>
               
              <p>Under GDPR, the main grounds that we rely upon in order to process personal information of users and business partners are the following: 
                <ol type="a">
                    <li>Necessary for entering into, or performing, a contract – in order to perform obligations that we undertake in providing a service to you, or in order to take steps at your request to enter into a contract with us, it will be necessary for us to process your personal data;</li>
                    <li>Necessary for compliance with a legal obligation – we are subject to certain legal requirements which may require us to process your personal data.  We may also be obliged by law to disclose your personal data to a regulatory body or law enforcement agency;</li>
                    <li>Necessary for the purposes of legitimate interests -  either we, or a third party, will need to process your personal data for the purposes of our (or a third party's) legitimate interests, provided we have established that those interests are not overridden by your rights and freedoms, including your right to have your personal data protected.  Our legitimate interests include responding to requests and enquiries from you or a third party, optimising our website and customer experience, informing you about our products and services and ensuring that our operations are conducted in an appropriate and efficient manner;</li>
                    <li>Consent – in some circumstances, we may ask for your consent to process your personal data in a particular way. Particularly in regard to information about your research project.</li>
                </ol>
              </p>
               
               
              <h1>How We Share Your Personal Information</h1><br></br>
              <p>In certain circumstances we will share your personal information with other parties.  

              However, Hyde will not disclose any information about users’ projects without the previous written consent of users. 

              We will share your personal information as above for any or all of the following purposes:
              <ul>
                <li>for business development;</li>
                <li>for systems development and testing;</li>
                <li>to improve our customer service and to make our services more valuable to you; and/or</li>
                <li>We disclose your personal information to our business partners who have opportunities in areas in which you are interested.</li>
              </ul>           
              We will share your personal information and, where necessary, your sensitive personal information with trusted third parties to provide services that our business partners have requested, such as: 
              <ul>
                <li>For employment reference checks</li>
                <li>For credit checks</li>
              </ul>
              We require minimum standards of confidentiality and data protection from such third parties.  To the extent that any personal information is provided to third parties outside the UK, or who will access the information from outside the UK, we will ensure that approved safeguards are in place.</p>
               
              <h1>Regulatory And Law Enforcement Agencies</h1><br></br>
               
              <p>As noted above, if we receive a request from a regulatory body or law enforcement agency, and if permitted under UK GDPR Act and other laws, we may disclose certain personal information to such bodies or agencies.</p>
               
              <h1>New Business Owners</h1><br></br>
               
              <p>If we or our business merges with or is acquired by another business or company, we will share your personal information with the new owners of the business or company and their advisors.  If this happens, you will be sent notice of such event.</p>
               
               
              <h1>How Long We Will Hold Your Information</h1><br></br>
               
              <p>The length of time we will hold or store your personal information for will depend on the services we perform for you and for how long you require these. As we often support users with joint collaborations with our business partners for over many years, the purpose for which we often retain our users’ information. However, we conduct regular data-cleansing and updating exercises with our users’ personal information.</p>
               
              
               
              <h1>Your Rights On Information We Hold About You</h1> <br></br>
               
              <p>You have certain rights in relation to personal information we hold about you. Details of these rights and how to exercise them are set out below. We will require evidence of your identity before we are able to act on your request.</p>
               
              <h1>Right of Access</h1><br></br>
               
              <p>You have the right at any time to ask us for a copy of the personal information about you that we hold. Where we have good reason, and if the GDPR permits, we can refuse your request for a copy of your personal information, or certain elements of the request. If we refuse your request or any element of it, we will provide you with our reasons for doing so.</p>
               
              <h1>Right of Correction or Completion</h1><br></br>
               
              <p>If personal information we hold about you is not accurate, out of date or incomplete, you have a right to have the data rectified, updated or completed. Hyde International also will not change the meaning or the intention of the information that users provide.</p> 

               
              <h1>Right of Erasure</h1><br></br>
               
              <p>In certain circumstances, you have the right to request that personal information we hold about you is erased e.g. if the information is no longer necessary for the purposes for which it was collected or processed or our processing of the information is based on your consent and there are no other legal grounds on which we may process the information.</p>
               
              <h1>Consent</h1><br></br>
               
              <p>To the extent that we are processing your personal information based on your consent, you have the right to withdraw your consent at any time. You can do this by contacting us.</p>
               
               
              <h1>Use of Cookies</h1> <br></br>
              <p>You can find out more about our use of cookies, including how to reject cookies, in our Cookie Policy here.</p>
               
              <h1>Other Websites</h1><br></br>
               
              <p>Please note that clicking on links and banner advertisements on our websites this can lead to your browser accessing a third party website, where data privacy practices are not the same to that of Hyde International (UK) Ltd.
               
              We are not responsible for, and have no control over, information that is submitted to or collected by these third parties and you should consult their privacy policies as they will be different to outs.</p>  
               
              <h1>Changes To Our Privacy Policy</h1><br></br>
               
              <p>This privacy policy can be changed by Hyde at any time. If we change our privacy policy in the future, we will advise you of changes or updates to our privacy policy by email, where you have provided us with your email address.</p> 
               
              <h1>Contact</h1><br/>
              <p>If you have any questions regarding our privacy policy please email <a href="mailto:contact@hyde-china.com" title="title" >contact@hyde-china.com</a></p>
           
            </div>
        </div>
      </div>
               
    <Footer/>
   </div>
    )
};

export default Privacy;