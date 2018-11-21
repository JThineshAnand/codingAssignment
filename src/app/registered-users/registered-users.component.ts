import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {
  users:User[];
  usersData : Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  
    this.usersData = this.authService.getRegisteredUsersListener()
      .subscribe((data)=>{
        this.users = data;
      });
  }

  ngOnDestroy(){
    this.usersData.unsubscribe();
  }

}
