const express = require('express');
const parasitologia = express.Router();
const db = require('../config/database');

//Consulta de todo
parasitologia.get('/', async (req, res, next) => {
    const para = await db.query("SELECT * FROM parasitologia");
    return res.status(200).json(para);
});

//Consulta por expediente
parasitologia.get('/:exp([0-9])', async (req, res, next) =>{
    const exp = req.params.exp
    const para = await db.query("SELECT * FROM parasitologia WHERE Expediente="+exp+";");
    if(para.length > 0){
    return res.status(200).json(para);
    }
    return res.status(404).send("Expediente no encontrado");
});

//Consulta por caso
parasitologia.get('/:caso([A-Za-z]+)', async (req, res, next) =>{
    const caso = req.params.caso
    const para = await db.query("SELECT * FROM parasitologia WHERE Caso='"+caso+"';");
    if(para.length > 0){
    return res.status(200).json(para);
    }
    return res.status(404).send("Caso no encontrado");
});

//Añadir parasitologia
parasitologia.post("/", async(req, res, next) =>{
    //falta validar que mande todos los campos

    const {Caso, Fecha, Especie, Raza, Sexo, Mvz, Hora, Nombre, Edad, Castrado, Expediente, AnaYEx, TratPrev, TipoMuestra, Tecnica, Resultado, Observaciones, idPropietario} = req.body;

    if (Caso && Fecha && Especie && Raza && Sexo && Mvz && Hora && Nombre && Edad && Castrado && Expediente && AnaYEx && TratPrev && TipoMuestra && Tecnica && Resultado && Observaciones && idPropietario){
    let query = "INSERT INTO parasitologia (Caso, Fecha, Especie, Raza, Sexo, Mvz, Hora, Nombre, Edad, Castrado, Expediente, AnaYEx, TratPrev, TipoMuestra, Tecnica, Resultado, Observaciones, idPropietario)";
    query += ` VALUES('${Caso}', ${Fecha}, '${Especie}', '${Raza}', '${Sexo}', '${Mvz}', '${Hora}', '${Nombre}', ${Edad}, '${Castrado}', ${Expediente}, '${AnaYEx}', '${TratPrev}', '${TipoMuestra}', '${Tecnica}', '${Resultado}', '${Observaciones}', ${idPropietario})`;
    const rows = await db.query(query);
    
    if (rows.affectedRows == 1){
    return res.status(201).json({code: 201, message:"Datos insertados correctamente"});
    }

    return res.status(500).json({code:500, message:"Ocurrio un error"});
    }
    return res.status(500).json({code:500, message:"Campos Incompletos"});
});


parasitologia.post("/cita", async(req,res,next)=>{
    const {idPropietario, fecha, nombre, especie, raza, edad, sexo, castrado} = req.body;

    if(idPropietario && fecha && nombre && especie && raza && edad && sexo && castrado){
        let query = "INSERT INTO parasitologia (idPropietario, fecha, nombre, especie, raza, edad, sexo, castrado)";
        query += ` VALUES ('${idPropietario}',${fecha},'${nombre}','${especie}','${raza}','${edad}','${sexo}','${castrado}')`;
        const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message:"Datos insertados correctamente"});
        }
        return res.status(500).json({code:500, message:"Ocurrio un error"});
    }
    return res.status(500).json({code:500, message:"Campos Incompletos"});
})

module.exports = parasitologia
