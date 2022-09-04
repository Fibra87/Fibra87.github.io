let categoriaSeleccionada = localStorage.getItem("catID")
let prod_url = "https://japceibal.github.io/emercado-api/cats_products/" + categoriaSeleccionada + ".json";
let array_prod = [];
let valorMin = undefined;
let valorMax = undefined;

function parrafo() {
    let etiqueta = ""
    if (categoriaSeleccionada === "101") {
        etiqueta = "Autos";
    }
    if (categoriaSeleccionada === "102") {
        etiqueta = "Juguetes";
    }
    if (categoriaSeleccionada === "103") {
        etiqueta = "Muebles";
    }
    document.getElementById("tipo").innerHTML = etiqueta
}

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

function muestraListadoProductos(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array_prod.products.length; i++) {
        let cadaProducto = array_prod.products[i];

        if (((valorMin == undefined) || (valorMin != undefined && parseInt(cadaProducto.cost) >= valorMin)) &&
            ((valorMax == undefined) || (valorMax != undefined && parseInt(cadaProducto.cost) <= valorMax))) {

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${cadaProducto.image}" alt="${cadaProducto.name}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${cadaProducto.name} - $${cadaProducto.cost}</h4>
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
            parrafo()
        }
    });
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        valorMin = document.getElementById("rangeFilterCountMin").value;
        valorMax = document.getElementById("rangeFilterCountMax").value;

        if ((valorMin != undefined) && (valorMin != "") && (parseInt(valorMin)) >= 0) {
            valorMin = parseInt(valorMin);
        }
        else {
            valorMin = undefined;
        }

        if ((valorMax != undefined) && (valorMax != "") && (parseInt(valorMax)) >= 0) {
            valorMax = parseInt(valorMax);
        }
        else {
            valorMax = undefined;
        }
        muestraListadoProductos(array_prod);
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        valorMin = undefined;
        valorMax = undefined;

        muestraListadoProductos(array_prod);
    });
});
