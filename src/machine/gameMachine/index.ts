import { createMachine } from "xstate";
import { GameEvents,  GameStateType, GameStates, GameEventType, levelStates, levelEvents, playerId } from "./types";
import { playerMachine } from "../playerMachine";


const levelMachine = {
  initial: levelStates.LEVEL_1,
  states: {
    [levelStates.LEVEL_1]: {
      on:{
        [levelEvents.GO_FORWARD]: levelStates.LEVEL_2,
      }
    },
    [levelStates.LEVEL_2]: {
      on:{
        [levelEvents.GO_BACK]: levelStates.LEVEL_1,
        [levelEvents.GO_FORWARD]: levelStates.LEVEL_3,
      }
    },
    [levelStates.LEVEL_3]: {
      on:{
        [levelEvents.GO_BACK]: levelStates.LEVEL_2,
      }
    },
  }
}

export const gameMachine = createMachine<any, GameEventType, GameStateType>({
  id: 'game',
  initial: GameStates.HOME,
  states: {
    [GameStates.HOME]: {
      on: {
        [GameEvents.START]: GameStates.PLAYING
      }
    },
    [GameStates.PLAYING]: {
      invoke: { 
        id: playerId,
        src: playerMachine,
      },
      on: {
        [GameEvents.PLAYER_DIED]: GameStates.GAME_OVER,
        [GameEvents.PLAYER_GOT_TREASURE]: GameStates.GAME_COMPLETE
      },
      ...levelMachine,
    },
    [GameStates.GAME_OVER]: {
      on: {
        [GameEvents.RESTART]: GameStates.PLAYING,
      }
    },
    [GameStates.GAME_COMPLETE]: {
      on: {
        [GameEvents.TO_HOME]: GameStates.HOME,
      }
    }
  }

})

