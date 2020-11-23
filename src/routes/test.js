const express = require("express");
const test = express.Router();
const db = require('../config/database');


test.get("/enfermedades/", async(req,res,next)=>{
    const tablaEnfermedades = await db.query("SELECT * FROM enfermedadesysintomas");
    
    return res.status(200).json({code:1, message:tablaEnfermedades});
});

//ruta para agregar un nuevo usuario a la db
test.post("/", async(req,res,next) => {
    const {nombre_paciente,fiebre,escalofrios,nauseas, vomito,diarrea,
        dolor_cabeza, cansancio,dificultad_respirar,deshidratacion, sudoracion,
        heces_sangre, piel_amarilla, perdida_apetito,perdida_peso,estrenimiento} = req.body;
    
    if(cansancio && nombre_paciente){
        let diagnostico = "na";
        let tratamiento = "na";

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