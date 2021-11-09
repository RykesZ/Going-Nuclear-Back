const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
       user: 'going.nuclear.contact@gmail.com',
       pass: process.env.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
 });

 const emailSender = (from, email, object, text, html) => {
    transporter.sendMail(
        {
            from: from,
            to: email,
            subject: object,
            text: text,
            html: html
        }, function(error, info) {
        if (error) {
            throw error;
        } else {
            console.log('Email envoyé')
        };
    });
 }

 module.exports = emailSender;