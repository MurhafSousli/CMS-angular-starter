import {Component, ViewEncapsulation} from '@angular/core';
import{ SingleUser} from './user-view/user-single.component';
import{ NewUser} from './user-form/user-new.component';
import{ ListUser} from './user-list/user-list.component';
import{ UpdateUser} from './user-form/user-update.component';

//import {SingleUser, NewUser, ListUser, UpdateUser} from './all';

import {RouteConfig, Router} from '@angular/router-deprecated';
import {Button} from 'primeng/primeng';

@Component({
  selector: 'users',
  template: require('./users.html'),
  directives: [Button],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    button{
      max-width: 200px;
      margin-bottom: 10px;
      margin-right: 10px;
    }
    .gravatar{
      border-radius: 50%;
    }
  `]
})

//noinspection TypeScriptValidateTypes
@RouteConfig([
  {path: '/', name: 'UsersList', component: ListUser, useAsDefault: true},
  {path: '/:id', name: 'SingleUser', component: SingleUser},
  {path: '/new', name: 'AddUser', component: NewUser},
  {path: '/update/:id', name: 'UpdateUser', component: UpdateUser}
])

export class UserManager {

  constructor(private router: Router){

  }
  newUser(){
    this.router.navigate(['Users', 'AddUser']);
  }
}

