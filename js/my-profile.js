function mostrarUsuario(){
    
    usuario = localStorage.getItem("usuario");
    document.getElementById("user").innerHTML =  usuario;

}
mostrarUsuario();
