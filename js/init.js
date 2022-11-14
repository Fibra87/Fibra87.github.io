const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function mostrarUsuario(){
    
  usuario = localStorage.getItem("usuario");
  document.getElementById("user").innerHTML =  usuario;

}



function chequeaLogueo(){
  console.log("se activa");
  let checklogin = localStorage.getItem("usuario");
  if  (checklogin !== null) {
    console.log(" esta logueado");
    window.location = "my-profile.html";



  }else{ 
  console.log("tiene que estar logueado");
  window.location = "index.html";
  }

}

document.addEventListener("DOMContentLoaded", function(){
  
  mostrarUsuario(); 
        
  document.getElementById("cerrar").addEventListener("click", function() {
      localStorage.removeItem("usuario");      
  });
  
});

