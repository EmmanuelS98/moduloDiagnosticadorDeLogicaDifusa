window.onload = init;
var headers ={};
var url = "http://localhost:3000";
var tbl =  new Array(11).fill(0);//las enfermedades //Modulo precargado//aqui es recuperado en forma de objeto
var tabla=new Array(11).fill(0);;//este sera el modulo precargado en forma de arreglos
var tablaVacia;// = new Array(11);//esta tabla servira para ir comparando lo del ususario con el modulo
var unifilaVacia;// = new Array(11).fill(0);//aqui se obtendra la suma de la tabla anterior
var testPaciente = new Array(15).fill(0);//este es el test del paciente
var enfermedadArray;//este es el diagnostico
var nombre;// este es el nombre

var opcionesUsuario = new Array(10).fill(0);//para el analisis especifico



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
    
    if(document.getElementById('Check1').checked==false && document.getElementById('Check2').checked==false &&
    document.getElementById('Check3').checked==false && document.getElementById('Check4').checked==false && 
    document.getElementById('Check5').checked==false && document.getElementById('Check6').checked==false && 
    document.getElementById('Check7').checked==false && document.getElementById('Check8').checked==false&& 
    document.getElementById('Check9').checked==false && document.getElementById('Check10').checked==false &&
    document.getElementById('Check11').checked==false){
        opcionesUsuario.fill(1);
    }

    var suma = 0;//suma de  cada fila de la tabla comparativa
    var maximo = 0; //el valor maximo de unifila vacia
    var selection = 0;//variable para saber cuantas enfermedades selecciono el usuario, servira para crear un array

    nombre = document.getElementById('inp-nombre').value;
    
    for(var i = 0; i<opcionesUsuario.length;i++){
        if(opcionesUsuario[i]==1){
            selection++;
        }
    }

    console.log(selection);
    //analisis general
    if(selection == 10){
        
        tablaVacia = new Array(11);//esta tabla servira para ir comparando lo del ususario con el modulo
        unifilaVacia = new Array(11).fill(0);//aqui se obtendra la suma de la tabla anterior


        for( var i = 0; i< tablaVacia.length;i++){
            tablaVacia[i] = new Array(15).fill(0);
        }//en este for se crea una tabla vacia de 10 x 15 para la comparacion de las enfermedades

        //for para comparacion
        for( var i = 0; i< 11; i++){
            for(var j = 0; j<14;j++){
                var numero = 0; //sirve para averiguar el menor entre la comparacion de tablas
            
                numero=Math.min(testPaciente[j], tabla[i][j]);//se calcula el minimo entre el paciente y la tabla de enfermedades
                tablaVacia[i][j] = numero;//tabla de minimos entre enfermedades vs usuario
                suma = suma + numero;//la suma de cada fila
            }
            unifilaVacia[i]= suma;//la suma de los elementos de cada fila son sumados y puestos en arreglo
            suma = 0;
        }
    
        console.log(unifilaVacia);
        maximo = Math.max.apply(null,unifilaVacia);
        console.log(maximo);
    
    
        var cont=0;
        
        while(maximo!=unifilaVacia[cont]){
            cont=cont+ 1;
        }
        console.log()
    
        getDiagnostico(cont);    
    }
    //analisis especifico
    else{
        var arrayop = new Array(selection).fill(0); //se crea una nueva 

        console.log('seleccion'+selection);
        console.log(arrayop);

        tablaVacia = new Array(selection).fill(0);
        unifilaVacia = new Array(selection).fill(0);
        for( var i = 0; i< tablaVacia.length;i++){
            tablaVacia[i] = new Array(15).fill(0);
        }//en este for se crea una tabla vacia de 10 x 15 para la comparacion de las enfermedades


        for( var i = 0; i< arrayop.length;i++){
            arrayop[i] = new Array(15).fill(0);
        } //se genera un arreglo vacio de las enfermedades que el usuario eligio
        
        //aqui se obtiene la tabla de las enfermedades que el usuario selecciono
        var cont = 0;
        for(var i = 0; i<opcionesUsuario.length; i++){
            if(opcionesUsuario[i]==1){
                for(var j = 0; j<14;j++){
                    arrayop[cont][j] = tabla[i][j];
                }    
                cont = cont +1;
            }   
        }
        console.log("--------------");

        //for para comparacion
        for( var i = 0; i< selection; i++){
            for(var j = 0; j<14;j++){
                var numero = 0; //sirve para averiguar el menor entre la comparacion de tablas
            
                numero=Math.min(testPaciente[j], arrayop[i][j]);//se calcula el minimo entre el paciente y la tabla de enfermedades
                tablaVacia[i][j] = numero;//tabla de minimos entre enfermedades vs usuario
                suma = suma + numero;//la suma de cada fila
            }
            unifilaVacia[i]= suma;//la suma de los elementos de cada fila son sumados y puestos en arreglo
            suma = 0;
        }
        maximo = Math.max.apply(null,unifilaVacia);
        console.log('maximo'+maximo);
        console.log('tabla' +arrayop);
        var cont1=0;
        while(maximo!=unifilaVacia[cont1]){
            cont1=cont1+ 1;
        }
        console.log(cont1);

        var enc = 0;


        let total = testPaciente.reduce((a, b) => a + b, 0);
        if(total==0){
            getDiagnostico(0);

        }else{
            for(var i = 0; i< opcionesUsuario.length; i++){
                if(opcionesUsuario[i] == 1){
                    if(enc == cont1){
                        getDiagnostico(i);
                    }
                    enc=enc + 1;
                    
                } 
            }
        }

        

    }

    
}

