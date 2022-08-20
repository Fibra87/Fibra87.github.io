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
    if (valido)
     return window.location.href = "inicio.html";
    }

    //evento iniciador de la funcion.

document.getElementById("login").addEventListener("click", validar)
