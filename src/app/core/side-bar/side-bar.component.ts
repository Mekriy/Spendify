import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Route, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/interfaces/user";
import {switchMap} from "rxjs";
import {considerSettingUpAutocompletion} from "@angular/cli/src/utilities/completion";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  providers: [ConfirmationService, MessageService, AuthService]
})
export class SideBarComponent implements OnInit{
  condition: boolean = true;
  user: User = {
    email: "",
    firstName: "user",
    lastName: "user",
    fileName: ""
  }
  imageData: string | ArrayBuffer | null = "./assets/images/defaultUserImage.png";

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private readonly authService: AuthService) {}

  ngOnInit() {
    this.condition = !localStorage.getItem("access_token");
    this.loadSideBarUserData();
  }
  loadSideBarUserData(): void {
    this.authService.getUser()
      .pipe(
        switchMap((res:any) => {
          this.user = res;
          return this.authService.getUserPhoto(this.user.fileName)
        })
      )
      .subscribe({
        next: value => {
          this.createImageFromBlob(value);
        },
        error: err => console.log("Error:", err)
      })
  }

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageData = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    } else {
      this.imageData = "assets/images/defaultUserImage.png";
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
        this.condition = true;
        this.authService.logout()
      }
    })
  }
}

