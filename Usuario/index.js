var headers = {"Access-Control-Allow-Origin": null, "Content-Type": "image/jpg"};
var url = "http://localhost:5000";

const examenes =[
    {
        tipo: "Hematología",
        fecha: "29/05/23"
    },
    {
        tipo: "Parasitología",
        fecha: "13/03/23"
    },
    {
        tipo: "Hematología",
        fecha: "20/05/23"
    },
    {
        tipo: "Urianálisis",
        fecha: "10/01/22"
    }
]

function loadExamenes(){
    try{
        axios.get(url + "/examenes", headers)
        .then(function(res){
            displayExamenes(res.data.rows);
        }).catch(function(err){
            console.log(err)
        })
    }catch(e){
        if(examenes.length<1){
            displaySin();
        }else{
            displayExamenes(examenes);
        }

    }
}

function displayExamenes(examenes){
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
    for (var i=0; i<examenes.length;i++){
        examen.innerHTML += `
					<div class="linea2">
						<div class="tipo">
							<p>${examenes[i].tipo}</p>
						</div>
						<div class="fecha">
							<p>${examenes[i].fecha}</p>
						</div>
						<div class="lBtn">
							<p>Ver examen</p>
						</div>
					</div>
                    `
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
					<button class="btn2" onclick="">Enviar</button>
					<button class="btn" onclick="closeModal()">Canelar</button>
				</div>
			</div>
    `
}

function displaySin(){
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
                    <button class="btn2" onclick="">Enviar</button>
                    <button class="btn" onclick="closeModal()">Canelar</button>
                </div>
            </div>
        </div>
    </div>
    `
}