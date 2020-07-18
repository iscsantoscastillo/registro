import { Component, OnInit, ViewChild } from '@angular/core';
import {Persona} from './persona.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  title = 'listado-personas';
  personas: Persona[] = [new Persona("Juan", "Perez"), new Persona("Julio", "Balam")]; 
  nombreInput:string;
  apellidoInput:string;

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyBLzGC9pmGE5j5XVznaTZizbncB0BnDEUk",
    authDomain: "negociosduno.firebaseapp.com",
    databaseURL: "https://negociosduno.firebaseio.com",
    projectId: "negociosduno",
    storageBucket: "negociosduno.appspot.com",
    messagingSenderId: "251964533248",
    appId: "1:251964533248:web:7c5ba1588ee7e683"
    })
  }

  onAgregarPersona(){
    let persona1 = new Persona(this.nombreInput, this.apellidoInput);
    this.personas.push(persona1);
  }
}
