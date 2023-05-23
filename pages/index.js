window.onload = init;

    function init() {
        document.querySelector('.btn-primary').addEventListener('click', login);
    }

    function login (){
        var user = document.getElementById('user').value;
        var pass = document.getElementById('pass').value;
        var perfil = document.querySelector('#perfil');
        
        
        console.log(user, pass);
        if(perfil.checked){
            axios({
                method: 'post',
                url: 'http://localhost:3000/veterinario/login',
                data:{
                    Correo : user,
                    Contraseña : pass
                }
            }).then(function(res) {
                console.log(res);
                console.log("veterinario");
                window.location.href = "../Veterinario/index.html";
            }).catch(function(err){
                console.log(err);
            })
        }else{
            axios({
                method: 'post',
                url: 'http://localhost:3000/propietario/login',
                data:{
                    Correo : user,
                    Contraseña : pass
                }
            }).then(function(res) {
                console.log(res);
                console.log("propietario");
                window.location.href = "../Usuario/index.html";
            }).catch(function(err){
                console.log(err);
            })
        }
    }   
