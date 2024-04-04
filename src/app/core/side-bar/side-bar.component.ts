import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class SideBarComponent implements OnInit{
  pathUserImage: string = "./assets/images/userImage.jpg";
  userName: string = "JohnDoe";
  condition: boolean = true;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {}

  ngOnInit() {
    if(localStorage.getItem("access_token")){
      this.condition = false;
    }
    else{
      this.condition = true;
    }
  }

  logout() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to logout?',
      header: 'Logout',
      icon: 'pi pi-question-circle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have been logout' });
        localStorage.removeItem("access_token")
        this.condition = true;
        this.router.navigateByUrl('login')
      }
    })
  }
}

