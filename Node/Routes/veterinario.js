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
            return res.status(200).json({code:200 ,  message:token, id:rows[0].idVeterinario})
        }else{
            return res.status(200).json({code:200 ,  message:"Correo y/o contraseña incorrectos"})
        }
    }
    return res.status(500).json({code:200 ,  message:"Campos incompletos"})
});

veterinario.get("/info", async (req, res, next) =>{
    const id = req.query.id
    var query = `SELECT Nombre, idVeterinario, expediente FROM veterinario WHERE idVeterinario = ${id}; `;

    const rows = await db.query(query);

    if(rows.length > 0){
        return res.status(200).json({code: 200, message: rows});
    }
    return res.status(404).send({code: 404, message: "No encontrado"});
});
module.exports = veterinario