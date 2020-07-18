import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';

@Injectable()
export class LoginService{
    //token: string;
    //email: string;
    //password: string;
    constructor(private router: Router){}

    login(email: string, password: string, nextPage: string){
        //var userName = this.email;
        //var userPass = this.password;
        console.log('Loging... ');
        var r = this.router;
        firebase.auth().signInWithEmailAndPassword(email, password).
        then(function(firebaseUser) {
          // Success !!
            console.log('Se hizo login !!');
            if(nextPage !== '') r.navigate([nextPage]);
        }).catch(function(error) {
            // Handle Errors here :(
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Login error: ' + errorMessage);
        });    
    }

    logout(nextPage: string){
        var r = this.router;
        console.log('Logout');
        firebase.auth().signOut().then(function() {
        // Sign-out successful.
        //window.location = "login.html";
        console.log('Se ejecutó logout');
        if(nextPage !== '') r.navigate([nextPage]);
            }).catch(function(error) {
        console.log('Logout error: ' + error);
        // An error happened.
        });
    }

    verificar(nextPage: string){
        //console.log('Tocken: '+firebase.auth().currentUser.getIdToken.toString);
        var r = this.router;
        console.log('Verificar...');
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
          // User is signed in.
          console.log('Sí está logueado !!');
          } else {
          // No user is signed in.
          console.log('No está logueado :(');
          if(nextPage !== '') r.navigate([nextPage]);
          }
        });
      }

    getIdToken(){
        //return this.token;
    }

}