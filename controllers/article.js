const db = require("../models");
const Article = db.article;


exports.getAllArticles = (req, res) => {
    console.log("trying to get articles");
    Article.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur lors de la récupération des articles"
            });
        });
};

exports.create = (req, res) => {
    const article = new Article({
        title: req.body.title,
        tags: req.body.tags,
        text: req.body.text,
        infographie: req.body.info,
        chartData: req.body.chartData,
        verticalUnit: req.body.verticalUnit,
        horizontalUnit: req.body.horizontalUnit,
        tickLabels: req.body.tickLabels
    });

    article
        .save(article)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur lors de la création de l'article"
            });
        });
};

exports.getLastArticle = (req, res) => {
    Article.find({}).sort({_id:-1}).limit(1)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur lors de la récupération de l'article"
            });
        });
}

exports.getNumberOfArticles = (req, res) => {
    Article.countDocuments({}, (err, count) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Erreur lors du comptage d'articles"
            });
        } else {
            console.log(count);
            res.status(200).send({
                count: count
            });
        };
    });
};