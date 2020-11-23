window.onload = init;
var headers ={};
var url = "http://localhost:3000";
var tabla;
var nombre;
var tablaVacia = new Array(10);
var unifilaVacia = new Array(10).fill(0);

for( var i = 0; i< tablaVacia.length;i++){
    tablaVacia[i] = new Array(15).fill(0);
}//en este for se crea una tabla vacia de 10 x 15 para la comparacion de las enfermedades


function init(){
    getEnfermedades();

    document.querySelector('#btn-aceptar').addEventListener('click', cargarDatos);
}

function getEnfermedades(){
    axios.get(url + "/test/enfermedades/").then(function(res){
        tabla = res.data.message;
        console.log(tablaVacia);
        console.log(unifilaVacia);

    }).catch(function(err){
        console.log(err);
    })
}
function cargarDatos(){
    var nombre = document.getElementById('inp-nombre').value;
    console.log(nombre);
}