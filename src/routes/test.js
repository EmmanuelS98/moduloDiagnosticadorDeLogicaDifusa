const express = require("express");
const test = express.Router();
const db = require('../config/database');


test.get("/enfermedades/", async(req,res,next)=>{
    let query ="SELECT fiebre, escalofrios,"
    query += "nauseas, vomito, diarrea, dolor_cabeza, cansancio, dificultad_para_respirar,"
    query += "deshidratacion, sudoracion, heces_con_sangre, piel_amarilla, perdida_de_apetito,"
    query += "perdida_de_peso, estrenimiento FROM enfermedadesysintomas";

    const tablaEnfermedades = await db.query(query);
    
    return res.status(200).json({code:1, message:tablaEnfermedades});
});
//ruta para obtener un usuario por id
test.get('/enfermedades/:id([0-9]{1,3})/', async(req,res,next)=>{
    const id = req.params.id;
    console.log(id);
    if(id >= 1 && id <= 10){
        const user = await db.query(`SELECT * FROM enfermedadesysintomas WHERE id ='${id}';`);
        
        return res.status(200).json({code:1 , message:user})
    }
    
    return res.status(404).json({code: 404, message: "usuario no encontrado"});
    
});

//ruta para agregar un nuevo usuario a la db
test.post("/enfermedades/", async(req,res,next) => {
    const {nombre_paciente,fiebre,escalofrios,nauseas, vomito,diarrea,
        dolor_cabeza, cansancio,dificultad_respirar,deshidratacion, sudoracion,
        heces_sangre, piel_amarilla, perdida_apetito,perdida_peso,estrenimiento,diagnostico, tratamiento} = req.body;
    
    if(nombre_paciente && fiebre && escalofrios && nauseas && vomito  && diarrea && dolor_cabeza && cansancio &&
        dificultad_respirar && deshidratacion && sudoracion && heces_sangre && piel_amarilla && perdida_apetito &&
        perdida_peso && estrenimiento && diagnostico && tratamiento){
        

        let query = "INSERT INTO pacientes(nombre_paciente, fiebre, escalofrios,"
        query += "nauseas, vomito, diarrea, dolor_cabeza, cansancio, dificultad_respirar,"
        query += "deshidratacion, sudoracion, heces_sangre, piel_amarilla, perdida_apetito,"
        query += "perdida_peso, estrenimiento, diagnostico, tratamiento)";
                
        
        query += ` VALUES ('${nombre_paciente}', ${fiebre}, ${escalofrios},
        ${nauseas}, ${vomito}, ${diarrea}, ${dolor_cabeza}, ${cansancio},
        ${dificultad_respirar}, ${deshidratacion}, ${sudoracion}, ${heces_sangre},
        ${piel_amarilla}, ${perdida_apetito}, ${perdida_peso}, ${estrenimiento}, '${diagnostico}',
        '${tratamiento}') `;    
       
        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(201).json({code:201, message:"Pasiente insertado Correctamente"});
        }
        return res.status(500).json({code:500, message:"oh oh Ocurrio un error"});    
    }
    return res.status(500).json({code:500, message:"Campos incompletos"}); 
});




module.exports=test;