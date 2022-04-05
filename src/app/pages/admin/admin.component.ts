import { Component, OnInit, ViewChild } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { Menu } from 'src/app/pages/admin/common/sidebar/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild('drawer') public _drawer!: MatDrawer;
  _title = 'Web Administration';
  _isMobile: boolean = false;

  // eslint-disable-next-line no-unused-vars
  constructor(private breakpoint: BreakpointObserver, private router: Router) {}

  ngOnInit(): void {
    this.onChangeTitle();
  }

  ngAfterViewInit() {
    this.breakpoint.observe(['(max-width: 991px)']).subscribe((res) => {
      if (res.matches) {
        this._drawer.mode = 'over';
        this._drawer?.close();
        this._isMobile = true;
      } else {
        this._drawer.mode = 'side';
        this._drawer?.open();
        this._isMobile = false;
      }
    });
  }

  onChangeTitle() {
    this._title = this.router.url.split('/')[2];
    if (this._title) {
      for (let c of Menu) if (c._path === this._title) this._title = c._title;
    } else this._title = 'Web Administration';
  }
  onLogOut() {
    this.router.navigate(['/', 'login']);
  }
}
