import { RouteInfo } from 'src/app/models/router-info';

export const Menu: RouteInfo[] = [
  { _path: 'client', _title: 'Client', _icon: 'fa-user', _class: '' },
  { _path: 'product', _title: 'Product', _icon: 'fa-home', _class: '' },
  { _path: 'category', _title: 'Category', _icon: 'fa-bank', _class: '' },
  { _path: 'sale', _title: 'Sale', _icon: 'fa-diamond', _class: '' },
  { _path: 'stock-sheet', _title: 'Stock Sheet', _icon: 'fa-dollar', _class: '' },
  { _path: 'paid-cart', _title: 'Paid Cart', _icon: 'fa-bell', _class: '' },
  { _path: '/home', _title: 'Web site', _icon: 'fa-internet-explorer', _class: '' }
];
