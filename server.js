const express = require("express");
const bodyParser = require("body-parser");
//const cors = require("cors");
const cron = require('node-cron');
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

const app = express();

/*const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));*/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models/index");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(err => {
        console.log("Cannot connect to the database", err);
        process.exit();
    })

const articleRoutes = require("./routes/article");
const newsletterRoutes = require("./routes/newsletter");
const contactRoutes = require("./routes/contact");
app.use('/api/articles', articleRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})




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

const Article = db.article;
const Subscriber = db.subscriber;
let lastArticleChecked = '';
let newArticleChecked = null;
cron.schedule('* 0-23/23 * * *', () => {
    Article.find({}).sort({_id:-1}).limit(1)
    .then(data => {
        newArticleChecked = data[0].title;
        console.log({'dernier article ':  lastArticleChecked});
        console.log({'nouvel article ': newArticleChecked});
            if (newArticleChecked !== lastArticleChecked) {
                console.log('nouvel article');

                Subscriber.find()
                    .then(subscribersData => {
                        console.log(subscribersData);

                        let subscribersEmailArray = subscribersData.map((subscriber) => {
                            return subscriber.email;
                        });
                        console.log(subscribersEmailArray);

                        subscribersEmailArray.forEach(email => {
                            transporter.sendMail(
                                {
                                    from: '"Going Nuclear Newsletter" <going.nuclear.contact@gmail.com>',
                                    to: email,
                                    subject: 'Test Newsletter',
                                    text: "Ceci est un test de newsletter simulant l'arrivée d'un nouvel article",
                                    html: `<h1>Un nouvel article est en ligne : ${newArticleChecked} !</h1>
                                            <a href="http://localhost:3000">Cliquez ici pour le consulter.</a>
                                            <p>Vous ne voulez plus recevoir d'e-mail de Going Nuclear ?</p>
                                            <a href="http://localhost:3000/unsubscribe/${email}">Cliquer ici pour vous désabonner.</a>`
                                    
                                }, function(error, info) {
                                if (error) {
                                    throw error;
                                } else {
                                    console.log('Email envoyé')
                                };
                            });
                        });


                    })
                    .catch(err => {
                        console.log('erreur lors de la récupération des abonnés')
                    })
                lastArticleChecked = newArticleChecked;
            } else {
                console.log('pas de nouvel article');
            }
        })
        .catch(err => {
            console.log('erreur lors de la récupération du dernier article')
        })
});