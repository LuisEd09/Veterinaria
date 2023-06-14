var url = "http://localhost:3000";
var idExam = new URLSearchParams(window.location.search).get('id')
var inputHora;
var propietarioID;
document.addEventListener("DOMContentLoaded", function () {
		var registrarButton = document.getElementById("registrar");

		registrarButton.addEventListener("click", function() {
			send()
		});

    document.getElementById("logout-link").addEventListener("click", function (event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        // Eliminar el valor almacenado en localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        // Redireccionar o realizar cualquier otra acción que desees después de cerrar sesión
        window.location.href = "../pages/index.html"; // Redireccionar a la página de inicio, por ejemplo
    });

    // TOMAR TAGS DEL DOM

    var caso = document.getElementById("caso");
    var nombre = document.getElementById("nombre");
    var direccion = document.getElementById("direccion");
    var telefono = document.getElementById("telefono");

    var fecha = document.getElementById("fecha");
    inputHora = document.getElementById('hora');
    asignarHoraActual(inputHora);
    var especie = document.getElementById("especie");
    var nombreM = document.getElementById("nombreM");
    var raza = document.getElementById("raza");
    var edad = document.getElementById("edad");
    var sexo = document.getElementById("sexo");
    var castrado = document.getElementById("castrado");
    var mvz = document.getElementById("mvz");
    var expediente = document.getElementById("expediente");

    var idvet = localStorage.getItem('id');

    var anamnesis = document.getElementById("anamnesis");
    var previo = document.getElementById("previo");

    // OBTENER TODOS LOS INPUTS Y SELECTS
    var Hematocrito = document.getElementById("Hematocrito");
    var HematocritoV = document.getElementById("HematocritoV");
    var Hemoglobina = document.getElementById("Hemoglobina");
    var HemoglobinaV = document.getElementById("HemoglobinaV");
    var Eritrocitos = document.getElementById("Eritrocitos");
    var EritrocitosV = document.getElementById("EritrocitosV");
    var VGM = document.getElementById("VGM");
    var VGMV = document.getElementById("VGMV");
    var CGMH = document.getElementById("CGMH");
    var CGMHV = document.getElementById("CGMHV");
    var Reticulocitos = document.getElementById("Reticulocitos");
    var ReticulocitosV = document.getElementById("ReticulocitosV");
    var Plaquetas = document.getElementById("Plaquetas");
    var PlaquetasV = document.getElementById("PlaquetasV");
    var Solidos = document.getElementById("Solidos");
    var SolidosV = document.getElementById("SolidosV");
    var Leucocitos = document.getElementById("Leucocitos");
    var LeucocitosV = document.getElementById("LeucocitosV");
    var Neutrofilos = document.getElementById("Neutrofilos");
    var NeutrofilosV = document.getElementById("NeutrofilosV");
    var Bandas = document.getElementById("Bandas");
    var BandasV = document.getElementById("BandasV");
    var Linfocitos = document.getElementById("Linfocitos");
    var LinfocitosV = document.getElementById("LinfocitosV");
    var Monocitos = document.getElementById("Monocitos");
    var MonocitosV = document.getElementById("MonocitosV");
    var Eosinofilos = document.getElementById("Eosinofilos");
    var EosinofilosV = document.getElementById("EosinofilosV");
    var Basofilos = document.getElementById("Basofilos");
    var BasofilosV = document.getElementById("BasofilosV");
    var Artefactos = document.getElementById("Artefactos");

    var Anisocitosis = document.getElementById("Anisocitosis");
    var Policromasia = document.getElementById("Policromasia");
    var PBasofilico = document.getElementById("PBasofilico");
    var Hipocromia = document.getElementById("Hipocromia");
    var Aglutinacion = document.getElementById("Aglutinacion");
    var Rouleaux = document.getElementById("Rouleaux");
    var Metarrubricitos = document.getElementById("Metarrubricitos");
    var Poiquilocitosis = document.getElementById("Poiquilocitosis");
    var Tipo = document.getElementById("Tipo");
    var NeutrofilosToxicos = document.getElementById("NeutrofilosToxicos");
    var LinfocitosReactivos = document.getElementById("LinfocitosReactivos");
    var MieloInmaduros = document.getElementById("MieloInmaduros");
    var Microfilarias = document.getElementById("Microfilarias");
    var Macroplaquetas = document.getElementById("Macroplaquetas");
    var Interpretacion = document.getElementById("Interpretacion");
    // OBTENER TODOS LOS INPUTS Y SELECTS FIN

    var headers = {};
    
    var token = localStorage.getItem("token");
    if (token) {
        headers = {
            'Authorization': 'bearer ' + token
        };
    } else {
        window.location.href = "../pages/index.html";
    }

    try {
        axios.get(url + "/hematologia/examen", {
            headers: headers,
            params: {
                id: idExam
            }
        })
            .then(function (res) {
                if (res.data.code == 200) {
                    // console.log(res); // Mostrar toda la respuesta en la consola
                    var respuesta = res.data.message[0];
                    console.log("RESPUESTA DEL GET > ");
                    console.log(respuesta);
                    // PONER DATOS AUTOMATICAMENTE
                    direccion.value = respuesta.direccion
                    edad.value = respuesta.edad
                    fecha.value = formatearFecha(respuesta.fecha)
                    nombre.value = respuesta.nombre
                    nombreM.value = respuesta.nombre
                    nombre.value = respuesta.propietario
                    raza.value = respuesta.raza
                    telefono.value = respuesta.telefono
                    mvz.value = respuesta.mvz
                    expediente.value = respuesta.expediente
                    propietarioID = respuesta.propietarioID
                    sexo.value = respuesta.sexo
                    especie.value = respuesta.especie
                    castrado.value = respuesta.castrado
                } else {
                    // Manejar el caso en el que res.data.code no sea 200
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    } catch (e) {
        console.log(e);
    }
});

function formatearFecha(fecha) {
    // Crea un objeto Date con la cadena de fecha proporcionada
    const fechaObjeto = new Date(fecha);

    // Obtiene los componentes de la fecha
    const dia = fechaObjeto.getDate();
    const mes = fechaObjeto.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
    const año = fechaObjeto.getFullYear();

    // Formatea los componentes en una cadena con el formato deseado
    const fechaFormateada = `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;

    return fechaFormateada;
}


function send() {
    var id = new URLSearchParams(window.location.search).get('id')
    var idvet = localStorage.getItem('id');

    asignarHoraActual(inputHora);
    
    // alert(idExam 
    // + " / " + caso.value 
    // + " / " + fecha.value 
    // + " / " + especie.value 
    // + " / " + raza.value 
    // + " / " + sexo.value 
    // + " / " + mvz.value 
    // + " / " + inputHora.value 
    // + " / " + nombreM.value 
    // + " / " + edad.value 
    // + " / " + castrado.value 
    // + " / " + expediente.value 
    // + " / " + anamnesis.value 
    // + " / " + previo.value 
    // + " / " + Hematocrito.value 
    // + " / " + HematocritoV.value 
    // + " / " + Hemoglobina.value 
    // + " / " + HemoglobinaV.value 
    // + " / " + Eritrocitos.value 
    // + " / " + EritrocitosV.value 
    // + " / " + VGM.value 
    // + " / " + VGMV.value 
    // + " / " + CGMH.value 
    // + " / " + CGMHV.value 
    // + " / " + Reticulocitos.value 
    // + " / " + ReticulocitosV.value 
    // + " / " + Plaquetas.value 
    // + " / " + PlaquetasV.value 
    // + " / " + Solidos.value 
    // + " / " + SolidosV.value 
    // + " / " + Leucocitos.value 
    // + " / " + LeucocitosV.value 
    // + " / " + Neutrofilos.value 
    // + " / " + NeutrofilosV.value 
    // + " / " + Bandas.value 
    // + " / " + BandasV.value 
    // + " / " + Linfocitos.value 
    // + " / " + LinfocitosV.value 
    // + " / " + Monocitos.value 
    // + " / " + MonocitosV.value 
    // + " / " + Eosinofilos.value 
    // + " / " + EosinofilosV.value 
    // + " / " + Basofilos.value 
    // + " / " + BasofilosV.value 
    // + " / " + Policromasia.value 
    // + " / " + PBasofilico.value 
    // + " / " + Hipocromia.value 
    // + " / " + Aglutinacion.value 
    // + " / " + Rouleaux.value 
    // + " / " + Metarrubricitos.value 
    // + " / " + Poiquilocitosis.value 
    // + " / " + Tipo.value 
    // + " / " + NeutrofilosToxicos.value 
    // + " / " + LinfocitosReactivos.value 
    // + " / " + MieloInmaduros.value 
    // + " / " + Microfilarias.value 
    // + " / " + Macroplaquetas.value 
    // + " / " + Artefactos.value 
    // + " / " + Interpretacion.value 
    // + " / " + "si" 
    // + " / " + propietarioID 
    // + " / " + idvet 
    // + " / " + Anisocitosis.value
    // );

    axios.put(url + "/hematologia/update", {

        id: idExam,
        Caso: caso.value,
        Fecha: fecha.value,
        Especie: especie.value,
        Raza: raza.value,
        Sexo: sexo.value,
        Mvz: mvz.value,
        Hora: inputHora.value,
        Nombre: nombreM.value,
        Edad: edad.value,
        Castrado: castrado.value,
        Expediente: expediente.value,
        AnaYEx: anamnesis.value,
        TratPrev: previo.value,
        Hematocrito: Hematocrito.value,
        HematocritoV: HematocritoV.value,
        Hemoglobina: Hemoglobina.value,
        HemoglobinaV: HemoglobinaV.value,
        Eritrocitos: Eritrocitos.value,
        EritrocitosV: EritrocitosV.value,
        VGM: VGM.value,
        VGMV: VGMV.value,
        CGMH: CGMH.value,
        CGMHV: CGMHV.value,
        Reticulocitos: Reticulocitos.value,
        ReticulocitosV: ReticulocitosV.value,
        Plaquetas: Plaquetas.value,
        PlaquetasV: PlaquetasV.value,
        Solidos: Solidos.value,
        SolidosV: SolidosV.value,
        Leucocitos: Leucocitos.value,
        LeucocitosV: LeucocitosV.value,
        Neutrofilos: Neutrofilos.value,
        NeutrofilosV: NeutrofilosV.value,
        Bandas: Bandas.value,
        BandasV: BandasV.value,
        Linfocitos: Linfocitos.value,
        LinfocitosV: LinfocitosV.value,
        Monocitos: Monocitos.value,
        MonocitosV: MonocitosV.value,
        Eosinofilos: Eosinofilos.value,
        EosinofilosV: EosinofilosV.value,
        Basofilos: Basofilos.value,
        BasofilosV: BasofilosV.value,
        Policromasia: Policromasia.value,
        PBasofilico: PBasofilico.value,
        Hipocromia: Hipocromia.value,
        Aglutinacion: Aglutinacion.value,
        Rouleaux: Rouleaux.value,
        Metarrubricitos: Metarrubricitos.value,
        Poiquilocitosis: Poiquilocitosis.value,
        Tipo: Tipo.value,
        NeutrofilosToxicos: NeutrofilosToxicos.value,
        LinfocitosReactivos: LinfocitosReactivos.value,
        MieloInmaduros: MieloInmaduros.value,
        Microfilarias: Microfilarias.value,
        Macroplaquetas: Macroplaquetas.value,
        Artefactos: Artefactos.value,
        Interpretacion: Interpretacion.value,
        Completado: "si",
        idPropietario: propietarioID,
        idVeterinario: idvet,
        Anisocitosis: Anisocitosis.value
    }, {
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem("token")
        },
    })
        .then(function (response) {
            if (response.data.code == 201) {
                alert("Examen guardado con éxito");
                window.location.href = "index.html";
            } else {
                // console.log("BAD RESPONSE> " + JSON.stringify(response.data))
                alert("Hubo un error");
            }
        })
        .catch(function (error) {
            // console.log("ERROR> " + JSON.stringify(error))
            alert(error)
        })
}


function asignarHoraActual(tag) {
    const fechaActual = new Date();
    const horas = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();

    // Formatea las horas y los minutos en una cadena en el formato HH:mm
    const horaFormateada = `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}`;

    // Asigna la hora formateada al elemento input
    tag.value = horaFormateada;
}