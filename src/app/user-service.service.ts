import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * service for registration connected with NodeJs
 * @author Jonathan Daniel Pinilla Forero
 * @version 1.0.0
 * @since 1.0.0 08-07-2022
 */
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get user using htpp client
   * @param user to create
   * @returns user objct created
   */
  create(user: any) {
    return this.http.post('http://localhost:3000/auth/v1/user/registration', user);
  }
}
