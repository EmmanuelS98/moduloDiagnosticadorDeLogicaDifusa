
var url = "http://localhost:3000";
var id = localStorage.getItem("identificador");
var paciente;
window.onload = init;

function init(){
    
    loadPatient();

    
}

function loadPatient(){
    
    
    axios.get(url + `/inicio/${id}`).then(function(res){
        paciente = res.data.message;
        console.log(paciente);

        printData();

    }).catch(function(err){
        console.log(err);
    });
}

function printData(){
    console.log(paciente[0].nombre_paciente);

    var divContainer = document.getElementById("infoDiv");

    divContainer.innerHTML += ` <h2 id="nombre">${paciente[0].nombre_paciente}</h2>
                                <h3 id="date" >${paciente[0].dateTest}</h3>
                                        
                                <div class="wrap-table100">
                                    <div class="table100">
                                        <table>
                                            <thead>
                                                <tr class="table100-head">
                                                    <th class="Sintoma">Sintoma</th>
                                                    <th class="Intensidad">Intensidad</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="sintomaItem">Fiebre</td>
                                                    <td class="intensidadValor">${paciente[0].fiebre}</td>
                                                </tr>
                                                <tr>
                                                    <td class="sintomaItem">Escalofrios</td>
                                                    <td class="intensidadValor">${paciente[0].escalofrios}</td>
                                                </tr>
                                                <tr>
                                                    <td class="sintomaItem">Nauseas</td>
                                                    <td class="intensidadValor">${paciente[0].nauseas}</td>
                                                </tr>
                                                <tr>
                                                    <td class="sintomaItem">Vomito</td>
                                                    <td class="intensidadValor">${paciente[0].vomito}</td>
                                                </tr>
                                                <tr>
                                                    <td class="sintomaItem">Diarrea</td>
                                                    <td class="intensidadValor">${paciente[0].diarrea}</td>
                                                </tr>
                                                <tr>
                                                    <td class="sintomaItem">Dolor de Cabeza</td>
                                                    <td class="intensidadValor">${paciente[0].dolor_cabeza}</td>
                                                </tr>
                                                <tr>
                                                    <td class="sintomaItem">Cansancio</td>
                                                    <td class="intensidadValor">${paciente[0].cansancio}</td>
                                                </tr>
                                                <tr>
                                                    <td class="sintomaItem">Dificultad al Respirar</td>
                                                    <td class="intensidadValor">${paciente[0].dificultad_respirar}</td>
                                                </tr>
                                                <tr>
                                                    <td class="sintomaItem">Deshidratación</td>
                                                    <td class="intensidadValor">${paciente[0].deshidratacion}</td>
                                                </tr>
                                                <tr>
                                                    <td class="sintomaItem">Sudoración</td>
                                                    <td class="intensidadValor">${paciente[0].sudoracion}</td>
                                                </tr>
                                                <tr>
                                                    <td class="sintomaItem">Heces con Sangre</td>
                                                    <td class="intensidadValor">${paciente[0].heces_sangre}</td>
                                                </tr>
                                                <tr>
                                                    <td class="sintomaItem">piel_amarilla</td>
                                                    <td class="intensidadValor">${paciente[0].piel_amarilla}</td>
                                                </tr>
                                                <tr>
                                                    <td class="sintomaItem">Perdida de Apetito</td>
                                                    <td class="intensidadValor">${paciente[0].perdida_apetito}</td>
                                                </tr>
                                                <tr>
                                                    <td class="sintomaItem">Perdida de Peso</td>
                                                    <td class="intensidadValor">${paciente[0].perdida_peso}</td>
                                                </tr>
                                                <tr>
                                                    <td class="sintomaItem">Estreñimiento</td>
                                                    <td class="intensidadValor">${paciente[0].estrenimiento}</td>
                                                </tr>
                                            </tbody>						
                                        </table>
                                    </div>
                                </div>
                                    
                                <h2 class="subtitle">Diagnostico: ${paciente[0].diagnostico}</h2>
                                <p class="tratamientotitle"> Tratamiento sugerido:</p>
                                <p class="tratamiento">${paciente[0].tratamiento}</p>
                                <a href="inicio.html" type="button" class="homereturn">aceptar y regresar</a>`

    console.log(body);
    

}