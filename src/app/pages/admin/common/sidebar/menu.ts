import { RouteInfo } from 'src/app/models/router-info';

export const Menu: RouteInfo[] = [
  { _path: 'client', _title: 'Client', _icon: 'fa-user', _class: '', _type: 'Simple' },
  { _path: 'versement', _title: 'Versement', _icon: 'fa-home', _class: '', _type: 'Simple' },
  { _path: 'retrait', _title: 'Retrait', _icon: 'fa-bank', _class: '', _type: 'Simple' },
  {
    _path: 'audit-operation',
    _title: 'Audit Operation',
    _icon: 'fa-diamond',
    _class: '',
    _type: 'Admin'
  },
  {
    _path: 'audit-versement',
    _title: 'Audit Versement',
    _icon: 'fa-dollar',
    _class: '',
    _type: 'Admin'
  },
  {
    _path: 'audit-retrait',
    _title: 'Audit Retrait',
    _icon: 'fa-dollar',
    _class: '',
    _type: 'Admin'
  },
  { _path: 'audit-compte', _title: 'Audit Compte', _icon: 'fa-bell', _class: '', _type: 'Admin' },
  { _path: 'user', _title: 'Utilisateur', _icon: 'fa-bell', _class: '', _type: 'Admin' }
];
