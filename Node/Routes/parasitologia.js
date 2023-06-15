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
/*
parasitologia.get('/:caso([A-Za-z]+)', async (req, res, next) =>{
    const caso = req.params.caso
    const para = await db.query("SELECT * FROM parasitologia WHERE Caso='"+caso+"';");
    if(para.length > 0){
    return res.status(200).json(para);
    }
    return res.status(404).send("Caso no encontrado");
});
*/

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
        query += ` VALUES ('${idPropietario}','${fecha}','${nombre}','${especie}','${raza}','${edad}','${sexo}','${castrado}')`;
        const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message:"Datos insertados correctamente"});
        }
        return res.status(500).json({code:500, message:"Ocurrio un error"});
    }
    return res.status(500).json({code:500, message:"Campos Incompletos"});
})

parasitologia.get("/examen", async(req, res, next) =>{
    const id = req.query.id
    var query = `SELECT para.fecha, para.especie, para.raza, para.sexo, para.nombre, para.edad, para.castrado, p.nombre AS propietario, p.direccion, p.telefono FROM parasitologia para
    JOIN propietario p ON para.idpropietario = p.idPropietario WHERE idParasitologia = ${id}; `;

    const rows = await db.query(query);

    if(rows.length > 0){
        return res.status(200).json({code: 200, message: rows});
    }
    return res.status(404).send({code: 404, message: "No encontrado"});
});

parasitologia.put("/update", async (req, res, next) => {
    const id = req.query.id
    const {
      value2, value3, value4, value5, value6, value7, value8, value9, value10,
      value11, value12, value13, value14, value15, value16, value17, value18, value19, value20
    } = req.body;
  
    var query = `UPDATE parasitologia SET 
      Caso = '${value2}',
      Fecha = '${value3}',
      Especie = '${value4}',
      Raza = '${value5}',
      Sexo = '${value6}',
      Mvz = '${value7}',
      Hora = '${value8}',
      Nombre = '${value9}',
      Edad = '${value10}',
      Castrado = '${value11}',
      Expediente = '${value12}',
      AnaYEx = '${value13}',
      TratPrev = '${value14}',
      TipoMuestra = '${value15}',
      Tecnica = '${value16}',
      Resultado = '${value17}',
      Observaciones = '${value18}',
      Completado = '${value19}',
      idVeterinario = '${value20}'
      WHERE idParasitologia = '${id}'`;
  
    try {
      const rows = await db.query(query);
      if(rows.affectedRows == 1){
          return res.status(201).json({ code: 201, message: "Actualizado exitosamente" });
      }
      return res.status(500).json({ code: 500, message: "Error, affected rows != 1" });
    }catch (error) {
      return res.status(500).json({ code: 500, message: error });
    }
  });

module.exports = parasitologia
