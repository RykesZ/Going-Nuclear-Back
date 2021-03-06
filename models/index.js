const dbConfig = require('../config/db.config');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.article = require("./Article")(mongoose);
db.subscriber = require("./Subscriber")(mongoose);

module.exports = db;