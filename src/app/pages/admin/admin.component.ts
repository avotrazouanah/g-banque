import { Component, OnInit, ViewChild } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { Menu } from 'src/app/common/sidebar/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild('drawer') public drawer!: MatDrawer;
  title = 'Web Administration';
  isMobile: boolean = false;

  // eslint-disable-next-line no-unused-vars
  constructor(private breakpoint: BreakpointObserver, private router: Router) {}

  ngOnInit(): void {
    this.onChangeTitle();
  }

  ngAfterViewInit() {
    this.breakpoint.observe(['(max-width: 991px)']).subscribe((res) => {
      if (res.matches) {
        this.drawer.mode = 'over';
        this.drawer?.close();
        this.isMobile = true;
      } else {
        this.drawer.mode = 'side';
        this.drawer?.open();
        this.isMobile = false;
      }
    });
  }

  onChangeTitle() {
    this.title = this.router.url.split('/')[2];
    if (this.title) {
      for (let c of Menu) if (c.path === this.title) this.title = c.title;
    } else this.title = 'Web Administration';
  }
}
