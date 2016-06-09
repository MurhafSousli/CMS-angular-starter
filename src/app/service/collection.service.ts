import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Helper} from "./helper.service";
import {AppState} from "../app.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class WpCollection {

  private actionUrl:string;

  //query arguments.
  private args:any;
  //collection pagination properties
  public currentPage:number = 1;
  public totalPages:number = 1;
  public totalObjects:number = 0;

  constructor(private http:Http, private appState:AppState) {
  }

  public setEndpoint(endpoint:Helper.WpEndpoint) {
    this.actionUrl = Helper.baseUrl() + endpoint;
  }

  /*
   * fetch() : request the collection
   */
  public fetch(args?:any):Observable<any> {
    //set our args if exists
    this.args = args;
    //generateUrl returns our request URL.

    return this.http.get(this.generateUrl(), {headers: Helper.getHeaders(this.appState)}).map(
      res => {
        //set our totalObject and totalPages from res headers
        this.totalObjects = +res.headers.get('X-WP-Total');
        this.totalPages = +res.headers.get('X-WP-TotalPages');
        //return our json data.
        return res.json();
      },
      err => console.log('[WPService]: fetch collection error:' + err)
    );
  }

  /*
   * more() : request next page of the collection if it is available
   */
  public more():Observable<any> {
    if (this.hasMore()) {
      //increment our currentPage then assign it to our args.
      this.args.page = ++this.currentPage;

      return this.http.get(this.generateUrl()).map(
        res => {
          //set our totalObject and totalPages from res headers
          this.totalObjects = +res.headers.get('X-WP-Total');
          this.totalPages = +res.headers.get('X-WP-TotalPages');
          //return our json data.
          return res.json();
        },
        err => console.log('[WPService]: more collection error:' + err)
      );
    }
  }

  /*
   *  hasMore() : return true if the next page of the collection is available
   */
  public hasMore():boolean {
    return this.currentPage < this.totalPages;
  }

  /*
   * generateUrl returns the final URL with arguments.
   */
  private generateUrl():string {
    var url = this.actionUrl;
    if (this.args) {
      //add args to baseURL
      url += '?' + this.serialize(this.args);
      //assign currentPage to args.page otherwise to 1
      this.currentPage = (this.args.page) ? +this.args.page : 1;
    }
    console.log('[WPService]: Fetching collection: ' + url);
    return url;
  }

  private serialize = function (obj, prefix?):string {
    var str = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
        str.push(typeof v == "object" ?
          this.serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }

}
