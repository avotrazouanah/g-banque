import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private _router!: Router;
  constructor(private router: Router) {
    this._router = router;
  }
  onLog() {
    // eslint-disable-next-line no-undef
    console.log('admin');
    this._router.navigate(['/admin']);
  }
}
