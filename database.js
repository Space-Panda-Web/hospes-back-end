
require("dotenv").config()
const mongoose = require("mongoose")

const connectionString = process.env.DATABASE_URL
//const connectionString = 'mongodb+srv://projetofap:rZIu3MSKbIsJfxKW@cluster0.v0b6oma.mongodb.net/booking?retryWrites=true&w=majority'

function connectToDatabase(){
    mongoose.connect(
        connectionString,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
    );

    const db = mongoose.connection

    db.on("error", (error) => {
        console.error(error)
    })

    db.once("open", () => {
        console.log("Conectado ao mongoDB Atlas!")
    })

}

module.exports = connectToDatabase



