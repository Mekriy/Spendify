import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  providers: [Router],
})
export class NotFoundComponent {
  constructor(private readonly router: Router) {}

  ngOnInit() {
    //TODO: why do you redirect user after 5000? are you sure it's enough to see the problem?
    setTimeout(() => {
      this.router.navigateByUrl('/').then(() => window.location.reload());
    }, 5000);
  }
}
