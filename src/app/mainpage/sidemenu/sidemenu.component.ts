import { Component } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent {
  pathUserImage: string = "./assets/images/userImage.jpg";
  userName: string = "JohnDoe";
}
