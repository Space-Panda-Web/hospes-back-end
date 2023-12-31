const mongoose = require('mongoose')
require('../models/User.js');
const User = mongoose.model('User')

//CREATE
const createUser = async (req,res,next) => {
    const newUser = new User(req.body)
    try{
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }catch(err){
        next(err)
    }
}



//UPDATE
const updateUser = async (req, res, next) => {
    try{
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
            )
        res.status(200).json(updateUser)
    }catch(err){
        next(err)
    }
}



//DELETE
const deleteUser = async (req, res, next) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User deletado.")
    }catch(err){
        next(err)
    }
}



//GET
const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(
            req.params.id,
        )
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
}



//GET ALL
const getUsers = async (req, res, next) => {    
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(err){
        next(err)
    }
}



module.exports = {
    createUser, 
    updateUser, 
    deleteUser,  
    getUser, 
    getUsers
}