const createTransportConfig = {
    host: "smtpw.263.net", //replace with your email provider
    port: 465,
    auth: {
        user: "contact@hyde-china.com", //replace with the email address
        pass: "Cmm2020cm107" //replace with the password
    }
}

const mailingUrl = {
    prod: 'http://www.hitalents.co.uk',
    dev: 'http://localhost:5000'
}

module.exports = {
    createTransportConfig,
    mailingUrl
}