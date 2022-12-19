import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGameList, Game } from './model/game-interface';
import { BingoCard } from './model/card-interface';
import { BingoBall } from './model/ball-interface';

/**
 * service for game connected with Spring and Java, main service to manage most of the application
 * @author Jonathan Daniel Pinilla Forero
 * @version 1.0.0
 * @since 1.0.0 08-07-2022
 */
@Injectable({
  providedIn: 'root'
})
export class GameService {


  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Get a new and random bingo card
   * @returns bingo card object
   */
  bingoCard() {
    return this.http.get('http://localhost:8080/api/v1/game/bingocard');
  }

  /**
   * Get the games available
   * @returns lit of available games
   */
  getGames() {
    return this.http.get<IGameList>('http://localhost:8080/api/v1/game/');
  }

  /**
   * Get a specific game
   * @param id of the game to get
   * @returns game object
   */
  getOneGame(id: number) {
    return this.http.get<Game>('http://localhost:8080/api/v1/game/' + id);
  }

  /**
   * Join a player to the lobby of a game
   * @param user to add to the lobby
   * @returns the user added to the lobby
   */
  joingame(user: any) {
    return this.http.post('http://localhost:8080/api/v1/game/tolobby', user)
  }

  /**
   * Get a bingo card type BingoCard
   * @returns a BingoCard Object
   */
  getbingotable() {
    return this.http.get<BingoCard>('http://localhost:8080/api/v1/game/bingocard');
  }

  /**
   * Creates a new Game
   * @param game to create
   * @returns game created
   */
  createGame(game: any) {
    return this.http.post('http://localhost:8080/api/v1/game/', game);
  }

  /**
   * Get a random number for a bingo ball
   * @returns random integer number 
   */
  getBingoBall() {
    return this.http.get<number>('http://localhost:8080/api/v1/game/bingoball');
  }

  /**
   * Adds a number to a bingo ball DB
   * @param bingoBall to add to the BD
   * @returns bingoBall added
   */
  addBingoBallBD(bingoBall: any) {
    return this.http.post<BingoBall>('http://localhost:8080/api/v1/game/bingonumbers', bingoBall);
  }

  /**
   * Gets the list of bingoball (numbers) added at the time
   * @returns BingoBall list
   */
  bingoNumbers() {
    return this.http.get<BingoBall[]>('http://localhost:8080/api/v1/game/bingonumbers');
  }

  /**
   * Delete a player from the lobby
   * @param email of the player to delete
   * @returns response with the http status
   */
  deletePlayerFromLobby(email: any){
    return this.http.delete('http://localhost:8080/api/v1/game/player/'+ email);
  }

  /**
   * clear the numbers DB for a new game
   * @returns response with the http status
   */
  clearBallNumbers(){
    return this.http.delete('http://localhost:8080/api/v1/game/bingonumbers');
  }

  /**
   * Updates a game finded by it's id
   * @param id of the game to update
   * @param game body to update
   * @returns game updated
   */
  updateGame(id: any, game: any){
    return this.http.put('http://localhost:8080/api/v1/game/'+id, game);
  }

  /**
   * Deletes a game given it's id
   * @param id of the game to delete
   * @returns response with the http status
   */
  deleteGame(id: any){
    return this.http.delete('http://localhost:8080/api/v1/game/'+id);
  }
}
