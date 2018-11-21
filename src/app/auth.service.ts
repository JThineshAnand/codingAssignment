import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { SignUpData } from './signUpdata.model';
import { AuthData } from './authdata.model';
import { User } from './registered-users/user.model';

@Injectable({ providedIn: "root" })
export class AuthService {

  private token: string;
  private isAuthenticated: boolean;

  private authStatusListener = new Subject<boolean>();
  private registeredUsersListener = new Subject<any>();
  private errorMessageListener = new Subject<any>();

  constructor(private http: HttpClient, private router: Router){

  }

  getRegisteredUsersListener(){
    return this.registeredUsersListener.asObservable();
  }

  getErrorMessageListener(){
    return this.errorMessageListener.asObservable();
  }

  getUsers(){
    this.http.get('http://localhost:3000/api/users')
      .subscribe(users=>{
        this.registeredUsersListener.next(users);
      });
  }


  createUser(name: string, email: string, password: string){
    const signUpData: SignUpData = {name:name,email:email, password:password};
    this.http.post<any>('http://localhost:3000/api/signup',signUpData)
    .subscribe(response=>{

      this.errorMessageListener.next(response.message);
    });
  }

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  loginUser(email:string,password:string){
    const authdata: AuthData = {email:email,password:password};
    this.http.post<any>('http://localhost:3000/api/login',authdata)
      .subscribe(response=>{
        if(response.message){
          this.errorMessageListener.next(response.message);
        }
        else{
          this.token = response.token;

          if(this.token){
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
          }

          this.router.navigate(['registeredUsers']);
        }

      });
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
  }
}
