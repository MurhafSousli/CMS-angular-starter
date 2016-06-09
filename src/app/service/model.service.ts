import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Helper} from "./helper.service";
import {AppState} from "../app.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class WpModel {

  private actionUrl:string;

  constructor(private http:Http, private appState:AppState) {
  }

  public setEndpoint(endpoint:Helper.WpEndpoint) {
    this.actionUrl = Helper.baseUrl() + endpoint;
  }

  public getSingle = (id:number):Observable<any>  => {
    return this.http.get(this.actionUrl + id, {headers: Helper.getHeaders(this.appState)}).map(res => res.json());
  }

  public add = (body):Observable<any>  => {
    return this.http.post(this.actionUrl, body, {headers: Helper.getHeaders(this.appState)}).map(res =>  res.json());
  }

  public update = (id:number, body):Observable<any>  => {
    return this.http.put(this.actionUrl + id, body, {headers: Helper.getHeaders(this.appState)}).map(res => res.json());
  }

  public delete = (id:number):Observable<any>  => {
    return this.http.delete(this.actionUrl + id + "?force=true", {headers: Helper.getHeaders(this.appState)});
  }
  public getUserIpInfo() {
    return this.http.get(Helper.getIpUrl()).map(res => res.json());
  }

}

