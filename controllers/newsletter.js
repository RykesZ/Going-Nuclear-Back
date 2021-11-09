const db = require("../models");
const Subscriber = db.subscriber;
const emailValidation = require('../services/emailValidation');

exports.subscribe = (req, res) => {
    console.log("received subscribe demand");
      if (emailValidation(req.body.email) === true) {
        Subscriber.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                console.log("user already exist");
                res.status(400).send({
                    message: "Il existe déjà un utilisateur inscrit à la newsletter avec cet adresse e-mail !"
                })
            } else {
                const subscriber = new Subscriber({
                    email: req.body.email
                });
                subscriber
                    .save(subscriber)
                    .then(data => {
                        console.log("user subscribed")
                        res.status(201).send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Erreur lors de l'inscription à la newsletter"
                        });
                    });
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Erreur lors de la vérification de doublon"
            })
        }) 
    } else {
        res.status(400).send({
            message: "L'email envoyé n'est pas valide"
        });
    };    
};

exports.unsubscribe = (req, res) => {
    console.log("received unsubscribe demand");
    console.log(req.body.email);
      if (emailValidation(req.body.email) === true) {
        Subscriber.deleteOne({ email: req.body.email})
        .then(() => {
            console.log("user unsubscribed");
            res.status(200).json({ message: 'Utilisateur supprimé de la liste des abonnés à la newsletter'});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la désincription à la newsletter"
            })
        })
      } else {
          res.status(400).send({
              message: "L'email envoyé n'est pas valide"
          });
      }
}