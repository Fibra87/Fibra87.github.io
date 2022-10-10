let usuario = localStorage.getItem("IDusuario");
let carrito_url = "https://japceibal.github.io/emercado-api/user_cart/" + usuario + ".json";
let carrito = [];



function muestraCarrito(){
    
    let carritoMostrar = "";
    for (let i = 0; i < carrito.articles.length; i++) {
      let producto = carrito.articles[i];
      let moneda = producto.currency;
      let costo  = producto.unitCost;
      let cantidad = producto.count;
      let subtotal = costo;
      


      if (cantidad > 1){
        subtotal = costo * cantidad;
      }

      carritoMostrar += `
      <tr>
      <th scope="row"><img src="${producto.image}" width="75"></th>
      <td>${producto.name}</td>
      <td><span id="moneda">${moneda+" "}</span><span id="cost">${costo}</span></td>
      <td><input type="number" id="quantity" name="quantity" size="1" min="1" max="100" step="1" value="${cantidad}"></td>
      <td><span id="subtotalMoneda">${moneda+" "}</span><span id="subtotal">${subtotal}</span></td>
      </tr>`
      
      
    }
    document.getElementById("carrito").innerHTML = carritoMostrar;
}
  
function cambiaCantidad(){  

  let laCantidad = document.getElementById("quantity").value;
  console.log(laCantidad);
  let elCosto = carrito.articles[0].unitCost;//porque no me dejo tomarlo con dom desde el html de la iteracion? y como hacerlo si fuesen mas de uno.
  console.log(elCosto);
  let costoFinal = laCantidad * elCosto;  

  document.getElementById("subtotal").innerHTML = costoFinal;
  location.reload;
};

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(carrito_url).then(function (resultObj) {
      if (resultObj.status === "ok") {
        carrito = resultObj.data;
        console.log(carrito);
        muestraCarrito();
        document.getElementById("quantity").addEventListener("change", cambiaCantidad);
      }
    })
});


  

