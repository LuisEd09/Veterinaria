var headers = {};
var url = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function() {
    var nombre = document.getElementById("nombre");
    var direccion = document.getElementById("direccion");
    var telefono = document.getElementById("telefono");
    var fecha = document.getElementById("fecha");
    var especie = document.getElementById("especie");
    var nombreM = document.getElementById("nombrem");
    var raza = document.getElementById("raza");
    var edad = document.getElementById("edad");
    var sexo = document.getElementById("sexo");
    var castrado = document.getElementById("castrado");
    var mvz = document.getElementById("mvz");
    var expediente = document.getElementById("expediente");
    var id = new URLSearchParams(window.location.search).get('id')
    var idvet = localStorage.getItem('id');
    console.log("asd");
    axios.get(url+"/parasitologia/examen",{
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
                console.log(option);
                // console.log(options.value);
                if (option.value === respuesta.sexo) {
                    option.selected = true;
                    console.log("oerrrrrri");
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
    var tipo_muestra = document.getElementById("tipo_muestra");
    var tecnica = document.getElementById("tecnica");
    var interT = document.getElementById("interT");
    var resultados = document.getElementById("resultados");
    var observacion = document.getElementById("observacion");

    axios.put(url+"/parasitologia/update?id="+id,{
        caso: caso.value,
        fecha: fecha.value,
        especie: especie.value,
        raza: raza.value,
        edad: edad.value,
        sexo: sexo.value,
        castrado: castrado.value,
        mvz: mvz.value,
        hora: hora.value,
        nombre: nombre.value,
        expediente: expediente.value,
        anayex: anamnesis.value,
        tratprev: previo.value,
        tipo_muestra: tipo_muestra.value,
        tecnica: tecnica.value,
        interT: interT.value,
        resultados: resultados.value,
        observacion: observacion.value,
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