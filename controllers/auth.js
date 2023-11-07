const mongoose = require('mongoose')
require('../models/User.js');
const User = mongoose.model('User')

const bcrypt = require('bcryptjs');
const createError = require('../utils/error.js');

const jwt = require("jsonwebtoken")//verifica se o usuário é admin para habilitar fazer alterações

const register = async (req, res, next) => {

    try{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(200).send("Usuário foi criado!")
       
    }catch(err){
        
        next(err)
    }
}




const login = async (req, res, next) => {
    try{
        const user = await User.findOne({ username:req.body.username });
       
        if (!user) {
            return next(createError(404, "Usuário inexistente!"));
        }
        //console.log(req.body.password,user.password)
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        )

        //console.log(isPasswordCorrect)

        if(!isPasswordCorrect){
            return next(createError(400, "Senha incorreta!"))
        }

        

        const token = jwt.sign(
            {id:user._id, isAdmin:user.isAdmin},
             process.env.JWT
        )

        const { password, isAdmin, ...otherDetails } = user._doc//esconde o retorno da hash da senha e se o usuário é admin.
        res
        .cookie("access_token", token, {//Evita que cookies coletem certas informações, tornando mais seguro
            httpOnly: true,
        })
        .status(200)
        //.json({...otherDetails})
        .json("Sucesso na autenticação!")
        
        

    }catch(err) {
        next(err);
    }
};



module.exports = {
    register,
    login
}