function getDiagnostico(id){    
    

    if(id != 0){
        axios.get(url + `/test/enfermedades/${id+1}/`).then(function(res){
        
            enfermedadArray =  res.data.message;
            postResult()
            console.log(enfermedadArray[0].enfermedad)
                
        }).catch(function(err){
            console.log(err);
        });
    }else{
        axios.get(url + `/test/enfermedades/${11}/`).then(function(res){
        
            enfermedadArray =  res.data.message;
            postResult()
            console.log(enfermedadArray[0].enfermedad)
                
        }).catch(function(err){
            console.log(err);
        });
    }
}


function postResult(){
    
    axios.post(url + "/test/enfermedades/" , {
        
        nombre_paciente: nombre,
        fiebre: testPaciente[0].toString(),
        escalofrios: testPaciente[1].toString(),
        nauseas: testPaciente[2].toString(),
        vomito: testPaciente[3].toString(),
        diarrea: testPaciente[4].toString(),
        dolor_cabeza: testPaciente[5].toString(),
        cansancio: testPaciente[6].toString(),
        dificultad_respirar: testPaciente[7].toString(),
        deshidratacion: testPaciente[8].toString(),
        sudoracion: testPaciente[9].toString(),
        heces_sangre: testPaciente[10].toString(),
        piel_amarilla: testPaciente[11].toString(),
        perdida_apetito: testPaciente[12].toString(),
        perdida_peso: testPaciente[13].toString(),
        estrenimiento: testPaciente[14].toString(),
        diagnostico: enfermedadArray[0].enfermedad,
        tratamiento: enfermedadArray[0].tratamiento,
    
    },headers).then(function (res) {
        console.log(res);
        alert("Paciente Diagnosticado con Exito")
        window.location.href= "./test_detail.html"
    }).catch(function (err) {
        console.log(err);
        alert("Campos incompletos");
    });
    
}
  

function op1(sintoma){
    testPaciente[sintoma] = 0.0
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


function escuchar(numero){
    //console.log(document.getElementById("Check1").onchange);
    if(numero != 11){
        if(document.getElementById(`Check${numero}`).checked==true){
            opcionesUsuario[numero-1] = 1;
            console.log(opcionesUsuario);
        }else{
            opcionesUsuario[numero-1] = 0;
            console.log(opcionesUsuario);
        } 
    }else{

        if(document.getElementById(`Check${numero}`).checked==true){
            opcionesUsuario.fill(1);
            console.log(opcionesUsuario);
        }else{
            opcionesUsuario.fill(0);
            console.log(opcionesUsuario);
        } 
    }
}