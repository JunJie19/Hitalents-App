function welcomeSignupHTML (firstname){
    return (
        `<p> Dear ${firstname}, </p>` 
+ "<p> Welcome to join Hyde International Talents (HI Talents) Network! </p> " 
+ `<p> HI Talents is committed to providing international cross-cultural solution and opportunity for organisations and talents worldwide. Please follow our <a href="https://www.linkedin.com/company/hyde-international-uk/?originalSubdomain=uk">LinkedIn</a> page for more exciting opportunities. </p> ` 

+ "<p> Kind regards, </p> " 

+ "Hyde International Talents <br/>"
+ "T: +44 (0) 207 712 1505 <br/>" 
+ "E: contact@hyde-china.com <br/>"
+ "W: hitalents.co.uk <br/>"
+ "A: Hyde International (UK), 37th Floor, One Canada Square, Canary Wharf, London, United Kingdom, E14 5AA <br/>"
    )
}


function forgotPasswordHTML (firstname, resetUrl){
    return (
        `<p> Dear ${firstname}, </p>` 
 + "<p> We have received your request to reset your password for Hyde International Talents (HI Talents) Website. For a security reason, we have invalided your existing password. Please click the link below and follow the instruction to change your password. </p> " 
 + `<p> ${resetUrl} </p> `
 + "<p> If you have any trouble or questions about resetting your password, please contact us by email: contact@hyde-china.com </p> "
 
 + "<p> Kind regards, </p> " 

 + "Hyde International Talents <br/>"
 + "T: +44 (0) 207 712 1505 <br/>" 
 + "E: contact@hyde-china.com <br/>"
 + "W: hitalents.co.uk <br/>"
 + "A: Hyde International (UK), 37th Floor, One Canada Square, Canary Wharf, London, United Kingdom, E14 5AA <br/>" 
    )
}

module.exports = {
    welcomeSignupHTML,
    forgotPasswordHTML
}