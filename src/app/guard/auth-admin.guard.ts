/* eslint-disable no-unused-vars */
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  connectedUser!: User;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.connectedUserSubject.subscribe({
      next: (connectedUser) => (this.connectedUser = connectedUser)
    });
    this.authService.emitConnectedUserSubject();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve) => {
      if (this.connectedUser?.type === 'Admin') {
        resolve(true);
      } else {
        this.router.navigate(['/admin/client']);
        resolve(false);
      }
    });
  }
}
