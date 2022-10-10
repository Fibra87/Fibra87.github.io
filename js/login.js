//funcion que valida campos de login.
function validar() {
    let email = document.getElementById("floatingInput").value
    let password = document.getElementById("floatingPassword").value
  // inicio booleano bandera
    let valido = true
 
    if (email == ""){
        alert("Falta email");
        valido= false;
    }

    if (password== ""){
        alert("Falta password");
        valido= false;
    }
    //si las condiciones son validas redirecciona a pagina inicio.
    if (valido){
    localStorage.setItem("usuario", email) 
    //seteo en localStorage id ficticio obtenido desde el servidor por el Usuario logueado
    localStorage.setItem("IDusuario", 25801 )
    window.location.href = "inicio.html";
    }
}

    //evento iniciador de la funcion.

document.getElementById("login").addEventListener("click", validar)
