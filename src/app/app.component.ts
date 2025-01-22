import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { init as InitApm } from '@elastic/apm-rum';
// import ApmService from '@elastic/apm-rum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'simple-frontend';

  constructor(
    private router: Router
  )
  {
    const apm = InitApm({
      serviceName: 'simple-frontend',
      serverUrl: 'http://172.31.218.37:8200',
      environment: 'dev',
      logLevel: 'debug',
      active: true,
      centralConfig: false,
      breakdownMetrics: true,
      distributedTracingOrigins: ['http://localhost:8080'],
      propagateTracestate: true,
    })

    apm.setUserContext({
      'username': 'foo',
      'id': 'bar'
    })

  }

  ngOnInit(): void {

    this.router.navigate(['/home']);
  }

}
