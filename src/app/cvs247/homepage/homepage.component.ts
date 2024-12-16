import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private userService:UserService) { }
  username:string="there";
  ngOnInit(): void {
    if(this.userService.isLoggedIn()==true)
      this.username=sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname"); 
  }

}
