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

    // let transporter = nodemailer.createTransport({
    //     host: 'owa.bot.go.tz',
    //     port: 25,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: "noreply@bot.go.tz",
    //         pass: "BOTmaster123"
    //     },
    //     tls: {
    //       // do not fail on invalid certs
    //       rejectUnauthorized: false
    //     }
    // });


    const mailOptions = {
        from: email.sender,
        to: this.stripquotes(email.receiver),
        subject: email.subject,
        html: email.body
    }

    // console.log('mailOptions ', mailOptions);

    try {

        let info = await transporter.sendMail(mailOptions);

        // console.log('Infor ', info);
        // console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        mailResponse = {
            emailSent: true,
            messageId: info.messageId
        };

    } catch (err) {
        //console.log(err.message);
        //throw err; 
        mailResponse = {
            emailSent: false,
            messageId: err.message
        };
    }

    return mailResponse;
}


exports.send2 = async (template, user, subject, data) => {

    const { html, text } = await prepareTemplate(template, data)
    const mailOptions = {
        from: `Marcus Poehls <marcus@futurestud.io>`,
        to: user.email,
        subject: subject,
        html,
        text
    }

    try {
        await Transporter.sendMail(mailOptions)
    } catch (err) {
        console.log(err)
    }
}