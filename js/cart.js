let usuario = localStorage.getItem("IDusuario");
let carrito_url = "https://japceibal.github.io/emercado-api/user_cart/" + usuario + ".json";
let carrito = [];
let carro = [];



function muestraCarrito() {

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
      <td><input type="number" id="quantity" name="quantity" size="1" min="1" max="100" step="1" value="${cantidad}" onchange=cambiaCantidad(this.value,${costo},${producto.id})></td>
      <td id="subtotalcelda"><span>${moneda + " "}</span><span id="sub${producto.id}">${subtotal}</span></td>
      </tr>`

  }
  document.getElementById("carrito").innerHTML = carritoMostrar;
}

function cambiaCantidad(valor, elCosto, id) {

  let costoFinal = valor * elCosto;

  document.getElementById("sub" + id).innerHTML = costoFinal;
  location.reload;
};

function carroUpdate() {
  if (localStorage.getItem("carro")) {
    carro = JSON.parse(localStorage.getItem("carro"));
    console.log(carro);
  };
};

function juntaProd() {

  for (let i = 0; i < carro.length; i++) {
    const pasaProd = carro[i];
    carrito.articles.push(pasaProd)

  }
  console.log(carrito);

}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(carrito_url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      carrito = resultObj.data;
      console.log(carrito);
      carroUpdate();
      juntaProd();
      muestraCarrito();




    }
  })
});




