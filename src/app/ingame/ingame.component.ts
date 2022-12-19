import { Component, getNgModuleById, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

/**
 * Component for the game behavior
 * @author Jonathan Daniel Pinilla Forero
 * @version 1.0.0
 * @since 1.0.0 08-07-2022
 */
@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.css']
})
export class IngameComponent implements OnInit {

  uname: String | null = '';

  game: any;

  gameId = localStorage.getItem('gameId');

  games: any;

  bingoball = {
    id: 0,
    ballNumber: 0
  };

  bingoLetter = "";


  bingoCard = {
    b: [],
    i: [],
    n: [],
    g: [],
    o: []
  }

  constructor(
    private route: Router,
    private gameService: GameService
  ) {
    /**
     * Executes the funcition bingoBall() every 60 * 1000 milis
     */
    setInterval(() => { this.bingoBall() }, (60 * 1000));
  }

  ngOnInit(): void {

    if (!(localStorage.getItem('logged') == 'true')) {
      this.route.navigate(['/login']);
    }
    this.uname = localStorage.getItem('userName');

    this.gameService.getbingotable()
      .subscribe((res) => {
        this.bingoCard = res;
      });

    this.gameService.getOneGame(Number(this.gameId))
      .subscribe((res) => {
        this.game = res;
      });

    this.game = {
      isStarted: true,
      ended: false
    };
    this.gameService.updateGame(localStorage.getItem('gameId'), this.game).subscribe();

    if (localStorage.getItem('gameCardLoad') != '1') {
      localStorage.setItem('gameCardLoad', '1');
      window.location.reload();
    }

  }

 
  /**
   * Function to manage the signOut button
   */
  signOut() {
    localStorage.setItem('logged', 'false');
    localStorage.setItem('userName', '');
    localStorage.setItem('userEmail', '');
    this.route.navigate(['/login']);
  }

  /**
   * Function that determinates if a player has won or not the game
   */
  bingo() {
    var vertivalB: number = 0;
    var vertivalI: number = 0;
    var vertivalN: number = 0;
    var vertivalG: number = 0;
    var vertivalO: number = 0;
    var Hor0: number = 0;
    var Hor1: number = 0;
    var Hor2: number = 0;
    var Hor3: number = 0;
    var Hor4: number = 0;
    var diag1: number = 0;
    var diag2: number = 0;
    var matrix = new Array(5).fill(0).map(() => new Array(5).fill(0));

    this.gameService.bingoNumbers().subscribe((res) => {

      res.forEach((element) => {

        for (let i = 0; i < 5; i++) {
          if (element.ballNumber === this.bingoCard.b[i]) {
            vertivalB += 1;
            matrix[0][i] = 1;
          }
          if (element.ballNumber === this.bingoCard.i[i]) {
            vertivalI += 1;
            matrix[1][i] = 1;
          }
          if (element.ballNumber === this.bingoCard.n[i]) {
            vertivalN += 1;
            matrix[2][i] = 1;
          }
          if (element.ballNumber === this.bingoCard.g[i]) {
            vertivalG += 1;
            matrix[3][i] = 1;
          }
          if (element.ballNumber === this.bingoCard.o[i]) {
            vertivalO += 1;
            matrix[4][i] = 1;
          }
        }

      });
      Hor0 = matrix[0][0] + matrix[1][0] + matrix[2][0] + matrix[3][0] + matrix[4][0];
      Hor1 = matrix[0][1] + matrix[1][1] + matrix[2][1] + matrix[3][1] + matrix[4][1];
      Hor2 = matrix[0][2] + matrix[1][2] + matrix[2][2] + matrix[3][2] + matrix[4][2];
      Hor3 = matrix[0][3] + matrix[1][3] + matrix[2][3] + matrix[3][3] + matrix[4][3];
      Hor4 = matrix[0][4] + matrix[1][4] + matrix[2][4] + matrix[3][4] + matrix[4][4];
      diag1 = matrix[0][0] + matrix[1][1] + matrix[2][2] + matrix[3][3] + matrix[4][4];
      diag2 = matrix[0][4] + matrix[1][3] + matrix[2][2] + matrix[3][1] + matrix[4][0];

      /**
       * Comprovation if any of the conditions is true, then the bingo is correct,
       *  if not then the player is kicked from the game
       */
      if (vertivalB == 5 || vertivalI == 5 || vertivalN == 5 || vertivalG == 5 || vertivalO == 5
        || Hor0 == 5 || Hor1 == 5 || Hor2 == 5 || Hor3 == 5 || Hor4 == 5
        || diag1 == 5 || diag2 == 5) {

        localStorage.setItem('logged', 'false');
        localStorage.setItem('userName', '');
        this.gameService.deleteGame(localStorage.getItem('gameId')).subscribe();
        localStorage.setItem('userEmail', '');
        localStorage.setItem('gameId', '');
        localStorage.setItem('gameCardLoad', '0');
        alert("You Winner");
        this.route.navigate(['winner']);

      } else {


        alert('You fool, you didnt won, now you will be kicked of the game');
        localStorage.setItem('logged', 'false');
        localStorage.setItem('userName', '');
        this.gameService.deleteGame(localStorage.getItem('gameId')).subscribe();
        localStorage.setItem('gameCardLoad', '0');
        localStorage.setItem('userEmail', '');
        localStorage.setItem('gameId', '');
        this.route.navigate(['/login']);

      }
    });

  }

  /**
   * Generates a random bingo ball (number) and storage it in a MySQL BD
   */
  bingoBall() {

    this.gameService.getBingoBall()
      .subscribe((res) => {
        this.gameService.addBingoBallBD(res).subscribe((rres) => {
          this.bingoball = rres;
          if (res <= 15) {
            this.bingoLetter = "B";
          } else if (res > 15 && res <= 30) {
            this.bingoLetter = "I";
          } else if (res > 30 && res <= 45) {
            this.bingoLetter = "N";
          } else if (res > 45 && res <= 60) {
            this.bingoLetter = "G";
          } else if (res > 60 && res <= 75) {
            this.bingoLetter = "O";
          }
        });
      });

  }
}
