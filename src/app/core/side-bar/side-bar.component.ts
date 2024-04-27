import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/interfaces/user";
import {of, switchMap, window} from "rxjs";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  providers: [ConfirmationService, MessageService, AuthService]
})
export class SideBarComponent implements OnInit{
  user: User = {
    id: "",
    email: "",
    firstName: "user",
    lastName: "user",
    fileName: "",
    roleName: 'User',
  }
  imageData: string | ArrayBuffer | null = "./assets/images/defaultUserImage.png";

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private readonly authService: AuthService) {}

  ngOnInit() {
    this.loadSideBarUserData();
  }
  loadSideBarUserData(): void {
    this.authService.getUser()
      .pipe(
        switchMap((res:any) => {
          this.user = res;
          if(this.user.fileName === null || this.user.fileName === ""){
            return of(res);
          }
          else {
            return this.authService.getUserPhoto(this.user.fileName)
          }
        })
      )
      .subscribe({
        next: value => {
          this.createImageFromBlob(value);
        },
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
        this.authService.logout()
      }
    })
  }
  goToProfile() {
    this.router.navigateByUrl('/profile');
  }
}

