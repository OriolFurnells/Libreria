var cuerpo = document.getElementById("all_libros");
var data = [];
var spanish = [];

var filter = [];
var searchText = document.getElementById("search").value;

var noResults = "No hay libros estos datos";
var descripciones = [];
var titulos = [];
var idInner = "";
var idFront = "";
var idBack = "";
var divInner = "";
var divFront = "";
var divBack = "";
var tituloBack = "";
var descripcionBack = "";

var prueva1, prueva2, AllMin, AllMax, FirstMayus;

fetch("https://api.myjson.com/bins/14yl5c", {
	method: "GET",
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}

}).then(function (json) {



	console.log(json)
	data = json;
	spanish = data.books;

	portada(spanish);


}).catch(function (error) {
	console.log("Request failed:" + error.message);
});

for (let i = 0; i < spanish.length; i++) {
	descripciones.push(spanish[i].descripcion);
	titulos.push(spanish[i].titulo);
}

function changeTxt() {

	prueva1 = searchText.toLowerCase();
	prueva2 = searchText.toLowerCase();
	AllMax = searchText.toUpperCase();
	AllMin = (prueva1.replace(/\b[a-z]/g, c => c.toLowerCase()));
	FirstMayus = (prueva2.replace(/\b[a-z]/g, c => c.toUpperCase()));

}

function search(array1, array2, text) {
	searchText = document.getElementById("search").value;
	changeTxt();
	array2 = [];
	cuerpo.innerHTML = "";
	console.log(array1);
	console.log(array2);
	console.log(AllMax);

	for (let i = 0; i < array1.length; i++) {
		if (array1[i].titulo.includes(AllMin) || array1[i].titulo.includes(AllMax) || array1[i].titulo.includes(FirstMayus) || array1[i].descripcion.includes(AllMin) || array1[i].descripcion.includes(AllMax) || array1[i].descripcion.includes(FirstMayus)) {
			array2.push(array1[i]);
		}
	}
	console.log(array2)
	portada(array2);
}
//3 titulo
//4 descripciones

function portada(array) {

	//creamos las portadas de los libros

	for (let i = 0; i < array.length; i++) {
		console.log(array)
		divFront = document.createElement("div");

		divBack = document.createElement("div");

		divInner = document.createElement("div");

		divAll = document.createElement("div");

		divTitulo = document.createElement("div");
		divDescr = document.createElement("div");
		divImg = document.createElement("div");

		//creamos el elemento IMG
		var imageFront = document.createElement("img")
		var imageBack = document.createElement("img")
		//asignamos valor src a la imagen
		imageFront.src = array[i].portada;
		imageBack.src = array[i].portada;

		//	creamos el elemento a
		var aElementFront = document.createElement('a');
		var aElementBack = document.createElement('a');
		//	damos valor al elemento a creado anteriormente
		aElementBack.setAttribute("href", array[i].portada);
		//apendeamos la imagen al elemento	
		aElementFront.appendChild(imageFront);
		aElementBack.appendChild(imageBack);
		//apendeamos las imagenes al cuerpo de la pagina


		
		
		

		//damos class a los div
		divFront.setAttribute("class", "libreria-front");
		divBack.setAttribute("class", "libreria-back");
		divInner.setAttribute("class", "libreria-inner");
		divAll.setAttribute("class", "libreria");
		divTitulo.setAttribute("class", "tituloBack");
		divDescr.setAttribute("class", "descripcionBack");

		divBack.appendChild(divTitulo);
		divBack.appendChild(divDescr);
		divBack.appendChild(aElementBack);
		divFront.appendChild(aElementFront);

		divInner.appendChild(divFront);
		divInner.appendChild(divBack);
		divAll.appendChild(divInner);
		document.getElementById("all_libros").appendChild(divAll);
		divTitulo.innerHTML = array[i].titulo;
		divDescr.innerHTML = (array[i].descripcion.substr(0, 100) + "...");
		document.getElementById("all_libros").appendChild(divAll);

	}

}