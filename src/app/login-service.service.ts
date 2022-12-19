import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from './model/user-interface';

/**
 * service for login connected with NodeJs
 * @author Jonathan Daniel Pinilla Forero
 * @version 1.0.0
 * @since 1.0.0 08-07-2022
 */
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Login gttp post request
   * @param user to login
   * @returns user logged
   */
  login(user: any) {
    return this.http.post('http://localhost:3000/auth/v1/user/login', user);
  }

  /**
   * Gets the user fromtype UserInterface
   * @param id of the user to get
   * @returns the user object
   */
  getUser(id: String) {
    return this.http.get<UserInterface>('http://localhost:3000/auth/v1/user/' + id);
  }
}
