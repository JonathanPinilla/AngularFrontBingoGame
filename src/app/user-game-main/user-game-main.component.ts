import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { LoginServiceService } from '../login-service.service';


/**
 * Component for user main page after login, where him/s will be able to join a game
 * @author Jonathan Daniel Pinilla Forero
 * @version 1.0.0
 * @since 1.0.0 08-07-2022
 */
@Component({
  selector: 'app-user-game-main',
  templateUrl: './user-game-main.component.html',
  styleUrls: ['./user-game-main.component.css']
})
export class UserGameMainComponent implements OnInit {

  uname: String | null = '';

  game = {
    id: 0,
    isStarted: false,
    ended: false
  };

  user = {
    id: localStorage.getItem('userEmail'),
    playerName: localStorage.getItem('userName'),
    playerGame: 0
  }

  games: any;

  constructor(
    private route: Router,
    private gameService: GameService,
    private loginService: LoginServiceService
  ) { }

  ngOnInit(): void {

    this.loginService.getUser(localStorage.getItem('userEmail')!)
      .subscribe((response) => {
        this.user.playerName = response.userName;
        localStorage.setItem('userName', response.userName);
        this.uname = response.userName;
      });

    if (!(localStorage.getItem('logged') == 'true')) {
      this.route.navigate(['/login']);
    }
    this.uname = localStorage.getItem('userName');

    this.gameService.getGames()
      .subscribe((res) => {
        this.games = res;

        if (this.games.length == 0) {
          this.gameService.createGame(this.game).
            subscribe((rresponse) => {
              console.log(rresponse);
              this.gameService.clearBallNumbers().subscribe((res) => {
                console.log("Numbers Cleared: ", res);
              });
              window.location.reload();
            });
        }

        this.games.forEach((element: any) => {
          element.playersLobbies.forEach((subelement: any) => {
            if (subelement.playerName == this.uname) {
              localStorage.setItem('gameId', element.id);
              this.route.navigate(['/ingame']);
            }
          });
        });

      });
  }

  /**
   * function to manage the signOut button
   */
  signOut() {
    localStorage.setItem('logged', 'false');
    localStorage.setItem('userName', '');
    localStorage.setItem('userEmail', '');
    this.route.navigate(['/login']);
  }

  /**
   * function to manage the join button
   * @param gameId the id of the game in which the player will join
   */
  joinGame(gameId: number) {
    this.user.playerGame = gameId;
    this.gameService.joingame(this.user)
      .subscribe((res) => {
        console.log(res);
      });
    this.route.navigate(['/ingame']);
  }

}
