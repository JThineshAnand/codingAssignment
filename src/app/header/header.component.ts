import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import { Router } from '@angular/router';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private authStatusSub : Subscription;
  private getRegisteredUsersSub : Subscription;
  private loggedIn: boolean = false;

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(value=>{
        this.loggedIn = value;
      })

  }

  getRegisteredUsers(){
    this.authService.getUsers();
    this.router.navigate(['registeredUsers']);

  }



  ngOnDestroy(){
    this.authStatusSub.unsubscribe();

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }
}
