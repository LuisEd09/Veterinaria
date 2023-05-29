/* INICIO */
document.addEventListener("DOMContentLoaded", function () {
  /* OBTENER PARENT */
  var parent = document.getElementById("citas-container-parent");
  /* EJEMPLO DE INFO QUE LLEGA DE LA API */
  var infoExample = {
    "info-1": {
      Caso: "1296508",
      Fecha: "28/04/2023",
      Propietario: "Sebastián Acosta Serret",
      Especie: "Perro",
      Nombre: "Nombre",
      Examen: "Urianalisis",
      Caso: "Urianalisis.Caso",
    },
    "info-2": {
      Caso: "6826012",
      Fecha: "24/03/2023",
      Propietario: "Jorge Bernal",
      Especie: "Perro",
      Nombre: "Harry",
      Examen: "hematologia",
      Caso: "hematologia.Caso",
    },
    "info-3": {
      Caso: "6826012",
      Fecha: "24/03/2023",
      Propietario: "Jorge Bernal",
      Especie: "Perro",
      Nombre: "Harry",
      Examen: "hematologia",
      Caso: "hematologia.Caso",
    },
    "info-4": {
      Caso: "6826012",
      Fecha: "24/03/2023",
      Propietario: "Jorge Bernal",
      Especie: "Perro",
      Nombre: "Harry",
      Examen: "hematologia",
      Caso: "hematologia.Caso",
    },
    "info-5": {
      Caso: "6826012",
      Fecha: "24/03/2023",
      Propietario: "Jorge Bernal",
      Especie: "Perro",
      Nombre: "Harry",
      Examen: "hematologia",
      Caso: "hematologia.Caso",
    },
    "info-6": {
      Caso: "6826012",
      Fecha: "24/03/2023",
      Propietario: "Jorge Bernal",
      Especie: "Perro",
      Nombre: "Harry",
      Examen: "hematologia",
      Caso: "hematologia.Caso",
    },
    "info-7": {
      Caso: "6826012",
      Fecha: "24/03/2023",
      Propietario: "Jorge Bernal",
      Especie: "Perro",
      Nombre: "Harry",
      Examen: "hematologia",
      Caso: "hematologia.Caso",
    },
    "info-8": {
      Caso: "6826012",
      Fecha: "24/03/2023",
      Propietario: "Jorge Bernal",
      Especie: "Perro",
      Nombre: "Harry",
      Examen: "hematologia",
      Caso: "hematologia.Caso",
    },
    "info-9": {
      Caso: "6826012",
      Fecha: "24/03/2023",
      Propietario: "Jorge Bernal",
      Especie: "Perro",
      Nombre: "Harry",
      Examen: "hematologia",
      Caso: "hematologia.Caso",
    },
    "info-10": {
      Caso: "6826012",
      Fecha: "24/03/2023",
      Propietario: "Jorge Bernal",
      Especie: "Perro",
      Nombre: "Harry",
      Examen: "hematologia",
      Caso: "hematologia.Caso",
    },
    "info-11": {
      Caso: "6826012",
      Fecha: "24/03/2023",
      Propietario: "Jorge Bernal",
      Especie: "Perro",
      Nombre: "Harry",
      Examen: "hematologia",
      Caso: "hematologia.Caso",
    },
  };

  /* COMENTAR LA SIGUIENTE LINEA PARA VER EL MODELO CON REGISTROS*/
    // infoExample = {};
  for (let i = 0; i < Object.keys(infoExample).length; i++) {
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
    childButton.setAttribute("href", Object.values(infoExample)[i].Caso);

    /* RELLENAR ETIQUETAS */
    childDate.innerHTML = Object.values(infoExample)[i].Fecha;
    childPropietary.innerHTML = Object.values(infoExample)[i].Propietario;
    childAnimal.innerHTML = Object.values(infoExample)[i].Especie;
    childName.innerHTML = Object.values(infoExample)[i].Nombre;
    childExam.innerHTML = Object.values(infoExample)[i].Examen;
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
});
