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
urianalisis.get('/:caso([A-Za-z]+)', async (req, res, next) =>{
    const caso = req.params.caso
    const uria = await db.query("SELECT * FROM urianalisis WHERE Caso='"+caso+"';");
    if(uria.length > 0){
    return res.status(200).json(uria);
    }
    return res.status(404).send("Caso no encontrado");
});

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

module.exports = urianalisis
