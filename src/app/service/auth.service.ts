import {Injectable} from "@angular/core";
import {Router} from '@angular/router-deprecated';
import {AppState} from "../app.service";
import {Helper} from './helper.service';
import {WpModel} from "./model.service";
import {IAuthUser} from "./models/authuser.interface";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService implements IAuthService {
  /*
   *    Authenticate users with WP basic authentication.
   */
  public user:IAuthUser = null;
  private remember = false;

  constructor(private service:WpModel,
              private appState:AppState,
              private router:Router) {
  }

  loginByCredentials(username:string, password:string, remember:boolean) {

    console.log('** Login by credentials **');
    this.remember = remember;
    let encodedCred = btoa(username + ':' + password);
    this.appState.set('keys', encodedCred);
    let body = 'username=' + username + '&password=' + password;
    console.log(body);
    return this.login(body);
  }

  loginByLocalStorage(encodedCred:string) {

    console.log('** Login by localStorage **');
    this.remember = true;
    this.appState.set('keys', encodedCred);
    console.log(encodedCred);
    let body = Helper.getBodyCredentials(encodedCred);
    console.log(body);
    return this.login(body);
  }

  login(body) {
    this.appState.set('busy', true);
    this.service.setEndpoint(Helper.WpEndpoint.Authentication);
    console.log("** Authenticate User **");
    return this.service.add(body).map(
      (res:any) => {
        let authUser = <IAuthUser>res;
        this.checkoutUser(authUser);
        // console.log("** Get User's IP **");
        // this.service.getUserIpInfo().subscribe(
        //   (userIpInfo) => {
        //     authUser.location = userIpInfo;
        //     this.checkoutUser(authUser);
        //   }
        // )
      });

  }

  checkoutUser(authUser:IAuthUser) {
    this.appState.set('busy', false);
    this.user = authUser;
    if (this.remember) {
      console.log('** Save keys to localStorage **');
      localStorage.setItem('keys', this.appState.get('keys'));
    }
    else {
      localStorage.removeItem('keys');
    }
    this.router.navigate(['Index']);
  }

  logout() {
    console.log('logged out');
    this.user = null;
    localStorage.removeItem('keys');
    this.router.navigate(['Login']);
  }

  isAuthenticated():boolean {
    return this.user !== null;
  }

  hasRole(roles:string[]):boolean {
    return this.isAuthenticated() && roles.includes(this.user.roles[0]);
  }
}

/*
 *  AuthService Interface
 */
export abstract class IAuthService {

  abstract loginByCredentials(username:string, password:string, remember:boolean):Observable<any>;

  abstract loginByLocalStorage(encodedCred):Observable<any>;

  abstract logout();

  // is the current user authenticated?
  abstract isAuthenticated():boolean;

  // does the current user have one of these roles?
  abstract hasRole(roles:string[]):boolean;
}
