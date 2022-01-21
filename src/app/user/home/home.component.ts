import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data:any = 0;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("auth-user"))
    {
      this.data = localStorage.getItem("auth-user")
    }
  }

}
