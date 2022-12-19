import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  logged = localStorage.getItem('logged');

  constructor(
    private route: Router,
  ) { }

  ngOnInit(): void {
    if (this.logged == null || this.logged == 'false') {
      this.route.navigate(['/register']);
    } else {
      this.route.navigate(['/gamepage']);
    }
  }



  title = 'bingoGameClient';
}

