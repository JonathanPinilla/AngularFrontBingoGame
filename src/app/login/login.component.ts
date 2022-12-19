import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';

/**
 * Component for user login
 * @author Jonathan Daniel Pinilla Forero
 * @version 1.0.0
 * @since 1.0.0 08-07-2022
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * User by default
   */
  user = {
    _id: "",
    userName: "",
    password: ""
  }

  /**
   * Constructor creates local variables
   * @param LoginServiceService Inyects the service that communicates with the BackEnd
   * @param route Inyects the router from angular that is used to navigate between components
   */
  constructor(
    private LoginServiceService: LoginServiceService,
    private route: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('logged') == 'true') {
      this.route.navigate(['/gamepage']);
    }
  }
  /**
   * login function, stores user name and email so it can be used dynamically 
   * also consult the login service so it can determinate if the data at the input
   * exist and is correct in de DB
   * 
   * @route to the game main page if the user and password is correct
   */
  login() {

    localStorage.setItem('userEmail', `${this.user._id}`);

    this.LoginServiceService.getUser(this.user._id)
      .subscribe((res) => {
        localStorage.setItem('userName', `${res.userName}`);
      });

    if (this.user._id != "") {
      this.LoginServiceService.login(this.user)
        .subscribe((res) => {
          if (res) {
            localStorage.setItem('logged', 'true');

            this.route.navigate(['/gamepage']);
          } else {
            alert("Login data is incorrect");
          }
        });
    } else {
      alert("The email can't be empty")
    }

    /**
     * Reset user to default after execution
     */
    this.user = {
      _id: "",
      userName: "",
      password: ""
    }
  }

  goRegister() {
    this.route.navigate(['/register']);
  }

}
