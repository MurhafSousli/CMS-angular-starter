import {Component} from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';
import {WpModel, Helper} from '../../service';
import {Button, Dialog} from 'primeng/primeng';
import {IUser} from "../../service/models/user.interface";

@Component({
  selector: 'single-user',
  template: require('./user-single.html'),
  directives: [Button, Dialog]
})

export class SingleUser {

  user:IUser;
  userId;
  avatar;
  displayConfirmBox: boolean = false;

  constructor(_params:RouteParams, private service:WpModel, private router:Router) {
    this.userId = _params.get('id');
  }

  ngOnInit() {
    this.service.setEndpoint(Helper.WpEndpoint.Users);
    this.service.getSingle(this.userId).subscribe(
      (res) => {
        this.user = <IUser>res;
       //this.avatar = this.user.avatar_urls['96'];
        this.avatar = 'http://www.gravatar.com/avatar/'+ this.user.hash_email + '?s=200';
      }
    );
  }

  updateUser() {
    this.router.navigate(['UpdateUser', {id: this.userId}]);
  }
  showDialog() {
    this.displayConfirmBox = true;
  }

  deleteUser() {
    this.displayConfirmBox = false;
    this.service.delete(this.userId).subscribe(
      (res) =>{
        console.log("the user [" + this.user.name + "] has been deleted.");
        this.router.parent.navigate(['Users']);
      },
      err => {
        console.log(err)
      }
    );
  }
}
