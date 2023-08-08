import { CoordType } from "../../types";

export enum GameStates {
  HOME = "HOME",
  PLAYING = "PLAYING",
  GAME_OVER = "GAME_OVER",
  GAME_COMPLETE = "GAME_COMPLETE"
}

export enum GameEvents {
  START = "START",
  PLAYER_DIED = "PLAYER_DIED",
  PLAYER_GOT_TREASURE = "PLAYER_GOT_TREASURE",
  RESTART= "RESTART",
  TO_HOME = "TO_HOME"
}

// todo: research how to use enums in enums 
// (${GameEvents.START}/LEVEL_1)
export enum LevelStates   {
  LEVEL_1 = `LEVEL_1`,
  LEVEL_2 = `LEVEL_2`,
  LEVEL_3 = `LEVEL_3`,
}

export enum LevelEvents  {
  GO_BACK = "GO_BACK",
  GO_FORWARD = "GO_FORWARD",
}

export enum GamePlayerEvents  {
  PLAYER_MOVED = "PLAYER_MOVED",
  PLAYER_ATTACKED = "PLAYER_ATTACKED",
}

 export type LevelStateValue = `${GameStates.PLAYING}.${LevelStates.LEVEL_1}` 
  | `${GameStates.PLAYING}.${LevelStates.LEVEL_2}`
  | `${GameStates.PLAYING}.${LevelStates.LEVEL_3}`

export type GameStateValue =   GameStates.HOME | GameStates.PLAYING 
| GameStates.GAME_OVER | GameStates.GAME_COMPLETE | LevelStateValue


export type GameStateType = { 
  context: null; 
  value: GameStateValue
}


export type PlayerMovementType = {
  type: GamePlayerEvents.PLAYER_MOVED
  coords: CoordType
}

export type PlayerAttackedType = {
  type: GamePlayerEvents.PLAYER_ATTACKED
}

export type GameEventType = {type: GameEvents.START} | 
{type: GameEvents.PLAYER_DIED} | {type: GameEvents.PLAYER_GOT_TREASURE} | 
{type: GameEvents.RESTART} | {type: GameEvents.TO_HOME} |
{type: LevelEvents.GO_BACK} | {type: LevelEvents.GO_FORWARD} |
PlayerMovementType | PlayerAttackedType



export const playerId = "playerId"
export const monsterId = "monsterId"