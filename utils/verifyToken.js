const jwt = require("jsonwebtoken")
const createError = require('../utils/error.js')

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token){
        return next(createError(401, "Você não está autenticado!"))
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err){
            return next(createError(403, "Token não é válido!"))   
        }
        req.user = user
        next()//Se estiver tudo ok vá para próxima operação.
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res,() => {//Para verificar o usuário deve estar autenticado primeiro.
        if(req.user.id === req.params.id || req.user.isAdmin){//Se o id for igual ao que está dentro do  jwt ou for administrado.
            next()
        } else{
            
                return next(createError(403, "You are not authorized!"))
            
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {//Para verificar o usuário deve estar autenticado primeiro.
        if(req.user.isAdmin){//Se o id for igual ao que está dentro do  jwt ou for administrado.
            next()
        } else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}


module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin
}