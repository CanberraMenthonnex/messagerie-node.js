const mongoose = require("mongoose")

const MONGO_URI = process.env.MONGO_URI

function connect() {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Successfully connected to the database")
    })
    .catch(() => {
        console.error("Error while connecting to the database")
        process.exit(1)
    })
}

module.exports = connect