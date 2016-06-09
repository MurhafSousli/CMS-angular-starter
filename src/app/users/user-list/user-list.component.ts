import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {WpCollection, Helper} from "../../service";
import {DataTable, Column, Header, LazyLoadEvent, Footer, Button, InputText} from 'primeng/primeng';
import {IUser} from "../../service/models/user.interface";

@Component({
  selector: 'list-users',
  template: require('./user-list.html'),
  directives: [DataTable, Column, Header, Footer, Button, InputText]
})

export class ListUser {

  users: Array<IUser> = [];
  args = {
    per_page: 10,
    page: 1,
    search: ''
  }

  constructor(public service:WpCollection, private router:Router) {
  }

  ngOnInit() {
    this.service.setEndpoint(Helper.WpEndpoint.Users);
  }
  fetch(args){
    this.service.fetch(args).subscribe(
      (users) => {
        this.users = users;
      }
    );
  }

  loadUsersLazy(event:LazyLoadEvent) {
    this.args.page = (Math.floor(event.first / event.rows) + 1);
    this.fetch(this.args);
  }

  search(event:any){
    console.log('Search for: ' + event.target.value);
    this.args.search = event.target.value;
    this.args.page = 1;
    this.fetch(this.args);
  }

  onRowSelect(user) {
    this.router.navigate(['SingleUser',{ id: user.data.id }]);
  }
  newUser(){
    this.router.navigate(['AddUser']);
  }

}

