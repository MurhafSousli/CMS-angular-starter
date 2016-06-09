import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'home',
  providers: [AuthService],
  styles: [require('./home.css')],
  template: require('./home.html')
})
export class Home {

  constructor(public appState:AppState, public authService: AuthService) {
  }

  ngOnInit() {
  }


}
