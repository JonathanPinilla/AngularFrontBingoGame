import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

/**
 * Module for user registration
 * @author Jonathan Daniel Pinilla Forero
 * @version 1.0.0
 * @since 1.0.0 08-07-2022
 */
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = {
    _id: "",
    userName: "",
    password: ""
  }

  constructor(
    private UserServiceService: UserServiceService,
    private route: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('logged') == 'true') {
      this.route.navigate(['/gamepage']);
    }
  }

  /**
   * function that manages the creation of a new user
   */
  create() {
    localStorage.setItem('userName', `${this.user.userName}`);
    localStorage.setItem('userEmail', `${this.user._id}`);

    if (this.user._id != "") {
      this.UserServiceService.create(this.user)
        .subscribe((res) => {
          if (res) {
            alert(`User created successfully: ${this.user}`);

            localStorage.setItem('logged', 'true');
            this.route.navigate(['/gamepage']);
          } else {
            alert("Login data is incorrect");
          }
        });
    } else {
      alert("The email can't be empty");
    }

    this.user = {
      _id: "",
      userName: "",
      password: ""
    }
  }

  /**
   * function that manages the login button which redirect to the login page(component)
   */
  goLogin() {
    this.route.navigate(['/login']);
  }

}
