'use strict';
const nodemailer = require('nodemailer');

module.exports.stripquotes = (txt) => {
    if ((txt.charAt(0) === '"' || txt.charAt(0) === "'") && (txt.charAt(txt.length - 1) === '"' || txt.charAt(txt.length - 1) === "'")) {
        return txt.substr(1, txt.length - 2);
    }
    return txt;
}

// async..await is not allowed in global scope, must use a wrapper
module.exports.send = async (email) => {

    let mailResponse = {}
    //create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "tips.notifications@gmail.com",
            pass: "Password@123"
        }
    });

    const mailOptions = {
        from: email.sender,
        to: this.stripquotes(email.receiver),
        subject: email.subject,
        html: email.body
    }

    // console.log('mailOptions ', mailOptions);

    try {

        let info = await transporter.sendMail(mailOptions);

        mailResponse = {
            emailSent: true,
            messageId: info.messageId
        };

    } catch (err) {
        mailResponse = {
            emailSent: false,
            messageId: err.message
        };
    }

    return mailResponse;
}

