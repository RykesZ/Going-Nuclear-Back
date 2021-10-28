require("dotenv").config({ path: "./config.env" });

module.exports = {
    url: `${process.env.ATLAS_URI}`
};