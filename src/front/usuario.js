
window.onload = init;
var headers ={};
var url = "http://localhost:3000";
var pacientes;
var nombre;

function init(){
    
    /* if(localStorage.getItem("token")){ 
        headers ={
            headers:{
               'Authorization': "bearer " + localStorage.getItem("token") 
            }
        }
        loadUser();

        document.querySelector('#bSearchName').addEventListener('click', loadUserByName);
        document.querySelector('#logOut').addEventListener('click', logOut);
    }
    else{ */
        loadUser();
        document.querySelector('#bSearchName').addEventListener('click', loadUserByName);
   // }
}

function loadUser(){
    
    axios.get(url + "/inicio/").then(function(res){
        
        displayUser(res.data.message);
        pacientes = res.data.message;

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
                                    <td class="user_id">${user[i].id}</td>
                                    <td class="user_name">'${user[i].nombre_paciente}'</td>
                                    <td class="user_mail">'${user[i].diagnostico}'</td>
                                    <td class="user_dateJoin">'${user[i].dateTest}'</td>
                                    <td class="user_accion">
                                        <a href="test_detail.html" type="button" class="modificar">Detalles</a>
                                    
                                    </td>
                                </tr>`;
        }
    }
    if(user.length === 1){
        tbody.innerHTML = tbodyVacio;
        tbody.innerHTML += ` <tr>
                                <td class="user_id">${user[0].id}</td>
                                <td class="user_name">'${user[0].nombre_paciente}'</td>
                                <td class="user_mail">'${user[0].diagnostico}'</td>
                                <td class="user_dateJoin">'${user[0].dateTest}'</td>
                                <td class="user_accion">
                                    <a href="test_detail.html" type="button" class="modificar">Detalles</a>
                                </td>
                            </tr>`;        

    }

}
