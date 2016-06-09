/**
 * Created by Murhaf on 5/24/2016.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";



const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "2641081-7b9ef28d2297b8e523ce762f0";

@Injectable()
export class PixabayService {

  constructor(public http:Http) {
  }

  getResults(query:string):Observable<any> {

    return this.http.get(this.generateUrl(query))
      .map(
        res=>res.json(),
        err=>console.log(err)
      );
  }


  generateUrl(query:string):string {
    let url = BASE_URL;
    url += '?key=' + API_KEY;
    url += '&q=' + query + "&pretty=true";

    console.log("fetch url: " + url);
    return url;
  }


}

