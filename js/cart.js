let usuario = localStorage.getItem("IDusuario");
let carrito_url = "https://japceibal.github.io/emercado-api/user_cart/" + usuario + ".json";
let carrito = [];
let carro = [];
let subtotalGral = undefined
let costoDeEnvio = undefined




function muestraCarrito() {

  carrito.articles[0].subtotal =  carrito.articles[0].unitCost //agrego propiedad subtotal al array del json 
  let carritoMostrar = "";
  for (let i = 0; i < carrito.articles.length; i++) {
    let producto = carrito.articles[i];
    let moneda = producto.currency;
    let costo = producto.unitCost;
    let cantidad = producto.count;
    let subtotal = costo;



    if (cantidad > 1) {
      subtotal = costo * cantidad;
    }
    carritoMostrar += `
      <tr>
      <th scope="row"><img src="${producto.image}" width="75"></th>
      <td>${producto.name}</td>
      <td><span id="moneda">${moneda + " "}</span><span id="cost">${costo}</span></td> 
      <td><input type="number" id="quantity" name="quantity" size="1" min="1" max="100" step="1" value="${cantidad}" onchange=cambiaCantidad(this.value,${costo},${producto.id},${i})></td>
      <td id="subtotalcelda"><span>${moneda + " "}</span><span id="sub${producto.id}">${subtotal}</span></td>
      </tr>`

  }
  document.getElementById("carrito").innerHTML = carritoMostrar;
}

function cambiaCantidad(valor, elCosto, id, indice) {

  let costoFinal = valor * elCosto;
  
  subtotal = costoFinal
  let arrayCostoFinal =  carrito.articles[indice].subtotal = costoFinal //modifico el subtotal en el array
  console.log(arrayCostoFinal) ;
  console.log(carrito) ;
  
  document.getElementById("sub" + id).innerHTML  = subtotal;
  
  

  imprimeSubtotalGral();
  
  location.reload;
  
};

function carroUpdate() {
  if (localStorage.getItem("carro")) {
    carro = JSON.parse(localStorage.getItem("carro"));
    console.log(carro);
  };
};

//esta funcion es para mantener el objeto inicial del carro solicitado en la pauta y sumarle los articulos seleccionados por el usuario
//y que luego todos se muestren.
function juntaProd() {

  for (let i = 0; i < carro.length; i++) {
    const pasaProd = carro[i];
    carrito.articles.push(pasaProd)

  }
  console.log(carrito);

}
// funcion para obtener todos los subtotales y mostrarlos en pantalla
function imprimeSubtotalGral (){

   subtotalGral = 0;
  for (let i = 0; i < carrito.articles.length; i++) {
    let cadaSubtotal = carrito.articles[i].subtotal;
    //console.log(cadaSubtotal);
    if (carrito.articles[i].currency === "UYU"){
      cadaSubtotal = Math.round(cadaSubtotal / 42 )//conversion de pesos a dolares
    }
    subtotalGral += cadaSubtotal ;
    console.log(subtotalGral);
  }
  costoEnvio(subtotalGral);  
  document.getElementById("listaCostos").innerHTML = `
 
 
   <div  class="list-group-item list-group-item-action cursor-active">
     <div class="row">       
        <div class="col">
          <div class="d-flex w-100 justify-content-between">
               <h4 class="mb-1">Subtotal</h4>
               <small class="text-muted"> USD ${subtotalGral}</small>
          </div>
          <p>Costo unitario del producto por cantidad</p>
        </div>
      </div>
    </div>
   `
  
}

function costoEnvio(valor) {
  let premium = document.getElementById("premiumradio");
  let express =  document.getElementById("expressradio");
  let standard =  document.getElementById("standardradio");
  costoDeEnvio = 0;
  

  if  (premium.checked)  {
     costoDeEnvio = Math.round(valor*0.15);
    //console.log("premium");
  }
  if (express.checked) {
    costoDeEnvio = Math.round(valor*0.07);
    //console.log("express");
  }
  if (standard.checked) {
     costoDeEnvio = Math.round(valor*0.05);
    //console.log("standard");
  }
  document.getElementById("listaEnvios").innerHTML = `
  
  <div  class="list-group-item list-group-item-action cursor-active">
    <div class="row">       
     <div class="col">
       <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">Costo de Envio</h4>
            <small class="text-muted"> USD ${costoDeEnvio}</small>
       </div>
       <p>Segun el tipo de envio</p>
      </div>
    </div>
  </div>
  `
  imprimeTotalGral();

 
}

function calculaEnvio(){
  return costoEnvio(subtotalGral);
}

function imprimeTotalGral(){
  let total = costoDeEnvio + subtotalGral;
  //console.log (total);
  document.getElementById("listaTotal").innerHTML = `
  
  <div  class="list-group-item list-group-item-action cursor-active">
    <div class="row">       
     <div class="col">
       <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">TOTAL ($)</h4>
            <small id="total"> USD ${total}</small>
       </div>
       
      </div>
    </div>
  </div>
  `
}

function invalidaCampos() {
  let tarjeta = document.getElementById("creditoradio");
  let transferencia = document.getElementById("transferenciaradio");

  if (transferencia.checked) {
    document.getElementById("divFormaPago").innerHTML ="";
    document.getElementById("spanModal").innerHTML = "Transferencia Bancaria"
    document.getElementById("numeroTarjeta").disabled = true
    document.getElementById("codigo").disabled = true
    document.getElementById("vencimiento").disabled = true 
  } else {
    document.getElementById("numeroTarjeta").disabled = false
    document.getElementById("codigo").disabled = false
    document.getElementById("vencimiento").disabled = false 
  }
  
  if (tarjeta.checked) {
    document.getElementById("divFormaPago").innerHTML ="";

    document.getElementById("spanModal").innerHTML = "Tarjeta de Credito";
    document.getElementById("numeroCuenta").disabled = true

    
  } else {
    document.getElementById("numeroCuenta").disabled = false


  }
  
}
function validarMetodoPago(){
  let tarjeta = document.getElementById("creditoradio");
  let transferencia = document.getElementById("transferenciaradio");
  
  if (!tarjeta.checked && !transferencia.checked){
    document.getElementById("divFormaPago").innerHTML = ` <p class="text-danger is-invalid"> Debe seleccionar una forma de pago</p>`;
    
  }else{
    document.getElementById("divFormaPago").innerHTML =""

  }   
  
} 

function validarBootstrap(){
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict'

    
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          validarMetodoPago();
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }else{alert("HAS COMPRADO CON EXITO!!!");
         };

          form.classList.add('was-validated')
          
        }, false)
      })
  })()

}



document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(carrito_url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      carrito = resultObj.data;
      console.log(carrito);
      carroUpdate();
      juntaProd();
      muestraCarrito();
      imprimeSubtotalGral();
      imprimeTotalGral();
      validarBootstrap();
      
      







    }
  })
});

