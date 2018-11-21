import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessageSub: Subscription;
  errorMessage: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.errorMessageSub = this.authService.getErrorMessageListener()
      .subscribe(message=>{
        this.errorMessage = message;
        console.log('---------------------');
        console.log(message);
        console.log('---------------------');
      })

  }

  loginSubmit(f: NgForm){
    this.authService.loginUser(f.value.email,f.value.password);

  }

  ngOnDestroy(){
    this.errorMessageSub.unsubscribe();
  }

}
