import { GameEvents, GameStateValue, GameStates, LevelEvents, LevelStates } from './../../machine/gameMachine/types';

// only for dev mode

const fullFlow = [
  GameEvents.START,
  LevelEvents.GO_FORWARD,
  LevelEvents.GO_FORWARD,
]

export const getFastForwardEvent = (state: GameStateValue) => {
  switch(state){
    case(GameStates.GAME_OVER): 
      return [...fullFlow, GameEvents.PLAYER_DIED]
    case (GameStates.GAME_COMPLETE): 
      return [...fullFlow, GameEvents.PLAYER_GOT_TREASURE]
    case (`${GameStates.PLAYING}.${LevelStates.LEVEL_1}`): 
      return [GameEvents.START]
    case (`${GameStates.PLAYING}.${LevelStates.LEVEL_2}`): 
      return [GameEvents.START, LevelEvents.GO_FORWARD]
    case (`${GameStates.PLAYING}.${LevelStates.LEVEL_3}`): 
      return [GameEvents.START, LevelEvents.GO_FORWARD, LevelEvents.GO_FORWARD]
    default:
      return []
  }

}