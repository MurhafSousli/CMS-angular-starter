/*
 * Created by Murhaf on 5/19/2016.
 *
 * This interface is only used for user response.
 */
export interface IUser{
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  url: string;
  description: string;
  nickname: string;
  slug: string;
  avatar_urls: any;
  hash_email: string;
  _username: string;
  _email: string;
  _registered: string;
  _roles: string[];
}
