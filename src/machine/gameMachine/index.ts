import { createMachine, log, send } from "xstate";
import { GameEvents,  GameStateType, GameStates, GameEventType, LevelStates, LevelEvents, playerId, GamePlayerEvents, PlayerMovementType } from "./types";
import { playerMachine } from "../playerMachine";
import { choose } from "xstate/lib/actions";
import { isEqual } from "lodash";
import { NEXT_DOOR_COORDS } from "../../constants";
import { PlayerEvents } from "../playerMachine/types";


const levelMachine = {
  initial: LevelStates.LEVEL_1,
  states: {
    [LevelStates.LEVEL_1]: {
      entry: 'resetPlayerCoords',
      on:{
        [LevelEvents.GO_FORWARD]: LevelStates.LEVEL_2,
      }
    },
    [LevelStates.LEVEL_2]: {
      entry: 'resetPlayerCoords',
      on:{
        [LevelEvents.GO_BACK]: LevelStates.LEVEL_1,
        [LevelEvents.GO_FORWARD]: LevelStates.LEVEL_3,
      }
    },
    [LevelStates.LEVEL_3]: {
      entry: 'resetPlayerCoords',
      on:{
        [LevelEvents.GO_BACK]: LevelStates.LEVEL_2,
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
        [GameEvents.PLAYER_GOT_TREASURE]: GameStates.GAME_COMPLETE,
        [GamePlayerEvents.PLAYER_MOVED]: {actions: 'onPlayerMoved'}
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

}, 
{
  actions: {
    onPlayerMoved: choose([
      {
        cond: 'isPlayerAtNextDoor',
        actions: 'goToNextLevel'
      }
    ]),
    goToNextLevel: send(LevelEvents.GO_FORWARD),
    resetPlayerCoords: send(PlayerEvents.ON_RESET_PLAYER_COORDS, {to: playerId})
  },
  guards: {
    isPlayerAtNextDoor: (_, event) => {
      if(event.type !== GamePlayerEvents.PLAYER_MOVED) return false
      const {coords} = event
      return isEqual(coords, NEXT_DOOR_COORDS)
    }
  },
  services: {
    playerMachine
  }
}
)

