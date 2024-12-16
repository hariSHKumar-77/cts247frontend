import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService,private route:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();
    this.route.navigate(['/']);
  }

}
