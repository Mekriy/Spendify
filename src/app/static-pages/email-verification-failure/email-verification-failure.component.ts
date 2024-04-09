import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-email-verification-failure',
  templateUrl: './email-verification-failure.component.html',
  styleUrl: './email-verification-failure.component.scss',
  providers: [Router]
})
export class EmailVerificationFailureComponent implements OnInit{
  constructor(private readonly router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['../register']);
    }, 5000);
  }
}
