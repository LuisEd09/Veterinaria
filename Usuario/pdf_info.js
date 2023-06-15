function irPara(tipo,id){

    

switch (tipo) {
  case "Parasitologia":
    window.location.href = "pdf/Parasitologia.html?idEx="+id;
    break;
  case "Hematologia":
    window.location.href = "pdf/Hematologia.html?idEx="+id;    
    break;
  case "Urianalisis":
    window.location.href = "pdf/Urianalisis.html?idEx="+id;
    break;
  default:
    console.log("Error");
    break;
}
}
