//Funcion que muestra el usuario loggeado tomado desde localstorage
function mostrarUsuario(){
    
    usuario = localStorage.getItem("usuario");
    document.getElementById("user").innerHTML =  usuario;

}
mostrarUsuario();


document.addEventListener("DOMContentLoaded", function(){
    
        
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

