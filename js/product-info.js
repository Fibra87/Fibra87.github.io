let productoSeleccionado = localStorage.getItem("product")
let prodinfo_url = "https://japceibal.github.io/emercado-api/products/" + productoSeleccionado + ".json";
let prodInfo = []
let comentariosJson = PRODUCT_INFO_COMMENTS_URL + productoSeleccionado +  ".json";
let comentarios_array = []

function muestraProductInfo() {

  let description = `
  <br>
  <h1>${prodInfo.name} </h1>
  <hr>
  <h3> Precio: </h3>
  <p> $${prodInfo.cost}  </p>
  <h3> Descripción: </h3>
  <p> ${prodInfo.description}  </p>
  <h3> Categoria: </h3>
  <p>  ${prodInfo.category}  </p>
  <h3> Cantidad de Vendidos: </h2>
  <p> ${prodInfo.soldCount}  </p>`

  return document.getElementById("info").innerHTML = description;
}

function muestraImagenes(){

  let imgsMostrar = ""
  for (let i = 0; i < prodInfo.images.length; i++) {
    let imagenes = prodInfo.images[i];
    imgsMostrar += `<img src=${imagenes} alt=imag width="200" height="auto" style="margin: 10px">`;

    document.getElementById("imagenes").innerHTML = imgsMostrar;
  }

}

function muestraComentarios() {

  let comentariosToAppend = ""
  for (let i = 0; i < comentarios_array.length; i++) {
    let unComentario = comentarios_array[i];
    let estrellas = estrellitasV2(unComentario.score);
    comentariosToAppend += `
    <li class="list-group-item"> <b>${unComentario.user}</b> - ${unComentario.dateTime} - ${estrellas}<p>${unComentario.description}</p></li>`
  }
  document.getElementById("comentarios").innerHTML = `
   <h2> Comentarios </h2>
    <ul class="list-group">
    ${comentariosToAppend} 
    </ul>
  `
}

function estrellitasV2(numero){
  let estrellaLlenas = `
  <span class="fa fa-star checked"></span>`;
  let estrellaVacia =`
  <span class="fa fa-star"></span>`;
  let llenas_colocar ="";
  let vacias_colocar = "";
  let vacias_calc = 5 - numero;
  

  for (let i = 0; i < numero; i++) {
  llenas_colocar += estrellaLlenas;
  }
  for (let i = 0; i < vacias_calc; i++) {
    vacias_colocar += estrellaVacia;
  }
  
  return llenas_colocar + vacias_colocar ;
}

/* Esta funcion fue la primera que hice para las estrellas y fue usando ".repeat", luego quise probar usando "for" que es estrellitasV2 actual en uso.

function estrellitas(numero){

  let estrellaLlenas = `
  <span class="fa fa-star checked"></span>`;
  let estrellaVacia =`
  <span class="fa fa-star"></span>`;

  let vacias_calc = 5 - numero;
  let llenas_colocar = estrellaLlenas.repeat(numero);
  
  let vacias_colocar = estrellaVacia.repeat(vacias_calc);

   
  let calificacion = llenas_colocar + vacias_colocar;
  return calificacion;
}*/



document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(prodinfo_url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      prodInfo = resultObj.data;
      muestraProductInfo(prodInfo);
      muestraImagenes(prodInfo);
    }
  })
})

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(comentariosJson).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comentarios_array = resultObj.data;
      muestraComentarios();
    }
  })
})
