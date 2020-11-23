const express = require("express");
const inicio = express.Router();
const db = require('../config/database');

//ruta para obtener todos los usuarios
inicio.get('/' , async(req,res,next)=>{
    const user = await db.query("SELECT * FROM pacientes");
    
    return res.status(200).json({code:1, message:user});
});


inicio.get("/:name([A-Za-z]+)", async(req,  res, next)=>{
    const name = req.params.name;
    const user = await db.query(`SELECT * FROM pacientes WHERE nombre_paciente= '${name}' ;`);
    if (user.length !=0){
        console.log('es aqui');
        return res.status(200).json({code: 200, message: user});
        
    }
    else{
        console.log('es aqui');
        return res.status(404).send({code: 404, message: "Usuario no encontrado"});
        
    }
});
module.exports = inicio;