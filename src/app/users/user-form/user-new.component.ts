import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {WpModel, Helper} from "../../service";
import {Button, InputText, Dropdown, Password, SelectItem} from 'primeng/primeng';
import {User} from "../../service/models/user.model";
import {IUser} from "../../service/models/user.interface";

@Component({
  selector: 'user-form',
  template: require('./user-form.html'),
  directives: [Button, InputText, Dropdown, Password]
})

export class NewUser {

  user: User;
  selectedRole:string;
  roles:SelectItem[] = [];
  title:string = "<i class='fa fa-plus'></i>   Add new user";

  constructor(public service:WpModel, private router:Router) {

    this.user = new User();
    this.roles.push({label: 'Choose role', value: ''});
    this.roles.push({label: 'Contributor', value: 'contributor'});
    this.roles.push({label: 'Editor', value: 'editor'});
    this.roles.push({label: 'Author', value: 'author'});
    this.roles.push({label: 'Admin', value: 'administrator'});
  }

  ngOnInit() {
    this.service.setEndpoint(Helper.WpEndpoint.Users);
  }

  get diagnostic() {
    return JSON.stringify(this.user);
  }

  onSubmit() {
    if(this.selectedRole == ""){
      console.log("Please choose a role and try again.");
    }
    this.user["roles[]"] = this.selectedRole;
    this.service.add(Helper.toUrlEncoded(this.user)).subscribe(
      (res) => {
        let user = <IUser> res;
        this.router.navigate(['SingleUser',{ id: user.id }]);
      },
      err => console.log(err)
    );
  }


}


