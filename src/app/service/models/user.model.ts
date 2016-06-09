/**
 * Created by Murhaf on 5/28/2016.
 */
/*
 * This class is only used for add/update users, for user response use user.interface instead.
 */
import {Injectable} from "@angular/core";
@Injectable()
export class User {
  name:string;
  url:string;
  description:string;
  password:string;
  username:string;
  email:string;
  constructor(){
  }
}
