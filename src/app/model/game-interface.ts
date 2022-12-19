/**
 * IGameList list of games
 */
export interface IGameList {
    games: Game[]
}

/**
 * Game model
 */
export interface Game {
    id: number,
    isStarted: Boolean,
    ended: Boolean,
    playersLobbies: []
}