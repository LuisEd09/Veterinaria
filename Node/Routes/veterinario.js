const express = require('express');
const veterinario = express.Router();
const db = require('../config/database');
const jwt =require('jsonwebtoken')

//Inicio de sesion
veterinario.post("/login", async (req, res, next) =>{
    const {Correo,Contraseña} = req.body;
    const query = `SELECT * FROM veterinario WHERE Correo = '${Correo}' AND Contraseña = '${Contraseña}';`;
    const rows = await db.query(query);

    if(Correo && Contraseña) {
        if (rows.length == 1){
            const token = jwt.sign({
                idVeterinario: rows[0].idVeterinario,
                Correo: rows[0].Correo
            }, "debugkey");
            return res.status(200).json({code:200 ,  message:token})
        }else{
            return res.status(200).json({code:200 ,  message:"Correo y/o contraseña incorrectos"})
        }
    }
    return res.status(500).json({code:200 ,  message:"Campos incompletos"})
});

module.exports = veterinario