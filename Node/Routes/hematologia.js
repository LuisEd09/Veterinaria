const express = require('express');
const hematologia = express.Router();
const db = require('../config/database');

//Consulta de todo
hematologia.get('/', async (req, res, next) => {
    const hema = await db.query("SELECT * FROM hematologia");
    return res.status(200).json(hema);
});

//Consulta por expediente
hematologia.get('/:exp([0-9])', async (req, res, next) =>{
    const exp = req.params.exp
    const hema = await db.query("SELECT * FROM hematologia WHERE Expediente="+exp+";");
    if(hema.length > 0){
    return res.status(200).json(hema);
    }
    return res.status(404).send("Expediente no encontrado");
});

//Consulta por caso
hematologia.get('/:caso([A-Za-z]+)', async (req, res, next) =>{
    const caso = req.params.caso
    const hema = await db.query("SELECT * FROM hematologia WHERE Caso='"+caso+"';");
    if(hema.length > 0){
    return res.status(200).json(hema);
    }
    return res.status(404).send("Caso no encontrado");
});

//Añadir hematologia
hematologia.post("/", async(req, res, next) =>{
    //falta validar que mande todos los campos

    const {Caso, Fecha, Especie, Raza, Sexo, Mvz, Hora, Nombre, Edad, Castrado, Expediente, AnaYEx, TratPrev, Hematocrito, HematocritoV, Hemoglobina, HemoglobinaV, Eritrocitos, EritrocitosV, VGM, VGMV, CGMH, CGMHV, Reticulocitos, ReticulocitosV, Plaquetas, PlaquetasV, Solidos, SolidosV, Leucocitos, LeucocitosV, Neutrofilos, NeutrofilosV, Bandas, BandasV, Linfocitos, LinfocitosV, Monocitos, MonocitosV, Eosinofilos, EosinofilosV, Basofilos, BasofilosV, Policromasia, PBasofilico, Hipocromia, Aglutinacion, Rouleaux, Metarrubricitos, Poiquilocitosis, Tipo, NeutrofilosToxicos, LinfocitosReactivos, MieloInmaduros, Microfilarias, Macroplaquetas, Artefactos, Interpretacion, idPropietario} = req.body;

    if (Caso && Fecha && Especie && Raza && Sexo && Mvz && Hora && Nombre && Edad && Castrado && Expediente && AnaYEx && TratPrev && Hematocrito && HematocritoV && Hemoglobina && HemoglobinaV && Eritrocitos && EritrocitosV && VGM && VGMV && CGMH && CGMHV && Reticulocitos && ReticulocitosV && Plaquetas && PlaquetasV && Solidos && SolidosV && Leucocitos && LeucocitosV && Neutrofilos && NeutrofilosV && Bandas && BandasV && Linfocitos && LinfocitosV && Monocitos && MonocitosV && Eosinofilos && EosinofilosV && Basofilos && BasofilosV && Policromasia && PBasofilico && Hipocromia && Aglutinacion && Rouleaux && Metarrubricitos && Poiquilocitosis && Tipo && NeutrofilosToxicos && LinfocitosReactivos && MieloInmaduros && Microfilarias && Macroplaquetas && Artefactos && Interpretacion && idPropietario){
    let query = "INSERT INTO hematologia (Caso, Fecha, Especie, Raza, Sexo, Mvz, Hora, Nombre, Edad, Castrado, Expediente, AnaYEx, TratPrev, Hematocrito, HematocritoV, Hemoglobina, HemoglobinaV, Eritrocitos, EritrocitosV, VGM, VGMV, CGMH, CGMHV, Reticulocitos, ReticulocitosV, Plaquetas, PlaquetasV, Solidos, SolidosV, Leucocitos, LeucocitosV, Neutrofilos, NeutrofilosV, Bandas, BandasV, Linfocitos, LinfocitosV, Monocitos, MonocitosV, Eosinofilos, EosinofilosV, Basofilos, BasofilosV, Policromasia, PBasofilico, Hipocromia, Aglutinacion, Rouleaux, Metarrubricitos, Poiquilocitosis, Tipo, NeutrofilosToxicos, LinfocitosReactivos, MieloInmaduros, Microfilarias, Macroplaquetas, Artefactos, Interpretacion, idPropietario)";
    query += ` VALUES('${Caso}', ${Fecha}, '${Especie}', '${Raza}', '${Sexo}', '${Mvz}', '${Hora}', '${Nombre}', ${Edad}, '${Castrado}', '${Expediente}', '${AnaYEx}', '${TratPrev}', '${Hematocrito}', '${HematocritoV}', '${Hemoglobina}', '${HemoglobinaV}', '${Eritrocitos}', '${EritrocitosV}', '${VGM}', '${VGMV}', '${CGMH}', '${CGMHV}', '${Reticulocitos}', '${ReticulocitosV}', '${Plaquetas}', '${PlaquetasV}', '${Solidos}', '${SolidosV}', '${Leucocitos}', '${LeucocitosV}', '${Neutrofilos}', '${NeutrofilosV}', '${Bandas}', '${BandasV}', '${Linfocitos}', '${LinfocitosV}', '${Monocitos}', '${MonocitosV}', '${Eosinofilos}', '${EosinofilosV}', '${Basofilos}', '${BasofilosV}', '${Policromasia}', '${PBasofilico}', '${Hipocromia}', '${Aglutinacion}', '${Rouleaux}', '${Metarrubricitos}', '${Poiquilocitosis}', '${Tipo}', '${NeutrofilosToxicos}', '${LinfocitosReactivos}', '${MieloInmaduros}', '${Microfilarias}', '${Macroplaquetas}', '${Artefactos}', '${Interpretacion}', ${idPropietario})`;
    const rows = await db.query(query);
    
    if (rows.affectedRows == 1){
    return res.status(201).json({code: 201, message:"Datos insertados correctamente"});
    }

    return res.status(500).json({code:500, message:"Ocurrio un error"});
    }
    return res.status(500).json({code:500, message:"Campos Incompletos"});
});

hematologia.post("/cita", async(req,res,next)=>{
    const {idPropietario, fecha, nombre, especie, raza, edad, sexo, castrado} = req.body;

    if(idPropietario && fecha && nombre && especie && raza && edad && sexo && castrado){
        let query = "INSERT INTO hematologia (idPropietario, fecha, nombre, especie, raza, edad, sexo, castrado)";
        query += ` VALUES ('${idPropietario}','${fecha}','${nombre}','${especie}','${raza}','${edad}','${sexo}','${castrado}')`;
        console.log(query)
        const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message:"Datos insertados correctamente"});
        }
        return res.status(500).json({code:500, message:"Ocurrio un error"});
    }
    return res.status(500).json({code:500, message:"Campos Incompletos"});
})

module.exports = hematologia