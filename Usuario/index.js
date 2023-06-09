var headers = {};
var url = "http://localhost:3000";
var actualTest = '';


function loadExamenes() {
    document.getElementById('logout-link').addEventListener('click', function (event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

        // Eliminar el valor almacenado en localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('id');

        // Redireccionar o realizar cualquier otra acción que desees después de cerrar sesión
        window.location.href = '../pages/index.html'; // Redireccionar a la página de inicio, por ejemplo
    });

    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("token")
            }
        }
    } else {
        window.location.href = "../pages/index.html"
    }

    try {
        axios.get(url + "/todos/examenes", {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("token")
            },
            params: {
                id: localStorage.getItem("id")
            }
        })
            .then(function (res) {
                if (res.data.code == 200) {
                    displayExamenes(res.data.message,res.data.propie);
                    console.log(res.data)
                } else {
                    displaySin();
                }
            }).catch(function (err) {
                displaySin();
                console.log(err)
            })
    } catch (e) {
        displaySin();
        console.log(e)
    }
    
}

function formatearFecha(fecha) {
    // Crea un objeto Date con la cadena de fecha proporcionada
    const fechaObjeto = new Date(fecha);

    // Obtiene los componentes de la fecha
    const dia = fechaObjeto.getDate();
    const mes = fechaObjeto.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
    const año = fechaObjeto.getFullYear();

    // Formatea los componentes en una cadena con el formato deseado
    const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${año}`;
    console.log(fecha)
    console.log(fechaFormateada)

    return fechaFormateada;
}

function displayExamenes(examenes,propie) {
    var body = document.getElementById("contenido");
    body.innerHTML += ` 
    <div class="cuerpo2">
        <div class="lado2">
            <div class="linea">
                <div class="tipo">
                    <p>Tipo</p>
                </div>
                <div class="fecha">
                    <p>Fecha</p>
                </div>
            </div>
            <div class="examenes" id="examenes"></div>
        </div>
        <div class="cubreImagen" id="cubreImagen"></div>
    </div>
    <div id="myModal" class="modal"></div>
    `
    var examen = document.getElementById("examenes");
    var cubreImagen = document.getElementById("cubreImagen");
    var myModal = document.getElementById("myModal");
    for (var i = 0; i < examenes.length; i++) {
        tipo=examenes[i].tipo
        idExamenes=examenes[i].idHematologia    
        if(examenes[i].completado == 'si'){
            examen.innerHTML += `
                        <div class="linea2">
                            <div class="tipo">
                                <p>${examenes[i].tipo}</p>
                            </div>
                            <div class="fecha">
                                <p>${formatearFecha(examenes[i].fecha)}</p>
                            </div>
                            <div class="lBtn" onclick="irPara('${tipo}','${idExamenes}')">
							<p>Ver examen</p>
						</div>
                        </div>
                        `
        }else{
            examen.innerHTML += `
                        <div class="linea2">
                            <div class="tipo">
                                <p>${examenes[i].tipo}</p>
                            </div>
                            <div class="fecha">
                                <p>${formatearFecha(examenes[i].fecha)}</p>
                            </div>
                            <p>Pendiente</p>
                        </div>
                        `
        }
    }
    cubreImagen.innerHTML += ` 
                <div class="imagenD">
                    <img src="../Imagenes/IMG_4.png" id="imagen2" />
                    <div class="select">
                        <div class="cita" onclick="toggleOptions()">
                            <p>Nueva cita +</p>
                        </div>
                        <div class="select-options" id="selectOptions">
                            <div class="option" onclick="openModal('urianalisis')">Urianalisis</div>
                            <div class="option" onclick="openModal('hematologia')">Hematologia</div>
                            <div class="option" onclick="openModal('parasitologia')">Parasitologia</div>
                        </div>
                    </div>
                </div>
                `
    myModal.innerHTML += `
			<div class="modal-content">
				<h2 id="nuevaCita">Nueva cita</h2>
				<p>Por favor, conteste con los datos de la mascota</p>
				<div class="fomrulario">
					<input type="text" placeholder="Nombre" id="nombre" class="nombre">
					<select name="especie" id="especie" class="especie">
						<option value="">Especie</option>
						<option value="canino">Canino</option>
						<option value="felino">Felino</option>
						<option value="equino">Equino</option>
						<option value="bovino">Bovino</option>
					</select>
					<input type="text" placeholder="Raza" id="raza" class="raza">
					<input type="text" placeholder="Edad" id="edad" class="edad">
					<select name="sexo" id="sexo" class="sexo">
						<option value="">Sexo</option>
						<option value="masculino">Masculino</option>
						<option value="femenino">Femenino</option>
					</select>
					<select name="castrado" id="castrado" class="castrado">
						<option value="">¿Castrado?</option>
						<option value="si">Si</option>
						<option value="no">No</option>
					</select>
				</div>
				<div class="botones">
					<button class="btn2" onclick="submit()">Enviar</button>
					<button class="btn" onclick="closeModal()">Cancelar</button>
				</div>
			</div>
    `
    var contenedor = document.getElementById("negro");
var nuevoParrafo = document.createElement("h5");
nuevoParrafo.innerHTML = "\u00A0"+ propie[0].Nombre
contenedor.appendChild(nuevoParrafo);
}

function displaySin() {
    var body = document.getElementById("contenido");
    body.innerHTML += ` 
    <div class="cuerpo">
        <img src="../Imagenes/IMG_3.png" id="imagen"/>
        <div class="lado">
            <p id="leyenda">Aún no tienes exámenes por revisar, puedes agendar una cita aquí</p>
            <div class="select">
                <div class="boton" onclick="toggleOptions()">
                    <p id="btnTxt">Generar cita +</p>
                </div>
                <div class="select-options" id="selectOptions">
                    <div class="option" onclick="openModal('urianalisis')">Urianalisis</div>
                    <div class="option" onclick="openModal('hematologia')">Hematologia</div>
                    <div class="option" onclick="openModal('parasitologia')">Parasitologia</div>
                </div>
            </div>
        </div>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <h2 id="nuevaCita">Nueva cita</h2>
                <p>Por favor, conteste con los datos de la mascota</p>
                <div class="fomrulario">
                    <input type="text" placeholder="Nombre" id="nombre" class="nombre">
                    <select name="especie" id="especie" class="especie">
                        <option value="">Especie</option>
                        <option value="canino">Canino</option>
                        <option value="felino">Felino</option>
                        <option value="equino">Equino</option>
                        <option value="bovino">Bovino</option>
                    </select>
                    <input type="text" placeholder="Raza" id="raza" class="raza">
                    <input type="text" placeholder="Edad" id="edad" class="edad">
                    <select name="sexo" id="sexo" class="sexo">
                        <option value="">Sexo</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                    <select name="castrado" id="castrado" class="castrado">
                        <option value="">¿Castrado?</option>
                        <option value="si">Si</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div class="botones">
                    <button class="btn2" onclick="submit()">Enviar</button>
                    <button class="btn" onclick="closeModal()">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
    `
}

function submit() {
    console.log("submit")
    const nombre = document.getElementById('nombre').value;
    const especie = document.getElementById('especie').value;
    const raza = document.getElementById('raza').value;
    const edad = document.getElementById('edad').value;
    const sexo = document.getElementById('sexo').value;
    const castrado = document.getElementById('castrado').value;

    if(nombre != '' && especie != '' && raza != '' && edad != '' && sexo != '' && castrado != ''){
        var destino = '';
        switch(actualTest){
            case "hematologia":
                destino = "/hematologia"
                break;
            case "parasitologia":
                destino = "/parasitologia"
                break;
            case "urianalisis":
                destino = "/urianalisis"
                break;
        }
        console.log(url + destino + "/cita")
        console.log(localStorage.getItem("token"))
        axios.post(url + destino + "/cita", {
            idPropietario: localStorage.getItem("id"),
            fecha:new Date().toISOString().split('T')[0],
            nombre: nombre,
            especie:especie,
            raza: raza,
            edad: edad,
            sexo: sexo,
            castrado: castrado,
        },{
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("token")
            },
        })
        .then(function (res) {
            if (res.data.code == 201) {
                alert("Cita creada correctamente")
                document.getElementById('myModal').style.display = 'none';
            } else {
                alert("Hubo un error")
                console.log("no fue 201, " + res)
            }
        }).catch(function (err) {
            alert("Hubo un error")
            console.log(err)
        })
    }else{
        alert("Campos incompletos")
    }
}