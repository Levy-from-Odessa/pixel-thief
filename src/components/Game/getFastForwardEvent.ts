import { GameEvents, GameStateValue, GameStates, levelEvents, levelStates } from './../../machine/gameMachine/types';

// only for dev mode

const fullFlow = [
  GameEvents.START,
  levelEvents.GO_FORWARD,
  levelEvents.GO_FORWARD,
]

export const getFastForwardEvent = (state: GameStateValue) => {
  switch(state){
    case(GameStates.GAME_OVER): 
      return [...fullFlow, GameEvents.PLAYER_DIED]
    case (GameStates.GAME_COMPLETE): 
      return [...fullFlow, GameEvents.PLAYER_GOT_TREASURE]
    case (`${GameStates.PLAYING}.${levelStates.LEVEL_1}`): 
      return [GameEvents.START]
    case (`${GameStates.PLAYING}.${levelStates.LEVEL_2}`): 
      return [GameEvents.START, levelEvents.GO_FORWARD]
    case (`${GameStates.PLAYING}.${levelStates.LEVEL_3}`): 
      return [GameEvents.START, levelEvents.GO_FORWARD, levelEvents.GO_FORWARD]
    default:
      return []
  }

}