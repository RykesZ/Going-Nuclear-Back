const db = require("../models");
const Subscriber = db.subscriber;

exports.subscribe = (req, res) => {
    console.log("received subscribe demand");
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if (regex.test(req.body.email) === true) {
        const subscriber = new Subscriber({
            email: req.body.email
        });
        subscriber
            .save(subscriber)
            .then(data => {
                res.status(201).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Erreur lors de l'inscription à la newsletter"
                });
            });
      } else {
          res.status(400).send({
              message: "L'email envoyé n'est pas valide"
          });
      };    
};