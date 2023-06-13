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
/*
hematologia.get('/:caso([A-Za-z]+)', async (req, res, next) =>{
    const caso = req.params.caso
    const hema = await db.query("SELECT * FROM hematologia WHERE Caso='"+caso+"';");
    if(hema.length > 0){
    return res.status(200).json(hema);
    }
    return res.status(404).send("Caso no encontrado");
});
*/

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

hematologia.get("/examen", async(req, res, next) =>{
    const id = req.query.id
    var query = `SELECT h.fecha, h.especie, h.raza, h.sexo, h.nombre, h.edad, h.castrado, p.nombre AS propietario, p.direccion, p.telefono FROM hematologia h
    JOIN propietario p ON h.idpropietario = p.idPropietario WHERE idHematologia = ${id}; `;

    const rows = await db.query(query);

    if(rows.length > 0){
        return res.status(200).json({code: 200, message: rows});
    }
    return res.status(404).send({code: 404, message: "No encontrado"});
});

hematologia.put("/update", async(req, res, next) => {
    const id = req.body.id;
    const {
        value1, value2, value3, value4, value5, value6, value7, value8, value9, value10,
        value11, value12, value13, value14, value15, value16, value17, value18, value19, value20,
        value21, value22, value23, value24, value25, value26, value27, value28, value29, value30,
        value31, value32, value33, value34, value35, value36, value37, value38, value39, value40,
        value41, value42, value43, value44, value45, value46, value47, value48, value49, value50,
        value51, value52, value53, value54, value55, value56, value57, value58, value59, value60,
        value61, value62
    } = req.body;

    var query = `UPDATE hematologia SET
        IdHematologia = '${value1}',
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
        Hematocrito = '${value15}',
        HematocritoV = '${value16}',
        Hemoglobina = '${value17}',
        HemoglobinaV = '${value18}',
        Eritrocitos = '${value19}',
        EritrocitosV = '${value20}',
        VGM = '${value21}',
        VGMV = '${value22}',
        CGMH = '${value23}',
        CGMHV = '${value24}',
        Reticulocitos = '${value25}',
        ReticulocitosV = '${value26}',
        Plaquetas = '${value27}',
        PlaquetasV = '${value28}',
        Solidos = '${value29}',
        SolidosV = '${value30}',
        Leucocitos = '${value31}',
        LeucocitosV = '${value32}',
        Neutrofilos = '${value33}',
        NeutrofilosV = '${value34}',
        Bandas = '${value35}',
        BandasV = '${value36}',
        Linfocitos = '${value37}',
        LinfocitosV = '${value38}',
        Monocitos = '${value39}',
        MonocitosV = '${value40}',
        Eosinofilos = '${value41}',
        EosinofilosV = '${value42}',
        Basofilos = '${value43}',
        BasofilosV = '${value44}',
        Policromasia = '${value45}',
        PBasofilico = '${value46}',
        Hipocromia = '${value47}',
        Aglutinacion = '${value48}',
        Rouleaux = '${value49}',
        Metarrubricitos = '${value50}',
        Poiquilocitosis = '${value51}',
        Tipo = '${value52}',
        NeutrofilosToxicos = '${value53}',
        LinfocitosReactivos = '${value54}',
        MieloInmaduros = '${value55}',
        Microfilarias = '${value56}',
        Macroplaquetas = '${value57}',
        Artefactos = '${value58}',
        Interpretacion = '${value59}',
        Completado = '${value60}',
        idPropietario = '${value61}',
        idVeterinario = '${value62}'
        WHERE IdHematologia = ${id}`;

    try {
        await db.query(query);
        return res.status(200).json({ code: 200, message: "Actualizado exitosamente" });
    } catch (error) {
        return res.status(500).json({ code: 500, message: "Error en el servidor" });
    }
});

module.exports = hematologia