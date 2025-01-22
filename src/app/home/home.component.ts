import { Component, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { GreetingService } from '../services/greeting.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private router: Router,
    @Inject(AuthenticationService) private authenticationService: AuthenticationService,
    @Inject(GreetingService) private greetingService: GreetingService) {

  }

  ngOnInit() {
    console.log('HomeComponent initialized');

    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {

      this.greetingService.greeting().subscribe({
        next: (greeting: any) => {
          console.log("greeting: " + greeting);
        }
      });
    }
  }

}
