/* eslint-disable no-unused-vars */
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Menu } from './menu';
import { RouteInfo } from 'src/app/models/router-info';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public _menu: RouteInfo[] = [];
  _connectedUser!: User;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this._menu = Menu.slice();
    this.authService.connectedUserSubject.subscribe({
      next: (connectedUser) => (this._connectedUser = connectedUser)
    });
    this.authService.emitConnectedUserSubject();
  }
  isAdmin(_type: string) {
    // return this._connectedUser.type === 'Admin' && _type === 'Admin';
    return this._connectedUser.type === 'Admin' ? true : _type === 'Simple';
  }
}
