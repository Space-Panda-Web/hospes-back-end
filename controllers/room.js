const mongoose = require('mongoose')
require('../models/Room.js');
const Hotel = require('../models/Hotel.js');
const Room = mongoose.model('Room')


//const createError = require('../utils/error.js')

//CREATE
const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId,{
                $push: { rooms: savedRoom._id },
            })
        }catch (err) {
            next (err)
        }
        res.status(200).json(savedRoom)
    }catch (err){
        next(err)
    }


}


//UPDATE
const updateRoom = async (req, res, next) => {
    try{
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
            )
        res.status(200).json(updateRoom)
    }catch(err){
        next(err)
    }
}



//DELETE
const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid
    try{
        await Room.findByIdAndDelete(req.params.id)
        try{
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull: { rooms: req.params.id },
            })
        }catch (err) {
            next (err)
        }
        res.status(200).json("Room has been deleted.")
    }catch(err){
        next(err)
    }
}



//GET
const getRoom = async (req, res, next) => {
    try{
        const room = await Room.findById(
            req.params.id,
        )
        res.status(200).json(room)
    }catch(err){
        next(err)
    }
}



//GET ALL
const getRooms = async (req, res, next) => {
     //console.log("Hi, I am a hotel route.")
    //const failed = true
    
    //if(failed) return next(createError(401, "Você não está autenticado!"))
    
    try{
        //const hotels = await Hotel.find()
        const rooms = await Room.find()
        res.status(200).json(rooms)
    }catch(err){
        next(err)
    }
}


module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    getRooms
}