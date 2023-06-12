/* INICIO */
document.addEventListener("DOMContentLoaded", function () {
  /* OBTENER PARENT */
  var parent = document.getElementById("citas-container-parent");

  var headers = {};
  var url = "http://localhost:3000";

  var token = localStorage.getItem("token");
  if (token) {
    headers = {
      'Authorization': 'bearer ' + token
    };
  } else {
    window.location.href = "../pages/index.html";
  }

  try {
    axios.get(url + "/todos/citas", {
        headers: headers,
        params: {}
      })
      .then(function (res) {
        console.log(res); // Mostrar toda la respuesta en la consola
        if (res.data.code == 200) {
          var plantilla = {};

          res.data.message.forEach(function (data, index) {
            var infoKey = "info-" + (index + 1);
            plantilla[infoKey] = {
              Caso: data.idHematologia.toString(),
              Fecha: formatDate(data.fecha),
              Propietario: data.nombre_propietario,
              Especie: data.especie,
              Nombre: data.nombre,
              Examen: data.tipo
            };

            displayPlantilla(plantilla[infoKey]);
          });
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

  function displayPlantilla(data) {
    // Rellenar la plantilla con los datos correspondientes
    /* GENERAR ETIQUETAS PARA INFORMACION */
    var card = document.createElement("div");
    var col1 = document.createElement("div");
    var col2 = document.createElement("div");
    var col3 = document.createElement("div");
    var col4 = document.createElement("div");
    var col5 = document.createElement("div");
    var col6 = document.createElement("div");
    var childDate = document.createElement("p");
    var childPropietary = document.createElement("p");
    var childAnimal = document.createElement("p");
    var childName = document.createElement("p");
    var childExam = document.createElement("p");
    var childButton = document.createElement("a");

    /* APLICAR ATRIBUTOS A ETIQUETAS */
    card.setAttribute("class", "citas-card");
    col1.setAttribute("class", "citas-container-body-columna-1");
    col2.setAttribute("class", "citas-container-body-columna-2");
    col3.setAttribute("class", "citas-container-body-columna-3");
    col4.setAttribute("class", "citas-container-body-columna-4");
    col5.setAttribute("class", "citas-container-body-columna-5");
    col6.setAttribute("class", "citas-container-body-columna-6");
    childButton.setAttribute("class", "citas-container-button");
    var hrefValue = './' + data.Examen + '.html?caso=' + data.Caso;
    childButton.setAttribute("href", hrefValue);

    /* RELLENAR ETIQUETAS */
    childDate.innerHTML = data.Fecha;
    childPropietary.innerHTML = data.Propietario;
    childAnimal.innerHTML = data.Especie;
    childName.innerHTML = data.Nombre;
    childExam.innerHTML = data.Examen;
    childButton.innerHTML = "→";

    /* ACOMODAR COLUMNAS */
    col1.appendChild(childDate);
    col2.appendChild(childPropietary);
    col3.appendChild(childAnimal);
    col4.appendChild(childName);
    col5.appendChild(childExam);
    col6.appendChild(childButton);
    /* ACOMODAR CARD */
    card.append(col1);
    card.append(col2);
    card.append(col3);
    card.append(col4);
    card.append(col5);
    card.append(col6);
    /* AÑADIR CARD AL PARENT */
    parent.append(card);
  }

  function formatDate(dateString) {
    // Convertir la fecha en el formato deseado (28/04/2023)
    var date = new Date(dateString);
    var day = date.getDate();
    var month = date.getMonth() + 1; // Los meses son indexados desde 0
    var year = date.getFullYear();

    // Asegurarse de que el día y el mes tengan dos dígitos
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return day + '/' + month + '/' + year;
  }
});
