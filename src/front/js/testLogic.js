window.onload = init;
var headers ={};
var url = "http://localhost:3000";
var tabla=new Array(10).fill(0);;
var tbl =  new Array(10).fill(0);//las enfermedades //Modulo precargado
var tablaVacia = new Array(10);
var unifilaVacia = new Array(10).fill(0);
var testPaciente = new Array(15).fill(0);
var enfermedadArray;
var nombre;


for( var i = 0; i< tablaVacia.length;i++){
    tablaVacia[i] = new Array(15).fill(0);
    
}//en este for se crea una tabla vacia de 10 x 15 para la comparacion de las enfermedades


function init(){
    getEnfermedades();
    document.querySelector('#btn-aceptar').addEventListener('click', cargarDatos);
}
function getEnfermedades(){
    axios.get(url + "/test/enfermedades/").then(function(res){
        
        tbl = res.data.message;
        
        for(var i = 0; i< tbl.length;i++){
            for(var j = 0; j< 14;j++){
                tabla[i]= Object.values(tbl[i]);
            }
        }
    }).catch(function(err){
        console.log(err);
    });
}

function cargarDatos(){
    
    var suma = 0;
    var maximo = 0;
    nombre = document.getElementById('inp-nombre').value;

    //for para comparacion
    for( var i = 0; i< 10; i++){
        for(var j = 0; j<14;j++){
            var numero = 0; //sirve para averiguar el menor entre la comparacion de tablas
        
            numero=Math.min(testPaciente[j], tabla[i][j]);//se calcula el minimo entre el paciente y la tabla de enfermedades
            tablaVacia[i][j] = numero;//tabla de minimos entre enfermedades vs usuario
            suma = suma + numero;//la suma de cada fila
        }
        unifilaVacia[i]= suma;//la suma de los elementos de cada fila son sumados y puestos en arreglo
        suma = 0;
    }
    maximo = Math.max.apply(null,unifilaVacia);

    var cont=0;
    while(maximo!=unifilaVacia[cont]){
        cont=cont+ 1;
    }
        
    console.log("nombre: " + nombre);
    console.log("testPaciente: " + testPaciente[0]);//lo que yo ingrese en arreglo
    console.log("testPaciente: " + testPaciente[1]);//lo que yo ingrese en arreglo
    console.log("testPaciente: " + testPaciente[2]);//lo que yo ingrese en arreglo
    console.log("testPaciente: " + testPaciente[14]);//lo que yo ingrese en arreglo
    console.log("enfermedades:" + tabla[0]);
    console.log("tablaa :" + tablaVacia[0]);
    console.log("unifilavacia :" + unifilaVacia);
    console.log("maximo" + maximo);
    console.log("enfermedad: " + maximo + " cont:" + cont);

    getDiagnostico(cont);
}

function getDiagnostico(id){    
    console.log(id)
    console.log(id+1)
    axios.get(url + `/test/enfermedades/${id+1}/`).then(function(res){
        
        enfermedadArray =  res.data.message;
        postResult()
        
    }).catch(function(err){
        console.log(err);
    });
}


function postResult(){
    axios.post(url + "/test/enfermedades/" , {
        
        nombre_paciente: nombre,
        fiebre: testPaciente[0],
        escalofrios: testPaciente[1],
        nauseas:testPaciente[2],
        vomito:testPaciente[3],
        diarrea:testPaciente[4],
        dolor_cabeza:testPaciente[5],
        cansancio:testPaciente[6],
        dificultad_respirar:testPaciente[7],
        deshidratacion:testPaciente[8],
        sudoracion:testPaciente[9],
        heces_sangre:testPaciente[10],
        piel_amarilla:testPaciente[11],
        perdida_apetito:testPaciente[12],
        perdida_peso:testPaciente[13],
        estrenimiento:testPaciente[14],
        diagnostico: enfermedadArray[0].enfermedad,
        tratamiento: enfermedadArray[0].tratamiento,

    },headers).then(function(res){
        console.log(res);
        alert("Paciente Diagnosticado con Exito")
        //window.location.href= "./test_detail.html"
    }).catch(function(err){
        console.log(err);
        alert("Campos incompletos");
    });
}
  

function op1(sintoma){
    testPaciente[sintoma] = 0
    console.log(testPaciente);
}
function op2(sintoma){
    testPaciente[sintoma] = 0.2
    console.log(testPaciente);
}
function op3(sintoma){
    testPaciente[sintoma] = 0.4
    console.log(testPaciente);
}
function op4(sintoma){
    testPaciente[sintoma] = 0.6
    console.log(testPaciente);
}
function op5(sintoma){
    testPaciente[sintoma] = 0.8
    console.log(testPaciente);
}
function op6(sintoma){
    testPaciente[sintoma] = 1
    console.log(testPaciente);
}
