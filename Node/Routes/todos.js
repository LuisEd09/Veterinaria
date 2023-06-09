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

module.exports = todos