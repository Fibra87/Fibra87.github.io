let prod_url="https://japceibal.github.io/emercado-api/cats_products/101.json";
let array_prod = [];

/*probando funciones
function mostrarproductos(array_prod){
    let htmlContentToAppend = "";

    for(let producto in array_prod.products);
            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.imgage + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ producto.name +`</h4> 
                        <p> `+ producto.description +`</p> 
                        </div>
                        <small class="text-muted">` + producto.productCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}
*/

//probando otra funcion copiada de categories

function muestraListadoProductos(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array_prod.products.length; i++){
        let cadaProducto = array_prod.products[i];
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${cadaProducto.image}" alt="${cadaProducto.name}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${cadaProducto.name}</h4>
                            <small class="text-muted">${cadaProducto.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${cadaProducto.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("productoscontainer").innerHTML = htmlContentToAppend;
    }






/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en array_prod.
-Por último, se llama a muestraListadoProductos() pasándole por parámetro array_prod.

*/

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(prod_url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            array_prod = resultObj.data;
            muestraListadoProductos(array_prod)
        }
    });
});
