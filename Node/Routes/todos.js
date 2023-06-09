
const express = require('express');
const todos = express.Router();
const db = require('../config/database');

todos.get("/examenes", async(req,res,next)=>{
    const id = req.query.id
    var query = `SELECT idHematologia, completado,nombre, fecha, 'Hematologia' AS tipo FROM hematologia WHERE idPropietario = ${id} `;
    query += `UNION ALL SELECT idParasitologia, completado,nombre, fecha, 'Parasitologia' AS tipo FROM parasitologia WHERE idPropietario = ${id} `;
    query += `UNION ALL SELECT idUrianalisis, completado,nombre, fecha, 'Urianalisis' AS tipo FROM urianalisis WHERE idPropietario = ${id} `;
    query += 'ORDER BY fecha ASC;'

    var query2 = `SELECT * FROM propietario WHERE idPropietario = ${id}  `;

    const rows2 = await db.query(query2);


    const rows = await db.query(query);

    if(rows.length > 0){
        return res.status(200).json({code:200, message:rows, propie:rows2})
    }
    return res.status(404).send({code:404, message: "No encontrado"})
})

todos.get("/examenes/pdf", async(req,res,next)=>{
    const id = req.query.id
    const tipo = req.query.tipo
    const idExamen = req.query.carga
    const idP = req.query.idP
    const idV = req.query.idV
    var query = `SELECT * FROM ${tipo} t JOIN veterinario v ON t.idVeterinario = v.idVeterinario WHERE ${idExamen} = ${id} AND completado = 'si' 
                    `;

    var query2 = `SELECT * FROM propietario WHERE idPropietario = ${idP}  `;

    const rows = await db.query(query);
    const rows2 = await db.query(query2);

    console.log(id)
    if(rows.length > 0){
        return res.status(200).json({code:200, message:rows, propie:rows2})
    }
    return res.status(404).send({code:404, message: "No encontrado"})
})


todos.get("/citas", async(req, res, next) =>{
    var query = `SELECT h.idHematologia, h.fecha, h.especie, h.nombre, p.nombre AS nombre_propietario, 'Hematologia' AS tipo FROM hematologia h
                JOIN propietario p ON h.idpropietario = p.idPropietario WHERE h.completado IS NULL `;
    query += `UNION ALL SELECT para.idParasitologia, para.fecha, para.especie, para.nombre, p.nombre AS nombre_propietario, 'Parasitologia' AS tipo FROM parasitologia para
                JOIN propietario p ON para.idpropietario = p.idPropietario WHERE para.completado IS NULL `;
    query += `UNION ALL SELECT u.idUrianalisis, u.fecha, u.especie, u.nombre, p.nombre AS nombre_propietario, 'Urianalisis' AS tipo FROM urianalisis u
                JOIN propietario p ON u.idPropietario = p.idPropietario WHERE u.completado IS NULL `;
    query += 'ORDER BY fecha ASC;';

    const rows = await db.query(query);
    console.log(query)

    if(rows.length > 0){
        return res.status(200).json({code: 200, message: rows});
    }
    return res.status(404).send({code: 404, message: "No encontrado"});
});

todos.get("/reporte", async(req, res, next) =>{
    const mes = req.query.mes
    const anio = req.query.anio
    var query = `SELECT h.idHematologia, h.completado, h.fecha, h.especie, v.expediente, h.nombre, p.nombre AS nombre_propietario, 'Hematologia' AS tipo FROM hematologia h
                JOIN propietario p ON h.idpropietario = p.idPropietario JOIN veterinario v ON h.idVeterinario = v.idVeterinario WHERE MONTH(h.fecha) = ${mes} AND YEAR(h.fecha) = ${anio} `;
    query += `UNION ALL SELECT para.idParasitologia, para.completado, para.fecha, para.especie, v.expediente, para.nombre, p.nombre AS nombre_propietario, 'Parasitologia' AS tipo FROM parasitologia para
                JOIN propietario p ON para.idpropietario = p.idPropietario JOIN veterinario v ON para.idVeterinario = v.idVeterinario WHERE MONTH(para.fecha) = ${mes} AND YEAR(para.fecha) = ${anio} `;
    query += `UNION ALL SELECT u.idUrianalisis, u.completado, u.fecha, u.especie, v.expediente, u.nombre, p.nombre AS nombre_propietario, 'Urianalisis' AS tipo FROM urianalisis u
                JOIN propietario p ON u.idUrianalisis = p.idPropietario JOIN veterinario v ON u.idVeterinario = v.idVeterinario WHERE MONTH(u.fecha) = ${mes} AND YEAR(u.fecha) = ${anio} `;
    query += 'ORDER BY fecha ASC;';

    var query2 = `SELECT h.idHematologia, h.completado, h.fecha, h.especie, CASE WHEN h.idVeterinario IS NULL THEN 'Por determinar' ELSE v.expediente END AS expediente, h.nombre, p.nombre AS nombre_propietario, 'Hematologia' AS tipo
    FROM hematologia h 
    JOIN propietario p ON h.idpropietario = p.idPropietario 
    LEFT JOIN veterinario v ON h.idVeterinario = v.idVeterinario 
    WHERE MONTH(h.fecha) = ${mes} AND YEAR(h.fecha) = ${anio} 
    UNION ALL 
    SELECT para.idParasitologia, para.completado, para.fecha, para.especie, CASE WHEN para.idVeterinario IS NULL THEN 'Por determinar' ELSE v.expediente END AS expediente, para.nombre, p.nombre AS nombre_propietario, 'Parasitologia' AS tipo
    FROM parasitologia para 
    JOIN propietario p ON para.idpropietario = p.idPropietario 
    LEFT JOIN veterinario v ON para.idVeterinario = v.idVeterinario 
    WHERE MONTH(para.fecha) = ${mes} AND YEAR(para.fecha) = ${anio} 
    UNION ALL 
    SELECT u.idUrianalisis, u.completado, u.fecha, u.especie, CASE WHEN u.idVeterinario IS NULL THEN 'Por determinar' ELSE v.expediente END AS expediente, u.nombre, p.nombre AS nombre_propietario, 'Urianalisis' AS tipo
    FROM urianalisis u 
    JOIN propietario p ON u.idUrianalisis = p.idPropietario 
    LEFT JOIN veterinario v ON u.idVeterinario = v.idVeterinario 
    WHERE MONTH(u.fecha) = ${mes} AND YEAR(u.fecha) = ${anio} 
    ORDER BY fecha ASC;`;

    console.log("QUERY 1> " + query)
    console.log("QUERY 2> " + query2)
    const rows = await db.query(query2);

    if(rows.length > 0){
        return res.status(200).json({code: 200, message: rows});
    }else{
        return res.status(200).send({code: 200, message: []});
    }
    return res.status(404).send({code: 404, message: "No encontrado"});
});


module.exports = todos