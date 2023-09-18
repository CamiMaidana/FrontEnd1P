/*import { Component, OnInit } from '@angular/core';
import { PacientesDoctores } from 'src/app/models/pacientes-doctores.models';
import { PacientesDoctoresService } from '../pacientes-doctores.service';

import {FormGroup, FormBuilder, Validators} from '@angular/forms';

//import { AngularFireDatabase } from '@angular/fire/database'; // Importa el servicio AngularFire

import * as firebase from 'firebase/database';


@Component({
  selector: 'app-pacientes-doctores',
  templateUrl: './pacientes-doctores.component.html',
  styleUrls: ['./pacientes-doctores.component.css']
})
export class PacientesDoctoresComponent implements OnInit{
  personas: PacientesDoctores[] = [];
  nuevapersona: PacientesDoctores = { idPersona: 0, nombre: '', apellido: '', telefono: '', email: '', cedula: '', flag_es_doctor: '' };
  personaEditar: PacientesDoctores | null = null;

  personasFiltradas: PacientesDoctores[] = []; // Lista filtrada
  filtroNombre = '';
  filtroApellido = '';
  filtroProfesion = 'todos'; // 'todos', 'doctores', 'pacientes'


  constructor(public pacientesDoctoresService: PacientesDoctoresService) {
    
      this.db.list('personas').valueChanges().subscribe(data => {
      this.personas = data;
    });
    
    this.personas = this.pacientesDoctoresService.getPacientesDoctores();
  }

  ngOnInit() {
    
    this.obtenerPersonasDesdeFirebase();

  }

  agregarPersona() {
    this.pacientesDoctoresService.agregarPacientesDoctores(this.nuevapersona);
    this.nuevapersona = { idPersona: 0, nombre: '', apellido: '', telefono: '', email: '', cedula: '', flag_es_doctor: '' };
  }

  editarPersona(persona: PacientesDoctores) {
    this.personaEditar = persona;
  }

  guardarEdicion() {
    if (this.personaEditar) {
      this.pacientesDoctoresService.editarPacientesDoctores(this.personaEditar);
      this.personaEditar = null;
    }
  }

  cancelarEdicion() {
    this.personaEditar = null;
  }

  eliminarPersona(idPersona: number) {
    this.pacientesDoctoresService.eliminarPacientesDoctores(idPersona);
  }


  // método para validar la entrada de flag_es_doctor
  // Agrega una función de validación que se ejecutará automáticamente cuando cambie el valor del input
  validarFlagEsDoctor() {
    if (this.nuevapersona.flag_es_doctor !== '0' && this.nuevapersona.flag_es_doctor !== '1') {
      this.nuevapersona.flag_es_doctor = ''; // Restablece a un valor por defecto (puede ser '0' o '1' según tu lógica).
    }
  }

  // Método para aplicar el filtrado por nombre, apellido y profesion
  aplicarFiltro() {
    this.personas = this.personas.filter(persona => {
      const nombreCoincide = persona.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase());
      const apellidoCoincide = persona.apellido.toLowerCase().includes(this.filtroApellido.toLowerCase());
      const esDoctor = persona.flag_es_doctor === '1';
      const esPaciente = persona.flag_es_doctor === '0';

      if (this.filtroProfesion === 'todos') {
        return nombreCoincide && apellidoCoincide;
      } else if (this.filtroProfesion === 'doctores') {
        return nombreCoincide && apellidoCoincide && esDoctor;
      } else if (this.filtroProfesion === 'pacientes') {
        return nombreCoincide && apellidoCoincide && esPaciente;
      }

      return false;
    });
  }

  


}

*/


import { Component, OnInit } from '@angular/core';
import { PacientesDoctores } from 'src/app/models/pacientes-doctores.models';
import { PacientesDoctoresService } from '../pacientes-doctores.service';
//import * as firebase from 'firebase/app'; // Importa el SDK de Firebase
import { DataServices } from '../../data.services'; // Importa el servicio modificado

import * as firebase from 'firebase/database';


@Component({
  selector: 'app-pacientes-doctores',
  templateUrl: './pacientes-doctores.component.html',
  styleUrls: ['./pacientes-doctores.component.css']
})
export class PacientesDoctoresComponent implements OnInit {
  personas: PacientesDoctores[] = [];
  nuevapersona: PacientesDoctores = { idPersona: 0, nombre: '', apellido: '', telefono: '', email: '', cedula: '', flag_es_doctor: '' };
  personaEditar: PacientesDoctores | null = null;

  personasFiltradas: PacientesDoctores[] = []; // Lista filtrada
  filtroNombre = '';
  filtroApellido = '';
  filtroProfesion = 'todos'; // 'todos', 'doctores', 'pacientes'

  constructor(
    public pacientesDoctoresService: PacientesDoctoresService,
    private dataServices: DataServices // Inyecta el servicio modificado
  ) {}

  ngOnInit() {
    this.obtenerPersonasDesdeFirebase();
  }

  obtenerPersonasDesdeFirebase() {
    const db = firebase.database();
    const personasRef = db.ref('personas');

    personasRef.on('value', (snapshot) => {
      const data = snapshot.val();

      if (data) {
        this.personas = Object.values(data);
      } else {
        this.personas = [];
      }
    });
  }

  agregarPersona() {
    // Asume que tienes un array de PacientesDoctores y agregalo al servicio
    const personasAEgregar: PacientesDoctores[] = [this.nuevapersona];
    this.dataServices.agregarPacientesDoctores(personasAEgregar);

    this.nuevapersona = { idPersona: 0, nombre: '', apellido: '', telefono: '', email: '', cedula: '', flag_es_doctor: '' };
  }

  editarPersona(persona: PacientesDoctores) {
    this.personaEditar = persona;
  }

  guardarEdicion() {
    if (this.personaEditar) {
      this.pacientesDoctoresService.editarPacientesDoctores(this.personaEditar);
      this.personaEditar = null;
    }
  }

  cancelarEdicion() {
    this.personaEditar = null;
  }

  eliminarPersona(idPersona: number) {
    this.pacientesDoctoresService.eliminarPacientesDoctores(idPersona);
  }

  // método para validar la entrada de flag_es_doctor
  validarFlagEsDoctor() {
    if (this.nuevapersona.flag_es_doctor !== '0' && this.nuevapersona.flag_es_doctor !== '1') {
      this.nuevapersona.flag_es_doctor = ''; // Restablece a un valor por defecto (puede ser '0' o '1' según tu lógica).
    }
  }

  // Método para aplicar el filtrado por nombre, apellido y profesión
  aplicarFiltro() {
    // Realiza el filtrado de personas aquí
    // ...
  }
}

