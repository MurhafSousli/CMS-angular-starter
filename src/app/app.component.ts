import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

import {Home} from './home';
import {Header, Loader} from './partials';
import {Login} from "./login";
import {SecureRouterOutlet} from "./directives/secured-outlet";
import {UserManager} from "./users/users.component";
import {NoAccessCmp} from './noaccess';


@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  directives: [Header, Loader, SecureRouterOutlet],
  styles: [
    require('assets/rio-theme/theme/theme.css'),
    require('assets/rio-theme/layout/css/core-layout.css'),
    require('assets/rio-theme/layout/css/animate.css'),
    require('assets/rio-theme/layout/css/rio-font.css'),
    require('assets/rio-theme/layout/css/ripple-effect.css'),
    require('assets/rio-theme/layout/css/perfect-scrollbar.css'),
    require('assets/rio-theme/layout/css/rio-layout.css'),
    require('assets/css/fullcalendar.css'),
    require('assets/css/quill.snow.css'),
    require('primeui/primeui-ng-all.css'),
    require('./app.scss')
  ],
  template: `
      <header></header>
      <main id="layout-portlets-cover">
        <secure-outlet login="/Login" unauthorized="/Noaccess"></secure-outlet>
      </main>
  `
})
@RouteConfig([
  {path: '/', name: 'Index', component: Home, data: {roles: ['administrator', 'author', 'editor', 'contributor']}, useAsDefault: true},
  {path: '/login', name: 'Login', component: Login},
  {path: '/home', name: 'Home', component: Home, data: {roles: ['administrator', 'author', 'editor', 'contributor']}},
  {path: '/users/...', name: 'Users', component: UserManager, data: {roles: ['administrator']}},
  {path: '/noaccess', name: 'Noaccess', component: NoAccessCmp},
  {
    path: '/about',
    name: 'About',
    loader: () => require('es6-promise!./about')('About'),
    data: {roles: ['administrator', 'author', 'editor', 'contributor']}
  },
  {
    path: '/author',
    name: 'Author',
    loader: () => require('es6-promise!./author')('Author'),
    data: {roles: ['administrator', 'author']}
  }
])
export class App {

  constructor() {

  }

}
