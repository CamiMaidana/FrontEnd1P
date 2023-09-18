import { Injectable } from '@angular/core';
import { PacientesDoctores } from '../models/pacientes-doctores.models';
import firebase from 'firebase/app';
import 'firebase/database'; // Importa el módulo de la base de datos de Firebase.
import { DataServices } from '../data.services';

@Injectable({
  providedIn: 'root'
})
export class PacientesDoctoresService {

  private personas: PacientesDoctores[] = [
  ];

  constructor() {

    if (location.hostname === "localhost") {
      const firebaseConfig = {
        apiKey: '', // Deja esto en blanco o utiliza cualquier valor.
        authDomain: 'localhost',
        databaseURL: 'https://gestion-de-fichas-medicas-default-rtdb.firebaseio.com',
        projectId: 'gestion-de-fichas-medicas',
        storageBucket: 'localhost',
        messagingSenderId: '' // Deja esto en blanco o utiliza cualquier valor.
      };
      firebase.initializeApp(firebaseConfig);
    }
   }

  getPacientesDoctores(): PacientesDoctores[] {
    //this.dataServices.agregarPacientesDoctores(this.personas);
    return this.personas;
  }

  agregarPacientesDoctores(persona: PacientesDoctores) {
    this.personas.push(persona);
    //this.dataServices.agregarPacientesDoctores(this.personas);
  }

  editarPacientesDoctores(persona: PacientesDoctores) {
    const index = this.personas.findIndex(c => c.idPersona === persona.idPersona);
    if (index !== -1) {
      this.personas[index] = persona;
    }
  }

  eliminarPacientesDoctores(idPacientesDoctores: number) {
    const index = this.personas.findIndex(c => c.idPersona === idPacientesDoctores);
    if (index !== -1) {
      this.personas.splice(index, 1);
    }
  }

 
}
