import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-email-verification-success',
  templateUrl: './email-verification-success.component.html',
  styleUrl: './email-verification-success.component.scss',
  providers: [Router]
})
export class EmailVerificationSuccessComponent implements OnInit{
  constructor(private readonly router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('/').then(() => window.location.reload());
    }, 5000);
  }

}
