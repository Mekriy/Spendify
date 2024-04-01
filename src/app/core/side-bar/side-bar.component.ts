import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  pathUserImage: string = "./assets/images/userImage.jpg";
  userName: string = "JohnDoe";
  condition: boolean = true;
}
