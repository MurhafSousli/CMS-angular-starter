import {Component} from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';
import {WpModel, Helper} from "../../service";
import {Button, InputText, Dropdown, Password, SelectItem} from 'primeng/primeng';
import {User} from "../../service/models/user.model";
import {IUser} from "../../service/models/user.interface";

@Component({
  selector: 'user-form',
  template: require('./user-form.html'),
  directives: [Button, InputText, Dropdown, Password]
})

export class UpdateUser {

  user:User;
  userId;
  selectedRole:string;
  roles:SelectItem[] = [];
  title:string = "<i class='fa fa-pencil'></i>   Update existing user";


  constructor(_params:RouteParams, private service:WpModel, private router:Router) {

    this.user = new User();
    this.roles.push({label: 'Choose role', value: ''});
    this.roles.push({label: 'Contributor', value: 'contributor'});
    this.roles.push({label: 'Editor', value: 'editor'});
    this.roles.push({label: 'Author', value: 'author'});
    this.roles.push({label: 'Admin', value: 'administrator'});

    this.userId = _params.get('id');
    this.loadUser();
  }

  ngOnInit() {
    this.service.setEndpoint(Helper.WpEndpoint.Users);
  }

  onSubmit() {
    if(this.selectedRole == ""){
      console.log("Please choose a role and try again.");
    }
    this.user["roles[]"] = this.selectedRole;
    this.service.update(this.userId, Helper.toUrlEncoded(this.user)).subscribe(
      (res) => {
        let user = <IUser> res;
        this.router.navigate(['SingleUser',{ id: user.id }]);
      },
      err => console.log(err)
    );
  }

  loadUser() {
    this.service.getSingle(this.userId).subscribe(
      res => {
        let userRes = <IUser> res;
        this.user = new User();
        this.user.name = userRes.name;
        this.user.description = userRes.description;
        this.user.username = userRes._username;
        this.user.email = userRes._email;
      },
      err => console.log(err)
    );
  }

  get diagnostic() {
    return JSON.stringify(this.user);
  }
}
