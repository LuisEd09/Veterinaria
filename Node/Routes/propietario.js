const express = require('express');
const propietario = express.Router();
const db = require('../config/database');
const jwt =require('jsonwebtoken');

//Registro
propietario.post("/register", async(req, res, next) =>{
    const {Nombre, Direccion, Telefono, Correo, Contraseña} = req.body;
    if(Nombre && Direccion && Telefono && Correo && Contraseña){
    let query = "INSERT INTO propietario (Nombre, Direccion, Telefono, Correo, Contraseña)";
    query += `VALUES ('${Nombre}', '${Direccion}', ${Telefono}, '${Correo}', '${Contraseña}')`
    const rows = await db.query(query);

    if (rows.affectedRows == 1){
        return res.status(201).json({code: 201, message:"Usuario Registrado exitosamente"});
        }
    
        return res.status(500).json({code:500, message:"Ocurrio un error"});
        }
        return res.status(500).json({code:500, message:"Campos Incompletos"});
});

//Inicio de sesion
propietario.post("/login", async (req, res, next) =>{
    const {Correo,Contraseña} = req.body;
    const query = `SELECT * FROM propietario WHERE Correo = '${Correo}' AND Contraseña = '${Contraseña}';`;
    const rows = await db.query(query);

    if(Correo && Contraseña) {
        if (rows.length == 1){
            const token = jwt.sign({
                idPropietario: rows[0].idPropietario,
                Correo: rows[0].Correo
            }, "debugkey");
            return res.status(200).json({code:200 ,  message:token})
        }else{
            return res.status(200).json({code:200 ,  message:"Correo y/o contraseña incorrectos"})
        }
    }
    return res.status(500).json({code:200 ,  message:"Campos incompletos"})
});

module.exports = propietario