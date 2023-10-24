const express = require("express");
const mongoose = require("mongoose")

const app = express()

const port = 3000

app.use( (req, res) => {
    try{

    }
    catch{
        res.send('Ocorreu um erro!')
    }
})

app.listen(port, () => {
    console.log("Servidor node rodando!");
  });