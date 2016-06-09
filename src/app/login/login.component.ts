/**
 * Created by Murhaf on 5/26/2016.
 */
import {Component} from 'angular2/core';
import {IAuthService, AuthService} from '../service';
import {fillViewHeight} from '../directives/fill-height';
import {Checkbox, Button, Messages, InputText} from 'primeng/primeng';
import {Router} from 'angular2/router';
import {Loader} from '../partials';
import {AppState} from "../app.service";

@Component({
  selector: 'login',
  providers: [AuthService],
  template: require('./login.html'),
  directives: [fillViewHeight, Checkbox, InputText, Button, Messages, Loader]
})

export class Login {

  private username: string;
  private password: string;
  private remember: boolean = false;
  logo = require('../../assets/img/network.svg');
  loadingSvg = require('../../assets/img/loading-bubbles.svg');
  msgs = [];

  constructor(private authService:IAuthService, router: Router, private appState: AppState){
    if(authService.isAuthenticated()){
      router.navigate(['Index']);
    }
  }
  ngOnInit() {

    let encodedCred = localStorage.getItem('keys');
    console.log("key: " + encodedCred);
    if (encodedCred != null) {
      this.authService.loginByLocalStorage(encodedCred).subscribe(
        res=> {
          if (this.remember) {
            localStorage.setItem('keys', btoa(this.username + ':' + this.password));
          }
        },
        (err)=> {
          if (err.status < 200 || err.status >= 300) {
            this.showError('[' + err.status + '] : Invalid Credentials.');
          }
          else {
            this.showError('Cannot connect to the server.');
          }
        }
      );
    }
  }

  login() {
    this.msgs = [];
    this.authService.loginByCredentials(this.username, this.password, this.remember).subscribe(
      res=> {
        if (this.remember) {
          localStorage.setItem('keys', btoa(this.username + ':' + this.password));
        }
      },
      (err)=> {
        if(err.status < 200 || err.status >= 300) {
          this.showError('[' + err.status + '] : Invalid Credentials.');
        }
        else {
          this.showError('Cannot connect to the server.');
        }
      }
    );
  }
  showError(err) {
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'Login failed', detail: err});
    this.appState.set('busy', false);
  }


}
