let productoSeleccionado = localStorage.getItem("product")
let prodinfo_url = "https://japceibal.github.io/emercado-api/products/" + productoSeleccionado + ".json";
let prodInfo = []
let comentariosJson = PRODUCT_INFO_COMMENTS_URL + productoSeleccionado + ".json";
let comentarios_array = []
let carro = [];


function muestraProductInfo() {

  let description = `
  <br>
  <div id="enlinea">
    <h1>${prodInfo.name} </h1><button id="butt" class="btn btn-primary btn-lg" type="button">Comprar</button>
  </div>
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

function muestraImagenes() {

  let imgsMostrar = "";
  for (let i = 0; i < prodInfo.images.length; i++) {
    let imagenes = prodInfo.images[i];
    imgsMostrar += `<img src=${imagenes} alt=imag width="200" height="auto" style="margin: 10px">`;

    document.getElementById("imagenes").innerHTML = imgsMostrar;
  }

}

/*

function muestraImagenesv2(){
  
  let imgsMostrar = "";
  for (let i = 0; i < prodInfo.images.length; i++) {
    let imagenes = prodInfo.images[i];
    imgsMostrar += `
    <div class="carousel-item active">
      <img src=${imagenes} class="d-block w-100" alt="imag${[i]}">
    </div>`
  }

    let carousel = `
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    ${imgsMostrar}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>`

  document.getElementById("imagenes").innerHTML = carousel;
  

}

/*
<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

*/

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

function estrellitasV2(numero) {
  let estrellaLlenas = `
  <span class="fa fa-star checked"></span>`;
  let estrellaVacia = `
  <span class="fa fa-star"></span>`;
  let llenas_colocar = "";
  let vacias_colocar = "";
  let vacias_calc = 5 - numero;


  for (let i = 0; i < numero; i++) {
    llenas_colocar += estrellaLlenas;
  }
  for (let i = 0; i < vacias_calc; i++) {
    vacias_colocar += estrellaVacia;
  }

  return llenas_colocar + vacias_colocar;
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

function muestraRelacionados() {

  let tarjetas = "";
  for (let i = 0; i < prodInfo.relatedProducts.length; i++) {
    let articulos = prodInfo.relatedProducts[i];
    tarjetas += ` 
    <div class="col-sm-6">
      <div class="card border-light">
        <div class="card-body">
          <div class="card" style="width: 18rem;">
            <img src="${articulos.image}" class="card-img-top" alt="i${i}" onclick="abrirRelacionado(${articulos.id})" >
            <div class="card-body">
             <p class="card-text">${articulos.name}.</p>
            </div>
          </div>
        </div>
      </div>
    </div>`
    let prodRelacionados = `
    <h2> Productos relacionados.</h2>
    <div class="row">`+ tarjetas + `</div>`;

    document.getElementById("relacionados").innerHTML = prodRelacionados;
  }

}

function abrirRelacionado(id) {
  localStorage.setItem("product", id);
  location.reload();
}

function chequeaIguales() {
  let contador = 0;
  for (let i = 0; i < carro.length; i++) {
    if (carro[i].name === prodInfo.name) {
      contador = 1;
    }
  };
  if (contador != 1) {
    let aCargar = { id: prodInfo.id, name: prodInfo.name, count: 1, unitCost: prodInfo.cost, currency: prodInfo.currency, image: prodInfo.images[0] };
    carro.push(aCargar);
    localStorage.setItem("carro", JSON.stringify(carro));
    console.log(carro);
  } else { console.log("ya estaba") };
};

function cargaCarro(producto) {
  if (localStorage.getItem("carro")) {
    carro = JSON.parse(localStorage.getItem("carro"));
    console.log(carro);
    chequeaIguales();


  } else {
    let aCargar = { id: prodInfo.id, name: prodInfo.name, count: 1, unitCost: prodInfo.cost, currency: prodInfo.currency, image: prodInfo.images[0] };
    carro.push(aCargar);
    localStorage.setItem("carro", JSON.stringify(carro));
    console.log(carro);
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(prodinfo_url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      prodInfo = resultObj.data;
      console.log(prodInfo);
      console.log(prodInfo.id);
      muestraProductInfo(prodInfo);
      muestraImagenes(prodInfo);
      document.getElementById("butt").addEventListener("click", function (a) {
        cargaCarro(prodInfo.id);

      })
    }
  }).then(function (e) {
    getJSONData(comentariosJson).then(function (resultObj) {
      if (resultObj.status === "ok") {
        comentarios_array = resultObj.data;
        muestraComentarios();
        muestraRelacionados();
      }
    });
  })
});
