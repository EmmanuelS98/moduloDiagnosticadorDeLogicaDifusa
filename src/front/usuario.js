
window.onload = init;
var headers ={};
var url = "http://localhost:3000";
var pacientes;
var nombre;

function init(){
    
        loadUser();
        //document.querySelector('#bSearchName').addEventListener('click', loadUserByName);
   
}

function loadUser(){
    
    axios.get(url + "/inicio/").then(function(res){
        localStorage.removeItem('identificador');
        pacientes = res.data.message;
        localStorage.setItem("identificador", pacientes[pacientes.length-1].id +1);
        displayUser(res.data.message);
        

    }).catch(function(err){
        console.log(err);
    })
}
function loadUserByName(){
    nombre = document.getElementById("searchName").value;
    
    if(nombre == ''){
        loadUser();
    }else{
        axios.get(url + `/inicio/${nombre}` ).then(function(res){
            console.log(res.data.message);
            displayUser(res.data.message);
    
        }).catch(function(err){
            console.log(err);
        })   
    }


    
}

function displayUser(user){

    
    var tbody = document.querySelector("tbody");
    var tbodyVacio = "<tbody> </tbody>";
    
    

    if(user.length >= 1){
        tbody.innerHTML = tbodyVacio;
        for(var i = 0; i < user.length; i++){
            tbody.innerHTML += ` <tr>
                                    <td class="user_id">${i+1}</td>
                                    <td class="user_name">'${user[i].nombre_paciente}'</td>
                                    <td class="user_mail">'${user[i].diagnostico}'</td>
                                    <td class="user_dateJoin">'${user[i].dateTest}'</td>
                                    <td class="user_accion">
                                        <input type="button" value="Detalles del Test" class="modificar" onClick='testDetail(${user[i].id})'>
                                    </td>
                                </tr>`;
        }
    }
    if(user.length === 1){
        tbody.innerHTML = tbodyVacio;
        tbody.innerHTML += ` <tr>
                                <td class="user_id">${i+1}</td>
                                <td class="user_name">'${user[0].nombre_paciente}'</td>
                                <td class="user_mail">'${user[0].diagnostico}'</td>
                                <td class="user_dateJoin">'${user[0].dateTest}'</td>
                                <td class="user_accion">
                                    <input type="button" value="Detalles del Test" class="modificar" onClick='testDetail(${user[i].id})'>
                                </td>
                            </tr>`;        

    }

}

function testDetail(id){
    localStorage.setItem("identificador", id);
    window.location.href = "test_detail.html";
}