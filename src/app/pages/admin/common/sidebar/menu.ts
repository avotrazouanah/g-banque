import { RouteInfo } from 'src/app/models/router-info';

export const Menu: RouteInfo[] = [
  { _path: 'client', _title: 'Client', _icon: 'fa-user', _class: '' },
  { _path: 'versement', _title: 'Versement', _icon: 'fa-home', _class: '' },
  { _path: 'retrait', _title: 'Retrait', _icon: 'fa-bank', _class: '' },
  { _path: 'audit-operation', _title: 'Audit Operation', _icon: 'fa-diamond', _class: '' },
  { _path: 'audit-versement', _title: 'Audit Versement', _icon: 'fa-dollar', _class: '' },
  { _path: 'audit-retrait', _title: 'Audit Retrait', _icon: 'fa-dollar', _class: '' },
  { _path: 'audit-compte', _title: 'Audit Compte', _icon: 'fa-bell', _class: '' },
  { _path: 'user', _title: 'Utilisateur', _icon: 'fa-bell', _class: '' }
];
