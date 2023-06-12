const express = require('express');
const todos = express.Router();
const db = require('../config/database');

todos.get("/examenes", async(req,res,next)=>{
    const id = req.query.id
    var query = `SELECT idHematologia, fecha, 'Hematologia' AS tipo FROM hematologia WHERE idPropietario = ${id} AND completado = 'si' `;
    query += `UNION ALL SELECT idParasitologia, fecha, 'Parasitologia' AS tipo FROM parasitologia WHERE idPropietario = ${id} AND completado = 'si' `;
    query += `UNION ALL SELECT idUrianalisis, fecha, 'Urianalisis' AS tipo FROM urianalisis WHERE idPropietario = ${id} AND completado = 'si' `;
    query += 'ORDER BY fecha ASC;'

    const rows = await db.query(query);

    if(rows.length > 0){
        return res.status(200).json({code:200, message:rows})
    }
    return res.status(404).send({code:404, message: "No encontrado"})
})

todos.get("/citas", async(req, res, next) =>{
    var query = `SELECT h.idHematologia, h.fecha, h.especie, h.nombre, p.nombre AS nombre_propietario, 'Hematologia' AS tipo FROM hematologia h
                JOIN propietario p ON h.idpropietario = p.idPropietario WHERE h.completado IS NULL `;
    query += `UNION ALL SELECT para.idParasitologia, para.fecha, para.especie, para.nombre, p.nombre AS nombre_propietario, 'Parasitologia' AS tipo FROM parasitologia para
                JOIN propietario p ON para.idpropietario = p.idPropietario WHERE para.completado IS NULL `;
    query += `UNION ALL SELECT u.idUrianalisis, u.fecha, u.especie, u.nombre, p.nombre AS nombre_propietario, 'Urianalisis' AS tipo FROM urianalisis u
                JOIN propietario p ON u.idUrianalisis = p.idPropietario WHERE u.completado IS NULL `;
    query += 'ORDER BY fecha ASC;';

    const rows = await db.query(query);

    if(rows.length > 0){
        return res.status(200).json({code: 200, message: rows});
    }
    return res.status(404).send({code: 404, message: "No encontrado"});
});


module.exports = todos