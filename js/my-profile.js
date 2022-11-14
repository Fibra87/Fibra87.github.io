let usuario = localStorage.getItem("usuario");
let email = document.getElementById("inputEmail");
let dataUsers = [];
let actualUser = [];
let existencia = "";

function load(){
    email.value = usuario;

}




function validarNombre() {
    const nombre = document.getElementById("nombre");
    if (nombre.value === "") {
      nombre.className = "form-control is-invalid"
    } else {
      nombre.className = "form-control is-valid"
      return true
    }
  }
  
  function validarApellido() {
    const apellido = document.getElementById("apellido");
    if (apellido.value === "") {
      apellido.className = "form-control is-invalid"
    } else {
      apellido.className = "form-control is-valid"
      return true
  
    }
  }
  
  function validarEmail() {
    const email = document.getElementById("inputEmail");
    const emailValor = document.getElementById("inputEmail").value;
    if (emailValor.indexOf("@") === -1) {
      email.className = "form-control is-invalid"
    } else {
      email.className = "form-control is-valid"
      return true
      
  
    }
  }

  
function validaciones() {
    validarNombre();
    validarApellido();
    validarEmail();

    if (validarNombre() && validarApellido() && validarEmail()){
        return true;
    }
}

function verificarExistencia(){

    if (localStorage.getItem("datosUsuarios") !== null) {
    dataUsers = JSON.parse(localStorage.getItem("datosUsuarios"));
    console.log(dataUsers);
     
        for (let i= 0; i < dataUsers.length; i++) {
            let emailUsuario = dataUsers[i].Email;
            
            if (emailUsuario === usuario) {
                console.log(emailUsuario);
                let segundoNombre = document.getElementById("nombreSegundo");
                let segundoApellido =  document.getElementById("apellidoSegundo"); 
                let contactoNum =   document.getElementById("contactnum");

                nombre.value = dataUsers[i].Nombre;
                apellido.value = dataUsers[i].Apellido;
                email.value = dataUsers[i].Email;
                segundoNombre.value =  dataUsers[i].SegundoNombre;
                segundoApellido.value = dataUsers[i].SegundoApellido;
                contactoNum.value =  dataUsers[i].Telefono;


                existencia = true;
               
            }
        }
    }
}



function guardarDatos(){

    if (!validaciones()){
      
      return  console.log("no cumple validaciones");
    }  

    if  (validaciones() && existencia ){

        console.log("se tienen que actualizar datos");
        for (let i= 0; i < dataUsers.length; i++) {
            let emailUsuario = dataUsers[i].Email;
            
            if (emailUsuario === usuario) {
                console.log(emailUsuario);
                nombre = document.getElementById("nombre");
                apellido = document.getElementById("apellido");
                email = document.getElementById("inputEmail");
                let segundoNombre = document.getElementById("nombreSegundo");
                let segundoApellido =  document.getElementById("apellidoSegundo"); 
                let contactoNum =   document.getElementById("contactnum");
                
                dataUsers[i].Nombre = nombre.value;
                dataUsers[i].Apellido = apellido.value;
                dataUsers[i].Email = email.value;
                dataUsers[i].SegundoNombre = segundoNombre.value;
                dataUsers[i].SegundoApellido = segundoApellido.value;
                dataUsers[i].Telefono = contactoNum.value;

                console.log(dataUsers[i]);
            }}
                
                console.log(dataUsers);
                localStorage.setItem("datosUsuarios", JSON.stringify(dataUsers) )


              
      

    }else{ 
        console.log("guardar datos nuevos usuario nuevo");
        let segundoNombre = document.getElementById("nombreSegundo");
        let segundoApellido =  document.getElementById("apellidoSegundo"); 
        let contactoNum =   document.getElementById("contactnum");
   
    
        let actualUser = { Nombre: nombre.value , Apellido: apellido.value, Email: email.value, SegundoNombre: segundoNombre.value, SegundoApellido: segundoApellido.value, Telefono: contactoNum.value};
        //console.log(actualUser);
        dataUsers.push(actualUser);
        //console.log(dataUsers);
        localStorage.setItem("datosUsuarios", JSON.stringify(dataUsers) )
    }
    

}



document.addEventListener("DOMContentLoaded", function(){
    load();
    verificarExistencia();
})

document.getElementById("guardar").addEventListener("click", function (){
    validaciones();
    guardarDatos();
});