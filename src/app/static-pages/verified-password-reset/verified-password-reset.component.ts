import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UpdatePassword} from "../../shared/interfaces/updates/update-password";
import {AuthService} from "../../shared/services/auth.service";
import {DialogService} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-verified-password-reset',
  templateUrl: './verified-password-reset.component.html',
  styleUrl: './verified-password-reset.component.scss',
  providers: [MessageService, DialogService]
})
export class VerifiedPasswordResetComponent implements OnInit{
  resetToken: string = '';
  newPass: string = '';
  confirmPass: string = '';
  userEmail: string = '';
  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService) {}
  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      this.resetToken = params['code'];
      this.userEmail = params['userEmail'];
    });
  }
  changePassword() {
    if(this.newPass === this.confirmPass){
      let reset: UpdatePassword = {
        resetToken: this.resetToken,
        email: this.userEmail,
        newPassword: this.newPass,
      }
      this.authService.changePassword(reset)
        .pipe()
        .subscribe({
          next: () => this.router.navigateByUrl('/profile').then(() => window.location.reload()),
          error: err => {
            this.messageService.add({summary:'Error!', detail: 'Can\'t verify password reset', icon:'error', life: 3000, severity:'error' })
            this.router.navigateByUrl('/profile').then(()=> window.location.reload());
          },
        })
    }
    else {
      this.messageService.add({summary:'Error!', detail: 'Passwords doesn\'t match or something went wrong on the server!', icon:'error', life: 3000, severity:'error' })
    }
  }
}
