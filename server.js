const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./.env" });
const newsletterService = require('./services/newsletterService')

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END_URL);
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


const Article = db.article;
const Subscriber = db.subscriber;
newsletterService(Article, Subscriber);