import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  token: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login(){
    this.loginService.login(this.email, this.password, '/ventas');
	}

}
