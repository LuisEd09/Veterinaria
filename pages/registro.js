window.onload =init;

function init() {
    document.querySelector('.btn-primary').addEventListener('click', registro);
}

function registro() {
    var nombre = document.getElementById('nombre').value;
    var direccion = document.getElementById('direccion').value;
    var telefono = document.getElementById('telefono').value;
    var correo = document.getElementById('correo').value;
    var Contraseña = document.getElementById('Contraseña').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/propietario/register',
        data:{
            Nombre : nombre,
            Direccion : direccion,
            Telefono : telefono,
            Correo : correo,
            Contraseña : Contraseña
        }
    }).then(function(res) {
        console.log(res);
        alert("Registrado");
        window.location.href = "index.html";
    }).catch(function(err){
        console.log(err);
    })
}