import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component that manages the winner html and behavior
 * @author Jonathan Daniel Pinilla Forero
 * @version 1.0.0
 * @since 1.0.0 08-07-2022
 */
@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  quit(){
    this.route.navigate(['loggin']);
  }
}
