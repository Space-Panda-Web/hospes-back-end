const express = require("express");
const mongoose = require("mongoose")


const app = express()

const port = 3000

const connectToDatabase = require("./database.js")
connectToDatabase()


const authRoute = require("./routes/auth.js")
const usersRoute = require("./routes/users.js")
const hotelsRoute = require("./routes/hotels.js")
const roomsRoute = require("./routes/rooms.js")

const cookieParser = require("cookie-parser")
const cors = require("cors")
//MIDDLEWARES
app.use(cookieParser())
app.use(cors())
app.use(express.json());

app.use("/auth", authRoute)
app.use("/users", usersRoute)
app.use("/hotels", hotelsRoute)
app.use("/rooms", roomsRoute)


app.use((err, req, res, next) => {
  //console.log("Hi, I am a middleware!")
  // console.log("Hii middleware!")
  // next()
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Algo de errado ocorreu!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

app.listen(port, () => {
  console.log("Servidor node rodando!");
});


