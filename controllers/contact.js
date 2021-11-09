const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });
const emailValidation = require('../services/emailValidation');

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

exports.send = (req, res) => {
    console.log("received contact demand");
      if ((emailValidation(req.body.email)) && (req.body.object !== '') && (req.body.text !== '')) {
          try {
              transporter.sendMail(
                  {
                      from: '"Contact via Going Nuclear" <going.nuclear.contact@gmail.com>',
                      to: process.env.MY_GMAIL_BOX,
                      subject: `${req.body.object}`,
                      text: `${req.body.text}`,
                      html: `<h1>${req.body.email} vous envoie :</h1>
                              <p>${req.body.text}</p>`
                  }, function(error, info) {
                  if (error) {
                      throw error;
                  } else {
                      console.log('Email envoyé')
                      res.status(200).send();
                  };
              })
          } catch (error) {
            res.status(500).send({
                message: error.message || "Erreur lors de l'envoi du mail"
            });
          }
      } else {
        res.status(400).send({
            message: "L'email envoyé n'est pas valide"
        });
      }
}