/*
 * This is a static class contains all shared functions which Models and Collections need.
 */

import {Headers} from '@angular/http';
import {AppState} from "../app.service";

export module Helper {

  export function baseUrl() {
    return 'http://localhost/wordpress/wp-json';
  }
  export function getIpUrl() {
    return 'http://ip-api.com/json';
  }

  export function getBodyCredentials(encodedCred:string):string {
    let cred = atob(encodedCred).split(':');
    return 'username=' + cred[0] + '&password=' + cred[1];
  }

  export function getHeaders(appState:AppState):Headers {
    let headers = new Headers();
    let userCred = 'Basic ' + appState.get('keys');
    headers.append('Authorization', userCred);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  export enum WpEndpoint{
    Root = <any>'',
    Users = <any> '/wp/v2/users/',
    Authentication = <any>'/jwt-auth/v1/token/'
  }

  export function toUrlEncoded(obj):string {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

}

