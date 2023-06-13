const express = require('express');
const urianalisis = express.Router();
const db = require('../config/database');

//Consulta de todo
urianalisis.get('/', async (req, res, next) => {
    const uria = await db.query("SELECT * FROM urianalisis");
    return res.status(200).json(uria);
});

//Consulta por expediente
urianalisis.get('/:exp([0-9])', async (req, res, next) =>{
    const exp = req.params.exp
    const uria = await db.query("SELECT * FROM urianalisis WHERE Expediente="+exp+";");
    if(uria.length > 0){
    return res.status(200).json(uria);
    }
    return res.status(404).send("Expediente no encontrado");
});

//Consulta por caso
/*
urianalisis.get('/:caso([A-Za-z]+)', async (req, res, next) =>{
    const caso = req.params.caso
    const uria = await db.query("SELECT * FROM urianalisis WHERE Caso='"+caso+"';");
    if(uria.length > 0){
    return res.status(200).json(uria);
    }
    return res.status(404).send("Caso no encontrado");
});
*/

//Añadir urianalisis
urianalisis.post("/", async(req, res, next) =>{
    //falta validar que mande todos los campos

    const {Caso, Fecha, Especie, Raza, Sexo, Mvz, Hora, Nombre, Edad, Castrado, Expediente, AnaYEx, TratPrev, Obtencion, Color, Apariencia, Densidad, Proteinas, Glucosa, SangreHg, pH, Cetonas, Bilirrubina, Eritrocitos, Leucocitos, Escamosas, Transitorias, Cilindros, Renales, Cristales, Lipidos, Bacterias, Otros, Interpretacion, idPropieatario} = req.body;

    if (Caso && Fecha && Especie && Raza && Sexo && Mvz && Hora && Nombre && Edad && Castrado && Expediente && AnaYEx && TratPrev && Obtencion && Color && Apariencia && Densidad && Proteinas && Glucosa && SangreHg && pH && Cetonas && Bilirrubina && Eritrocitos && Leucocitos && Escamosas && Transitorias && Cilindros && Renales && Cristales && Lipidos && Bacterias && Otros && Interpretacion && idPropieatario){
    let query = "INSERT INTO urianalisis (Caso, Fecha, Especie, Raza, Sexo, Mvz, Hora, Nombre, Edad, Castrado, Expediente, AnaYEx, TratPrev, Obtencion, Color, Apariencia, Densidad, Proteinas, Glucosa, SangreHg, pH, Cetonas, Bilirrubina, Eritrocitos, Leucocitos, Escamosas, Transitorias, Cilindros, Renales, Cristales, Lipidos, Bacterias, Otros, Interpretacion, idPropieatario)";
    query += ` VALUES('${Caso}',${Fecha},'${Especie}','${Raza}','${Sexo}','${Mvz}','${Hora}','${Nombre}',${Edad},'${Castrado}',${Expediente},'${AnaYEx}','${TratPrev}','${Obtencion}','${Color}','${Apariencia}','${Densidad}','${Proteinas}',${Glucosa},'${SangreHg}',${pH},'${Cetonas}','${Bilirrubina}','${Eritrocitos}','${Leucocitos}','${Escamosas}',${Transitorias},${Cilindros},${Renales},${Cristales},${Lipidos},${Bacterias},'${Otros}','${Interpretacion}',${idPropieatario})`;
    const rows = await db.query(query);
    
    if (rows.affectedRows == 1){
    return res.status(201).json({code: 201, message:"Datos insertados correctamente"});
    }

    return res.status(500).json({code:500, message:"Ocurrio un error"});
    }
    return res.status(500).json({code:500, message:"Campos Incompletos"});
});


