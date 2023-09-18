import { HttpClient } from "@angular/common/http";
import { PacientesDoctores } from "./models/pacientes-doctores.models";
import { Injectable } from "@angular/core";


@Injectable()
export class DataServices{

    constructor(private httpClient:HttpClient){}

    agregarPacientesDoctores(personas:PacientesDoctores[]){
        const data: { [key: number]: PacientesDoctores } = {};
        personas.forEach((persona, index) => {
            // Usamos el índice como clave para cada persona, pero puedes ajustarlo según tus necesidades
            data[index] = persona;
        })

        this.httpClient.post('https://gestion-de-fichas-medicas-default-rtdb.firebaseio.com/datos.json', data).subscribe(

            response=>console.log("Se ha guardado la persona: " + response),
            error=> console.log("Error: " + error),


        );

    }

}