import { RouteInfo } from 'src/app/models/router-info';

export const Menu: RouteInfo[] = [
  { path: '/user', title: 'User', icon: 'fa-user', class: '' },
  { path: '/product', title: 'Product', icon: 'fa-home', class: '' },
  { path: '/category', title: 'Category', icon: 'fa-bank', class: '' },
  { path: '/sale', title: 'Sale', icon: 'fa-diamond', class: '' },
  { path: '/stock-sheet', title: 'Stock Sheet', icon: 'fa-dollar', class: '' },
  { path: 'paid-cart', title: 'Paid Cart', icon: 'fa-bell', class: '' },
  { path: '/home', title: 'Web site', icon: 'fa-internet-explorer', class: '' }
];
