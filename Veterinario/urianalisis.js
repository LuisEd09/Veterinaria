var headers = {};
var url = "http://localhost:3000";

var caso;
var hora;
var mvz;
var expediente;
var anamnesis;
var previo;
var obtencion;
var color;
var proteinas;
var pH;
var apariencia;
var glucosa;
var cetonas;
var densidad;
var hg;
var bilirrubina;
var eritrocitos;
var renales;
var leucocitos;
var cristales;
var escamosas;
var lipidos;
var transitorias;
var bacterias;
var cilindros;
var otros;
var interpretacion;

document.addEventListener("DOMContentLoaded", function() {
    var nombre = document.getElementById("nombre");
    var direccion = document.getElementById("direccion");
    var telefono = document.getElementById("telefono");
    var fecha = document.getElementById("fecha");
    var especie = document.getElementById("especie");
    var nombreM = document.getElementById("nombreM");
    var raza = document.getElementById("raza");
    var edad = document.getElementById("edad");
    var sexo = document.getElementById("sexo");
    var castrado = document.getElementById("castrado");
    var mvz = document.getElementById("mvz");
    var expediente = document.getElementById("expediente");
    var id = new URLSearchParams(window.location.search).get('id')
    var idvet = localStorage.getItem('id');
    axios.get(url+"/urianalisis/examen",{
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem("token")
        },
        params: {
            id: id
        }
    })
    .then(function (response){
        if(response.data.code == 200){
            var respuesta = response.data.message[0];
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
            asignarHoraActual()
            for (var i = 0; i < especie.options.length; i++) {
                var option = especie.options[i];
                
                if (option.value === respuesta.especie) {
                    option.selected = true;
                    break;
                }
            }
            for (var i = 0; i < sexo.options.length; i++) {
                var option = sexo.options[i];
                
                if (option.value === respuesta.sexo) {
                    option.selected = true;
                    break;
                }
            }
            for (var i = 0; i < castrado.options.length; i++) {
                var option = castrado.options[i];

                if (option.value === respuesta.castrado) {
                    option.selected = true;
                    break;
                }
            }

            axios.get(url+"/veterinario/info",{
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem("token")
                },
                params: {
                    id: idvet
                }
            })
            .then(function (response){
                if(response.data.code == 200){
                    var res = response.data.message[0];
                    console.log(res)
                    mvz.value = res.Nombre;
                    expediente.value = res.expediente;
                }else{
                    alert("No hay id")
                }
            })
            .catch(function (error){
                console.log(error)
                alert(error)
            })
        }else{
            console.log("PARECE QUE NO EXISTE ESTE EXAMEN");
            alert("PARECE QUE NO EXISTE ESTE EXAMEN");
        }
    })
    .catch(function(error){
        console.error(error);
    })
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

function asignarHoraActual() {
    const fechaActual = new Date();
    const horas = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
  
    // Formatea las horas y los minutos en una cadena en el formato HH:mm
    const horaFormateada = `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}`;
  
    // Asigna la hora formateada al elemento input
    const inputHora = document.getElementById('hora');
    inputHora.value = horaFormateada;
}



function send(){
    var id = new URLSearchParams(window.location.search).get('id')
    var idvet = localStorage.getItem('id');
    
    asignarHoraActual()
    var nombre = document.getElementById("nombre");
    var fecha = document.getElementById("fecha");
    var especie = document.getElementById("especie");
    var raza = document.getElementById("raza");
    var edad = document.getElementById("edad");
    var sexo = document.getElementById("sexo");
    var castrado = document.getElementById("castrado");
    var expediente = document.getElementById("expediente");
    var caso = document.getElementById("caso");
    var hora = document.getElementById("hora");
    var mvz = document.getElementById("mvz");
    var anamnesis = document.getElementById("anamnesis");
    var previo = document.getElementById("previo");
    var obtencion = document.getElementById("obtencion");
    var color = document.getElementById("color");
    var proteinas = document.getElementById("proteinas");
    var pH = document.getElementById("pH");
    var apariencia = document.getElementById("apariencia");
    var glucosa = document.getElementById("glucosa");
    var cetonas = document.getElementById("cetonas");
    var densidad = document.getElementById("densidad");
    var hg = document.getElementById("hg");
    var bilirrubina = document.getElementById("bilirrubina");
    var eritrocitos = document.getElementById("eritrocitos");
    var renales = document.getElementById("renales");
    var leucocitos = document.getElementById("leucocitos");
    var cristales = document.getElementById("cristales");
    var escamosas = document.getElementById("escamosas");
    var lipidos = document.getElementById("lipidos");
    var transitorias = document.getElementById("transitorias");
    var bacterias = document.getElementById("bacterias");
    var cilindros = document.getElementById("cilindros");
    var otros = document.getElementById("otros");
    var interpretacion = document.getElementById("interpretacion");

    axios.put(url+"/urianalisis/update?id="+id,{
        caso: caso.value,
        fecha: fecha.value,
        especie: especie.value,
        raza: raza.value,
        sexo: sexo.value,
        mvz: mvz.value,
        hora: hora.value,
        nombre: nombre.value,
        edad: edad.value,
        castrado: castrado.value,
        expediente: expediente.value,
        anayex: anamnesis.value,
        tratprev: previo.value,
        obtencion: obtencion.value,
        color: color.value,
        apariencia: apariencia.value,
        densidad: densidad.value,
        proteinas: proteinas.value,
        glucosa: glucosa.value,
        sangrehg: hg.value,
        ph: pH.value,
        cetonas: cetonas.value,
        bilirrubina: bilirrubina.value,
        eritrocitos: eritrocitos.value,
        leucocitos: leucocitos.value,
        escamosas: escamosas.value,
        transitorias: transitorias.value,
        cilindros: cilindros.value,
        renales: renales.value,
        cristales: cristales.value,
        lipidos: lipidos.value,
        bacterias: bacterias.value,
        otros: otros.value,
        interpretacion: interpretacion.value,
        completado: "si",
        idvet: idvet
    },{
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem("token")
        },
    })
    .then(function (response){
        if(response.data.code == 201){
            alert("Examen guardado con éxito");
            window.location.href = "index.html";
        }else{
            console.log(response.data)
            alert("Hubo un error");
        }
    })
    .catch(function (error){
        console.log(error)
        alert(error)
    })
}