import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  isAuthenticated: boolean = false;

  ngOnInit() {
    let access = localStorage.getItem('access_token');
    this.isAuthenticated = access !== null; //TODO: is that enough? access token could be expired, isn't it?
  }
}
