import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signupSubmit(f: NgForm){
    console.log(f.value);
    this.authService.createUser(f.value.name,f.value.email,f.value.password);
  }
}