urianalisis.post("/cita", async(req,res,next)=>{
    const {idPropietario, fecha, nombre, especie, raza, edad, sexo, castrado} = req.body;

    if(idPropietario && fecha && nombre && especie && raza && edad && sexo && castrado){
        let query = "INSERT INTO urianalisis (idPropietario, fecha, nombre, especie, raza, edad, sexo, castrado)";
        query += ` VALUES ('${idPropietario}','${fecha}','${nombre}','${especie}','${raza}','${edad}','${sexo}','${castrado}')`;
        console.log("CITA")
        console.log(query)
        const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message:"Datos insertados correctamente"});
        }
        return res.status(500).json({code:500, message:"Ocurrio un error"});
    }
    return res.status(500).json({code:500, message:"Campos Incompletos"});
})

urianalisis.get("/examen", async(req, res, next) =>{
    const id = req.query.id
    var query = `SELECT uri.fecha, uri.especie, uri.raza, uri.sexo, uri.nombre, uri.edad, uri.castrado, p.nombre AS propietario, p.direccion, p.telefono FROM urianalisis uri
    JOIN propietario p ON uri.idpropietario = p.idPropietario WHERE idUrianalisis = ${id}; `;

    const rows = await db.query(query);

    if(rows.length > 0){
        return res.status(200).json({code: 200, message: rows});
    }
    return res.status(404).send({code: 404, message: "No encontrado"});
});

urianalisis.put("/update", async (req, res, next) => {
    const id = req.query.id;
    const {
        caso, fecha, especie, raza, sexo, mvz, hora, nombre, edad, castrado, expediente, anayex, tratprev, obtencion, color,
        apariencia, densidad, proteinas, glucosa, sangrehg, ph, cetonas, bilirrubina, eritrocitos, leucocitos, escamosas, 
        transitorias, cilindros, renales, cristales, lipidos, bacterias, otros, interpretacion, completado, idvet
    } = req.body;
  
    var query = `UPDATE urianalisis SET
      Caso = '${caso}',
      Fecha = '${fecha}',
      Especie = '${especie}',
      Raza = '${raza}',
      Sexo = '${sexo}',
      Mvz = '${mvz}',
      Hora = '${hora}',
      Nombre = '${nombre}',
      Edad = '${edad}',
      Castrado = '${castrado}',
      Expediente = '${expediente}',
      AnaYEx = '${anayex}',
      TratPrev = '${tratprev}',
      Obtencion = '${obtencion}',
      Color = '${color}',
      Apariencia = '${apariencia}',
      Densidad = '${densidad}',
      Proteinas = '${proteinas}',
      Glucosa = '${glucosa}',
      SangreHg = '${sangrehg}',
      pH = '${ph}',
      Cetonas = '${cetonas}',
      Bilirrubina = '${bilirrubina}',
      Eritrocitos = '${eritrocitos}',
      Leucocitos = '${leucocitos}',
      Escamosas = '${escamosas}',
      Transitorias = '${transitorias}',
      Cilindros = '${cilindros}',
      Renales = '${renales}',
      Cristales = '${cristales}',
      Lipidos = '${lipidos}',
      Bacterias = '${bacterias}',
      Otros = '${otros}',
      Interpretacion = '${interpretacion}',
      Completado = '${completado}',
      idVeterinario = '${idvet}'
      WHERE idUrianalisis = '${id}'`;
  
    try {
        if(caso && fecha && especie && raza && sexo && mvz && hora && nombre && edad && castrado && expediente && anayex && tratprev && obtencion && color &&
        apariencia && densidad && proteinas && glucosa && sangrehg && ph && cetonas && bilirrubina && eritrocitos && leucocitos && escamosas &&
        transitorias && cilindros && renales && cristales && lipidos && bacterias && otros && interpretacion && completado && idvet){
            const rows = await db.query(query);
            if(rows.affectedRows == 1){
                return res.status(201).json({ code: 201, message: "Actualizado exitosamente" });
            }
            return res.status(500).json({ code: 500, message: "Error, affected rows != 1" });
        }else{
            return res.status(400).json({ code: 400, message: "Datos incompletos" });
        }
    } catch (error) {
      return res.status(500).json({ code: 500, message: error });
    } 
  });

module.exports = urianalisis
