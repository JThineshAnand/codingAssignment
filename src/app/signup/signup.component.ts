import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessageSub: Subscription;
  errorMessage: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.errorMessageSub = this.authService.getErrorMessageListener()
      .subscribe(message=>{
        this.errorMessage = message;
        console.log(message);
      })

  }

  signupSubmit(f: NgForm){
    console.log(f.value);
    this.authService.createUser(f.value.name,f.value.email,f.value.password);
  }

  ngOnDestroy(){
    this.errorMessageSub.unsubscribe();
  }
}
