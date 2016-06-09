/*
 * Created by Murhaf on 5/22/2016.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {RouterActive} from '../../directives/router-active';
import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'header',
  directives: [RouterActive],
  template: require('./header.html')
})
export class Header {
  logo = require('../../../assets/img/network.svg');
  toggleMenu = false;
  toggleProfile = false;
  toggleToolbar = false;

  constructor(private authService:AuthService, private router:Router) {
  }

  profile() {
    this.router.navigate(['Users', 'SingleUser', {id: this.authService.user.id}]);
  }

  logout() {
    this.authService.logout();
  }
}
